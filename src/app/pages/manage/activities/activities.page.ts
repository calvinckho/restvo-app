import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  IonInfiniteScroll,
  ModalController,
  Platform,
} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Auth} from "../../../services/auth.service";
import {Chat} from "../../../services/chat.service";
import {UserData} from "../../../services/user.service";
import {Churches} from "../../../services/church.service";
import {Resource} from "../../../services/resource.service";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @Input() modalPage: any;
  activities = [];
  ionSpinner = false;
  pageNum: number = 0;
  reachedEnd: boolean = false;
  conversation: any;
  members: any = [];
  searchKeyword = '';
  refreshNeeded = false;
  subscriptions: any = {};

  constructor(
      public router: Router,
      private storage: Storage,
      private platform: Platform,
      private authService: Auth,
      private chatService: Chat,
      public userData: UserData,
      private churchService: Churches,
      private resourceService: Resource,
      private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.userData && this.userData.currentCommunityAdminStatus && this.churchService.currentManagedCommunity) {
      this.setupManageActivities();
    }

    // PWA fast load listener + reload listener
    this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
  }

  refreshHandler = (data) => {
    if (data && data.type === 'load community ready') {
      this.setupManageActivities();
    }
  };

  //-----------------------------------
  // methods to search for activities
  //-----------------------------------

  async setupManageActivities() {
    setTimeout(async () => {
      this.infiniteScroll.disabled = false;
      this.reachedEnd = false;
      this.activities = [];
      this.pageNum = 0;
      this.manageMoreActivities({target: this.infiniteScroll});
    }, 500);
  }

  async manageMoreActivities(event){
    this.pageNum++;
    if (!this.reachedEnd){
      const activities: any = await this.churchService.loadAllCommunityActivities(this.churchService.currentManagedCommunity._id, this.searchKeyword.toLowerCase(), this.pageNum);
      this.ionSpinner = false;
      if (!activities.length) {
        this.reachedEnd = true;
        event.target.disabled = true;
      } else {
        this.activities.push(...activities);
      }
      event.target.complete();
    } else {
      this.ionSpinner = false;
      event.target.complete();
    }
  }

  async showActivity(activity) {
    if (this.modalPage) {
      const showActivity = await this.modalCtrl.create({component: ShowfeaturePage,
        componentProps: {moment: activity, modalPage: true}} );
      await showActivity.present();
      const {data: refreshNeeded} = await showActivity.onDidDismiss();
      if (refreshNeeded) {
        this.setupManageActivities();
      }
    } else {
      this.router.navigateByUrl('/app/manage/activity/' + activity._id + '/profile/' + activity._id);
    }
  }

  executeSearch(event){
    event.stopPropagation();
    this.ionSpinner = true;
    this.setupManageActivities();
  }

  closeModal(){
    this.modalCtrl.dismiss(this.refreshNeeded);
  }

  ngOnDestroy(): void {
    this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
  }
}
