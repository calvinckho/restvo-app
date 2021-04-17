import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActionSheetController, AlertController, LoadingController, ModalController} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Chat } from "../../../services/chat.service";
import { Churches } from '../../../services/church.service';
import { NetworkService } from "../../../services/network-service.service";
import { Resource } from '../../../services/resource.service';
import { Moment } from '../../../services/moment.service';
import { UserData } from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";
import {PickfeaturePopoverPage} from "../../feature/pickfeature-popover/pickfeature-popover.page";

@Component({
  selector: 'app-showrecipientinfo',
  templateUrl: './showrecipientinfo.page.html',
  styleUrls: ['./showrecipientinfo.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowrecipientinfoPage implements OnInit {

    @Input() modalPage: any; // optional: when initialing a modal page
    @Input() recipient: any = { _id: '', first_name: '', last_name: '', role: '', avatar: '' };
    @Input() programId: any; // optional, if a program context is provided

    subpanel = false;
    subscriptions: any = {};
    loading: any;
    result: any = [];
    isConnected: boolean = false;
    isBlocked: boolean = false;
    userHasSharedContact: boolean = false;
    recipientHasSharedContact: boolean = false;
    community: any = {};
    conversation: any;
    appUserIsAdmin: boolean;
    anyChangeMade: boolean = false;
    loadCompleted: boolean = false;
    awaitUserInput = false;
    manageMode = false;
    selectedProgram = '';

    constructor(
                public storage: Storage,
                private location: Location,
                public router: Router,
                private route: ActivatedRoute,
                private actionSheetCtrl: ActionSheetController,
                public alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private callNumber: CallNumber,
                public userData: UserData,
                public networkService: NetworkService,
                public resourceService: Resource,
                public momentService: Moment,
                public chatService: Chat,
                public modalCtrl: ModalController,
                public churchService: Churches) {
    }

    ngOnInit() {
        this.subpanel = !!this.route.snapshot.paramMap.get('subpanel');
        if (this.userData.hasPlatformAdminAccess){
            this.setToggle();
        }
        this.manageMode = this.recipient.wee_user;
        this.recipient._id = this.recipient._id || this.route.snapshot.paramMap.get('id');
        // link refreshUserStatus Observable with refresh handler. It fires on page loads and subsequent user status refresh
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = () => {
        if (this.recipient._id) {
            if (!this.userData.user || (this.recipient && ((this.recipient.role === 'Contact') || (this.recipient.role === 'Pending')))) {
                this.loadCompleted = true;
            } else {
                this.checkConnection();
            }
        }
    };

    async checkConnection(){
        this.result = await this.chatService.getConversationByRecipientId(this.recipient._id, true, this.programId); // API-controlled recipient info access permission
        if (this.result && this.result.recipient) {
            this.recipient = this.result.recipient;
        }
        this.isConnected = !!this.result.conversation;
        if (this.isConnected) { // if user is connected && not in manage Mode
            this.isBlocked = this.result.conversation.blockedBy === this.userData.user._id;
            this.userHasSharedContact = this.result.conversation.shareContactBy.indexOf(this.userData.user._id.toString()) > -1;
            this.recipientHasSharedContact = this.result.conversation.shareContactBy.indexOf(this.recipient._id.toString()) > -1;
        }
        if (this.result.programs) {
            for (const program of this.result.programs) {
                for (const leader of program.leader) {
                    if (leader.role) {
                        this.recipient.role = leader.role;
                    }
                }
                if (program._id !== '5d5785b462489003817fee18' && !this.selectedProgram) {
                    this.selectedProgram = program._id;
                }
            }
        }
        this.loadCompleted = true;
    }

    async setToggle() {
        [this.community] = await this.churchService.loadChurchProfile(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
        // check if the selected member is an admin
        const adminIds = this.community.admins.map((c) => c._id);
        this.appUserIsAdmin = adminIds.indexOf(this.recipient._id) > -1;
        setTimeout(() => {
            this.awaitUserInput = true;
        }, 50);
    }

    async toggleAdminStatus() {
        try {
            if (!this.awaitUserInput) return;
            if (this.appUserIsAdmin) { // add this person as a admin
                await this.churchService.addAdmin(this.community._id, {_id: this.recipient._id, name: this.recipient.name});
                this.userData.socket.emit('refresh user status', this.recipient._id, {type: 'update admin', action: 'add as admin', community: this.community});
            } else {//remove this person's admin role
                await this.churchService.removeAdmin(this.community._id, {_id: this.recipient._id, name: this.recipient.name});
                this.userData.socket.emit('refresh user status', this.recipient._id, {type: 'update admin', action: 'remove from admin', community: this.community});
            }
            this.anyChangeMade = true;
        } catch (err) {
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please resume internet connection to complete the log out process.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    async messageRecipient() {
        if (this.recipient._id === this.userData.user._id) return; //terminate if the recipient selected is the user herself
        if (this.result.conversation) { //if the recipient has been connected
            const conversation = this.result.conversation;
            if (conversation.type === 'connect') {
                this.chatService.currentChatProps.push({
                    conversationId: conversation._id,
                    name: `${this.recipient.first_name} ${this.recipient.last_name}`,
                    recipient: this.recipient,
                    page: 'chat',
                    modalPage: false
                });
                if (!this.modalPage && this.subpanel) {
                    this.router.navigate([{ outlets: { sub: ['chat', { subpanel: true }] }}]);
                } else if (!this.modalPage && !this.subpanel) {
                    this.router.navigate(['/app/myconversations/chat']);
                    this.userData.refreshMyConversations({action: 'reload chat view'});
                } else {
                    this.chatService.openChat({conversationId: conversation._id, author: this.recipient});
                }
            } else if (conversation.type === 'request') {
                if (conversation.blockedBy) {
                    if (conversation.blockedBy === this.userData.user._id) {
                        const alert = await this.alertCtrl.create({
                            header: 'User is Blocked',
                            message: `Do you want to reconnect with ${this.recipient.name}?`,
                            buttons: [{
                                text: 'Yes',
                                handler: () => {
                                    const navTransition = alert.dismiss();
                                    navTransition.then( async () => {
                                        await this.chatService.unblockConversation(conversation._id, this.recipient._id);
                                        this.chatService.openChat({conversationId: conversation._id, author: this.recipient});
                                        this.isBlocked = false;
                                        this.isConnected = true;
                                    })
                                }
                            }, {text: 'No'}],
                            cssClass: 'level-15'
                        });
                        alert.present();
                    } else {
                        const alert = await this.alertCtrl.create({
                            header: `Blocked by ${this.recipient.name}.`,
                            message: 'You cannot direct message this user while being blocked.',
                            buttons: [{ text: 'Dismiss' }],
                            cssClass: 'level-15'
                        });
                        alert.present();
                    }
                } else {
                    const alert = await this.alertCtrl.create({
                        header: 'Connect request is pending',
                        message: 'You have already sent a connect request to this user.',
                        buttons: [{ text: 'Dismiss' }],
                        cssClass: 'level-15'
                    });
                    alert.present();
                }
            }
        } else {
            const alert = await this.alertCtrl.create({
                header: `Connect to ${this.recipient.name}`,
                message: `You are not yet connected with ${this.recipient.name}. Do you want to direct message ${this.recipient.name}?`,
                buttons: [{ text: 'Yes',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(async () => {
                            await this.userData.checkPushNotification();
                            const welcomeMessage = `${this.userData.user.first_name} ${this.userData.user.last_name} is now connected with you.`;
                            const newConversationId = await this.chatService.newConversation(this.recipient._id, { composedMessage : welcomeMessage, type: "connect" });
                            this.chatService.refreshTabBadges();
                            this.isConnected = true;
                            this.chatService.openChat({conversationId: newConversationId, author: this.recipient});
                        });
                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async shareContactInfo(){
        try {
            const state = await this.chatService.shareContactInfo(this.result.conversation._id); //return 0 if off, 1 if on
            this.resourceService.load('en-US', "Contact").subscribe(async (result) => {
                const moment = {comment: [''], notifyAt: new Date().toISOString(), matrix_string: [['Contact Request']], matrix_number: [[]], conversation: this.result.conversation._id, resource: {} };
                moment.resource = result[0];
                moment.matrix_number = [[state]];
                this.createFeature(moment);
                this.checkConnection();
            });
        } catch (err){
            console.log(err);
        }
    }

    async createContactMessage(state){
        try {
            this.resourceService.load('en-US', "Contact").subscribe(async (result) => {
                this.result = await this.chatService.getConversationByRecipientId(this.recipient._id, true, this.programId);
                this.conversation = this.result.conversation;
                const serverData = {comment: [''], notifyAt: new Date().toISOString(), matrix_string: [['']], matrix_number: [[]], conversations: this.conversation._id, resource: {} };
                serverData.resource = result[0]._id;
                serverData.matrix_number = [[state]];
                const createdMoment: any = await this.momentService.create(serverData); //create feature
                createdMoment.resource = result[0]; // repopulate resource
                await this.momentService.share(createdMoment, this.conversation._id);
            });
        } catch (err){
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                subHeader: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15',
            });
            await networkAlert.present();
            console.log(err);
        }
    }

    callAction(phoneNumber) {
        if (phoneNumber.length){
            this.callNumber.callNumber(phoneNumber, true)
                .then(() => console.log('Launched dialer!'))
                .catch(() => console.log('Error launching dialer'));
        }
    }

    async createFeature(moment) { //create moment and send it via chat and push notification
        try {
            const createdMoment: any = await this.momentService.create(moment); //create feature
            createdMoment.resource = moment.resource; //populate resource
            try{
                await this.chatService.sendReply(this.result.conversation._id, {
                    moment: createdMoment._id,
                    page: "MessagePage",
                    groupId: null,
                    groupName: null
                }, {
                    conversationId: this.result.conversation._id,
                    moment: createdMoment,
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
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async openProgram(programId) {
        if (this.modalPage) {
            const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: { moment: { _id: programId }, modalPage: true}} );
            modal.present();
        } else {
            this.router.navigate(['/app/activity/' + programId]);
        }
    }

    async createRelationship() {
        const pickProgramModal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Choose Plan', maxMomentCount: 1, allowCreate: false, modalPage: true}});
        await pickProgramModal.present();
        const {data: moments} = await pickProgramModal.onDidDismiss();
        if (moments && moments.length) {
            this.loading = await this.loadingCtrl.create({
                message: 'Processing...',
                duration: 5000
            });
            await this.loading.present();
            if (moments[0] && moments[0].cloned === 'new') { // cloning a sample. copy everything except calendar
                moments[0].calendar = { // reset the calendar
                    title: moments[0].matrix_string[0][0],
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
                const clonedMoments: any = await this.momentService.clone(moments, null);
                if (clonedMoments && clonedMoments.length) {
                    //clonedMoments[0].type = 'new';
                    clonedMoments[0].resource = moments[0].resource; // clone the populated resource
                    this.selectedProgram = clonedMoments[0];
                }
            } else {
                this.selectedProgram = moments[0];
            }
            this.momentService.initiateParticipantsView(this.selectedProgram, this.loading);
        }
    }

    initializeCall(number){
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    async reportUserAbuse(event) {
        event.stopPropagation();
        let buttons = [];
        buttons.push({
            text: 'Report',
            handler: () => {
                this.churchService.reportUserAbuse(this.recipient);
            }
        });
        if (this.isConnected) {
            if (!this.isBlocked){
                buttons.push({
                    text: 'Block & Report',
                    handler: () => {
                        this.blockConversation();
                    }
                });
                buttons.push({
                    text: 'Delete and Unfriend',
                    handler: () => {
                        this.disconnectConversation();
                    }
                });
            } else {
                buttons.push({
                    text: 'Cancel Block',
                    handler: () => {
                        this.messageRecipient();
                    }
                });
            }
        }
        let actionSheet = await this.actionSheetCtrl.create({
            header: buttons.length > 1 ? "Actions" : "Action",
            buttons: buttons,
            cssClass: 'level-15'});
        await actionSheet.present();
    }

    async clearAbuseReport() {
        const alert = await this.alertCtrl.create({
            header: 'Clear Reports',
            message: `Are you sure you want to clear the abuse report for ${this.recipient.name}? Even if the report is clear, Restvo reserves the right to further investigate this user and take appropriate actions.`,
            buttons: [{
                text: 'Proceed',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        await this.churchService.clearAbuseReport(this.community._id, this.recipient);
                        this.closeModal();
                    });
                }
            }, {text: 'Cancel'}],
            cssClass: 'level-15'
        });
        alert.present();
    }

    async blockConversation() {
        if (this.result.conversation){ //only if a connect conversation exists
            this.recipient.name = `${this.recipient.name || this.recipient.first_name} ${this.recipient.last_name}`;
            const alert = await this.alertCtrl.create({
                header: 'Block User',
                message: `Are you sure you want to block ${this.recipient.name}? ${this.recipient.name} will no longer be able to add you as friend or message you.`,
                buttons: [{
                    text: 'Proceed',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            await this.chatService.blockConversation(this.result.conversation._id, this.recipient._id,{name: this.recipient.name});
                            await this.chatService.getAllUserConversations();
                            this.userData.refreshAppPages();
                            if (this.modalPage) {
                                this.modalCtrl.dismiss(true);
                            }
                            this.churchService.reportUserAbuse(this.recipient);
                        });
                    }
                }, {text: 'Cancel'}],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async disconnectConversation(){
        if (this.result.conversation) { // only if a connect conversation exists
            this.recipient.name = `${this.recipient.name || this.recipient.first_name} ${this.recipient.last_name}`;
            const alert = await this.alertCtrl.create({
                header: 'Disconnect',
                message: `This will disconnect you from ${this.recipient.name} and erase all chat history. Proceed?`,
                buttons: [{
                    text: 'Proceed',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            await this.chatService.deleteConversation(this.result.conversation._id, this.recipient._id);
                            await this.chatService.getAllUserConversations();
                            this.userData.refreshAppPages();
                            if (this.modalPage) {
                                this.modalCtrl.dismiss(true);
                            }
                            this.churchService.reportUserAbuse(this.recipient);
                        });
                    }
                }, {text: 'Cancel'}],
                cssClass: 'level-15'
            });
            await alert.present();
        }
    }

    closeModal() {
        if (this.modalPage) {
            this.modalCtrl.dismiss(this.anyChangeMade);
        } else {
            if (this.router.url.includes('myconversations') && !this.subpanel) { // the special case when viewing in the myconversations context and not in a subpanel
                this.router.navigate(['/app/myconversations/chat'], { replaceUrl: true });
            } else {
                this.location.back();
            }
        }
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
}
