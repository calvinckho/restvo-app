import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EditfeaturePage} from "../editfeature/editfeature.page";
import {Churches} from "../../../services/church.service";
import {
    ActionSheetController,
    AlertController,
    IonSlides,
    LoadingController,
    ModalController,
    Platform,
    PopoverController,
    ToastController
} from "@ionic/angular";
import {Chat} from "../../../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserData} from "../../../services/user.service";
import {Location} from "@angular/common";
import {Response} from "../../../services/response.service";
import {CacheService} from "ionic-cache";
import {NetworkService} from "../../../services/network-service.service";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {Aws} from "../../../services/aws.service";
import {CalendarService} from "../../../services/calendar.service";
import {Moment} from "../../../services/moment.service";
import {Groups} from "../../../services/group.service";
import {Resource} from "../../../services/resource.service";
import {EditparticipantsPage} from "../editparticipants/editparticipants.page";

@Component({
  selector: 'app-createfeature',
  templateUrl: './createfeature.page.html',
  styleUrls: ['./createfeature.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreatefeaturePage extends EditfeaturePage implements OnInit {
    @ViewChild(IonSlides, {static: false}) slides: IonSlides;

    createReachedEnd = false;
    tutorialReachedEnd = false;
    view = 'create';
    ionSpinner = false;

  constructor(
      public cache: CacheService,
      public route: ActivatedRoute,
      public router: Router,
      public location: Location,
      public electronService: ElectronService,
      public swUpdate: SwUpdate,
      public change: ChangeDetectorRef,
      public platform: Platform,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController,
      public actionSheetCtrl: ActionSheetController,
      public popoverCtrl: PopoverController,
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController,
      public chatService: Chat,
      public churchService: Churches,
      public groupService: Groups,
      public networkService: NetworkService,
      public userData: UserData,
      public awsService: Aws,
      public momentService: Moment,
      public resourceService: Resource,
      public responseService: Response,
      public calendarService: CalendarService
  ) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

    ionViewWillEnter() {
        // re-entering edit on Desktop only, overrides Editfeature ionViewWillEnter()
        if (this.userData.user && !this.modalPage) {
            this.setup();
        }
    }

    async clickNextButton(direction) {
        if (!this.moment) return;
        if (direction === 'prev') {
            this.slides.slidePrev();
        } else {
            // assuming it is Community creation and moving from Slide 1 will assign it with the Community category
            this.moment.categories = ['5c915324e172e4e64590e346'];
            this.slides.slideNext();
        }
    }

    async changeSlide(type) {
      if (type === 'create') {
          this.createReachedEnd = await this.slides.isEnd();
      } else {
          this.tutorialReachedEnd = await this.slides.isEnd();
      }
    }

    async saveStep1() {
      this.ionSpinner = true;
      this.moment.array_boolean[5] = true; // turn on chat for participants
      await this.saveActivity(false);
      // update reference Activities with the newly created Community Id
      const promises = this.referenceActivities.map( async (referenceActivity) => {
          referenceActivity.parent_programs.push(this.moment._id);
          await this.momentService.update(referenceActivity);
      });
      await Promise.all(promises);
      this.participantsView = 'leaders'; //switch to leaders view as default
      this.view = 'tutorial';
    }

    loadedTutorialSlides() {
      this.ionSpinner = false;
    }

    async inviteToJoinCommunity() {
        const modal = await this.modalCtrl.create({component: EditparticipantsPage, componentProps: { moment: this.moment, title: this.resource['en-US'].value[32] + ' to ' + this.moment.matrix_string[0][0], modalPage: true }});
        await modal.present();
    }

    async inviteToJoinProgram(index) {
      this.momentService.initiateParticipantsView(this.referenceActivities[index], null);
    }

    async completeSetup(refreshNeeded) {
        this.destroyPlayers(null);
        this.awsService.cleanUp(this.moment._id, true); // clean up the temporarily uploaded media
        /*const promises = this.removedMoments.map( async (moment) => {
            console.log('removing abandoned Programs', moment);
            await this.momentService.delete(moment);
        });
        await Promise.all(promises);*/
        if (this.subscriptions.hasOwnProperty('refreshUserStatus')) {
            this.subscriptions['refreshUserStatus'].unsubscribe(this.reloadEditPage);
        }
        if (this.subscriptions.hasOwnProperty('refreshMoment')) {
            this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
        }
        if (this.modalPage) {
            this.modalCtrl.dismiss(refreshNeeded);
            setTimeout(() => {
                this.resetPage();
                this.momentService.manageMoment({ moment: this.moment, modalPage: true });
            }, 500);
        } else {
            //this.location.back();
            //this.userData.refreshUserStatus({});
            this.router.navigate(['/app/manage/activity/' + this.moment._id + '/profile/' + this.moment._id], {replaceUrl: false});
            this.resetPage();
        }
        this.awsService.sessionAllowedCount = 1; // reset the allowed files count to 1
    }

    resetPage() {
        this.initialSetupCompleted = false;
        this.moment = null;
        this.view = 'create';
        this.createReachedEnd = false;
        this.tutorialReachedEnd = false;
    }
}
