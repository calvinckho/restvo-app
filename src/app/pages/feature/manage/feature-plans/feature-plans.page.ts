import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PickfeaturePopoverPage} from "../../pickfeature-popover/pickfeature-popover.page";
import {EditfeaturePage} from "../../editfeature/editfeature.page";
import {CacheService} from "ionic-cache";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {
  ActionSheetController,
  AlertController, LoadingController,
  ModalController,
  Platform,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {Chat} from "../../../../services/chat.service";
import {Churches} from "../../../../services/church.service";
import {Groups} from "../../../../services/group.service";
import {NetworkService} from "../../../../services/network-service.service";
import {UserData} from "../../../../services/user.service";
import {Aws} from "../../../../services/aws.service";
import {Moment} from "../../../../services/moment.service";
import {Resource} from "../../../../services/resource.service";
import {Response} from "../../../../services/response.service";
import {CalendarService} from "../../../../services/calendar.service";
import {FeatureCreatorPage} from "../feature-creator/feature-creator.page";

@Component({
  selector: 'app-feature-plans',
  templateUrl: './feature-plans.page.html',
  styleUrls: ['./feature-plans.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeaturePlansPage extends EditfeaturePage implements OnInit {

  planPage = 'createOrChoose';
  planName: any;
  ionSpinner = false;

  selectedSample: any;

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
      public calendarService: CalendarService,
  ) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

  // in Plan, allow the user to choose to clone an Activity from the marketplace
  async chooseFromMarketplace() {
    let componentProps: any;
    componentProps = {title: 'Choose from Available Templates', categoryId: 'all', allowCreate: false, allowSwitchCategory: false };
    if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
      componentProps.programId = this.moment._id;
    } else if (this.categoryId === '5c915476e172e4e64590e349') { // pick plan
      componentProps.parent_programId = this.moment._id;
      componentProps.maxMomentCount = 1;
      if (this.moment.categories.includes('5dfdbb547b00ea76b75e5a70')) { // in relationships, disable create. Only choosing is allowed. It's because creation needs to take place on the program level in order that a Plan's parent_programs is registered correctly
        componentProps.allowCreate = false;
      }
    } else { // pick other activities
      componentProps.parent_programId = this.moment._id;
    }
    if (this.modalPage) {
      componentProps.modalPage = true;
      const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: componentProps});
      await modal.present();
      const {data: moments} = await modal.onDidDismiss();
      if (moments && moments.length) {
        // if choosing Plans as child activities
        if (this.categoryId === '5c915476e172e4e64590e349') {
          // only if To-Do is enabled (e.g. relationships)
          if (this.moment.resource.matrix_number[0].includes(10210)) {
            await this.momentService.adoptPlan({
              operation: 'adopt plan',
              planIds: moments.map((moment) => moment._id),
              parent_programId: this.moment._id,
            });
          }
        } else {
          for (const moment of moments) {
            // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
            moment.calendar = { // reset the calendar
              title: moment.matrix_string[0][0],
              location: '',
              notes: '',
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              options: {
                firstReminderMinutes: 0,
                secondReminderMinutes: 0,
                reminders: []
              }
            };
            moment.parent_programs = [this.moment._id];
          }
          /*const clonedMoments: any = await this.momentService.clone(moments, 'admin'); // clone and do not add admin as participants
          for (const clonedMoment of clonedMoments) {
            const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
            if (index > -1) {
              clonedMoment.resource = moments[index].resource; // clone the populated resource
            }
          }
          this.activities.unshift(...clonedMoments);*/
        }
      }
    } else {
      this.router.navigate(['/app/manage/activity/' + this.moment._id + '/newplan/', componentProps ], { replaceUrl: false });
    }
  }
  
  async loadSample(event) {
    if (event && event.detail && event.detail.value) {
      this.selectedSample = await this.momentService.load(event.detail.value);
    }
  }

  async createPlan() {
    this.ionSpinner = true;
    this.selectedSample.matrix_string[0][0] = this.planName;
    // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
    this.selectedSample.calendar = { // reset the calendar
      title: this.selectedSample.matrix_string[0][0],
      location: '',
      notes: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      options: {
        firstReminderMinutes: 0,
        secondReminderMinutes: 0,
        reminders: []
      }
    };
    this.selectedSample.parent_programs = [this.moment._id];
    const clonedMoments: any = await this.momentService.clone([this.selectedSample], 'admin'); // clone and do not add admin as participants
    this.ionSpinner = false;
    if (clonedMoments && clonedMoments.length) {
      if (this.platform.width() >= 768) {
        this.router.navigate(['/app/manage/activity/' + this.moment._id + '/creator/' + clonedMoments[0]._id + '/overview/' + clonedMoments[0]._id]);
      } else {
        const manageModal = await this.modalCtrl.create({ component: FeatureCreatorPage, componentProps: { moment: clonedMoments[0], modalPage: true } });
        await manageModal.present();
      }
    }
  }

  back() {
    if (this.planPage === 'create') {
      this.planPage = 'createOrChoose';
    } else {
      this.closeModal(false);
    }
  }
}
