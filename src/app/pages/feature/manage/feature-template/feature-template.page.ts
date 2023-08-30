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
  selector: 'app-feature-template',
  templateUrl: './feature-template.page.html',
  styleUrls: ['./feature-template.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CalendarService ]
})

export class FeatureTemplatePage extends EditfeaturePage implements OnInit {

  @Input() id: any;

  resource: any;
  hasOrganizerAccess = false;
  schedules: any;
  notes_schedule: any;
  menu: any;
  timeoutHandle: any;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: any = [];
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
      this.loadSchedules();
      await this.setup();
    }
  };

  async loadSchedules() {
    // check to see if it has any schedules
    if (this.id) {
      const schedules: any = await this.momentService.loadActivitySchedules(this.id);
      this.schedules = schedules.filter((c) => c.options && c.options.recurrence && c.options.recurrence === 'weekly' && c.options.recurrenceByDay && c.options.recurrenceByDay.length && (c.array_boolean.length <= 5) || (c.array_boolean.length > 5) && !c.array_boolean[5]);
      this.notes_schedule = schedules.find((c) => (c.array_boolean.length > 5) && c.array_boolean[5]);
      this.schedules.sort((a, b) => b.options && b.options.recurrence ? 1 : -1);
      /*this.schedules.map((c) => {
        c.startDate = new Date(new Date(c.startDate).getTime() - ((c.options.timezoneOffset || 0) * 60000));
        c.endDate = new Date(new Date(c.endDate).getTime() - ((c.options.timezoneOffset || 0) * 60000));
        c.options.recurrenceEndDate = new Date(new Date(c.recurrenceEndDate).getTime() - ((c.options.timezoneOffset || 0) * 60000));
      });*/
      //console.log("schedules", this.schedules);

      this.events = [];
      const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      this.viewDate = startOfWeek(this.schedules.length ? new Date(this.schedules[0].startDate) : new Date()); // viewDate is always a Sunday for iterating purposes
      this.schedules.forEach((schedule) => {
        if (schedule && schedule.child_moments && schedule.child_moments.length) {
          schedule.options.recurrenceByDay.split(',').forEach((dayOfWeekName, index) => {
            this.events.push({
              start: setDay(new Date(schedule.startDate), days.indexOf(dayOfWeekName)),
              end: setDay(new Date(schedule.endDate), days.indexOf(dayOfWeekName)),
              schedule: schedule._id,
              title: schedule.child_moments[index % schedule.child_moments.length].matrix_string[0],
              color: { ...colors.red },
              allDay: false,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true });
          });
        }
      });
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

