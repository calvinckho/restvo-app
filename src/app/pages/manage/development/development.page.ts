import {Component, Input, ViewChild} from '@angular/core';
import {
  Events,
  IonInfiniteScroll,
  ModalController,
  Platform,
} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Auth} from "../../../services/auth.service";
import {Chat} from "../../../services/chat.service";
import {UserData} from "../../../services/user.service";
import {Moment} from "../../../services/moment.service";
import {Resource} from "../../../services/resource.service";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";
import {EditfeaturePage} from "../../feature/editfeature/editfeature.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-development',
  templateUrl: './development.page.html',
  styleUrls: ['./development.page.scss'],
})
export class DevelopmentPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() modalPage: any;
  moments = [];
  ionSpinner = false;
  pageNum: number = 0;
  reachedEnd: boolean = false;
  conversation: any;
  members: any = [];
  searchKeyword = '';
  refreshNeeded = false;

  constructor(
      public router: Router,
      private events: Events,
      private storage: Storage,
      private platform: Platform,
      private authService: Auth,
      private chatService: Chat,
      public userData: UserData,
      public momentService: Moment,
      private resourceService: Resource,
      private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    if (this.userData && this.userData.currentCommunityAdminStatus) {
      this.setupManageActivities();
    }

    // PWA fast load listener + reload listener
    this.events.subscribe('loadCommunityReady', this.refreshHandler);
  }

  refreshHandler = () => {
    this.setupManageActivities();
  };

  //-----------------------------------
  // methods to search for activities
  //-----------------------------------

  async setupManageActivities() {
    setTimeout(async () => {
      this.infiniteScroll.disabled = false;
      this.reachedEnd = false;
      this.moments = [];
      this.pageNum = 0;
      this.manageMoreActivities({target: this.infiniteScroll});
    }, 50);
  }

  async manageMoreActivities(event) {
    this.pageNum++;
    if (!this.reachedEnd) {
      const moments: any = await this.momentService.loadSampleActivities(null);
      this.ionSpinner = false;
      // temp overide the paging function: i.e. only load page 1
        this.reachedEnd = true;
        event.target.disabled = true;
      if (!moments.length) {
        this.reachedEnd = true;
        event.target.disabled = true;
      } else {
        this.moments = moments;
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
      this.router.navigateByUrl('/app/manage/activity/' + activity._id);
    }
  }

  executeSearch(event) {
    event.stopPropagation();
    this.ionSpinner = true;
    this.setupManageActivities();
  }

  async createActivity(event) {
    event.stopPropagation();
    this.ionSpinner = true;
    const editActivity = await this.modalCtrl.create({component: EditfeaturePage, componentProps: { modalPage: true }});
    await editActivity.present();
    this.ionSpinner = false;
    const {data: moment} = await editActivity.onDidDismiss();
    if (moment) {
      this.momentService.share(moment);
      this.setupManageActivities();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(this.refreshNeeded);
  }

  ionViewWillLeave() {
    this.events.unsubscribe('refreshUserStatus', this.refreshHandler);
  }
}
