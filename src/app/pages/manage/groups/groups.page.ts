import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GroupchatPage} from "../../group/groupchat/groupchat.page";
import {EditgroupPage} from "../../group/editgroup/editgroup.page";
import {GroupboardPage} from "../../board/groupboard/groupboard.page";
import {
    AlertController, IonInfiniteScroll,
    ModalController,
    Platform,
} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Resource} from "../../../services/resource.service";
import {Storage} from "@ionic/storage";
import {Auth} from "../../../services/auth.service";
import {Chat} from "../../../services/chat.service";
import {Churches} from "../../../services/church.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GroupsPage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    @Input() modalPage: any;
    subscriptions: any = {};
    //variables to search topics
    ionSpinner = false;
    groups: any = [];
    searchKeyword = '';
    refreshNeeded = false;

    constructor(
        private storage: Storage,
        private platform: Platform,
        private authService: Auth,
        private chatService: Chat,
        public userData: UserData,
        private churchService: Churches,
        private resourceService: Resource,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,) { }

    ngOnInit() {
        if (this.userData && this.userData.currentCommunityAdminStatus) {
            this.setupManageGroups();
        }

        // link refresh user observable to refresh handler
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = (data) => {
        if (data.type === 'load community ready' || data.type === 'update admin' || data.type === 'change aux data'){
            this.setupManageGroups();
        }
    };
    //-----------------------------------
    // methods to search for groups
    //-----------------------------------

    //maybe put executeSearch but would have to differentiate for each category
    async setupManageGroups() {
        try {
            const groups: any = await this.churchService.loadAllChurchGroupProfiles(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
            this.groups = [];
            this.ionSpinner = false;
            groups.forEach((group) => {
                if (group.hasOwnProperty('conversation') && (group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) >= 0)) {
                    this.groups.push(group);
                }
            });
            this.groups.sort(function(a,b) {
                const c: any = new Date(a.updatedAt);
                const d: any = new Date(b.updatedAt);
                return (d - c); });
            this.groups.sort(function (a, b) {
                return b.flagged - a.flagged
            });
        } catch (err) {
            this.ionSpinner = false;
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                subHeader: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
            console.log("not allowed");
        }
    }

    async showGroupProfile(group){
        if (group.conversation) {
            this.chatService.currentChatProps.push({
                conversationId: group.conversation,
                name: group.name,
                group: group,
                badge: true,
                page: 'about',
                modalPage: true
            });
            const groupPage = await this.modalCtrl.create({
                component: GroupchatPage,
                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
            });
            await groupPage.present();
            const {data: refreshNeeded} = await groupPage.onDidDismiss();
            if (refreshNeeded) {
                this.setupManageGroups();
            }
        } else {
            const groupBoardPage = await this.modalCtrl.create({component: GroupboardPage, componentProps: {
                    group: group,
                    page: 'board'
                }});
            await groupBoardPage.present();
            const {data: refreshNeeded} = await groupBoardPage.onDidDismiss();
            if (refreshNeeded) {
                this.setupManageGroups();
            }
        }
    }

    async createNewTopic() {
        const editGroupPage = await this.modalCtrl.create({component: EditgroupPage, componentProps: {personalGroup: false, publishGroup: false}});
        await editGroupPage.present();
        const {data: refreshNeeded} = await editGroupPage.onDidDismiss();
        if(refreshNeeded){
            this.setupManageGroups();
        }
    }

    executeSearch(event){
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManageGroups();
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    }
}
