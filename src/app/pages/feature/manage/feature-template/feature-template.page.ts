import {ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EditfeaturePage} from "../../editfeature/editfeature.page";
import {
  ActionSheetController,
  AlertController, IonContent, IonDatetime,
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
  differenceInDays,
  isSameDay,
  isSameMonth,
  setHours,
  setMinutes,
  addDays,
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

  populateStartDate: string = null;
  populateEndDate: string = null;
  resource: any;
  hasOrganizerAccess = false;
  schedules: any;
  selectedScheduleIds: any;
  notes_schedule: any;
  menu: any;
  timeoutHandle: any;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate = new Date();
  events: any = [];
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  progress = 0;
  showOnlyPartialDay = true;

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
      this.schedules = schedules.filter((c) => c.options && (c.array_boolean.length <= 5) || (c.array_boolean.length > 5) && !c.array_boolean[5]);
      this.notes_schedule = schedules.find((c) => (c.array_boolean.length > 5) && c.array_boolean[5]);
      this.schedules.sort((a, b) => b.options && b.options.recurrence ? 1 : -1);
      if (!this.selectedScheduleIds) { // only on first load, subsequent reload will not erase
        this.selectedScheduleIds = this.schedules.map((c) => c._id);
        this.populateStartDate = this.schedules.length ? new Date(this.schedules[0].startDate).toISOString() : new Date().toISOString();
        this.populateEndDate = this.schedules.length ? new Date(this.schedules[0].options.recurrenceEndDate).toISOString() : addDays(new Date(), 6).toISOString();
      }
      this.repopulateTemplate('updated begin date');
    }
  }

  async repopulateTemplate(updatedSlot) {
    if (updatedSlot === 'updated begin date' && new Date(this.populateStartDate).getTime() > new Date(this.populateEndDate).getTime()) {
      this.populateEndDate = JSON.parse(JSON.stringify(this.populateStartDate));
    } else if (updatedSlot === 'updated end date' && new Date(this.populateStartDate).getTime() > new Date(this.populateEndDate).getTime()) {
      this.populateStartDate = JSON.parse(JSON.stringify(this.populateEndDate));
    }
    this.viewDate = new Date(this.populateStartDate);
    this.events = [];
    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    this.schedules.forEach((schedule) => {
      let contentIndex = 0;
      for (let dayIndex = 0; dayIndex <= differenceInDays(new Date(this.populateEndDate), new Date(this.populateStartDate)); dayIndex++) {
        if (schedule && this.selectedScheduleIds.includes(schedule._id) && schedule.options.recurrence === 'weekly' && schedule.child_moments && schedule.child_moments.length && schedule.options.recurrenceByDay.includes(days[addDays(new Date(this.populateStartDate), dayIndex).getDay()]) && (Math.floor(dayIndex / 7) % schedule.options.recurrenceInterval === 0)) {
          this.events.push({
            start: setHours(setMinutes(addDays(new Date(this.populateStartDate), dayIndex), new Date(schedule.startDate).getMinutes()), new Date(schedule.startDate).getHours()),
            end: setHours(setMinutes(addDays(new Date(this.populateStartDate), dayIndex), new Date(schedule.endDate).getMinutes()), new Date(schedule.endDate).getHours()),
            schedule: schedule._id,
            title: schedule.child_moments[contentIndex % schedule.child_moments.length].matrix_string[0],
            color: { ...colors.red },
            allDay: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true });
          contentIndex++;
        }
      }
    });
    this.closeOpenMonthViewDay();
    console.log("check", this.events[0], this.schedules[0])
  }

  async addToCurriculum() {
    const alert = await this.alertCtrl.create({
      header: 'Add to Curriculum',
      subHeader: 'You are about to add the selected templates to your curriculum. All old records in the same date range will be replaced and erased. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Yes',
        handler: async () => {
          const promises = this.schedules.map(async (schedule, index) => {
            schedule.startDate = new Date(new Date(this.populateStartDate).setUTCHours(new Date(schedule.startDate).getHours(), new Date(schedule.startDate).getMinutes())).toISOString();
            schedule.endDate = new Date(new Date(this.populateStartDate).setUTCHours(new Date(schedule.endDate).getHours(), new Date(schedule.endDate).getMinutes())).toISOString();
            schedule.options.recurrenceEndDate = new Date(new Date(this.populateEndDate).setUTCHours(new Date(schedule.options.recurrenceEndDate).getHours(), new Date(schedule.options.recurrenceEndDate).getMinutes())).toISOString();
            schedule.options.timezoneOffset = new Date().getTimezoneOffset(); // update with the start date's local timezone offset
            // for Activity, either create schedule or send to the backend to repopulate the timeline
            schedule.operation = this.selectedScheduleIds.includes(schedule._id) ? 'repopulate timeline' : 'update schedule';
            if (schedule.operation === 'repopulate timeline') {
              await this.momentService.touchSchedule(schedule, false);
              //console.log("schedule", schedule._id, schedule.startDate)
            }
            this.progress = (index + 1) / this.selectedScheduleIds.length;
          });
          await Promise.all(promises);
        }}, { text: 'Cancel' }]
    });
    await alert.present();
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
    menuItem.params.modalPage = true;
    menuItem.params.moment = this.moment;
    const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: menuItem.params });
    await manageModal.present();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
