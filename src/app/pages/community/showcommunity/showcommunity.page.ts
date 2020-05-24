import {Component, OnInit, Input, ViewEncapsulation, OnDestroy} from '@angular/core';
import { CacheService } from 'ionic-cache';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import * as Plyr from "plyr";
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Churches } from '../../../services/church.service';
import { UserData } from '../../../services/user.service';
import {EditcommunityPage} from "../editcommunity/editcommunity.page";
import {CommunityPopoverPage} from "../community-popover/community-popover.page";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {Resource} from "../../../services/resource.service";

@Component({
  selector: 'app-showcommunity',
  templateUrl: './showcommunity.page.html',
  styleUrls: ['./showcommunity.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowcommunityPage implements OnInit, OnDestroy {

    @Input() community: any = { _id: '' };
    @Input() modalPage: any; // optional: when initialing a modal page
    loading: any;
    joinChurchTag: boolean = true;
    editChurchTag: boolean = false;
    leaveChurchTag: boolean = false;
    refreshNeeded: boolean = false;
    newBoardName: string = '';
    currentPageAdminStatus: boolean = false;
    mediaList: Array<{_id: string, player: Plyr}> = [];
    subscriptions: any = {};

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService,
        private router: Router,
        private storage: Storage,
        public modalCtrl: ModalController,
        private resourceService: Resource,
        private churchService: Churches,
        public userData: UserData,
        private popoverCtrl: PopoverController,
        private alertCtrl: AlertController) {}

    ngOnInit() {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    ionViewWillEnter() {
        if (this.modalPage && this.community._id) { // if called by modalCtrl.create()
            this.loadChurch();
        } else { // if called by router outlet
            this.community._id = this.route.snapshot.paramMap.get('id');
            this.loadChurch();
        }
    }

    refreshHandler = (data) => {
        if (data && data.type === 'refresh community') {
            this.loadChurch();
        }
    };
    
    async loadChurch() {
        [this.community] = await this.churchService.loadChurchProfile(this.community._id);
        this.setTag();
    }

    setTag() {
        if(this.userData && this.userData.user) {
            this.userData.user.churches.forEach((church: any) => {
                if (church._id == this.community._id) {
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
                    this.currentPageAdminStatus = true;
                }
            });
        }
    }

    async presentPopover(event) {
        const popover = await this.popoverCtrl.create({
            component: CommunityPopoverPage,
            componentProps: {community: this.community},
            cssClass: 'level-15',
            event: event});
        await popover.present();
    }

    async addBoard() {
        await this.churchService.editCommunityBoard({action: "create", board: {name: this.newBoardName, church: this.community._id}});
        await this.userData.load();
        this.newBoardName = '';
        this.userData.refreshBoards({ type: 'refresh community board page' });
        this.loadChurch();
    }

    async editBoard(event, board) {
        event.stopPropagation();
        await this.churchService.editCommunityBoard({action: "edit", board: board});
        this.userData.refreshBoards({ type: 'refresh community board page' });
    }

    async deleteBoard(event, board){
        event.stopPropagation();
        const alert = await this.alertCtrl.create({
            header: 'Delete Community Topic', //delete topic
            subHeader: 'Are you sure you want to delete ' + board.name + '? All its posts and comments will also be erased.', //are you sure you want to delete this board
            buttons: [{ text: 'Ok',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then(async () => {
                        await this.churchService.editCommunityBoard({action: "delete", board: board});
                        this.userData.refreshBoards({ type: 'refresh community board page' });
                        this.loadChurch();
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async joinChurch() {
        if (!this.userData.user) {
            this.modalCtrl.dismiss();
            this.router.navigate(['/register', { slide : '0', message: 'To join a community, please sign in or create an account.', exitType: 'slide' }]);
        } else {
            try {
                let data = await this.userData.joinCommunity(this.community); //join and send update user socket.io signal
                if (data === "cancel") return;
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    subHeader: 'Successfully joined ' + this.community.name,
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            this.modalCtrl.dismiss(true);
                        }
                    }],
                    cssClass: 'level-15'
                });
                await alert.present();
            } catch (err) {
                console.log("failed to add to My Community");
            }
        }
    }

    async editChurch() {
        let industries = [];
        this.resourceService.load('en-US', "Industry").subscribe(async (fields: any) => {
            for (let i = 0; i < fields.length; i++){
                console.log("id", fields[i]._id);
                industries.push({_id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false});
            }
            const editCommunityModal = await this.modalCtrl.create({component: EditcommunityPage, componentProps: {community: this.community, industries: industries}});
            await editCommunityModal.present();
            const {data: refreshNeeded} = await editCommunityModal.onDidDismiss();
            if (refreshNeeded) {
                this.refreshNeeded = true;
                //this.loadChurch(); // refresh is handle by the refresh event listener
            }
        }, async (err)=>{
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        });
    }

    async leaveChurch() {
        const alert = await this.alertCtrl.create({
            header: 'Warning',
            subHeader: 'Are you sure you want to leave this community? You will also be removed from all its groups.',
            buttons: [{ text: 'Yes',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        //Remove from database
                        try {
                            await this.userData.leaveCommunity(this.community._id);
                            this.modalCtrl.dismiss(true);
                        }
                        catch(err){
                            console.log(err);
                        }
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async approveCommunity() {
        const alert = await this.alertCtrl.create({
            header: 'Approve Community',
            subHeader: 'Once approved, ' + this.community.name + ' will be listed in the Discover Section. Confirm?',
            buttons: [{ text: 'Yes',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        //Remove from database
                        try {
                            await this.churchService.approveCommunity(this.community._id);
                            await this.loadChurch();
                            this.refreshNeeded = true;
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async unlistCommunity() {
        const alert = await this.alertCtrl.create({
            header: 'Unlist Community',
            subHeader: this.community.name + ' will no longer be displayed in the Discover Section. Confirm?',
            buttons: [{ text: 'Yes',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        //Remove from database
                        try {
                            await this.churchService.unlistCommunity(this.community._id);
                            await this.loadChurch();
                            this.refreshNeeded = true;
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async seeUserInfo(event, user) {
        if (!this.userData.user) return
        event.stopPropagation();
        user.name = user.first_name + " " + user.last_name;
        let recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: user, modalPage: true}});
        await recipientModal.present();
        const {data: refreshNeeded} = await recipientModal.onDidDismiss();
        if (refreshNeeded) {
            this.refreshNeeded = true;
            this.loadChurch();
        }
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    destroyPlayers(mediaId) {
        if (mediaId) {
            const media = this.mediaList.find((c) => {return c._id === mediaId});
            media.player.destroy();
        } else {
            for (const media of this.mediaList) {
                media.player.destroy();
            }
        }
    }

    closeModal() {
        this.destroyPlayers(null);
        if (this.userData.user) {
            this.modalCtrl.dismiss(this.refreshNeeded);
        } else {
            this.router.navigateByUrl('/map');
        }
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

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    }
}
