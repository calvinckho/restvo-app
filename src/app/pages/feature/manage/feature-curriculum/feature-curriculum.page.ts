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
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ElectronService} from 'ngx-electron';
import {SwUpdate} from '@angular/service-worker';
import {Chat} from '../../../../services/chat.service';
import {Churches} from '../../../../services/church.service';
import {NetworkService} from '../../../../services/network-service.service';
import {UserData} from '../../../../services/user.service';
import {Aws} from '../../../../services/aws.service';
import {Moment} from '../../../../services/moment.service';
import {Resource} from '../../../../services/resource.service';
import {Response} from '../../../../services/response.service';
import {CalendarService} from '../../../../services/calendar.service';
import {
  startOfWeek,
  isSameDay,
  isSameMonth,
  setDay,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {FeatureSchedulePage} from "../feature-schedule/feature-schedule.page";
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-feature-curriculum',
  templateUrl: './feature-curriculum.page.html',
  styleUrls: ['./feature-curriculum.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CalendarService ]
})
export class FeatureCurriculumPage extends EditfeaturePage implements OnInit {

  @Input() id: any;

  resource: any;
  hasOrganizerAccess = false;
  schedules: any;
  notes_schedule: any;
  menu: any;
  timeoutHandle: any;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  contentCalendarItems: any = [];
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

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
      this.loadContentCalendars();
      await this.setup();
    }
  };

  async loadContentCalendars() {
    // check to see if it has any schedules
    if (this.id) {
      const results: any = await this.calendarService.loadRelationshipContentCalendars(this.id, true);
      //this.contentCalendarItems = results.map((c) => {c.start = new Date(c.startDate); c.end = new Date(c.endDate)}) || [];
      results.forEach((calendarItem, index) => {
        if (index === 0) {
          this.viewDate = new Date(calendarItem.startDate);
        }
        this.contentCalendarItems.push({
          start: new Date(calendarItem.startDate),
          end: new Date(calendarItem.endDate),
          schedule: calendarItem.schedule,
          title: calendarItem.title,
          color: { ...colors.red },
          allDay: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true });
      });
      //console.log("check", this.contentCalendarItems.length, this.contentCalendarItems[0])
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  async clickEvent(event: any) {
    const menuItem: any = {
      url: 'schedule',
      label: 'Schedule',
      categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
      parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], // sends in the parent category ID
      component: FeatureSchedulePage,
      params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73', scheduleId: event.schedule } // sends in the parent category ID
    };
    if (this.platform.width() >= 768) {
      this.router.navigate(['/app/manage/activity/' + this.moment._id + '/creator/' + this.moment._id + '/schedule/' + this.moment._id, (menuItem.params || {}) ], { replaceUrl: true });
    } else {
      menuItem.params.modalPage = true;
      menuItem.params.moment = this.moment;
      const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: menuItem.params });
      await manageModal.present();
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
