import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { ActionSheetController, AlertController, Events, ModalController, Platform, PopoverController } from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import {EditcommunityPage} from "../editcommunity/editcommunity.page";
import {InvitetoconnectPage} from "../../connect/invitetoconnect/invitetoconnect.page";
import {Resource} from "../../../services/resource.service";

@Component({
  selector: 'app-community-popover',
  templateUrl: './community-popover.page.html',
  styleUrls: ['./community-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityPopoverPage implements OnInit {

    count: any;
    @Input() community: any;
    loading: any;
    joinChurchTag: boolean = true;
    editChurchTag: boolean = false;
    leaveChurchTag: boolean = false;

    constructor(private platform: Platform,
                private events: Events,
                private cache: CacheService,
                private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private popoverCtrl: PopoverController,
                private resourceService: Resource,
                private userData: UserData) { }

    ngOnInit() {
        if (this.community){
            this.setTag();
        }
    }

    setTag() {
        this.community.members.forEach((member: any) => {
            if (member._id == this.userData.user._id) {
                this.joinChurchTag = false;
                this.editChurchTag = false;
                this.leaveChurchTag = true;
            }
        });
        this.community.admins.forEach((admin: any) => {
            if (admin._id == this.userData.user._id) {
                this.joinChurchTag = false;
                this.editChurchTag = true;
                this.leaveChurchTag = true;
                this.userData.currentCommunityAdminStatus = true;
            }
        });
    }

    async invite() {
        this.popoverCtrl.dismiss();
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
        const actionSheet = await this.actionSheetCtrl.create({header: 'Invite a Friend', buttons: buttons, cssClass: 'level-10'});
        await actionSheet.present();
    }

    async invitePage(type) {
        const invitePage = await this.modalCtrl.create({component: InvitetoconnectPage, componentProps: {type: type}});
        await invitePage.present();
    }


    async joinCommunity() {
        this.popoverCtrl.dismiss();
        try {
            let data = await this.userData.joinCommunity(this.community);
            if (data === "cancel") return;
            const alert = await this.alertCtrl.create({
                header: 'Success',
                message: 'Added to My Community.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        this.popoverCtrl.dismiss();
                    }}],
                cssClass: 'level-15'
            });
            await alert.present();
        }
        catch(err){
            console.log("failed to add to My Community");
        }
    }

    async leaveCommunity() {
        this.popoverCtrl.dismiss();
        let alert = await this.alertCtrl.create({
            header: 'Warning',
            message: 'Are you sure you want to leave this community? You will also be removed from all its groups.',
            buttons: [{ text: 'Yes',
                handler: () => {
                    let navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        //Remove from database
                        await this.userData.leaveCommunity(this.community._id);
                        this.events.publish('refreshDashboardPage');
                        this.userData.refreshMyConversations({action: 'reload', conversationId: 'all'});
                        this.events.publish('refreshCommunityBoardsPage');
                        this.userData.refreshUserStatus({type: 'change community'});
                    });
                }},
                {   text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async editCommunity() {
        let industries = [];
        this.resourceService.load('en-US', "Industry").subscribe(async (fields: any) => {
            for (let i = 0; i < fields.length; i++) {
                industries.push({_id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false});
            }
            this.popoverCtrl.dismiss();
            let editCommunityModal = await this.modalCtrl.create({
                component: EditcommunityPage,
                componentProps: {community: this.community, industries: industries}
            });
            await editCommunityModal.present();
        }, async (err) => {
            console.log("failed to load resources");
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        });
    }

    close() {
        this.popoverCtrl.dismiss();
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

}
