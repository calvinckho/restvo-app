import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EditfeaturePage} from "../../editfeature/editfeature.page";
import {
  ActionSheetController,
  AlertController,
  LoadingController, ModalController,
  Platform,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {Chat} from "../../../../services/chat.service";
import {Churches} from "../../../../services/church.service";
import {NetworkService} from "../../../../services/network-service.service";
import {UserData} from "../../../../services/user.service";
import {Aws} from "../../../../services/aws.service";
import {Moment} from "../../../../services/moment.service";
import {Resource} from "../../../../services/resource.service";
import {Response} from "../../../../services/response.service";
import {CalendarService} from "../../../../services/calendar.service";
import {FeatureSchedulePage} from "../feature-schedule/feature-schedule.page";
import {FeatureCurriculumPage} from "../feature-curriculum/feature-curriculum.page";

@Component({
  selector: 'app-feature-creator',
  templateUrl: './feature-creator.page.html',
  styleUrls: ['./feature-creator.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CalendarService ]
})
export class FeatureCreatorPage extends EditfeaturePage implements OnInit {

  @Input() id: any;

  resource: any;
  hasOrganizerAccess = false;
  schedules: any;
  notes_schedule: any;
  menu: any;

  timeoutHandle: any;

  constructor(
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
        chatService, churchService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

  // for Desktop routing, it is possible for user to jump between page views without properly using the back button (closeModal and ngOnDestroy).
  // assumption: leaving the page improperly will lose all unsaved changes. Re-entering will refresh the edit page to its initial state.
  // in such case, ionViewWillEnter listener is used to detect re-entering a page view and reloading the page
  async ionViewWillEnter() {
    // re-entering creator, on Desktop only
    if (this.userData.user && this.moment && this.moment._id && !this.modalPage) {
      await this.setup();
      // load the component logic
    }
  }

  reloadEditPage = async () => {
    // refresh the Edit Page if it has loaded data. it is only called on entry for PWA fast load when authService has completed
    if (this.userData.user && (this.router.url.includes('creator') || this.modalPage)) {
      this.id = (this.moment && this.moment._id) ? this.moment._id : this.route.snapshot.paramMap.get('id');
      this.loadSchedules();
      await this.setup();
    }
  };

  async loadSchedules() {
    // check to see if it has any schedules
    if (this.id) {
      const schedules: any = await this.momentService.loadActivitySchedules(this.id);
      this.schedules = schedules.filter((c) => (c.array_boolean.length <= 5) || (c.array_boolean.length > 5) && !c.array_boolean[5]);
      this.notes_schedule = schedules.find((c) => (c.array_boolean.length > 5) && c.array_boolean[5]);
      this.schedules.sort((a, b) => b.options && b.options.recurrence ? 1 : -1);
    }
  }

  async touchSchedule(event, schedule) {
    event.stopPropagation();
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(async () => {
      const updatedSchedule = JSON.parse(JSON.stringify(schedule));
      updatedSchedule.operation = 'update schedule';
      await this.momentService.touchSchedule(updatedSchedule, false);
    }, 500);
  }

  async clickManageMenu(menuOption, selectedSchedule) {
    let curriculumId = null;
    if (this.schedules.length) {
      let curriculum = this.schedules.find((c) => c.options && c.options.recurrence);
      if (curriculum && curriculum._id) {
        curriculumId = curriculum._id;
      } else {
        curriculumId = this.schedules[0]._id;
      }
    }
    this.menu = [
      {
        url: 'overview',
        label: 'Overview',
        component: EditfeaturePage,
        params: { visibleComponents: '10000,10010,10050,10300' } // for /creator/id/overview/id which is editfeature
      },
      {
        url: 'curriculum',
        label: 'Curriculum',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], // sends in the parent category ID
        component: FeatureCurriculumPage,
        params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73', scheduleId: curriculumId } // sends in the parent category ID
      },
      {
        url: 'schedule',
        label: 'Schedule',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], // sends in the parent category ID
        component: FeatureSchedulePage,
        params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73', scheduleId: selectedSchedule ? selectedSchedule._id : null } // sends in the parent category ID
      },
      {
        url: 'new-schedule',
        label: 'New Schedule',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], // sends in the parent category ID
        component: FeatureSchedulePage,
        params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73' } // sends in the parent category ID
      },
    ];
    const menuItem: any = this.menu.find((c) => c.url === menuOption);
    console.log(menuOption);
    if (this.platform.width() >= 768) {
      this.router.navigate(['/app/manage/activity/' + this.moment._id + '/creator/' + this.id + '/' + menuOption + '/' + this.id, (menuItem.params || {}) ], { replaceUrl: true });
    } else {
      menuItem.params.modalPage = true;
      menuItem.params.moment = this.moment;
      const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: menuItem.params });
      await manageModal.present();
    }
  }
}
