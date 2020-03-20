import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {
    IonInfiniteScroll,
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
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MembersPage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @Input() modalPage: any;

    subscriptions: any = {};
    //variables to search people
    ionSpinner = false;
    community: any;
    pageNum: number = 0;
    reachedEnd: boolean = false;
    conversation: any;
    members: any = [];
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
              private modalCtrl: ModalController) { }

    ngOnInit() {
        if (this.userData && this.userData.currentCommunityAdminStatus) {
            this.setupManagePeople();
        }
        // link refreshUserStatus Observable with refresh handler.
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = (data) => {
        // because on first subscription, data is null. this will refresh only under special data.type
        if (data && (data.type === 'load community ready' || data.type === 'update admin' || data.type === 'change aux data' || data.type === 'update member')) {
            this.setupManagePeople();
        }
    };
    //-----------------------------------
    // methods to search for people
    //-----------------------------------

    async setupManagePeople(){
        setTimeout(async () => {
            [this.community] = await this.churchService.loadChurchProfile(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.members = [];
            this.pageNum = 0;
            this.manageMorePeople({target: this.infiniteScroll});
        }, 100);
    }

    async manageMorePeople(event){
        this.pageNum++;
        const adminIds = this.community.admins.map((c) => {return c._id;});
        if (!this.reachedEnd){
            const members: any = await this.churchService.loadListOfChurchMembersProfiles(this.userData.user.churches[this.userData.currentCommunityIndex]._id, this.searchKeyword.toLowerCase(), this.pageNum);
            this.ionSpinner = false;
            if (!members.length){
                this.reachedEnd = true;
                event.target.disabled = true;
            } else {
                members.forEach((member)=>{
                    if (member.wee_user){
                        if (adminIds.indexOf(member.userId) > -1){
                            member.role = "Admin";
                            member.color = "danger";
                        } else {
                            member.role = "Member";
                            member.color = "primary";
                        }
                    } else {
                        member.role = "Database";
                        member.color = "warning";
                    }
                    this.members.push(member);
                });
            }
            event.target.complete();
        }
        else{
            this.ionSpinner = false;
            event.target.complete();
        }
    }

    async editMember(event, member) {
        event.stopPropagation();
        member._id = member.userId;
        const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: member, modalPage: true}});
        await recipientModal.present();
        const {data: needsToRefresh} = await recipientModal.onDidDismiss();
        if (needsToRefresh) {
            console.log("refreshing...");
            this.setupManagePeople();
        }
    }

    executeSearch(event){
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManagePeople();
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    }
}
