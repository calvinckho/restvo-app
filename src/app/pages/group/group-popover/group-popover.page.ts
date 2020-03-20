import {Component, OnInit, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { CacheService } from 'ionic-cache';
import { Badge } from '@ionic-native/badge/ngx';
import {Storage} from '@ionic/storage';
import { ActionSheetController, AlertController, NavParams, PopoverController, Platform, ModalController } from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import { Groups } from "../../../services/group.service";
import { Chat } from "../../../services/chat.service";
import { EditgroupPage } from "../editgroup/editgroup.page";
import {InvitetoconnectPage} from "../../connect/invitetoconnect/invitetoconnect.page";
import {Aws} from "../../../services/aws.service";
import { NetworkService } from "../../../services/network-service.service";
import {Auth} from "../../../services/auth.service";

@Component({
  selector: 'app-group-popover',
  templateUrl: './group-popover.page.html',
  styleUrls: ['./group-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GroupPopoverPage implements OnInit, OnDestroy {
    subscriptions: any = {};

    @Input() group: any;
    count: any;
    group_type: string = '';
    loading: any;
    joinGroupTag: boolean = true;
    editGroupTag: boolean = false;
    leaveGroupTag: boolean = false;
    deleteGroupTag: boolean = false;
    isGroupLeader = false;
    hasAdminAccess = false;
    loadCompleted = false;

    constructor(private electronService: ElectronService,
                private storage: Storage,
                private cache: CacheService,
                private platform: Platform,
                private badge: Badge,
                private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private navParams: NavParams,
                private popoverCtrl: PopoverController,
                private networkService: NetworkService,
                private authService: Auth,
                private groupService: Groups,
                private awsService: Aws,
                private chatService: Chat,
                public userData: UserData) {
    }

    async ngOnInit() {
        [this.group] = await this.groupService.loadGroupProfile(this.group._id);
        this.setTag();
        this.loadCompleted = true;
        console.log("group:", this.group);
    }

    async ionViewWillEnter(){
    }

    ionViewDidEnter() {
        this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = (res) => {
        if (res) {
            if (this.group.conversation && res.conversationId === this.group.conversation && res.data.action === "update leader status") {
                this.group.leaders = res.data.leaders;
                this.setTag();
            }
        }
    };

    async setTag() {
        console.log("user", this.userData.user);
        const groupIds = this.userData.user.groups.map((c) => {return c._id;});
        if (groupIds.indexOf(this.group._id) > -1) { //if user is a group member
            this.joinGroupTag = false;
            this.editGroupTag = false;
            this.leaveGroupTag = true;
            this.deleteGroupTag = false;
        }
        let leaderIds = this.group.leaders.map((c) => {return c._id;});
        if (leaderIds.indexOf(this.userData.user._id) > -1) { //if user is a group leader
            this.joinGroupTag = false;
            this.editGroupTag = true;
            this.leaveGroupTag = true;
            this.deleteGroupTag = true;
            this.isGroupLeader = true;
        }
        if(this.group.churchId && await this.userData.hasAdminAccess(this.group.churchId)){ //special admin privileges
            this.editGroupTag = true;
            this.deleteGroupTag = true;
            this.hasAdminAccess = true;
        }
        this.group_type = this.group.board ? 'Topic' : 'Group';
    }

    /*async about() {
        const aboutPage = await this.modalCtrl.create({component: ShowgroupPage, componentProps: {
                group: this.group
            }});
        await aboutPage.present();
    }*/

    async invite() {
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
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Invite a Friend',
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    async invitePage(type) {
        const invitePage = await this.modalCtrl.create({
            component: InvitetoconnectPage,
            componentProps: {type: type, group: this.group}});
        await invitePage.present();
        this.popoverCtrl.dismiss();
    }

    async joinGroup() {
        try {
            const data = await this.userData.joinGroup(this.group);
            if(data === "cancel") return;
            this.popoverCtrl.dismiss();
            const alert = await this.alertCtrl.create({
                header: 'Success',
                subHeader: 'You have joined ' + this.group.name,
                buttons: [{ text: 'Ok',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(() => {
                            //do nothing for now
                            if(this.group.conversation){
                                this.authService.refreshGroupStatus({conversationId: this.group.conversation, data: this.group});

                            }
                        });
                    }}],
                cssClass: 'level-15'
            });
            alert.present();
        } catch (err){
            this.popoverCtrl.dismiss();
            this.noNetworkConnection();
            console.log("failed to add to My Community");
        }
    }

    async leaveGroup(){
        try {
            if (this.networkService.hasNetwork) {
                // first reset the conversation badge count to 0, decrease the system badge count down by number of unread messages in group
                if (this.group.conversation) {
                    const count = await this.chatService.resetBadgeCount(this.group.conversation);
                    this.chatService.socket.emit('leave conversation', this.group.conversation);
                    if (count) {
                        if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                            this.badge.decrease(count);
                        }
                        if (this.electronService.isElectronApp) {
                            this.electronService.ipcRenderer.send('SYSTEM_TRAY:::CHANGE_BADGE', -1 * count);
                        }
                    }
                }
                //Remove group from user-data and group collections
                await this.userData.leaveGroup(this.group);
                this.popoverCtrl.dismiss(true);
            } else {
                this.noNetworkConnection();
            }
        } catch (err) {
            this.noNetworkConnection();
            this.popoverCtrl.dismiss();
            console.log(JSON.stringify(err));
        }
    }

    async editGroup() {
        this.popoverCtrl.dismiss();
        const editGroupPage = await this.modalCtrl.create({component: EditgroupPage, componentProps: {group: this.group, personalGroup: !this.group.churchId}});
        await editGroupPage.present();
        const {data: refreshNeeded} = await editGroupPage.onDidDismiss();
        if (refreshNeeded){

        }
    }

    async flagGroup(){
        try {
            const alert = await this.alertCtrl.create({
                header: "Report Abuse", //report post
                message: "You are about to report this group and its content for a violation of our terms of use. Are you sure to proceed?", //are you sure you want to delete this post
                buttons: [{ text: 'Ok',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            this.group.flagged = true;
                            const result = await this.groupService.flagGroup(this.group);
                            const message = await this.alertCtrl.create({
                                header: 'Report Received',
                                message: this.group.public_group ? 'This topic' : 'This group' + ' has been flagged for review. We will take the necessary actions which may lead to deletion of its content and the suspension of its author.',
                                buttons: [{ text: 'Ok',
                                    handler: () => {
                                        const navTransition = alert.dismiss();
                                        navTransition.then(() => {
                                            this.popoverCtrl.dismiss(true);
                                        });
                                    }}],
                                cssClass: 'level-15'
                            });
                            await message.present();
                            console.log(result);
                        });
                    }},
                    { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            alert.present();
        } catch (err) {
            this.noNetworkConnection();
            this.popoverCtrl.dismiss();
            console.log(err);
        }
    }

    async unflagGroup(){
        this.group.flagged = false;
        try {
            const result = await this.groupService.flagGroup(this.group);
            const alert = await this.alertCtrl.create({
                header: 'User Report Removed',
                message: 'This group will not be marked for review. Restvo reserves the right to investigate its content and take actions if necessary.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(() => {
                            this.popoverCtrl.dismiss(true);
                        });
                    }}],
                cssClass: 'level-15'
            });
            await alert.present();
            console.log(result);
        } catch (err) {
            this.noNetworkConnection();
            this.popoverCtrl.dismiss();
            console.log(err);
        }
    }

    async deleteGroup(){
        const alert = await this.alertCtrl.create({
            header: 'Delete ' + (this.group.published ? 'Topic' : 'Group'),
            message: 'Are you sure you want to delete ' + this.group.name + '?',
            buttons: [{ text: 'Ok',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        //Remove group from user-data and group collections
                        try {
                            await this.groupService.deleteGroupProfile(this.group);
                            if (this.group.background && this.group.background.length) {
                                await this.awsService.removeFile(this.group.background);
                            }
                            this.popoverCtrl.dismiss(true);
                        } catch (err) {
                            this.popoverCtrl.dismiss();
                            this.noNetworkConnection();
                            console.log("delete group failed");
                        }
                    });
                }},
                { text: 'Cancel',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(() => {
                            this.popoverCtrl.dismiss();
                        })
                    } }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    close() {
        this.popoverCtrl.dismiss();
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

    ngOnDestroy() {
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
    }
}
