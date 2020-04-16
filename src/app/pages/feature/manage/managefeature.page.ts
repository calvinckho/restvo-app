import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {ActivatedRoute, Router} from "@angular/router";
import {CacheService} from "ionic-cache";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  Platform, PopoverController, ToastController
} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {NetworkService} from "../../../services/network-service.service";
import {Resource} from "../../../services/resource.service";
import {Response} from "../../../services/response.service";
import {Moment} from "../../../services/moment.service";
import {Chat} from "../../../services/chat.service";
import {CalendarService} from "../../../services/calendar.service";
import {EditfeaturePage} from "../editfeature/editfeature.page";
import {Churches} from "../../../services/church.service";
import {Groups} from "../../../services/group.service";
import {Aws} from "../../../services/aws.service";
import {FeatureInsightPage} from "./feature-insight/feature-insight.page";
import {EditparticipantsPage} from "../editparticipants/editparticipants.page";
import {FeatureChildActivitiesPage} from "./feature-childactivities/feature-childactivities.page";
import {FeatureSchedulePage} from "./feature-schedule/feature-schedule.page";
import {FeatureBillingPage} from "./feature-billing/feature-billing.page";
import {FeatureSubscriptionPage} from "./feature-subscription/feature-subscription.page";
import {PaymentService} from "../../../services/payment.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-managefeature',
  templateUrl: './managefeature.page.html',
  styleUrls: ['./managefeature.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagefeaturePage extends EditfeaturePage implements OnInit {

  selectedMenuOption = '';
  menu: any;
  schedules: any;
  selectedSchedule: any;
  stripeCustomer: any;

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
      public paymentService: PaymentService,
      private storage: Storage
  ) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.platform.width() >= 768 && this.router.url.includes('profile')) {
      this.selectedMenuOption = 'profile';
    }
  }

  reloadEditPage = async () => { // refresh the Edit Page
    if (this.userData.user) {
      const momentId = (this.moment && this.moment._id) ? this.moment._id : this.route.snapshot.paramMap.get('id');
      if (!this.modalPage) {
        this.userData.currentManageActivityId = momentId;
        this.storage.set('currentManageActivityId', momentId);
      }
      this.loadSchedules(momentId);

      await this.setup(); // need to load Editfeature's setup() because reloadEditPage overrides the parent handler of the same name
      if (this.moment && this.moment.categories.includes('5c915324e172e4e64590e346') && this.moment.subscriptionId) { // only check if it is a Community
        this.stripeCustomer = await this.paymentService.loadCustomer(this.moment._id);
      }
    }
  };

  async loadSchedules(momentId) {
    // check to see if it has any schedules
    this.schedules = await this.momentService.loadActivitySchedules(momentId);
  }

  async clickManageMenu(menuOption, selectedSchedule) {
    this.menu = [
      {
        url: 'insight',
        label: 'Insight',
        component: FeatureInsightPage,
      },
      {
        url: 'profile',
        label: 'Profile',
        component: null, // this is not required as we are using event to open this component to avoid circular dependency
      },
      {
        url: 'people',
        label: 'People',
        component: EditparticipantsPage,
      },
      {
        url: 'programs',
        label: 'Programs',
        categoryId: '5c915475e172e4e64590e348', // program's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5c915475e172e4e64590e348',
        }
      },
      {
        url: 'relationships',
        label: 'Relationships',
        categoryId: '5dfdbb547b00ea76b75e5a70', // relationship's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5dfdbb547b00ea76b75e5a70',
        }
      },
      {
        url: 'plans',
        label: 'Plans',
        categoryId: '5c915476e172e4e64590e349', // plan's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5c915476e172e4e64590e349',
        }
      },
      {
        url: 'contents',
        label: 'Contents',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5e1bbda67b00ea76b75e5a73',
        }
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
      {
        url: 'onboarding',
        label: 'Onboarding Processes',
        component: null, // this is not required as we are using event to open this component to avoid circular dependency
        params: { programId: this.moment._id, organizer: true, showHeader: false }
      },
      {
        url: 'billing',
        label: 'Billing',
        component: FeatureBillingPage,
      },
      {
        url: 'subscription',
        label: 'Subscription',
        component: FeatureSubscriptionPage,
      },
    ];
    const menuItem = this.menu.find((c) => c.url === menuOption);
    if (this.platform.width() >= 768) {
      this.selectedMenuOption = menuOption;
      this.router.navigate(['/app/manage/activity/' + this.moment._id + '/' + menuOption + '/' + this.moment._id, (menuItem.params || {}) ], { replaceUrl: true });
    } else {
      this.selectedMenuOption = '';
      if (menuOption === 'onboarding') {
        this.momentService.openPreferences({ programId: this.moment._id, organizer: true, modalPage: true });
      } else if (menuOption === 'profile') {
        this.momentService.openMoment( { moment: this.moment, modalPage: true });
      } else {
        const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: { moment: this.moment, categoryId: menuItem.categoryId, parentCategoryId: menuItem.parentCategoryId, title: menuItem.label, scheduleId: (selectedSchedule ? selectedSchedule._id : null), modalPage: true } });
        await manageModal.present();
      }
    }
    if (selectedSchedule) {
      this.selectedSchedule = selectedSchedule;
    }
  }

  async switchToUserView() {
    if (this.platform.width() >= 768) {
      this.router.navigate(['/app/activity/' + this.moment._id], {replaceUrl: false});
    } else {
      if (this.modalPage) {
        this.closeModal(false);
      }
      this.momentService.openMoment( {moment: this.moment, modalPage: true});
    }
  }

  async edit() {
    if (this.modalPage) {
      const editModal = await this.modalCtrl.create({component: EditfeaturePage, componentProps: { moment: this.moment, modalPage: true }});
      await editModal.present();
    } else {
      this.router.navigate(['/app/edit/' + this.moment._id]);
    }
  }

  async changeManageActivity(event) {
    event.stopPropagation();
    this.storage.set('currentManageActivityId', event.detail.value);
    this.userData.currentManageActivityId = event.detail.value;
    if (!this.modalPage) {
      this.router.navigate(['/app/manage/activity/' + event.detail.value + '/insight/' + event.detail.value]);
    } // modal view cannot change Activity
  }
}
