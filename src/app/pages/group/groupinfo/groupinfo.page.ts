import {Component, Input, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Groups} from "../../../services/group.service";
import {Chat} from "../../../services/chat.service";
import {UserData} from "../../../services/user.service";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {InvitetoconnectPage} from "../../connect/invitetoconnect/invitetoconnect.page";
import {EditgroupmemberPage} from "../editgroupmember/editgroupmember.page";
import {Router} from "@angular/router";
import {CacheService} from "ionic-cache";
import {
    ActionSheetController, AlertController, IonInfiniteScroll, ModalController, Platform, PopoverController,
    ToastController
} from "@ionic/angular";
import {ElectronService} from "ngx-electron";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {Moment} from "../../../services/moment.service";
import {CallNumber} from "@ionic-native/call-number/ngx";
import {Storage} from "@ionic/storage";
import {Badge} from "@ionic-native/badge/ngx";
import {SpeechRecognition} from "@ionic-native/speech-recognition/ngx";
import {GroupPopoverPage} from "../group-popover/group-popover.page";
import {Location} from "@angular/common";
import {Auth} from "../../../services/auth.service";

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.page.html',
  styleUrls: ['./groupinfo.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GroupinfoPage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    @Input() modalPage: any;
    // group
    propIndex: any;
    group: any;
    groupLoaded = false;

    // about
    joinGroupTag: boolean = true;

    // members
    members = [];
    searchKeyword = '';
    leaderIds: any = [];
    editMemberTag = false;
    membersPageNum = 0;
    membersReachedEnd = false;
    subscriptions: any = {};

  constructor(
      private zone: NgZone,
      public router: Router,
      private location: Location,
      private electronService: ElectronService,
      private cache: CacheService,
      private storage: Storage,
      private badge: Badge,
      public platform: Platform,
      private geolocation: Geolocation,
      private callNumber: CallNumber,
      private speechRecognition: SpeechRecognition,
      private toastCtrl: ToastController,
      private actionSheetCtrl: ActionSheetController,
      private alertCtrl: AlertController,
      private modalCtrl: ModalController,
      private popoverCtrl: PopoverController,
      private authService: Auth,
      private groupService: Groups,
      public userData: UserData,
      public chatService: Chat,
      public momentService: Moment,
  ) { }

  async ngOnInit() {
      this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshGroupHandler);
      this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.closeGroupInfoHandler);
  }

    refreshGroupHandler = async (res) => {
        this.setup();
    };

  async setup() {
      this.propIndex = this.chatService.currentChatProps.length - 1;
      [this.chatService.currentChatProps[this.propIndex].group] = await this.groupService.loadGroupProfile(this.chatService.currentChatProps[this.propIndex].group._id);
      this.groupLoaded = true;
      this.setTag();
      this.leaderIds = [];
      //check if the current user is a leader
      this.leaderIds = this.chatService.currentChatProps[this.propIndex].group.leaders.map((c) => c._id);
      this.editMemberTag = ((this.leaderIds.indexOf(this.userData.user._id) > -1) || (this.chatService.currentChatProps[this.propIndex].group.churchId ? await this.userData.hasAdminAccess(this.chatService.currentChatProps[this.propIndex].group.churchId) : false));
      this.reloadDirectory();
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

    // about page

    setTag() {
        this.joinGroupTag = !this.userData.user.groups.find((group) => group._id === this.chatService.currentChatProps[this.propIndex].group._id);
    }

    async joinGroup() {
        try {
            const data = await this.userData.joinGroup(this.chatService.currentChatProps[this.propIndex].group);
            if (data === "cancel") return;
            const alert = await this.alertCtrl.create({
                header: 'Success',
                message: 'You have joined ' + this.chatService.currentChatProps[this.propIndex].group.name + (this.chatService.currentChatProps[this.propIndex].group.board ? '. You can access its board posts via the Board page.' : '.'),
                buttons: [{ text: 'Ok',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(() => {
                            this.authService.refreshGroupStatus({conversationId: this.chatService.currentChatProps[this.propIndex].group.conversation, data: this.chatService.currentChatProps[this.propIndex].group});
                        });
                    }}],
                cssClass: 'level-15'
            });
            await alert.present();
        } catch (err){
            this.noNetworkConnection();
            console.log("failed to add to My Community");
        }
    }

    // members

    async reloadDirectory() {
        setTimeout(() => {
            this.infiniteScroll.disabled = false;
            this.membersReachedEnd = false;
            this.members = [];
            this.membersPageNum = 0;
            this.listgroupmembers({target: this.infiniteScroll});
            this.loadLegacyGroupData();
        }, 100);
    }

    async listgroupmembers(event){
        this.membersPageNum++;
        if (!this.membersReachedEnd){
            const results = await this.groupService.loadGroupMembers(this.chatService.currentChatProps[this.propIndex].group._id, this.searchKeyword, this.membersPageNum);
            event.target.complete();
            if (!(results.members.length + results.pending_members.length)){
                this.membersReachedEnd = true;
                event.target.disabled = true;
            } else {
                if (results.members && results.members.length) {
                    results.members.forEach((member) => {
                        if (this.leaderIds.indexOf(member._id) > -1) { // a leader
                            member.role = 'Leader';
                            member.badge = true;
                            member.icons = ["phone-portrait"];
                        } else {
                            member.role = "Member";
                            member.icons = ["phone-portrait"];
                        }
                        member.name = member.first_name + ' ' + member.last_name;
                        this.members.push(member);
                    });
                }
                if (results.pending_members && results.pending_members.length) {
                    results.pending_members.forEach((pending_member) => {
                        if (pending_member.user){
                            pending_member.role = "Pending";
                            pending_member.badge = true;
                        } else {
                            pending_member.icons = [];
                            pending_member.role = "Contact";
                        }
                        // set up the display badge
                        if (pending_member.emails && pending_member.emails.length){
                            pending_member.icons.push("mail");
                        }
                        if (pending_member.mobile_phones && pending_member.mobile_phones.length){
                            pending_member.icons.push("text");
                        }
                        if (pending_member.home_phones && pending_member.home_phones.length){
                            pending_member.icons.push("call");
                        }
                        if (pending_member.work_phones && pending_member.work_phones.length){
                            pending_member.icons.push("call");
                        }
                        if (!this.editMemberTag){ //if not a leader, delete personal info
                            delete pending_member.emails;
                            delete pending_member.mobile_phones;
                            delete pending_member.home_phones;
                            delete pending_member.work_phones;
                        }
                        this.members.push(pending_member);
                    });
                }
            }
        } else {
            event.target.complete();
        }
    }

    loadLegacyGroupData(){
        let uniqueNames = this.members.map((c) => {return c.name;});
        //this is to take care of old wee pending members
        if (this.chatService.currentChatProps[this.propIndex].group.pending_members) {
            this.chatService.currentChatProps[this.propIndex].group.pending_members.forEach((pending_member) => {
                if (pending_member.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    pending_member.role = "Pending";
                    pending_member.badge = true;
                    let index = uniqueNames.indexOf(pending_member.name);
                    if (index < 0 && pending_member.name) {
                        this.members.push(pending_member); //push the member into the members array
                    } else {
                        //ignore if it is already represented in the Pending collection
                    }
                }
            });
        }
        if (this.chatService.currentChatProps[this.propIndex].group.pending_email_members) {
            this.chatService.currentChatProps[this.propIndex].group.pending_email_members.forEach((contact)=>{
                if (contact.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                    contact.icons = [];
                    contact.role = "Contact";
                    if (contact.email) {
                        contact.emails = [contact.email];
                        contact.icons.push("mail");
                    }
                    if (contact.mobile_phone) {
                        contact.mobile_phones = [contact.mobile_phone];
                        if (contact.sms_opt_in) contact.icons.push('text');
                    }
                    if (contact.mobile_phone || contact.home_phone) {
                        contact.icons.push("call");
                    }
                    if (contact.home_phone) {
                        contact.home_phones = [contact.home_phone];
                    }
                    this.members.push(contact);
                }
            });
        }
    }

    async presentPopover(event) {
        event.stopPropagation();
        if (!this.chatService.currentChatProps[this.propIndex].group) {
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
        } else if (this.chatService.currentChatProps[this.propIndex].group) {
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
        }
    }

    executeSearch(event){
        event.stopPropagation();
        this.reloadDirectory();
    }

    cancelSearch(event){
        event.stopPropagation();
        this.searchKeyword = '';
        this.reloadDirectory();
    }

    async editMember(event, member) {
        event.stopPropagation();
        const editgroupMemberModal = await this.modalCtrl.create({component: EditgroupmemberPage, componentProps: {member: member, group: this.chatService.currentChatProps[this.propIndex].group}});
        await editgroupMemberModal.present();
        const {data: refreshNeeded} = await editgroupMemberModal.onDidDismiss();
        if (refreshNeeded) {
            // need a fresh copy of the group members list
            const results = await this.groupService.loadGroupProfile(this.chatService.currentChatProps[this.propIndex].group._id);
            this.chatService.currentChatProps[this.propIndex].group = results[0];
            this.leaderIds = this.chatService.currentChatProps[this.propIndex].group.leaders.map((c) => c._id);
            this.reloadDirectory();
        }
    }

    async addMemberActionSheet() {
        const buttons = [
            {
                text: 'Restvo Users',
                handler: () => {
                    this.invitePage('Restvo Users');
                }
            },
            {
                text: 'Email',
                handler: () => {
                    this.invitePage('Email');
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
            }];
        if (this.platform.is('cordova')) {
            buttons.splice(1, 0, {
                text: 'SMS Message',
                handler: () => {
                    this.invitePage('SMS Message');
                }
            });
        }
        const actionSheet = await this.actionSheetCtrl.create(
            {
                header: 'Invite a Friend',
                buttons: buttons,
                cssClass: 'level-15'
            });
        await actionSheet.present();
    }

    async invitePage(type) {
        const invitePage = await this.modalCtrl.create({component: InvitetoconnectPage, componentProps: {type: type, group: this.chatService.currentChatProps[this.propIndex].group}});
        await invitePage.present();
        const {data: refreshNeeded} = await invitePage.onDidDismiss();
        if (refreshNeeded){
            [this.chatService.currentChatProps[this.propIndex].group] = await this.groupService.loadGroupProfile(this.chatService.currentChatProps[this.propIndex].group._id);
            this.reloadDirectory();
        }
    }

    initializeCall(number) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    startVideoChat() {
        // only PWA needs to expand chat view. native app will show the native Jitsi view
        if (this.modalPage && !this.platform.is('cordova')) {
            this.expandChatView(true);
        } else {
            this.chatService.toggleVideoChat({
                videoChatRoomId: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId,
                videoChatRoomSubject: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].group.name,
                channelLastN: '6', // only the last 6 active dominate speakers' stream will be sent
                startWithAudioMuted: false,
                startWithVideoMuted: false
            });
        }
    }

    private async expandChatView(startVideoChat) { // can only happen in the desktop view
        this.chatService.currentChatProps.push(this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]);
        this.closeModal(false);
        setTimeout(() => {
            this.userData.refreshMyConversations({ action: 'reload chat view' });
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

    async noNetworkConnection() {
        const networkAlert = await this.alertCtrl.create({
            header: 'No Internet this.connection',
            message: 'Please check your internet this.connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }

    closeGroupInfoHandler = (res) => {
        if (res && res.type === 'close group view' && res.data) {
            if (res.data._id === this.group._id) {
                this.closeModal(true);
            }
        }
    };

    async closeModal(refreshNeeded) {
        try {
            if (this.modalPage) {
                this.modalCtrl.dismiss(refreshNeeded);
            } else {
                this.router.navigate(['/app/myconversations/chat'], { skipLocationChange: true });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async ngOnDestroy() {
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshGroupHandler);
        this.subscriptions['refreshUserStatus'].unsubscribe(this.closeGroupInfoHandler);
    }
}
