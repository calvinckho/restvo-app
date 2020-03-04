import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { AlertController, Events, ModalController, NavParams } from '@ionic/angular';
import { Groups } from '../../../services/group.service';
import { Chat } from '../../../services/chat.service';
import { UserData } from '../../../services/user.service';

@Component({
  selector: 'app-editgroupmember',
  templateUrl: './editgroupmember.page.html',
  styleUrls: ['./editgroupmember.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditgroupmemberPage implements OnInit, OnDestroy {

    member: any;
    group: any;
    loading: any;
    UIisLeaderTag: boolean = false;
    disableTag: boolean = false;
    anyChangeMade: boolean = false;

    constructor(private navParams: NavParams,
                private events: Events,
                private alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public userData: UserData,
                private groupService: Groups,
                private chatService: Chat,
    ) {
        this.group = this.navParams.get('group');
        this.member = this.navParams.get('member');
        this.setToggle();
    }

    ngOnInit() {
        this.events.subscribe('incomingStatusUpdate', this.refreshHandler);
    }
    
    refreshHandler = async (conversationId, data) => {
        if (conversationId === this.group.conversation && data.action === "update leader status") {
            let leaderIds = data.leaders.map((c) => c._id);
            if (leaderIds.indexOf(this.userData.user._id) < 0 && this.group.churchId){ // if not a group leader, check church admin status
                if (!await this.userData.hasAdminAccess(this.group.churchId)){ // if not church admin, the user is not supposed to be in this view, therefore exit
                    this.modalCtrl.dismiss();
                }
            }
        }
    };

    setToggle() {
        this.UIisLeaderTag = this.member.role === 'Leader';
        this.disableTag = (this.member.role === 'Contact' || this.member.role === 'Pending') || (!this.group.churchId && this.group.leaders.length === 1 && this.UIisLeaderTag);
    }

    async leaderStatusChange(event) {
        if (event.detail.checked) { // add this person as a leader
            if (this.group.leaders.map((c) => c._id).indexOf(this.member._id) < 0) { // if it has not been added yet
                this.group.leaders.push(this.member);
            } else {
                return;
            }
        } else { // remove this member's _id from the leaders array
            if (this.group.leaders.length === 1) {
                this.disableTag = true;
                this.UIisLeaderTag = true; // reverse the toggle
                const noLeaderAlert = await this.alertCtrl.create({
                    header: 'Group Requirement',
                    message: "This group needs at least one leader. Please assign another leader before you surrender your leader's status",
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await noLeaderAlert.present();
                return;
            }
            for (let i = this.group.leaders.length - 1; i >= 0; i--) {
                if (this.group.leaders[i]._id === this.member._id) {
                    this.group.leaders.splice(i, 1);
                }
            }
        }
        try {
            const result = await this.groupService.updateGroupProfile(this.group);
            this.chatService.socket.emit('update status', this.group.conversation, {action: "update leader status", leaders: this.group.leaders});
            this.anyChangeMade = true;
            console.log(result);
        } catch (err) {
            this.setToggle(); // reset the tags if failed
            console.log(err);
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please resume internet connection to complete the log out process.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    async eraseUserMessages() {
        let alert = await this.alertCtrl.create({
            header: 'Warning!',
            message: 'This will erase this users\' messages from the chat. Are you sure to proceed?',
            buttons: [{ text: 'Proceed',
                handler: () => {
                    this.chatService.eraseUserMessages(this.member._id, this.group.conversation).then((result) => {
                        console.log(result);
                    }, (err) => {
                        this.noNetworkConnection();
                        console.log(err);
                    });
                }}, { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async removeMemberFromGroup(){
        console.log("role", this.member);
        let alert = await this.alertCtrl.create({
            header: 'Warning!',
            message: 'This will remove this user from the group. Are you sure to proceed?',
            buttons: [{ text: 'Proceed',
                handler: () => {
                    let navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        try {
                            let result = await this.groupService.removeUserFromGroup({
                                member: this.member,
                                groupId: this.group._id
                            });
                            console.log(result);
                            if (this.member.role !== 'Pending'){
                                this.userData.socket.emit('refresh user status', this.member._id, {
                                    type: 'leave group',
                                    groupId: this.group._id
                                });
                            }
                            this.modalCtrl.dismiss(result === "success");
                        } catch (err){
                            this.noNetworkConnection();
                            console.log(err);
                        }
                    });
                }}, { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    closeModal() {
        this.modalCtrl.dismiss(this.anyChangeMade);
    }

    async noNetworkConnection(){
        let networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            message: 'Please check your internet connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }

    ngOnDestroy(){
        this.events.unsubscribe('incomingStatusUpdate', this.refreshHandler);
    }

}
