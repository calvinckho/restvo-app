import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, Events, ModalController, Platform} from "@ionic/angular";
import {Moment} from "../../../../services/moment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {UserData} from "../../../../services/user.service";
import {Resource} from "../../../../services/resource.service";
import {CalendarService} from "../../../../services/calendar.service";
import {FeatureChildActivitiesPage} from "../feature-childactivities/feature-childactivities.page";

@Component({
  selector: 'app-feature-schedule',
  templateUrl: './feature-schedule.page.html',
  styleUrls: ['./feature-schedule.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureSchedulePage extends FeatureChildActivitiesPage implements OnInit {

  @Input() modalPage: any;
  @Input() moment: any; // the program object
  @Input() schedule: any; // the schedule object
  @Input() parentCategoryId: any; // the category ID
  scheduleId: any;
  programId: any;
  ionSpinner = false;
  searchKeyword = '';
  view = 'timeline';

  timeline = [];
  calendaritems = [];

  recurrenceStartDate = new Date();
  recurrenceEndDate = new Date();
  recurrenceStartTime: string;
  recurrenceEndTime: string;
  allDay = false;
  dateType = ''; // specifies if user is changing start date or end date

  scheduleObj = {       // create the schedule object
    parent_moments: [], // the Plan's or other parent Activity's ID (expects only 1 parent)
    child_moments: [], // the items in the Schedule (e.g. lessons)
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().getTime() + 3600000).toISOString(), // default 1 hour duration
    options: { // the details of the repeating schedule
      firstReminderMinutes: 0, // reminder setting 1 in min
      secondReminderMinutes: 0, // reminder setting 1 in min
      recurrence: '', // enum: ['daily', 'weekly', 'monthly', 'yearly']
      recurrenceInterval: 1,  // e.g. once every 2 months, default: 1
      recurrenceEndDate: new Date().toISOString(), // leave null to add events into infinity and beyond
    },
    array_boolean: [ null, null, true, false, true ] // default is to add to both participant's and mentor's timeline
  };

  calendarObj = { // create the calendar object for each timeline content
    moment: '', // the Content object ID
    title: '',
    startDateObj: new Date(), // cache datetime info for computation only. backend datetime format is in ISOString
    endDateObj: new Date(), // cache datetime info for computation only. backend datetime format is in ISOString
    startDate: '',
    endDate: '',
    options: { // the details of the repeating schedule
      firstReminderMinutes: 0, // reminder setting 1 in min
      secondReminderMinutes: 0, // reminder setting 1 in min
    }
  };

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public events: Events,
      public platform: Platform,
      public alertCtrl: AlertController,
      public authService: Auth,
      public chatService: Chat,
      public calendarService: CalendarService,
      public userData: UserData,
      public momentService: Moment,
      public resourceService: Resource,
      public modalCtrl: ModalController
  ) {
    super(route, router, events, platform, authService, chatService,
        userData, momentService, resourceService, modalCtrl);
  }

  async ngOnInit() {
    super.ngOnInit();
    await this.resourceService.loadSystemResources();
    this.setupSchedulePage();
  }

  refreshUserStatusHandler = async () => {
    this.setupSchedulePage();
    this.setupChildActivitiesPage();
  };

  async setupSchedulePage() {
    if (this.userData && this.userData.user) {
      if (this.moment) {
        this.programId = this.moment._id;
      } else {
        this.programId = this.route.snapshot.paramMap.get('id');
      }
      this.scheduleId = this.scheduleId || this.route.snapshot.paramMap.get('scheduleId');
      if (this.scheduleId) {
        const result: any = await this.momentService.loadSchedule(this.scheduleId);
        if (result && result.schedule) {
          this.schedule = result.schedule;
          if (!this.schedule.hasOwnProperty('array_boolean')) {
            this.schedule.array_boolean = []; // initialize the property for backward compatibility
          }
          if (this.parentCategoryId !== '5c915476e172e4e64590e349') { // only fetch calendar items for non-Plan
            this.timeline = result.calendaritems;
          }
        }
      } else { // if creating new schedule
          this.schedule = this.scheduleObj;
      }
      this.parentCategoryId = this.parentCategoryId || this.route.snapshot.paramMap.get('parentCategoryId');
      this.schedule.parent_moments = [this.programId]; // for Plan's and Relationship's schedule, parent_moments is used
      this.recurrenceStartDate = new Date(this.schedule.startDate);
      this.recurrenceEndDate = new Date(this.schedule.options.recurrenceEndDate || new Date().toISOString());
      this.recurrenceStartTime = this.recurrenceStartDate.toISOString();
      this.recurrenceEndTime = this.recurrenceEndDate.toISOString();
      this.touchPlanTimeline();
    }
  }

  // open Content requires providing the relationshipId
  async openContent(event, calendarItem) {
    event.stopPropagation();
    let componentProps: any;
    componentProps = { moment: { _id: calendarItem.moment._id }, relationshipId: this.programId, modalPage: true };
    if (calendarItem.uniqueAnswersPerCalendar && calendarItem._id) {
      componentProps.calendarId = calendarItem._id;
    }
    this.events.publish('openMoment', componentProps);
  }

  async promptTouchSchedule() {
    const alert = await this.alertCtrl.create({
      header: 'Re-populate Timeline',
      subHeader: 'You are about to delete your existing timeline and re-populate it. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Re-populate',
        handler: async () => {
          this.touchSchedule('repopulate timeline');
          }}, { text: 'Cancel' }]
    });
    await alert.present();
  }

  async touchSchedule(operation) {
    if (operation === 'create schedule' || this.schedule._id) {
      this.schedule.startDate = new Date( this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours(), new Date(this.recurrenceStartTime).getMinutes() ).toISOString();
      this.schedule.endDate = new Date( this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours() + 1, new Date(this.recurrenceStartTime).getMinutes() ).toISOString();
      this.schedule.options.recurrenceEndDate = new Date( this.recurrenceEndDate.getFullYear(), this.recurrenceEndDate.getMonth(), this.recurrenceEndDate.getDate(), new Date(this.recurrenceEndTime).getHours(), new Date(this.recurrenceEndTime).getMinutes() ).toISOString();
      if (this.parentCategoryId === '5c915476e172e4e64590e349') {
        // for Plan, auto re-populate the timeline and save the changes
        this.schedule.operation = operation;
        this.touchPlanTimeline();
        await this.momentService.touchSchedule(this.schedule);
      } else {
        // for Activity, either create schedule or send to the backend to repopulate the timeline
        this.schedule.operation = operation;
        await this.momentService.touchSchedule(this.schedule);
      }
    }
  }

  // repopulate the Plan's Timeline
  touchPlanTimeline() {
    if (this.parentCategoryId === '5c915476e172e4e64590e349' && this.schedule.child_moments && this.schedule.child_moments.length) {
      this.timeline = [];
      let i = 0;
      const newContentCalendar = JSON.parse(JSON.stringify(this.calendarObj));
      newContentCalendar.startDateObj = new Date(this.schedule.startDate);
      newContentCalendar.endDateObj = new Date(this.schedule.endDate);

      do {
        newContentCalendar.moment = this.schedule.child_moments[i % this.schedule.child_moments.length];
        newContentCalendar.title = newContentCalendar.moment.matrix_string[0][0];
        newContentCalendar.startDate = newContentCalendar.startDateObj.toISOString();
        newContentCalendar.endDate = newContentCalendar.endDateObj.toISOString();
        this.timeline.push(JSON.parse(JSON.stringify(newContentCalendar)));
        // increment up
        switch (this.schedule.options.recurrence) {
          case 'daily':
            newContentCalendar.startDateObj.setDate(newContentCalendar.startDateObj.getDate() + this.schedule.options.recurrenceInterval);
            newContentCalendar.endDateObj.setDate(newContentCalendar.endDateObj.getDate() + this.schedule.options.recurrenceInterval);
            break;
          case 'weekly':
            newContentCalendar.startDateObj.setDate(newContentCalendar.startDateObj.getDate() + (7 * this.schedule.options.recurrenceInterval));
            newContentCalendar.endDateObj.setDate(newContentCalendar.endDateObj.getDate() + (7 * this.schedule.options.recurrenceInterval));
            break;
          case 'monthly':
            newContentCalendar.startDateObj.setMonth(newContentCalendar.startDateObj.getMonth() + this.schedule.options.recurrenceInterval);
            newContentCalendar.endDateObj.setMonth(newContentCalendar.endDateObj.getMonth() + this.schedule.options.recurrenceInterval);
            break;
          case 'yearly':
            newContentCalendar.startDateObj.setFullYear(newContentCalendar.startDateObj.getFullYear() + this.schedule.options.recurrenceInterval);
            newContentCalendar.endDateObj.setFullYear(newContentCalendar.endDateObj.getFullYear() + this.schedule.options.recurrenceInterval);
            break;
          default:
            newContentCalendar.startDateObj = new Date(this.schedule.startDate);
            newContentCalendar.endDateObj = new Date(this.schedule.endDate);
            i = 730; // break out from the do while loop
            break;
        }
        i++;
      } while ((newContentCalendar.startDateObj.getTime() <= new Date(this.schedule.options.recurrenceEndDate).getTime()) && (i <= 730));
    }
  }

  focusCalendarDateField(type) {
    this.calendarService.calendar.currentViewDate = type === 'start' ? this.recurrenceStartDate : this.recurrenceEndDate;
    this.calendarService.updateViewCalendar();
    this.dateType = type;
  }

  changeSelectedDate( inputDate ) {
    if (inputDate === ' ') return;
    if ( this.dateType === 'start' ) {
      this.recurrenceStartDate = inputDate;
      this.calendarService.calendar.selectedDate = inputDate;
      this.calendarService.calendar.currentViewDate = this.recurrenceEndDate;
      this.dateType = 'end';
    } else if (this.dateType === 'end') {
      this.recurrenceEndDate = inputDate;
      this.dateType = '';
      this.calendarService.calendar.selectedDate = inputDate;
    }
    this.calendarService.updateViewCalendar();
    if (this.parentCategoryId === '5c915476e172e4e64590e349') { // only auto populate for Plans
      this.touchSchedule('update schedule');
    }
  }

  async deleteSchedule() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Schedule',
      subHeader: 'You are about to delete this schedule. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Remove',
        handler: async () => {
          alert.dismiss();
          this.schedule.operation = 'delete schedule';
          await this.momentService.touchSchedule(this.schedule);
          this.router.navigate(['/app/manage/activity/' + this.programId + '/profile/' + this.programId ], { replaceUrl: true });
        }}, { text: 'Cancel' }]
    });
    await alert.present();
  }

  reorderContents(event) {
    this.schedule.child_moments = event.detail.complete(this.schedule.child_moments);
    this.schedule.operation = 'update schedule';
    this.momentService.touchSchedule(this.schedule);
  }

  reorderArray(array, from, to) {
    const draggedItem = array.splice(from, 1)[0];
    array.splice(to, 0, draggedItem);
    return array;
  }

  async chooseContent(content) {
    this.schedule.child_moments.push(content);
    this.schedule.operation = 'update schedule';
    await this.momentService.touchSchedule(this.schedule);
  }

  async removeContent(event, index) {
    event.stopPropagation();
    this.schedule.child_moments.splice(index, 1);
    this.schedule.operation = 'update schedule';
    await this.momentService.touchSchedule(this.schedule);
  }

  async removeTimelineItem(event, momentId, calendaritem) {
    event.stopPropagation();
    await this.momentService.touchContentCalendarItems(momentId, {operation: 'delete calendar items',  calendaritems: [calendaritem]});
  }

  // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
  customTrackBy(index: number, item: any): any {
    return index;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
