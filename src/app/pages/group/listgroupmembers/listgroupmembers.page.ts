import {Component, OnInit, Input, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActionSheetController, AlertController, Events, IonInfiniteScroll, NavController, ModalController, Platform } from '@ionic/angular';
import { Auth } from '../../../services/auth.service';
import { Groups } from '../../../services/group.service';
import { UserData } from '../../../services/user.service';
import { EditgroupmemberPage } from "../editgroupmember/editgroupmember.page";
import { InvitetoconnectPage } from "../../connect/invitetoconnect/invitetoconnect.page";

@Component({
  selector: 'app-listgroupmembers',
  templateUrl: './listgroupmembers.page.html',
  styleUrls: ['./listgroupmembers.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListgroupmembersPage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    members = [];
    membersPageNum: number = 0;
    membersReachedEnd: boolean = false;
    searchKeyword: string = "";
    leaderIds: any = [];
    loading: any;
    @Input() group: any;
    editMemberTag: boolean = false;

    constructor(private sms: SMS,
                private callNumber: CallNumber,
                private platform: Platform,
                private alertCtrl: AlertController,
                private events: Events,
                private authService: Auth,
                private groupService: Groups,
                public userData: UserData,
                private navCtrl: NavController,
                public modalCtrl: ModalController,
                private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
      this.events.subscribe('incomingStatusUpdate', this.refreshHandler);
  }
    ionViewWillEnter(){
        this.initialize();
    }

    refreshHandler = (conversationId, data) => {
        if (conversationId === this.group.conversation) {
            if (data.action === "update leader status"){
                this.leaderIds = data.leaders.map((c) => {return c._id;});
                this.editMemberTag = ((this.leaderIds.indexOf(this.userData.user._id) > -1) || (this.group.churchId ? this.userData.currentCommunityAdminStatus : false));
            }
            this.reloadDirectory();
        } else if (data._id === this.group._id){
            this.reloadDirectory();
        }
    };

    initialize() {
        this.leaderIds = [];
        //check if the current user is a leader
        this.leaderIds = this.group.leaders.map((c) => {return c._id;});
        console.log("leaders ", this.leaderIds.length);
        this.editMemberTag = ((this.leaderIds.indexOf(this.userData.user._id) > -1) || (this.group.churchId ? this.userData.currentCommunityAdminStatus : false));
        this.reloadDirectory();
    }

    async reloadDirectory(){
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
            const results = await this.groupService.loadGroupMembers(this.group._id, this.searchKeyword, this.membersPageNum);
            event.target.complete();
            if (!(results.members.length + results.pending_members.length)){
                this.membersReachedEnd = true;
                event.target.disabled = true;
            } else {
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
        } else {
            event.target.complete();
        }
    }

    loadLegacyGroupData(){
        let uniqueNames = this.members.map((c) => {return c.name;});
        //this is to take care of old wee pending members
        this.group.pending_members.forEach((pending_member) => {
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
        this.group.pending_email_members.forEach((contact)=>{
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

    executeSearch(event){
        event.stopPropagation();
        this.reloadDirectory();
    }

    cancelSearch(event){
        event.stopPropagation();
        this.searchKeyword = "";
        this.reloadDirectory();
    }

    async editMember(event, member) {
        event.stopPropagation();
        const editgroupMemberModal = await this.modalCtrl.create({component: EditgroupmemberPage, componentProps: {member: member, group: this.group}});
        await editgroupMemberModal.present();
        const {data: refreshNeeded} = await editgroupMemberModal.onDidDismiss();
        if (refreshNeeded) {
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
        const actionSheet = await this.actionSheetCtrl.create({header: 'Invite a Friend', buttons: buttons});
        await actionSheet.present();
    }

    async invitePage(type) {
        const invitePage = await this.modalCtrl.create({component: InvitetoconnectPage, componentProps: {type: type, group: this.group}});
        await invitePage.present();
        const {data: refreshNeeded} = await invitePage.onDidDismiss();
        if (refreshNeeded){
            this.reloadDirectory();
        }
    }

    initializeCall(number) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    ngOnDestroy(){
        this.events.unsubscribe('incomingStatusUpdate', this.refreshHandler);
    }
}
