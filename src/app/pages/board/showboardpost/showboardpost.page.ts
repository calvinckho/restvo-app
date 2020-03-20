import {Component, ElementRef, OnInit, Input, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {Storage} from '@ionic/storage';
import { Plyr } from "plyr";

import {
    IonContent,
    ActionSheetController,
    AlertController,
    Platform,
    ModalController, IonSlides,
} from '@ionic/angular';
import { Aws } from "../../../services/aws.service";
import { Chat } from "../../../services/chat.service";
import { NetworkService } from "../../../services/network-service.service";
import { UserData } from "../../../services/user.service";
import { Resource } from '../../../services/resource.service';
import { Moment } from '../../../services/moment.service';
import { Response } from '../../../services/response.service';
import { Board } from '../../../services/board.service'
import {EditboardpostPage} from "../editboardpost/editboardpost.page";
import {PickfeaturePopoverPage} from "../../feature/pickfeature-popover/pickfeature-popover.page";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {FocusPhotoPage} from '../../connect/focus-photo/focus-photo.page';
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";

@Component({
  selector: 'app-showboardpost',
  templateUrl: './showboardpost.page.html',
  styleUrls: ['./showboardpost.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowboardpostPage implements OnInit, OnDestroy {
    @ViewChild(IonContent) content: IonContent;
    @ViewChild('textArea') textArea: ElementRef;
    @ViewChild(IonSlides) slides: IonSlides;

    @Input() boardId: any;
    @Input() isGroupLeader: boolean;
    @Input() hasAdminAccess: boolean;
    @Input() post: any;
    resource = { "en-US": { matrix_string: [[''], [''], [''], ['']] }};
    moment: any;
    moreOptions = false;
    loadCompleted: boolean = false;
    anyChangeMade: boolean = false;
    composedComment: string = '';
    selectParentTag: boolean = false;
    parent: any;
    player: Plyr;

    subscriptions: any = {};

    constructor(
        private storage: Storage,
        private cache: CacheService,
        private geolocation: Geolocation,
        public platform: Platform,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private awsService: Aws,
        public userData: UserData,
        private networkService: NetworkService,
        private resourceService: Resource,
        public momentService: Moment,
        private responseService: Response,
        private boardService: Board,
        private chatService: Chat,
        public modalCtrl: ModalController) {}

  async ngOnInit() {
      this.parent = this.post;
      this.loadCompleted = false;
      let loadResource = this.resourceService.load('en-US', "Board");
      let resource = this.cache.loadFromDelayedObservable('loadResource: Board', loadResource, 'resource', 3600, 'none');
      resource.subscribe(result => {
          this.resource = result[0];
      }, async (err) => {
          const networkAlert = await this.alertCtrl.create({
              header: 'No Internet Connection',
              subHeader: 'Please check your internet connection.',
              buttons: ['Dismiss'],
              cssClass: 'level-15'
          });
          await networkAlert.present();
      });
      this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshBoardHandler);
      this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
  }

    async ionViewWillEnter() {
        this.loadPost();
    }

    refreshBoardHandler = async (res) => {
        if (res && res.type === 'refresh board' && res.boardId === this.boardId){
            const data = res.data;
            if (data.action === 'like' || data.action === 'cancel like') {
                if (this.post.bucketId === data.bucketId && this.post._id === data.postId) {
                    if (data.action === 'like') {
                        this.post.likes.push(data.author);
                    } else if (data.action === 'cancel like') {
                        let index = this.post.likes.indexOf(data.author);
                        this.post.likes.splice(index, 1);
                    }
                }
            } else if (data.action === 'update post') {
                if (this.post.bucketId === data.post.bucketId && this.post._id === data.post._id) {
                    //just update the body and attachments
                    this.post.body = data.post.body;
                    this.post.attachments = data.post.attachments;
                    if (this.post.media && this.post.media.length && data.post.media && !data.post.media.length) {
                        if (this.player) this.player.destroy();
                    }
                    this.post.media = data.post.media;
                    if (data.post.moments && data.post.moments[0] && data.post.moments[0].resource.hasOwnProperty('en-US') && data.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                        this.loadPost(); //reload is needed to create a new moment socket.io for the feature
                    } else {
                        this.post.moments = data.post.moments;
                    }
                }
                if (data.post.comments && data.post.comments.length && data.post.comments[0]){
                    this.loadPost();
                }
            } else if (data.action === 'delete post') {
                if (this.post.bucketId === data.bucketId && this.post._id === data.postId) {
                    //just update the body and attachments
                    if (this.player) this.player.destroy();
                    this.modalCtrl.dismiss();
                }
            } else if (data.action === 'create comment') {
                if (this.post._id === data.comment.parentId) { //first level comment
                    let fromAnotherDevice = true; //assume message comes from user's other devices
                    for (let comment of this.post.comments){
                        if (comment.confirmId === data.comment.confirmId){
                            comment.status = 'confirmed';
                            fromAnotherDevice = false;
                        }
                    }
                    if (fromAnotherDevice){
                        data.comment.status = 'confirmed';
                        this.post.comments.unshift(data.comment);
                    }
                }
            }
        }
    };

    refreshMomentHandler = async (res) => {
        if (res && res.momentId && res.data) {
            const data = res.data;
            if (this.post.moments && (this.post.moments[0]._id === data.moment._id) && this.post.moments[0].resource.hasOwnProperty('en-US') && this.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                const index = this.post.poll.responses.map((c) => c._id).indexOf(data.response._id);
                if (index < 0){ //if the response hasn't been added to the response list
                    this.post.poll.responses.push(data.response);
                } else { //if it has been added, replace with the incoming one
                    this.post.poll.responses.splice(index, 1, data.response);
                }
                //now the latest response have been included, reset the display array
                await this.post.poll.display.forEach((displayitem) => {
                    displayitem.count = 0;
                    displayitem.votedByUser = false;
                });
                //reconstruct the display array
                this.post.poll.totalVoteCount = this.post.poll.responses.length;
                for (let response of this.post.poll.responses) {
                    if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                        if (response.matrix_number[0][1] > (this.post.poll.display.length - 1)) {
                            return; // if this response belongs to an option that has been deleted
                        }
                        if (response.user._id === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                            this.post.poll.display[response.matrix_number[0][1]].votedByUser = true;
                        }
                        this.post.poll.display[response.matrix_number[0][1]].count++;
                    }
                }
            }
        }

    };

    async loadPost(){
        this.post = await this.boardService.loadBoardBucket(this.post.bucketId, this.post._id);
        const momentIds = [];
        if (this.post.moments && this.post.moments.length && this.post.moments[0].resource && this.post.moments[0].resource.hasOwnProperty('en-US') && this.post.moments[0].resource['en-US'].value[0] === 'Poll') {
            momentIds.push(this.post.moments[0]._id);
            this.post.poll = {
                display: [],
                responses: [],   //list of all of the responses that users give.
                winner: [],      //list of the highest vote count indexes
                totalVoteCount: 0
            };
            for (let option of this.post.moments[0].matrix_string[1]) {
                this.post.poll.display.push({option: option, votedByUser: false, count: 0});
            }
        }
        if (momentIds.length){
            momentIds.forEach((momentId)=>{
                this.momentService.socket.emit('join moment', momentId) ;
            });
            let responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
            let responseResponse = this.cache.loadFromDelayedObservable('response-' + this.boardId, responseRequest, 'boards', 5, 'all');
            responseResponse.subscribe(async (responses) => {
                if (this.post.moments[0] && this.post.moments[0].resource && this.post.moments[0].resource.hasOwnProperty('en-US') && this.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                    for (let response of responses) {
                        if (response.moment === this.post.moments[0]._id) {
                            const index = this.post.poll.responses.map((c) => c._id).indexOf(response._id);
                            if (index < 0) { //if the response hasn't been added to the response list
                                this.post.poll.responses.push(response);
                            } else { //if it has been added, and if the incoming response is newer
                                if (new Date(this.post.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                    this.post.poll.responses.splice(index, 1, response);
                                }
                            }
                        }
                    }
                    //now the latest response have been included, reset the display array
                    await this.post.poll.display.forEach((displayitem) => {
                        displayitem.count = 0;
                        displayitem.votedByUser = false;
                    });
                    //reconstruct the display array
                    this.post.poll.totalVoteCount = this.post.poll.responses.length;
                    for (let response of this.post.poll.responses) {
                        if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                            if (response.matrix_number[0][1] > (this.post.poll.display.length - 1)) {
                                return; // if this response belongs to an option that has been deleted
                            }
                            if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                this.post.poll.display[response.matrix_number[0][1]].votedByUser = true;
                            }
                            this.post.poll.display[response.matrix_number[0][1]].count++;
                        }
                    }
                }
            });
        }
        this.loadCompleted = true;
    }

    async presentPickPeoplePopover(event) {
        event.stopPropagation();
        const alert = await this.alertCtrl.create({
            header: 'Sharing is Coming Soon',
            subHeader: 'This feature will be available in a future release.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    //end of UI functions
    async takePhotoAndUpload() {
        const { Camera } = Plugins;
        const image = await Camera.getPhoto({
            quality: 60,
            width: 1280,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            correctOrientation: false
        });
        const result: any = await this.awsService.uploadImage('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, image);
        if (result === "Upload succeeded") {
            this.sendAttachments();
        }
    }

    async selectPhotoFromDeviceAndUpload(event) {
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
                result = await this.awsService.uploadImage('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, image);
            } else {
                const compressed = await this.awsService.compressPhoto(event.target.files[0]);
                result = await this.awsService.uploadFile('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, compressed);
            }
            if (result === "Upload succeeded") {
                this.sendAttachments();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async selectFileFromDeviceAndUpload(event) {
        try {
            const result = await this.awsService.uploadFile('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, event.target.files[0]);
            console.log("result", result);
            if (result === "Upload succeeded") {
                this.sendAttachments();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async pickFeatureModalPage(event, typeOfMoment){
        try{
            const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Choose from Library'}});
            await modal.present();
            const {data: moments} = await modal.onDidDismiss();
            if (moments && moments.length) {
                this.moreOptions = false;
                if (moments[0].resource.hasOwnProperty('en-US') && moments[0].resource['en-US'].value[0] === 'Poll') {
                    this.momentService.socket.emit('join moment', moments[0]._id); //join the moment socket.io to receive real-time update for voting
                }
                this.moment = moments[0];
                this.composedComment = "Restvo Feature: " + moments[0].matrix_string[0][0];
                this.moreOptions = false;
            }
        } catch (err) {
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                subHeader: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    shareLocation() { //Shares current location with others in chat

        console.log("load current location...");
        //Find the device's location
        this.geolocation.getCurrentPosition().then((position) => {

            console.log("geolocation returning results...");
            let yourPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Geolocation Latitude is: " + yourPosition.lat + "Longitude is: " + yourPosition.lng);
            //this.updateMap(yourPosition);

            this.composedComment += (this.composedComment.length ? " " : '') + "https://www.google.com/maps/search/?api=1&query=" + yourPosition.lat + "+%2C" + yourPosition.lng;

        }).catch((err)=>{
            console.log('Error getting location', err);
        });
    }

    async seeUserInfo(event, recipient) {
        event.stopPropagation();
        const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: recipient, modalPage: true}} );
        await recipientModal.present();
    }

    async openRestvoFeature(event, moment) { //when tap on a Restvo feature
        event.stopPropagation();
        const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: {moment: moment, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
            this.loadPost();
            this.anyChangeMade = true;
        }
    }

    selectParentToReply(parent) { //when the reply button is pressed
        this.selectParentTag = true;
        this.parent = parent;
        console.log("parent", parent);
    }

    closeSelectParent(){
        this.selectParentTag = false;
        this.parent = {};
    }

    async likePost(event){
        event.stopPropagation();
        let action = (this.post.likes.indexOf(this.userData.user._id) > -1) ? "cancel like" : "like";
        await this.boardService.likePost(this.boardId, this.post.bucketId, this.post._id, action);
        //this.reloadBoard();
    }

    async sendComment(){
        try {
            let socketData = {
                bucketId: this.post.bucketId,
                parentId: this.selectParentTag ? this.parent._id : this.post._id,
                body: this.composedComment,
                //moment: this.moment,
                author: {
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                },
                status: 'pending',
                confirmId: Math.random()
            };
            let serverData = {
                bucketId: this.post.bucketId,
                parentId: this.selectParentTag ? this.parent._id : this.post._id,
                body: this.composedComment,
                author: this.userData.user._id
            };
            if (this.post._id === this.parent._id) {
                this.post.comments.unshift(socketData);
                this.composedComment = '';
                setTimeout(() => {
                    this.content.scrollToTop(50);
                }, 50);
            }
            let result = await this.boardService.createComment(this.boardId, serverData, socketData);
            if(result === 'success'){
                this.anyChangeMade = true;
            }
        } catch (err){
            console.log(err);
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                subHeader: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    async sendAttachments() { //when attach button is pushed
        try {
            let socketData = {
                bucketId: this.post.bucketId,
                parentId: this.selectParentTag ? this.parent._id : this.post._id,
                attachments: [this.awsService.url],
                createdAt: new Date(),
                author: {
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                }
            };
            let serverData = {
                bucketId: this.post.bucketId,
                parentId: this.selectParentTag ? this.parent._id : this.post._id,
                attachments: [this.awsService.url],
                author: this.userData.user._id
            };
            if (this.post._id === this.parent._id) {
                this.post.comments.unshift(socketData);
                this.awsService.url = '';
                setTimeout(() => {
                    this.content.scrollToTop(50);
                }, 50);
            }
            let result = await this.boardService.createComment(this.boardId, serverData, socketData);
            if(result === 'success'){
                this.anyChangeMade = true;
            }
        } catch (err) {
            console.log("reply to conversation failed");
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                subHeader: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    async reportPost() {
        if (this.post.status === 'review') {
            await this.boardService.updatePost(this.boardId, this.post);
            const message = await this.alertCtrl.create({
                header: "Post is under Review", // this post has been reported
                message: "Someone has already submitted a report about this post. We will take the necessary actions which may lead to deleting of this post and the suspension of its author.",
                buttons: [{text: 'Close'}],
                cssClass: 'level-15'
            });
            await message.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: "Report Post", //report post
                message: "You are about to report this post for a violation of our terms of use. Are you sure to proceed?", //are you sure you want to delete this post
                buttons: [{ text: 'Ok',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            this.post.status = 'review';
                            console.log("report", this.boardId, this.post);
                            await this.boardService.updatePost(this.boardId, this.post);
                            const message = await this.alertCtrl.create({
                                header: "Report Received", //delete post
                                message: "We will take the necessary actions which may lead to deleting of this post and the suspension of its author.",
                                buttons: [{text: 'Close'}],
                                cssClass: 'level-15'
                            });
                            await message.present();
                        });
                    }},
                    { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async reinstatePost() {
        const alert = await this.alertCtrl.create({
            header: "Cancel Abuse Report", //reinstate post
            message: "You are about to cancel a violation report submitted by a user, Are you sure to proceed?",
            buttons: [{ text: 'Ok',
                handler: () => {
                    let navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        this.post.status = 'restored';
                        await this.boardService.updatePost(this.boardId, this.post);
                        const message = await this.alertCtrl.create({
                            header: "User Report Removed", //restore
                            message: "This post will not be marked for review. Restvo reserves the right to investigate its content and take actions if necessary.",
                            buttons: [{text: 'Close'}],
                            cssClass: 'level-15'
                        });
                        await message.present();
                    });
                }},
                { text: 'Cancel' },
            ],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async editPost() {
        const modal = await this.modalCtrl.create({component: EditboardpostPage, componentProps: {boardId: this.boardId, post: this.post}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        //event is an a moment object see server/models/moment.js
        //event contains a resource with info on the event see server/models/resource.js
        if (refreshNeeded) {
            //this.loadPost();
            this.anyChangeMade = true;
        }
    }

    async deletePost() {
        const alert = await this.alertCtrl.create({
            header: this.resource['en-US'].matrix_string[0][10] + ' ' + this.resource['en-US'].matrix_string[0][2], //delete post
            message: this.resource['en-US'].matrix_string[0][11], //are you sure you want to delete this post
            buttons: [{ text: 'Ok',
                handler: () => {
                    let navTransition = alert.dismiss();
                    navTransition.then(async () => {
                        //Remove group from user-data and group collections
                        await this.boardService.deletePost(this.boardId, this.post.bucketId, this.post._id);
                        if (this.post.attachments && this.post.attachments.length && this.post.attachments[0]){
                            await this.awsService.removeFile(this.post.attachments[0]);
                            this.post.attachments.splice(0, 1);
                        }
                        if (this.player) this.player.destroy();
                        this.modalCtrl.dismiss(true);
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async sharePost(conversations){
        if (conversations.length){
            //let result = await this.boardService.updatePost(this.post);
            try {
                this.post.resource = this.resource; //populate moment before emitting
                conversations.forEach((obj) => {
                    this.chatService.sendReply(obj.conversation._id, {
                        post: this.post._id,
                        page: obj.conversation.type === 'connect' ? "MessagePage" : "GroupmessagePage",
                        groupId: obj.conversation.type === 'connect' ? null : obj.conversation.group._id,
                        groupName: obj.conversation.type === 'connect' ? null : obj.conversation.group.name
                    }, {
                        conversationId: obj.conversation._id,
                        post: this.post,
                        createdAt: new Date(),
                        author: {
                            _id: this.userData.user._id,
                            first_name: this.userData.user.first_name,
                            last_name: this.userData.user.last_name,
                            avatar: this.userData.user.avatar
                        },
                        status: "pending",
                        confirmId: Math.random()
                    });
                });
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    message: 'Your post has been successfully shared.',
                    buttons: [{ text: 'Ok' }],
                    cssClass: 'level-15'
                });
                await alert.present();
            } catch (err) {
                console.log(err);
            }
        }
    }

    async focusPhoto(event, object) {
        const modal = await this.modalCtrl.create({component: FocusPhotoPage, componentProps: {imageUri: object}});
        await modal.present();
    }

    messageMoreOptions() {
        this.moreOptions = !this.moreOptions; //updating to the new state
        setTimeout(async () => {
            const scroll = await this.content.getScrollElement();
            const scrollDistance = this.moreOptions ? scroll.scrollTop + 186 : scroll.scrollTop - 186;
            this.content.scrollByPoint(0, scrollDistance, 5);
        }, 5);
    }

    async openActionSheet(event) {
        event.stopPropagation();
        let buttons = [];
        if (this.post.status !== 'suspended') {
            if (this.post.status === 'review' && (this.hasAdminAccess || this.isGroupLeader) && this.post.author._id !== this.userData.user._id){
                buttons.unshift({
                    text: 'Remove Abuse Report',
                    handler: () => {
                        this.reinstatePost();
                    }
                });
            } else {
                buttons.unshift({
                    text: 'Report Post',
                    handler: () => {
                        this.reportPost();
                    }
                });
            }
        }
        if (this.hasAdminAccess || this.isGroupLeader || this.post.author._id === this.userData.user._id) {
            buttons.unshift({
                text: 'Delete Post',
                handler: () => {
                    this.deletePost();
                }
            });
            buttons.unshift({
                text: 'Edit Post',
                handler: () => {
                    this.editPost();
                }
            });
        }
        let actionSheet = await this.actionSheetCtrl.create({
            header: buttons.length > 1 ? "Actions" : "Action",
            buttons: buttons,
            cssClass: 'level-15'});
        await actionSheet.present();
    }

    closeModal() {
        if (this.player) this.player.destroy();
        this.modalCtrl.dismiss(this.anyChangeMade);
    }

    displayTimeElapsed(dateTime) {
        let minElapsed = Math.round((new Date().getTime() - new Date(dateTime).getTime())/(1000 * 60));
        if (minElapsed < 60) {
            return minElapsed.toString() + 'm ago';
        } else if (minElapsed >= 60 && minElapsed < (60 * 24)){
            return Math.round(minElapsed/60).toString() + 'h ago';
        } else if (minElapsed >= (60 * 24) && minElapsed < (60 * 24 * 6)){
            return Math.round(minElapsed/(60*24)).toString() + 'd ago';
        } else if (minElapsed >= (60 * 24 * 6) && minElapsed < (60 * 24 * 30)){
            return Math.round(minElapsed/(60*24*7)).toString() + 'wk ago';
        } else {
            return Math.round(minElapsed/(60*24*30)).toString() + 'mo ago';
        }
    }

    videoError(event) {
        console.log('plyr error', event);
    }

    async noNetworkConnection(){
        const networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            subHeader: 'Please check your internet connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }

    ngOnDestroy(){
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshBoardHandler);
        this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
    }
}
