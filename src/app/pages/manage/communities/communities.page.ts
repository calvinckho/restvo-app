import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {EditcommunityPage} from "../../community/editcommunity/editcommunity.page";
import {ShowcommunityPage} from "../../community/showcommunity/showcommunity.page";
import {
    ActionSheetController,
    AlertController, Events,
    IonInfiniteScroll,
    ModalController,
    Platform,
    PopoverController
} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Resource} from "../../../services/resource.service";
import {Storage} from "@ionic/storage";
import {Auth} from "../../../services/auth.service";
import {Chat} from "../../../services/chat.service";
import {Churches} from "../../../services/church.service";

@Component({
  selector: 'app-communities',
  templateUrl: './communities.page.html',
  styleUrls: ['./communities.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CommunitiesPage {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @Input() modalPage: any;

    subscriptions: any = {};
    communities = [];
    ionSpinner = false;
    community: any;
    pageNum: number = 0;
    reachedEnd: boolean = false;
    conversation: any;
    members: any = [];
    searchKeyword = '';
    refreshNeeded = false;

    constructor(
                private events: Events,
                private storage: Storage,
                private platform: Platform,
                private authService: Auth,
                private chatService: Chat,
                public userData: UserData,
                private churchService: Churches,
                private resourceService: Resource,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController,) { }

    ionViewWillEnter() {
        if (this.userData && this.userData.currentCommunityAdminStatus) {
            this.setupManageCommunities();
        }

        // link refresh user status observable with refresh handler
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = (data) => {
        if (data.type === 'update admin' || data.type === 'change aux data'){
            this.setupManageCommunities();
        }
    };

    //-----------------------------------
    // methods to search for communities
    //-----------------------------------

    async setupManageCommunities() {
        setTimeout(async () => {
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.communities = [];
            this.pageNum = 0;
            this.manageMoreCommunities({target: this.infiniteScroll});
        }, 500);
    }

    async manageMoreCommunities(event){
        this.pageNum++;
        if (!this.reachedEnd){
            const communities: any = await this.userData.loadMyAdminChurches(this.searchKeyword.toLowerCase(), this.pageNum);
            this.ionSpinner = false;
            if (!communities.length){
                this.reachedEnd = true;
                event.target.disabled = true;
            } else {
                communities.forEach((community)=>{
                    const adminIds = community.admins.map((c)=>{return c._id;});
                    if (adminIds.indexOf(this.userData.user._id) < 0){
                        if (community.verified) {
                            community.system_verified = true;
                        }
                    } else {
                        community.admin = true;
                    }
                    this.communities.push(community);
                });
            }
            event.target.complete();
        }
        else{
            this.ionSpinner = false;
            event.target.complete();
        }
    }

    async showCommunityProfile(community) {
        const showCommunity = await this.modalCtrl.create({component: ShowcommunityPage,
            componentProps: {community: community, modalPage: true}} );
        await showCommunity.present();
        const {data: refreshNeeded} = await showCommunity.onDidDismiss();
        if (refreshNeeded) {
            this.setupManageCommunities();
        }
    }

    async createNewCommunity() {
        let industries = [];
        this.resourceService.load('en-US', "Industry").subscribe(async (fields: any) => {
            for(let i = 0; i < fields.length; i++){
                console.log("id", fields[i]._id);
                industries.push({_id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false});
            }
            const editCommunity = await this.modalCtrl.create({component: EditcommunityPage, componentProps: {industries: industries}} );
            await editCommunity.present();
            const {data: refreshNeeded} = await editCommunity.onDidDismiss();
            if (refreshNeeded) {
                this.setupManageCommunities();
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

    executeSearch(event){
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManageCommunities();
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    ionViewWillLeave() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    }
}
