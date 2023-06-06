import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AlertController, IonContent, IonInfiniteScroll, ModalController, Platform} from '@ionic/angular';
import { Aws } from '../../../services/aws.service';
import { UserData } from '../../../services/user.service';
import { Churches } from '../../../services/church.service';
import { Auth } from '../../../services/auth.service';
import { Chat } from "../../../services/chat.service"
import {GroupchatPage} from "../groupchat/groupchat.page";
import {Moment} from "../../../services/moment.service";

@Component({
  selector: 'app-createchat',
  templateUrl: './createchat.page.html',
  styleUrls: ['./createchat.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatechatPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    chatForm: UntypedFormGroup;
    churchId = '';
    pageNum = 0;
    displayGroup = false;
    reachedEnd = false;
    searchKeyword = '';
    allFriends = [];
    listOfFriends = [];
    listOfAppUsers = [];
    selectedAppUsers = [];
    group: any;
    totalSelected: number = 0;
    loading: any;
    ionSpinner = true;
    page = 1;
    type: string;

    //group creation variables
    groupForm: UntypedFormGroup;


    constructor(
        private formBuilder: UntypedFormBuilder,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public platform: Platform,
        private awsService: Aws,
        private authService: Auth,
        public userData: UserData,
        private churchService: Churches,
        private momentService: Moment,
        private chatService: Chat,
    ) {
        this.chatForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
        this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
    }

    ngOnInit() {
        this.renderList();
        this.setupLoadPeople();

        setTimeout(() => {
            this.ionSpinner = false;
        }, 5000);
    }

    async renderList() {
        this.listOfFriends = [];
        this.chatService.conversations.forEach((obj) => {
            if ((obj.conversation.type === 'connect') && obj.data.name.toLowerCase().includes(this.searchKeyword.toLowerCase())) {
                this.listOfFriends.push({_id: obj.data.participant._id, name: obj.data.name, avatar: obj.data.participant.avatar, badge: obj.data.badge, order: null, select: this.selectedAppUsers.map((c) => c._id).includes(obj.data.participant._id)});
            }
        });
        this.listOfFriends.forEach((obj, index) => { // to do a stable sort next, first remember the order
            obj.order = index;
        });
        this.listOfFriends.sort((a, b) => {
            let badge_diff = b.badge - a.badge;
            if (badge_diff !== 0) {
                return badge_diff; // only sort when there is an actual difference
            } else {
                return a.order - b.order; // preserve the order
            }
        });
    }

    setupLoadPeople(){
        setTimeout(() => {
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.listOfAppUsers = [];
            this.pageNum = 0;
            this.loadMorePeople({target: this.infiniteScroll});
        }, 100);
    }

    async loadMorePeople(event){
        this.pageNum++;
        if (!this.reachedEnd){
            const churchAppUsers: any = await this.churchService.loadChurchAppUsers(this.churchId, this.searchKeyword, this.pageNum);
            this.ionSpinner = false;
            if (!churchAppUsers.length){
                this.reachedEnd = true;
                event.target.disabled = true;
            } else {
                churchAppUsers.forEach((appuser) => {
                    if (appuser._id !== this.userData.user._id){
                        appuser.name = `${appuser.first_name} ${appuser.last_name}`;
                        this.listOfAppUsers.push({_id: appuser._id, name: appuser.name, avatar: appuser.avatar, select: this.selectedAppUsers.map((c) => c._id).includes(appuser._id)});
                    }
                });
            }
            event.target.complete();
        } else {
            this.ionSpinner = false;
            event.target.complete();
        }
    }

    executeSearch(event){
        event.stopPropagation();
        this.setupLoadPeople();
        this.renderList();
    }

    cancelSearch(event){
        event.stopPropagation();
        this.searchKeyword = '';
        this.setupLoadPeople();
        this.renderList();
    }

    select(person){
        if (person.select) {
            person.select = false;
            this.totalSelected--;
            if(this.totalSelected < 2) {
                this.displayGroup = false;
            }
            const index = this.selectedAppUsers.indexOf(person);
            this.selectedAppUsers.splice(index, 1);
        } else {
            person.select = true;
            this.totalSelected++;
            if (this.totalSelected > 1) {
                this.displayGroup = true;
            }
            this.selectedAppUsers.unshift(person);
            this.searchKeyword = '';
        }
        this.modifyChatName();
    }

    unselect(person){
        this.totalSelected--;
        if (this.totalSelected < 2){
            this.displayGroup = false;
        }
        let index = this.listOfAppUsers.indexOf(person);
        if (index > -1){
            this.listOfAppUsers[index].select = false;
        }
        index = this.listOfFriends.indexOf(person);
        if (index > -1){
            this.listOfFriends[index].select = false;
        }
        index = this.selectedAppUsers.indexOf(person);
        if (index > -1){
            this.selectedAppUsers.splice(index, 1);
        }
        this.modifyChatName();
    }

    modifyChatName() {
        if (this.chatForm.controls.name.pristine) {
            if (this.totalSelected === 1){
                this.chatForm.patchValue({
                  name: `${this.userData.user.first_name} ${this.selectedAppUsers[0].name}`
                });
            } else if (this.totalSelected === 2) {
                this.chatForm.patchValue({
                  name: `${this.userData.user.first_name}, ${this.selectedAppUsers[0].name.split(' ')[0]}, ${this.selectedAppUsers[1].name.split(' ')[0]}`
                });
            } else if (this.totalSelected > 2) {
                this.chatForm.patchValue({
                  name: `${this.userData.user.first_name}, ${this.selectedAppUsers[0].name.split(' ')[0]} ${(this.totalSelected - 1).toString()} friends`
                });
            }
        }
    }

    async selectAppUsers(){
        if (this.totalSelected === 1){ // direct message with 1 person
            this.createPrivateChat();
        } else if (this.totalSelected > 1) { // direct message with 2 or more people
            this.createActivity();
        }
    }

    async createPrivateChat(){
        this.ionSpinner = true;
        const data: any = await this.chatService.getConversationByRecipientId(this.selectedAppUsers[0]._id, false, null);
        this.ionSpinner = false;
        if (data.length){//if the recipient has been connected
            const conversation = data[0];
            if (conversation.type == "connect") {
                this.modalCtrl.dismiss();
                setTimeout(async () => {
                    this.chatService.currentChatProps.push({
                        conversationId: conversation._id,
                        name: this.selectedAppUsers[0].name,
                        page: 'chat',
                        recipient: this.selectedAppUsers[0],
                        modalPage: true
                    });
                    const messagePage = await this.modalCtrl.create({
                        component: GroupchatPage,
                        componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                    });
                    await messagePage.present();
                }, 50);
            } else if (conversation.type === "request") {
                if (conversation.blockedBy){
                    if (conversation.blockedBy === this.userData.user._id) {
                        const alert = await this.alertCtrl.create({
                            header: 'User is Blocked',
                            subHeader: `Do you want to reconnect with ${this.selectedAppUsers[0].name}?`,
                            buttons: [{
                                text: 'Yes',
                                handler: () => {
                                    const navTransition = alert.dismiss();
                                    navTransition.then(async () => {
                                        await this.chatService.unblockConversation(conversation._id, this.selectedAppUsers[0]._id);
                                        this.modalCtrl.dismiss();
                                        this.chatService.currentChatProps.push({
                                            conversationId: conversation._id,
                                            name: this.selectedAppUsers[0].name,
                                            page: 'chat',
                                            recipient: this.selectedAppUsers[0],
                                            modalPage: true
                                        });
                                        const messagePage = await this.modalCtrl.create({
                                            component: GroupchatPage,
                                            componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                                        });
                                        await messagePage.present();
                                    });
                                }
                            }, {text: 'No'}],
                            cssClass: 'level-15'
                        });
                        alert.present();
                    } else {
                        const alert = await this.alertCtrl.create({
                            header: `Blocked by ${this.selectedAppUsers[0].name}.`,
                            subHeader: 'You cannot direct message this user while being blocked.',
                            buttons: [{ text: 'Dismiss' }],
                            cssClass: 'level-15'
                        });
                        await alert.present();
                    }
                } else {
                    const alert = await this.alertCtrl.create({
                        header: 'Connect request is pending',
                        subHeader: 'You have already sent a connect request to this user.',
                        buttons: [{ text: 'Dismiss' }],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            }
        } else {
            const alert = await this.alertCtrl.create({
                header: `Connect to ${this.selectedAppUsers[0].name}`,
                subHeader: `You are not yet connected with ${this.selectedAppUsers[0].name}. Do you want to direct message ${this.selectedAppUsers[0].name}`,
                buttons: [{ text: 'Yes',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            await this.userData.checkPushNotification();
                            const welcomeMessage = `${this.userData.user.first_name} ${this.userData.user.last_name} is now connected with you.`;
                            const conversationId = await this.chatService.newConversation(this.selectedAppUsers[0]._id, { composedMessage : welcomeMessage, type: "connect" });
                            this.chatService.refreshTabBadges();
                            this.modalCtrl.dismiss();
                            this.chatService.currentChatProps.push({
                                conversationId: conversationId,
                                name: this.selectedAppUsers[0].name,
                                page: 'chat',
                                recipient: this.selectedAppUsers[0],
                                modalPage: true
                            });
                            const messagePage = await this.modalCtrl.create({
                                component: GroupchatPage,
                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                            });
                            await messagePage.present();
                        });
                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async createActivity() {
        this.ionSpinner = true;
        this.group = await this.momentService.load('5eea6fca0f43cd616279a0fe');
        this.group.matrix_string[0][0] = this.chatForm.value.name;
        this.group.calendar = { // reset the calendar
            title: this.chatForm.value.name,
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
        const [clonedActivity]: any = await this.momentService.clone([this.group], null);
        if (clonedActivity) {
            await this.momentService.updateMomentUserLists({
                operation: 'add to lists and calendar',
                user_lists: ['user_list_1'],
                users: this.selectedAppUsers.map((c) => c._id),
                momentId: clonedActivity._id,
                calendarId: null // do not add to the moment's calendar because it is just a chat Group
            }, null, true);
        }
        this.ionSpinner = false;
        this.modalCtrl.dismiss(true);
    }

    backButton(){
        this.modalCtrl.dismiss(false);
    }

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
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
