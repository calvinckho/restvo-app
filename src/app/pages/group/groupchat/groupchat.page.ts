import {Component, OnInit, OnDestroy, NgZone, ViewEncapsulation, Input, ViewChild, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import { ElectronService } from 'ngx-electron';
import { CacheService } from 'ionic-cache';
import { Plyr } from "plyr";

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
//const { Keyboard } = Plugins;
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge/ngx';
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

import {
    AlertController,
    ActionSheetController,
    IonContent,
    Events,
    IonInfiniteScroll,
    ModalController,
    Platform,
    PopoverController,
    ToastController
} from '@ionic/angular';

import { Chat } from "../../../services/chat.service";
import { UserData } from "../../../services/user.service";
import { Aws } from '../../../services/aws.service';
import { NetworkService } from "../../../services/network-service.service";
import { Response } from '../../../services/response.service'
import { Moment } from '../../../services/moment.service';
import { Groups } from '../../../services/group.service';
import { Resource } from '../../../services/resource.service';

import {FocusPhotoPage} from "../../connect/focus-photo/focus-photo.page";
import {ShowrecipientinfoPage} from '../../connect/showrecipientinfo/showrecipientinfo.page';
import {PickfeaturePopoverPage} from '../../feature/pickfeature-popover/pickfeature-popover.page';
import {Conversation} from '../../../interfaces/chat';
import {GroupPopoverPage} from '../group-popover/group-popover.page';
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";
import {ProfilePage} from "../../user/profile/profile.page";
import {GroupinfoPage} from "../groupinfo/groupinfo.page";
import {CalendarService} from "../../../services/calendar.service";

@Component({
    selector: 'app-groupchat',
    templateUrl: './groupchat.page.html',
    styleUrls: ['./groupchat.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GroupchatPage implements OnInit, OnDestroy {
    @ViewChild(IonContent) content: IonContent;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    @Input() modalPage: any; //optionally sent if it is a modal page

    subscriptions: any = {};
    propIndex: any;
    // chat
    messages: any = [];
    socketData: any;
    composedMessage: string = '';
    chatPageNum = 0;
    chatReachedEnd = false;
    chatAPIBusy = false;
    replyQuote: any;
    sendQuoteAndReplyTag: boolean = false;
    moreOptions = false;
    moreMediaOptions = true;
    noNetwork: boolean = false;
    listening: boolean = false;
    audioToast: any;
    slide = 0;
    chatFinishedLoading = false;
    selectedMoments = [];
    removedMoments = [];
    mediaList: Array<{_id: string, player: Plyr}> = [];

    constructor(
        private zone: NgZone,
        public router: Router,
        private electronService: ElectronService,
        private cache: CacheService,
        private storage: Storage,
        private badge: Badge,
        private events: Events,
        public platform: Platform,
        private geolocation: Geolocation,
        private speechRecognition: SpeechRecognition,
        private toastCtrl: ToastController,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private popoverCtrl: PopoverController,
        private groupService: Groups,
        public userData: UserData,
        public chatService: Chat,
        private awsService: Aws,
        private networkService: NetworkService,
        public calendarService: CalendarService,
        private responseService: Response,
        public momentService: Moment,
        private resourceService: Resource,
    ) {}

    async ngOnInit() {
        this.subscriptions['refreshMyConversations'] = this.userData.refreshMyConversations$.subscribe(this.reloadHandler);
        this.subscriptions['chatMessage'] = this.chatService.chatMessage$.subscribe(this.incomingMessageHandler);

        this.events.subscribe('refreshMoment', this.refreshMomentHandler);
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
        this.events.subscribe('closeGroupView', this.closeGroupChatHandler);
        if (this.chatService.currentChatProps && this.chatService.currentChatProps.length) {
            this.setup();
        }
        this.awsService.sessionAllowedCount = 10; // allow up to 10 files upload per session
    }

    reloadHandler = async (data) => {
        if (data) {
            if (data.action === 'reload chat view') {
                if (this.chatService.currentChatProps && this.chatService.currentChatProps.length) {
                    await this.cleanup(this.chatService.currentChatProps.badge);
                    await this.setup();
                    this.reloadChatView();
                }
            } else if (data.action === 'disconnect chat view' && data.conversationId === this.chatService.currentChatProps[this.propIndex]._id) {
                this.closeModal(true);
            }
        }

    };

    closeGroupChatHandler = (id) => {
        console.log("closing", id, this.chatService.currentChatProps[this.propIndex])
        if (this.chatService.currentChatProps.length > this.propIndex && (id === this.chatService.currentChatProps[this.propIndex].conversationId || id === (this.chatService.currentChatProps[this.propIndex].moment && this.chatService.currentChatProps[this.propIndex].moment._id) || id === (this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group._id))) {
            this.closeModal(true);
        }
    };

    async cleanup(refreshMyConversations) {
        try {
            this.destroyPlayers(null);
            this.chatAPIBusy = false;
            this.chatReachedEnd = false;
            this.chatPageNum = 0;
            const currentChatId = this.chatService.currentChatProps[0].conversationId;
            this.awsService.sessionAssets = [];
            this.selectedMoments = [];
            this.resetBadge(currentChatId, refreshMyConversations);
            // lower priority tasks
            if (this.messages.length) {
                await this.storage.set('conversation-' + currentChatId, this.messages); //store the active page to the local storage
            } else {
                await this.storage.remove('conversation-' + currentChatId);
            }
            if (this.composedMessage.length) {
                await this.storage.set('composedMessage' + currentChatId, this.composedMessage); // store the composed message
            } else {
                await this.storage.remove('composedMessage' + currentChatId);
            }
            this.messages.forEach((message) => {
                if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                    this.momentService.socket.emit('leave moment', message.moment._id);
                }
            });
            if (!this.modalPage && this.platform.width() >= 768) { // when viewing it in desktop mode
                this.chatService.currentChatProps = this.chatService.currentChatProps.slice(this.chatService.currentChatProps.length - 1); // remove the old chat properties
            }
            this.composedMessage = '';
            return currentChatId;
        } catch (err) {
            console.log(err);
        }
    }

    async setup() {
        this.propIndex = this.chatService.currentChatProps.length - 1;
        const messages = await this.storage.get('conversation-' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId); // load from storage
        if (messages) {
            this.messages = messages;
        } else {
            this.messages = [];
        }
        // restore composed message
        const composedMessage = await this.storage.get('composedMessage' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId);
        if (composedMessage && composedMessage.length) {
            this.composedMessage = composedMessage;
            this.moreMediaOptions = false;
        }
        // restore uploaded but unsent media
        const uploadedMedia = await this.storage.get('media-' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId);
        if (uploadedMedia && uploadedMedia.length) {
            this.awsService.sessionAssets = uploadedMedia;
            this.moreMediaOptions = false;
        } else {
            this.awsService.sessionAssets = [];
        }
        // restore unsent moment
        const uploadedMoments = await this.storage.get('moment-' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId);
        if (uploadedMoments && uploadedMoments.length) {
            this.selectedMoments = [];
            for (const moment of uploadedMoments) {
                const index = this.calendarService.calendarItems.map((c) => c.moment && c.moment._id).indexOf(moment._id);
                if (index > -1) {
                    this.selectedMoments.push(this.calendarService.calendarItems[index].moment);
                }
            }
            this.moreMediaOptions = false;
        }
        this.reloadChatView();
        await this.resetBadge(this.chatService.currentChatProps[this.propIndex].conversationId, this.chatService.currentChatProps[this.propIndex].badge);
    }

    async reloadChatView() {
        if (!this.chatAPIBusy) {
            this.chatReachedEnd = false;
            this.chatPageNum = 0;
            setTimeout( () => {
                if (this.infiniteScroll) {
                    this.infiniteScroll.disabled = false;
                }
                this.loadMoreMessages({target: this.infiniteScroll});
            }, 50);
        }
    }

    async loadMoreMessages(event) {
        if (!this.chatReachedEnd && !this.chatAPIBusy) { // chatAPIBusy is used to safeguard against iOS calling the (ionInfiniteScroll) function from the DOM that races with the reloadChatView function
            try {
                this.chatPageNum++;
                this.chatAPIBusy = true;
                const result: Conversation = await this.chatService.getConversationById(this.chatService.currentChatProps[this.propIndex].conversationId, this.chatPageNum);
                this.chatAPIBusy = false;
                if (this.chatPageNum === 1){
                    this.messages = []; // if this is the first page load, empty the view first
                }
                const momentIds = [];
                if (!result.conversation.length) {
                    this.chatReachedEnd = true;
                    this.chatFinishedLoading = true;
                    if (event && event.target) {
                        event.target.disabled = true;
                    }
                } else {
                    result.conversation.forEach( (message: any) => {
                        if (this.messages.length) {
                            if (new Date(this.messages[0].createdAt).toDateString() !== new Date(message.createdAt).toDateString()) {
                                // if it is the start of a new day
                                this.messages.unshift({timestamp: true, createdAt: this.messages[0].createdAt});
                            } else if ((new Date(this.messages[0].createdAt).getTime() - new Date(message.createdAt).getTime()) > 3 * 60 * 60 * 1000) {
                                // if longer than 3 hours
                                this.messages.unshift({timestamp: true, createdAt: this.messages[0].createdAt});
                            }
                        }
                        // process moment
                        if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll' && message.moment.resource.matrix_number && message.moment.resource.matrix_number.length && message.moment.resource.matrix_number[0].length) {
                            momentIds.push(message.moment._id);
                            const componentId = message.moment.resource.matrix_number[0].indexOf(30000);
                            message.poll = {
                                componentId: componentId,
                                display: [],
                                responses: [],   //list of all of the responses that users give.
                                winner: [],      //list of the highest vote count indexes
                                totalVoteCount: 0
                            };
                            for (const option of message.moment.matrix_string[componentId]) {
                                message.poll.display.push({option: option, votedByUser: false, count: 0});
                            }
                        }
                        if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                            message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                        }
                        message.status = "confirmed";
                        this.messages.unshift(message);
                    });
                    if (momentIds.length){
                        momentIds.forEach((momentId) => {
                            this.momentService.socket.emit('join moment', momentId) ;
                        });
                        const responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
                        const responseResponse = this.cache.loadFromDelayedObservable('response-' + this.chatService.currentChatProps[this.propIndex].conversationId, responseRequest, 'chats', 5, 'all');
                        responseResponse.subscribe(async (responses) => {
                            this.messages.forEach(async (message: any) => {
                                if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll' && message.moment.resource.matrix_number && message.moment.resource.matrix_number.length && message.moment.resource.matrix_number[0].length) {
                                    for (const response of responses) {
                                        if (response.moment === message.moment._id) {
                                            const index = message.poll.responses.map((c) => c._id).indexOf(response._id);
                                            if (index < 0) { //if the response hasn't been added to the response list
                                                message.poll.responses.push(response);
                                            } else { //if it has been added, and if the incoming response is newer
                                                if (new Date(message.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                    message.poll.responses.splice(index, 1, response);
                                                }
                                            }
                                        }
                                    }
                                    //now the latest response have been included, reset the display array
                                    await message.poll.display.forEach((displayitem) => {
                                        displayitem.count = 0;
                                        displayitem.votedByUser = false;
                                    });
                                    //reconstruct the display array
                                    message.poll.totalVoteCount = message.poll.responses.length;
                                    for (const response of message.poll.responses) {
                                        if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                            if (response.matrix_number[0][1] > (message.poll.display.length - 1)) {
                                                return; // if this response belongs to an option that has been deleted
                                            }
                                            if (response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                                message.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                            }
                                            message.poll.display[response.matrix_number[0][1]].count++;
                                        }
                                    }
                                }
                            });
                        });
                    }
                    setTimeout(() => {
                        if (this.chatPageNum === 1 && this.content) {
                            this.content.scrollToBottom(10);
                        }
                        this.chatFinishedLoading = true;
                    }, 500);
                }
                if (event && event.target) {
                    event.target.complete();
                }
            } catch (err) {
                this.networkService.showNoNetworkAlert();
                this.chatFinishedLoading = true;
                if (event && event.target) {
                    event.target.complete();
                }
            }
        } else {
            this.chatFinishedLoading = true;
            if (event && event.target) {
                event.target.complete();
            }
        }
    }

    // click Send button
    async sendMessage() {
        // first process Media files
        if (this.awsService.sessionAssets.length) {
            this.socketData = {
                conversationId: this.chatService.currentChatProps[this.propIndex].conversationId,
                attachments: this.awsService.sessionAssets,
                quote: {
                    body: '',
                    attachments: [],
                    author: ''
                },
                createdAt: new Date(),
                author: {
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                },
                status: 'pending',
                confirmId: Math.random()
            };
            this.messages.push(this.socketData);
            this.moreOptions = false;
            this.recalculateScrollContent();
            setTimeout(() => {
                if (this.socketData.status !== 'confirmed') this.socketData.status = 'failed';
            }, 10000);
            try {
                await this.chatService.sendReply(this.chatService.currentChatProps[this.propIndex].conversationId, {
                    attachments: this.awsService.sessionAssets,
                    page: this.chatService.currentChatProps[this.propIndex].page, // obsolete in 3.3.32+
                    groupId: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group._id : null,
                    groupName: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group.name : null
                }, this.socketData);
                this.awsService.sessionAssets = [];
                this.storage.remove('media-' + this.chatService.currentChatProps[this.propIndex].conversationId); // clear the cache of composed message
                this.noNetwork = false;
            } catch (err) {
                this.networkService.showNoNetworkAlert();
            }
        }
        // next process Moments
        if (this.selectedMoments.length) {
            let promises = this.selectedMoments.map( async (moment) => {
                if (moment.resource.hasOwnProperty('en-US') && moment.resource['en-US'].value[0] === 'Poll') {
                    this.momentService.socket.emit('join moment', moment._id); // join the moment socket.io to receive real-time update for voting
                }
                await this.momentService.share(moment);
            });
            await Promise.all(promises);
            this.selectedMoments = []; // empty the selected moments array
            // remove abandoned moments
            promises = this.removedMoments.map( async (moment) => {
                console.log("trying to remove", moment);
                await this.momentService.delete(moment);
            });
            await Promise.all(promises);
            this.storage.remove('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId); //clear the cache of composed message
            this.noNetwork = false;
            this.moreOptions = false;
        }
        // lastly, process messages
        if (this.composedMessage.length) {
            this.socketData = {
                conversationId: this.chatService.currentChatProps[this.propIndex].conversationId,
                body: this.composedMessage,
                quote: {
                    body: this.sendQuoteAndReplyTag ? this.replyQuote.body : '',
                    attachments: this.sendQuoteAndReplyTag ? this.replyQuote.attachments : [],
                    author: this.sendQuoteAndReplyTag ? (this.replyQuote.author ? this.replyQuote.author.first_name + " " + this.replyQuote.author.last_name : this.replyQuote.author_pending_member.name) : ''
                },
                createdAt: new Date(),
                author: {
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                },
                status: 'pending',
                confirmId: Math.random()
            };
            this.messages.push(this.socketData);
            // send to server and via socket.io
            setTimeout(() => {
                this.content.scrollToBottom(50);
                this.closeReplyQuote();
                this.composedMessage = '';
                this.storage.remove('composedMessage' + this.chatService.currentChatProps[this.propIndex].conversationId); //clear the cache of composed message
            }, 50);
            const serverData = {
                replyQuote: this.replyQuote,
                composedMessage: this.composedMessage,
                page: this.chatService.currentChatProps[this.propIndex].page, // obsolete in 3.3.32+
                groupId: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group._id : null,
                groupName: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group.name : null
            };
            try {
                await this.chatService.sendReply(this.chatService.currentChatProps[this.propIndex].conversationId, serverData, this.socketData);
                this.noNetwork = false;
            } catch (err) {
                if (this.noNetwork) {
                    this.socketData.status = 'failed';
                } else {
                    this.noNetwork = true;
                    setTimeout(() => {
                        this.resendMessage(serverData, this.socketData);
                    }, 4000);
                }
            }
        }
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    sendQuoteAndReply(message) { //when the reply button is pressed
        this.sendQuoteAndReplyTag = true;
        this.replyQuote = message;
    }

    closeReplyQuote() { // when the close reply button is pressed
        this.sendQuoteAndReplyTag = false;
        this.replyQuote = {};
    }

    async resendMessage(serverData, socketData) { // when resend button is pushed
        socketData.status = "pending";
        try {
            await this.chatService.sendReply(this.chatService.currentChatProps[this.propIndex].conversationId, serverData, socketData);
            this.noNetwork = false;
        } catch (err) {
            if (this.noNetwork) {
                this.socketData.status = "failed";
            } else{
                this.noNetwork = true;
                setTimeout(() => {
                    if (socketData.status !== "confirmed") {
                        socketData.status = "failed";
                    }
                }, 2000);
            }
        }
    }

    async messageMoreOptions() {
        if (this.platform.is('cordova')){
            //Keyboard.hide();
        }
        this.moreOptions = !this.moreOptions;
        this.recalculateScrollContent();
    }

    async toggleVoiceRecognition() {
        if (!this.listening) {
            this.recordAudio();
        } else {
            this.stopListening();
        }
    }

    async recordAudio() {
        console.log("Record Audio is being run!");
        if (!this.listening) {
            const language = "en-US";
            const matches = 1; //number of string returned
            const showPartial = true;
            const recognitionOptions = {
                language,
                matches,
                showPartial
            };
            const bool = await this.speechRecognition.isRecognitionAvailable();
            if (bool) {
                const res = await this.speechRecognition.hasPermission();
                if (res) {
                    this.startListening(recognitionOptions);
                } else {
                    this.speechRecognition.requestPermission().then(
                        () => {
                            this.startListening(recognitionOptions);
                        }, () => {
                            this.presentToast("Voice recognition is not activated.", 3000);
                        });
                }
            } else {
                this.presentToast("Voice recognition is not available.", 3000);
            }
        }
    }

    startListening(options) {
        this.listening = true;
        this.presentToast("Begin Voice Recognition", null);
        this.speechRecognition.startListening(options).subscribe(
            (matches: Array<string>) => {
                //There is a difference between Android and iOS platforms. On Android speech recognition stops when the speaker finishes speaking (at end of sentence). On iOS the user has to stop manually the recognition process by calling stopListening() method.
                this.zone.run(() => { //ngZone is required to re-render the view
                    this.composedMessage = matches[0];
                });
                if(this.platform.is('android')){ //for android only.
                    this.listening = false;
                    this.audioToast.dismiss();
                }
            },
            (onerror) => {
                console.log('error:', onerror);
                this.listening = false;
                this.audioToast.dismiss();
            }
        );
    }

    stopListening() { //for iOS only. Android stops listening when a sentence is completed.
        this.speechRecognition.stopListening();
        this.listening = false;
        this.audioToast.dismiss();
    }

    async openRestvoFeature(moment) { //when tap on a Restvo feature
        if (moment.resource.field === "Location") {
            window.open("http://maps.google.com/?q=" + moment.matrix_number[0] + "+%2C" + moment.matrix_number[1], '_blank');
        } else {
            let params: any;
            let componentProps: any;
            params = { };
            componentProps = { moment: moment, modalPage: true };
            if (moment.calendar && moment.calendar._id && moment.categories.includes('5e1bbda67b00ea76b75e5a73')) { // only include calendar ID for Content
                params.calendarId = moment.calendar._id;
                componentProps.calendarId = moment.calendar._id;
            }
            if (this.chatService.currentChatProps[this.propIndex].moment) {
                params.relationshipId = this.chatService.currentChatProps[this.propIndex].moment._id;
                componentProps.relationshipId = this.chatService.currentChatProps[this.propIndex].moment._id;
            }
            if (this.platform.width() >= 768) {
                this.router.navigate(['/app/activity/' + moment._id, params ], { replaceUrl: false });
            } else {
                const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: componentProps });
                await modal.present();
                const {data: refreshNeeded} = await modal.onDidDismiss();
                if (refreshNeeded) {
                    this.reloadChatView();
                }
            }
        }
    }

    //end of UI functions
    async takePhotoAndUpload() {
        this.moreMediaOptions = false;
        const { Camera } = Plugins;
        const image = await Camera.getPhoto({
            quality: 60,
            width: 1280,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            correctOrientation: false
        });
        let result: any;
        if (this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length) {
            result = await this.awsService.uploadImage('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, image);
        } else {
            result = await this.awsService.uploadImage('users', this.userData.user._id, image);
        }
        if (result === "Upload succeeded") {
            await this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets); //store the unsent media
        }
    }

    async selectPhotoFromDeviceAndUpload(event) {
        this.moreMediaOptions = false;
        try {
            let result: any;
            if (this.platform.is('cordova')) {
                const { Camera } = Plugins;
                const image = await Camera.getPhoto({
                    quality: 60,
                    width: 1280,
                    allowEditing: false,
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Photos,
                    correctOrientation: false
                });
                if (this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length) {
                    result = await this.awsService.uploadImage('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, image);
                } else {
                    result = await this.awsService.uploadImage('users', this.userData.user._id, image);
                }
            } else {
                const compressed = await this.awsService.compressPhoto(event.target.files[0]);
                if (this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length) {
                    result = await this.awsService.uploadFile('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, compressed);
                } else {
                    result = await this.awsService.uploadFile('users', this.userData.user._id, compressed);
                }
            }
            if (result === "Upload succeeded") {
                await this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets); //store the unsent media
            }
        } catch (err) {
            console.log(err);
        }
    }

    async selectFileFromDeviceAndUpload(event) {
        this.moreMediaOptions = false;
        try {
            let result: any;
            if (event.target.files[0].size < 50000000) {
                console.log("uploading file: ", event.target.files[0]);
                if (this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length) {
                    result = await this.awsService.uploadFile('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, event.target.files[0]);
                } else {
                    result = await this.awsService.uploadFile('users', this.userData.user._id, event.target.files[0]);
                }
                console.log("result", result);
                if (result === "Upload succeeded") {
                    await this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets); //store the unsent media
                }
            } else {
                const largeFileAlert = await this.alertCtrl.create({
                    header: 'File Too Large',
                    subHeader: 'Your file exceeds the maximum file size limit of 50 megabytes.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await largeFileAlert.present();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async selectCalendarItem(event, calendarItem) {
        event.stopPropagation();
        this.moreMediaOptions = false;
        // restore moment as parent and calendar as child object
        const selectedCalendar = JSON.parse(JSON.stringify(calendarItem));
        const selectedMoment = JSON.parse(JSON.stringify(calendarItem.moment));
        selectedCalendar.moment = selectedMoment._id;
        selectedMoment.calendar = selectedCalendar;
        if (this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId) {
            const index = this.chatService.conversations.map((c) => c.conversation._id).indexOf(this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId);
            if (index > -1) {
                selectedMoment.conversations = [this.chatService.conversations[index]];
            }
        }
        this.selectedMoments.push(selectedMoment);
        await this.storage.set('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.selectedMoments); //store the unsent moment
    }

    async openPickFeature(event, typeOfMoment) {
        try {
            const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Choose from Library', conversationId: this.chatService.currentChatProps[this.propIndex].conversationId}});
            await modal.present();
            const {data: moments} = await modal.onDidDismiss();
            if (moments && moments.length) {
                const sampleMoments = moments.filter((c) => c.type === 'new');
                if (sampleMoments && sampleMoments.length) {
                    for (const sampleMoment of sampleMoments) {
                        sampleMoment.calendar = { // reset the calendar
                            title: sampleMoment.matrix_string[0][0],
                            location: '',
                            notes: '',
                            startDate: new Date().toISOString(),
                            endDate: new Date().toISOString(),
                            options: {
                                firstReminderMinutes: 0,
                                secondReminderMinutes: 0,
                                reminders: []
                            }
                        };
                    }
                    const clonedMoments: any = await this.momentService.clone(sampleMoments, null); // user will be participanting in the Activity
                    if (clonedMoments) {
                        for (const clonedMoment of clonedMoments) {
                            clonedMoment.type = 'new';
                            const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
                            if (index > -1) {
                                clonedMoment.resource = moments[index].resource; // clone the populated resource
                                moments.splice(index, 1, clonedMoment);
                            }
                        }
                    }
                }
                for (const moment of moments) {
                    const index = this.calendarService.calendarItems.map((c) => c.moment && c.moment._id).indexOf(moment._id);
                    if (index > -1) {
                        this.selectedMoments.push(this.calendarService.calendarItems[index].moment);
                    } else {
                        console.log("Cannot find Activity in Calendar")
                    }
                }
                this.moreMediaOptions = false;
                await this.storage.set('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.selectedMoments); //store the unsent moment
            }
        } catch (err) {
            console.log(err);
            this.networkService.showNoNetworkAlert();
        }
    }

    recalculateScrollContent(){
        /*setTimeout(()=>{
            //this.content.resize();
            setTimeout(async () => {
                const scroll = await this.content.getScrollElement();
                const scrollDistance = this.moreOptions ? scroll.scrollTop + 186 : scroll.scrollTop - 186;
                this.content.scrollByPoint(0, scrollDistance, 5);
            }, 5);
        }, 5);*/
    }

    async resetBadge(conversationId, refreshMyConversations) {
        // set the badge count to 0
        let count = 0;
        const badge = this.chatService.currentChatProps && this.chatService.currentChatProps.length > this.propIndex && this.chatService.currentChatProps[this.propIndex].badge;
        if (this.networkService.hasNetwork && badge) {
            count = await this.chatService.resetBadgeCount(conversationId);
            this.chatService.currentChatProps[this.propIndex].badge = 0;
            if (refreshMyConversations) {
                this.userData.refreshMyConversations({action: 'reload', data: conversationId});
            }
            if (count) {
                if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                    this.badge.decrease(count);
                }
                if (this.electronService.isElectronApp) {
                    this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', (this.chatService.connectTabBadge > -1) ? this.chatService.connectTabBadge : 0);
                }
            }
        }
        return count;
    }


    async seeMoreInfo() {
        if (this.chatService.currentChatProps[this.propIndex].group) {
            if (this.modalPage) {
                const groupinfoModal = await this.modalCtrl.create({component: GroupinfoPage, componentProps: {modalPage: true}} );
                await groupinfoModal.present();
                const {data: refreshNeeded} = await groupinfoModal.onDidDismiss();
                if (refreshNeeded) {
                }
            } else {
                this.router.navigate(['/app/myconversations/group'], { skipLocationChange: true });
            }
        } else if (this.chatService.currentChatProps[this.propIndex].moment) {
            if (this.modalPage) {
                const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: {moment: { _id: this.chatService.currentChatProps[this.propIndex].moment._id}, modalPage: true}} );
                await modal.present();
                const {data: refreshNeeded} = await modal.onDidDismiss();
                if (refreshNeeded) {
                    this.closeModal(true);
                }
            } else {
                this.router.navigate(['/app/myconversations/activity/' + this.chatService.currentChatProps[this.propIndex].moment._id], { skipLocationChange: true });
            }
        } else {
            if (this.modalPage) {
                const recipientModal = await this.modalCtrl.create({
                    component: ShowrecipientinfoPage,
                    componentProps: {recipient: this.chatService.currentChatProps[this.propIndex].recipient, modalPage: true}} );
                await recipientModal.present();
                const {data: closeMessage} = await recipientModal.onDidDismiss();
                if (closeMessage) {
                    console.log("close modal");
                    setTimeout(() => {
                        this.closeModal(true);
                    }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                }
            } else {
                this.router.navigate(['/app/myconversations/person/' + this.chatService.currentChatProps[this.propIndex].recipient._id]);
            }
        }
    }


    async presentPopover(event) {
        event.stopPropagation();
        if (this.chatService.currentChatProps[this.propIndex].group) {
            const popover = await this.popoverCtrl.create({
                component: GroupPopoverPage,
                componentProps: {group: this.chatService.currentChatProps[this.propIndex].group},
                event: event,
                backdropDismiss: true,
                cssClass: 'level-15'});
            await popover.present();
            const {data: closeMessage} = await popover.onDidDismiss();
            if (closeMessage){
                console.log("close group modal");
                setTimeout(() => {
                    this.closeModal(true);
                }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
            }
        } else {
            this.seeMoreInfo();
        }
    }

    shareLocation() { //Shares current location with others in chat
        //Find the device's location
        this.geolocation.getCurrentPosition().then((position) => {

            let yourPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Geolocation Latitude is: " + yourPosition.lat + "Longitude is: " + yourPosition.lng);
            //this.updateMap(yourPosition);

            let matNum = [yourPosition.lat.toString(),yourPosition.lng.toString()];
            let matStr = ["https://maps.locationiq.com/v2/staticmap?key=pk.e5797fe100f9aa5732d5346f742b243f&center="+yourPosition.lat.toString()+","+yourPosition.lng.toString()+"&zoom=20&maptype=roadmap&markers=icon:%20large-red-cutout%20|"+yourPosition.lat.toString()+","+yourPosition.lng.toString()];
            this.resourceService.load('en-US', "Location").subscribe(async (result)=>{
                const serverData = {
                    comment: [''],
                    notifyAt: new Date().toISOString(),
                    matrix_string: matStr,
                    matrix_number: matNum,
                    conversation: this.chatService.currentChatProps[this.propIndex].conversationId,
                    resource: {}
                };
                serverData.resource = result[0]._id;
                const createdMoment: any = await this.momentService.create(serverData); //create feature
                createdMoment.resource = result[0]; // repopulate resource
                const index = this.chatService.conversations.map((c) => {return c.conversation._id;}).indexOf(this.chatService.currentChatProps[this.propIndex].conversationId);
                if (index > -1){
                    createdMoment.conversations = [this.chatService.conversations[index]];
                }
                await this.momentService.share(createdMoment);
            });

        }).catch(async (err) => {
            console.log('Error getting location', err);
            const networkAlert = await this.alertCtrl.create({
                header: 'Please enable Location Services',
                subHeader: 'This function runs best when location services are turned on for your device and this app. You can enable them in Settings',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
            return;
        });
    }

    async focusPhoto(object) {
        const modal = await this.modalCtrl.create({component: FocusPhotoPage, componentProps: {imageUri: object}});
        await modal.present();
    }

    focusText(){
        this.moreOptions = false;
    }

    async prepareToShareContactInfo(event) {
        event.stopPropagation();
        const result = await this.chatService.getConversationByRecipientId(this.chatService.currentChatProps[this.propIndex].recipient._id, false, null);
        let hasSharedContact = false;
        if (result.length){
            hasSharedContact = result[0].shareContactBy.indexOf(this.userData.user._id.toString()) > -1;
        }
        const recipientModal = await this.modalCtrl.create({component: ProfilePage, componentProps: { mode: hasSharedContact ? "cancel share" : "share", recipient: this.chatService.currentChatProps[this.propIndex].recipient, modalPage: true }} );
        await recipientModal.present();
        const {data: action} = await recipientModal.onDidDismiss();
        if (action === 'share') {
            const state = await this.chatService.shareContactInfo(this.chatService.currentChatProps[this.propIndex].conversationId); // return 0 if off, 1 if on
            if (state === 1) {await this.createContactMessage(1);}
        } else if (action === 'cancel share'){
            const state = await this.chatService.shareContactInfo(this.chatService.currentChatProps[this.propIndex].conversationId); // return 0 if off, 1 if on
            if (state === 0) {await this.createContactMessage(0);}
        }
        this.moreOptions = false;
        this.recalculateScrollContent();
    }

    async createContactMessage(state){
        try {
            this.resourceService.load('en-US', "Contact").subscribe(async (result) => {
                const serverData = {comment: [''], notifyAt: new Date().toISOString(), matrix_string: [['']], matrix_number: [[]], conversation: this.chatService.currentChatProps[this.propIndex].conversationId, resource: {} };
                serverData.resource = result[0]._id;
                serverData.matrix_number = [[state]];
                const createdMoment: any = await this.momentService.create(serverData); // create feature
                createdMoment.resource = result[0]; // repopulate resource
                const index = this.chatService.conversations.map((c) => c.conversation._id).indexOf(this.chatService.currentChatProps[this.propIndex].conversationId);
                if (index > -1){
                    createdMoment.conversations = [this.chatService.conversations[index]];
                }
                await this.momentService.share(createdMoment);
            });
        } catch (err) {
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet this.connection',
                subHeader: 'Please check your internet this.connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
            this.noNetwork = true;
            console.log(err);
        }
    }

    async seeUserInfo(event, recipient) {
        event.stopPropagation();
        if (recipient._id) {
            if (!this.modalPage && this.platform.width() >= 768) {
                this.router.navigate(['/app/myconversations/person/' + recipient._id], { replaceUrl: false });
            } else {
                const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: recipient, modalPage: true}} );
                await recipientModal.present();
                const {data: closeMessage} = await recipientModal.onDidDismiss();
                if (closeMessage) {
                    setTimeout(()=>{
                        this.closeModal(true);
                    }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                }
            }
        }
    }

    startVideoChat() {
        // only PWA needs to expand chat view. native app will show the native Jitsi view
        if (this.modalPage && !this.platform.is('cordova')) {
            this.expandChatView(true);
        } else {
            this.chatService.toggleVideoChat({
                videoChatRoomId: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId,
                videoChatRoomSubject: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].name,
                channelLastN: '6', // only the last 6 active dominate speakers' stream will be sent
                startWithAudioMuted: false,
                startWithVideoMuted: false
            });
        }
    }

    private async presentToast(text, duration) {
        this.audioToast = await this.toastCtrl.create({
            message: text,
            duration: duration,
            position: 'top'
        });
        this.audioToast.present();
    }

    private async expandChatView(startVideoChat) { // can only happen in the desktop view
        this.chatService.currentChatProps.push(this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]);
        this.closeModal(false);
        setTimeout(() => {
            this.router.navigate(['/app/myconversations/chat']);
            this.userData.refreshMyConversations({action: 'reload chat view'});
        }, 500);
        if (startVideoChat) {
            setTimeout(() => {
                this.chatService.toggleVideoChat({
                    videoChatRoomId: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId,
                    channelLastN: '6', // only the last 6 active dominate speakers' stream will be sent
                    startWithAudioMuted: false,
                    startWithVideoMuted: false
                });
            }, 1000);
        }
    }

    async removeMoment(i) {
        if (this.selectedMoments[i] && this.selectedMoments[i]._id && this.selectedMoments[i].type === 'new') {
            console.log("remove cloned Activity");
            this.removedMoments.push(this.selectedMoments[i]);
        }
        this.selectedMoments.splice(i, 1);
        await this.storage.set('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.selectedMoments); // store the unsent media
    }

    async removeMedia(i) {
        const url = JSON.parse(JSON.stringify(this.awsService.sessionAssets[i]));
        this.awsService.sessionAssets.splice(i, 1);
        await this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets); // store the unsent media
        this.awsService.removeFile(url);
    }

    incomingMessageHandler = async (message) => {
        if (message) {
            if (this.chatService.currentChatProps[this.propIndex] && message.conversationId === this.chatService.currentChatProps[this.propIndex].conversationId) {
                // if it is from another user
                if ((message.author && message.author._id !== this.userData.user._id) || message.author_pending_member) {
                    // if it is the start of a new day
                    if (new Date(this.messages[this.messages.length - 1].createdAt).toDateString !== new Date(message.createdAt).toDateString) {
                        this.messages.push({timestamp: true, createdAt: message.createdAt});
                    }
                    // if longer than 1 hours
                    else if (new Date(message.createdAt).getTime() - new Date(this.messages[this.messages.length - 1].createdAt).getTime() > 60 * 60 * 1000) {
                        this.messages.push({timestamp: true, createdAt: message.createdAt});
                    }
                    if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                        message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                    }
                    message.status = "confirmed";
                    // push message
                    this.messages.push(message);
                    if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                        // getting a new moment message that requires joining the socket, so refresh the chat
                        this.reloadChatView();
                    }
                    setTimeout(() => {
                        this.content.scrollToBottom(50);
                    }, 300);
                } else {
                    let fromAnotherDevice = true; // assume message comes from user's other devices
                    this.messages.forEach((existing_message) => {
                        if (message.confirmId && message.confirmId === existing_message.confirmId) {
                            if (message.body) {
                                existing_message.body = message.body; // take advantage of the autolinker done by the backend socketEvent.js
                            }
                            existing_message.status = "confirmed";
                            fromAnotherDevice = false; // if it is coming from the same device, flag it
                        }
                    });
                    if (fromAnotherDevice) { // if it is from another device, push the message to the chat this.room
                        if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                            message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                        }
                        message.status = "confirmed";
                        // push message
                        this.messages.push(message);
                        if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll'){
                            // getting a new moment message that requires joining the socket, so refresh the chat
                            this.reloadChatView();
                        }
                        setTimeout(() => {
                            this.content.scrollToBottom(50);
                        }, 300);
                    }
                }
            }
        }
    };

    refreshMomentHandler = async (momentId, data) => {
        this.messages.forEach( (message: any) => {
            if (message.moment && data.moment && (message.moment._id === data.moment._id) && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                const index = message.poll.responses.map((c) => c._id).indexOf(data.response._id);
                if (index < 0){ // if the response hasn't been added to the response list
                    message.poll.responses.push(data.response);
                } else { // if it has been added, replace with the incoming one
                    message.poll.responses.splice(index, 1, data.response);
                }
                // now the latest response have been included, reset the display array
                message.poll.display.forEach((displayitem) => {
                    displayitem.count = 0;
                    displayitem.votedByUser = false;
                });
                // reconstruct the display array
                message.poll.totalVoteCount = message.poll.responses.length;
                for (const response of message.poll.responses) {
                    if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                        if (response.matrix_number[0][1] > (message.poll.display.length - 1)) {
                            return; // if this response belongs to an option that has been deleted
                        }
                        if (response.user._id === this.userData.user._id) { // response.user is populated. Note: this is different from the responses loaded in loadMoreMessages, where the user is not populated
                            message.poll.display[response.matrix_number[0][1]].votedByUser = true;
                        }
                        message.poll.display[response.matrix_number[0][1]].count++;
                    }
                }
            }
            if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
            }
        });
    };

    // for current user refreshing the app, including when updating a selectedMoment which requires reloading the Moment using calendar data
    refreshUserStatusHandler = async (data) => {
        for (let selectedMoment of this.selectedMoments) {
            const index = this.calendarService.calendarItems.map((c) => c.moment ? c.moment._id : '').indexOf(selectedMoment._id);
            if (index > -1) {
                console.log("updating moments 2...", this.calendarService.calendarItems[index].moment.matrix_string[0][0])
                selectedMoment = this.calendarService.calendarItems[index].moment;
            } else {
                console.log("updating moments 3...")
            }
        }
    };

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    destroyPlayers(mediaId) {
        if (mediaId) {
            let media = this.mediaList.find((c) => {return c._id === mediaId});
            media.player.destroy();
        } else {
            for (const media of this.mediaList) {
                media.player.destroy();
            }
        }
    }

    // close modal should only be execute by a Modal Page, since Chat is always embedded in the Myconversations page in Desktop view
    async closeModal(refreshNeeded) {
        try {
            await this.cleanup(false);
            //  clean up the chat props
            this.chatService.currentChatProps.pop(); // pop the current chat props. Once that is done, currentChatProps can't be referenced again in the code below. Use currentChatId

            if (this.modalPage) {
                this.modalCtrl.dismiss(refreshNeeded);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
        // execute when group-tab is exited
        this.subscriptions['refreshMyConversations'].unsubscribe(this.reloadHandler);
        this.events.unsubscribe('refreshMoment', this.refreshMomentHandler);
        // when a new message comes in via socket.io
        this.subscriptions['chatMessage'].unsubscribe(this.incomingMessageHandler);
        this.events.unsubscribe('closeGroupView', this.closeGroupChatHandler);
    }
}
