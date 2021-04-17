import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { ElectronService } from 'ngx-electron';
import {Storage} from '@ionic/storage';
import { Badge } from '@ionic-native/badge/ngx';
import {ActionSheetController, IonContent, NavController, ModalController, Platform} from '@ionic/angular';
import {UserData} from '../../../services/user.service';
import {Chat} from '../../../services/chat.service';
import {ShowrecipientinfoPage} from '../showrecipientinfo/showrecipientinfo.page';
import {CreatechatPage} from '../createchat/createchat.page';
import {GroupchatPage} from '../groupchat/groupchat.page';

@Component({
  selector: 'app-myconversations',
  templateUrl: './myconversations.page.html',
  styleUrls: ['./myconversations.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyconversationsPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild('searchBar', {static: false}) searchBar ;

    datas: any = [];
    loading: any;
    ionSpinner = false;
    noConversationLoaded = true;
    searchKeyword = '';
    finishedLoading = false;
    recipient: any = {};
    moreOptions = false;
    subscriptions: any = [];

    constructor(
        private zone: NgZone,
        private router: Router,
        private electronService: ElectronService,
        private storage: Storage,
        private badge: Badge,
        private navCtrl: NavController,
        public platform: Platform,
        private actionSheetCtrl: ActionSheetController,
        private modalCtrl: ModalController,
        public userData: UserData,
        public chatService: Chat) {
    }

    async ngOnInit() {
        // listen to the event when a new message comes in via socket.io
        this.subscriptions['chatMessage'] = this.chatService.chatMessage$.subscribe(this.incomingMessageHandler);
        this.subscriptions['refreshMyConversations'] = this.userData.refreshMyConversations$.subscribe(this.refreshPageHandler);
    }

    async ionViewWillEnter() {
        // after user data is loaded from storage, load conversations
        if (this.userData && this.userData.user && this.userData.user.churches) {
            this.renderConversations();
            console.log('saving tab');
            this.storage.set('lastVisitedTab', 'chat');
        }
    }

    // event listener when the page needs to be refreshed or re-rendered
    refreshPageHandler = async (data) => {
        if (data) {
            if (data.action === 'reload' && data.conversationId === 'all') { // e.g. a user joins or leaves a group
                await this.loadMyConversations(true);
            } else if (data.action === 'reload' && data.conversationId) { // conversation Id that needs to be zeroed
                this.datas.forEach((obj: any) => {
                    if (data.conversationId === obj.conversation._id) {
                        obj.data.badge = 0;
                    }
                });
                await this.chatService.refreshTabBadges();
                await this.renderConversations();
            } else if (data.action === 'render') { // e.g. socket.io event informing change in online status
                await this.renderConversations();
            }
        }
    }

    async loadMyConversations(ionSpinner) {
        if (ionSpinner) {
            this.ionSpinner = true;
        }
        await this.chatService.refreshTabBadges();
        this.ionSpinner = false;
        await this.renderConversations();
        return;
    }

    async renderConversations() {
        this.datas = [];
        const listOfChurchIds = this.userData.user.churches.map((c) => c._id );
        this.chatService.conversations.forEach((obj: any) => {
            // Friends
            if (obj.conversation.type === 'connect') {
                this.noConversationLoaded = false;
                if (obj.data.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    this.datas.push(obj); // push the conversation object into an array
                }
            } else if (obj.conversation.group && obj.conversation.group.churchId && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === obj.conversation.group.churchId || this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                this.noConversationLoaded = false;
                if (obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    this.datas.push(obj); // push the conversation object into an array
                }
            } else if (obj.conversation.group && !obj.conversation.group.churchId && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                this.noConversationLoaded = false;
                if (obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    this.datas.push(obj); // push the conversation object into an array
                }
            } else if (obj.conversation.group && listOfChurchIds.indexOf(obj.conversation.group.churchId) === -1 && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                this.noConversationLoaded = false;
                if (obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    this.datas.push(obj); // push the conversation object into an array
                }
            } else if (obj.conversation.moment && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                this.noConversationLoaded = false;
                if (obj.data.name && obj.data.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    this.datas.push(obj); // push the conversation object into an array
                }
            }
            if (obj.message && Object.keys(obj.message).length > 0) {
                obj.message.preview = ((obj.message.author === this.userData.user._id) ? 'You: ' : '') + (obj.message.body || '') + ((obj.message.moment && obj.message.moment.resource) ? obj.message.moment.resource['en-US'].value[0] : '') + (obj.message.attachments && obj.message.attachments.length ? '📁' : '');
            }
        });
        this.sortConversations(this.datas);
        // load the chat room when initiating in wide screen view
        if (!this.chatService.currentChatProps.length && this.platform.width() >= 768 && this.datas.length) {
            this.pushToMessagePage(null, this.datas[0]);
        }
        this.finishedLoading = true;
    }

    sortConversations(datas) {
        datas.forEach((obj, index) => { // to do a stable sort, first remember the order
            obj.order = index;
        });
        datas.sort((a, b) => {
            const badge_diff = b.data.badge - a.data.badge;
            if (badge_diff !== 0) {
                return badge_diff; // only sort when there is an actual difference
            } else {
                return a.order - b.order; // preserve the order
            }
        });
    }

    async pushToMessagePage(event, object) {
        if (event) { event.stopPropagation(); }
        let chatObj;
        if (object.conversation.type === 'connect') {
            chatObj = {
                conversationId: object.conversation._id,
                name: object.data.name,
                recipient: object.data.participant,
                page: 'chat',
                badge: object.data.badge,
                modalPage: this.platform.width() < 768
            };
        } else if (object.conversation.type === 'group') {
            chatObj = {
                conversationId: object.conversation.group.conversation,
                name: object.conversation.group.name,
                group: object.conversation.group,
                page: 'chat',
                badge: object.data.badge,
                modalPage: this.platform.width() < 768
            };
        } else if (object.conversation.type === 'moment') {
            chatObj = {
                conversationId: object.conversation._id,
                name: object.data.name,
                moment: object.conversation.moment,
                page: 'chat',
                badge: object.data.badge,
                modalPage: this.platform.width() < 768
            };
        }
        this.chatService.currentChatProps.push(chatObj);
        if (this.platform.width() >= 768) {
            // when clicking on a conversation, if it is displaying the group info, it will force it to get back to the chat view
            this.router.navigate(['/app/myconversations/chat'], { skipLocationChange: true });
            // if it is displaying the chat view, it will reload the chat data
            this.userData.refreshMyConversations({action: 'reload chat view'});
        } else {
            const groupPage = await this.modalCtrl.create({
                component: GroupchatPage,
                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
            });
            await groupPage.present();
        }
        if (this.electronService.isElectronApp) { // since electron doesn't detect appStateChange, manually refreshTabBadges at every pushToMessage()
            this.chatService.refreshTabBadges();
        }
        // reorder the list
        this.searchKeyword = '';
        object.data.badge = 0;
    }

    async seeUserInfo(event, object) {
        event.stopPropagation();
        object.data.participant.name = `${object.data.participant.first_name} ${object.data.participant.last_name}`;
        if (this.platform.width() >= 768) {
            this.router.navigate(['/app/myconversations/person/' + object.data.participant._id], { replaceUrl: true });
        } else {
            const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: object.data.participant, modalPage: true}});
            await recipientModal.present();
            const {data: refreshNeeded} = await recipientModal.onDidDismiss();
            if (refreshNeeded) {
                this.loadMyConversations(true);
            }
        }
    }

    executeSearch(event) {
        event.stopPropagation();
        this.renderConversations();
    }

    cancelSearch(event) {
        event.stopPropagation();
        this.searchKeyword = '';
        this.renderConversations();
    }

    togglePushNotification(event, type, obj) {
        event.stopPropagation();
        if (obj.data.pushNotification === 'all') {
            obj.data.pushNotification = (type === 'group' || type === 'moment') ? 'leaders-only' : 'none';
        } else if (obj.data.pushNotification === 'leaders-only') {
            obj.data.pushNotification = 'none';
        } else {
            obj.data.pushNotification = 'all';
        }
        this.chatService.togglePushNotification(obj.conversation._id, obj.data.pushNotification)
            .then((result) => {}, (err) => {
                console.log('not allowed', err);
            });
    }

    // get the latest user data from the server
    async refresh(event) {
        this.ionSpinner = true;
        this.datas = [];
        await this.userData.load();
        await this.storage.remove('conversations');
        this.loadMyConversations(true);
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    async moreOption() {
        this.moreOptions = !this.moreOptions;
    }

    async createNewChat() {
        const createChatPage = await this.modalCtrl.create({component: CreatechatPage});
        await createChatPage.present();
        const {data: refreshNeeded} = await createChatPage.onDidDismiss();
        if (refreshNeeded) {
            this.loadMyConversations(true);
        }
    }

    async requestPushNotificationPermission(event) {
        event.stopPropagation();
        const result = await this.userData.checkPushNotification(); // if success, will send an event to refresh the userData.user
        if (result) {
            this.dismissEnablePushNotification();
        }
    }

    async pressImportContactList(event) {
        event.stopPropagation();
        const result: any = await this.userData.toggleImportContactList(true);
        if (result) {
            this.dismissImportContactList();
        }
    }

    async dismissEnablePushNotification() {
        this.userData.delayPushNotificationReminder = 100;
        await this.storage.set('delayPushNotificationReminder', 100);
    }

    async dismissImportContactList() {
        this.userData.delayImportContactListReminder = 100;
        await this.storage.set('delayImportContactListReminder', 100);
    }


    // triggered when there is an incoming message from socket.io
    incomingMessageHandler = async (message) => {
        if (message) {
            this.zone.run(async() => {
                const data = this.chatService.conversations.find((c) => c.conversation._id === message.conversationId);
                if (data) {
                    if (message.author._id !== this.userData.user._id) { // incrementing the badges if incoming message is received from another user
                        data.data.badge++;
                    }
                    data.message = JSON.parse(JSON.stringify(message)); // exact copy to avoid updating the referenced object
                    data.message.author = data.message.author._id; // depopulate the author from socket.io
                    data.message.preview = ((data.message.author === this.userData.user._id) ? 'You: ' : '') + (data.message.body || '') + ((data.message.moment && data.message.moment.resource) ? data.message.moment.resource['en-US'].matrix_string[0][0] : '') + (((data.message.body && data.message.body.length) || data.message.moment) ? '' : '📁');
                    data.conversation.updatedAt = new Date().toISOString(); // update the latest updated conversation for caching of the lastUpdatedDate
                }
                this.renderConversations();
            });
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions['chatMessage'].unsubscribe(this.incomingMessageHandler);
        this.subscriptions['refreshMyConversations'].unsubscribe(this.incomingMessageHandler);
    }
}
