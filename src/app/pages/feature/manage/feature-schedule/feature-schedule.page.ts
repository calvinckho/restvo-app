import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetController, AlertController, IonContent, ModalController, Platform} from "@ionic/angular";
import {Moment} from "../../../../services/moment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {UserData} from "../../../../services/user.service";
import {Resource} from "../../../../services/resource.service";
import {CalendarService} from "../../../../services/calendar.service";
import {FeatureChildActivitiesPage} from "../feature-childactivities/feature-childactivities.page";
import {PickfeaturePopoverPage} from "../../pickfeature-popover/pickfeature-popover.page";
import {Location} from "@angular/common";

@Component({
  selector: 'app-feature-schedule',
  templateUrl: './feature-schedule.page.html',
  styleUrls: ['./feature-schedule.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureSchedulePage extends FeatureChildActivitiesPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;

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
    array_boolean: [ true, true, true, false, true ] // default is to enable floating start date, unique answer for each content item, and to add to both participant's and mentor's timeline
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
      public location: Location,
      public platform: Platform,
      public alertCtrl: AlertController,
      public authService: Auth,
      public chatService: Chat,
      public userData: UserData,
      public momentService: Moment,
      public resourceService: Resource,
      public modalCtrl: ModalController,
      public actionSheetCtrl: ActionSheetController,
      public calendarService: CalendarService,
  ) {
    super(route, router, platform, alertCtrl, authService, chatService,
        userData, momentService, resourceService, modalCtrl);
  }

  async ngOnInit() {
    await super.ngOnInit();
    this.setupSchedulePage();
  }

  // because this component extends feature-childactivities.page.ts, the following handler overrides the handler with the same name in the parent component
  reloadChildActivitiesHandler = async () => {
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
      if (this.scheduleId && this.scheduleId !== 'null') {
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
      if (this.schedule) {
        this.parentCategoryId = this.parentCategoryId || this.route.snapshot.paramMap.get('parentCategoryId');
        this.schedule.parent_moments = [this.programId]; // for Plan's and Relationship's schedule, parent_moments is used
        this.recurrenceStartDate = new Date(this.schedule.startDate);
        this.recurrenceEndDate = new Date(this.schedule.options.recurrenceEndDate || new Date().toISOString());
        this.recurrenceStartTime = this.recurrenceStartDate.toISOString();
        this.recurrenceEndTime = this.recurrenceEndDate.toISOString();
        this.touchPlanTimeline();
      }
    }
  }

  // open Content requires providing the relationshipId
  async openContent(event, calendarItem) {
    event.stopPropagation();
    let componentProps: any;
    componentProps = { moment: { _id: calendarItem.moment._id }, momentId: calendarItem.moment._id, relationshipId: this.programId, modalPage: this.platform.width() < 768, subpanel: true };
    if (calendarItem.uniqueAnswersPerCalendar && calendarItem._id) {
      componentProps.calendarId = calendarItem._id;
    }
    this.momentService.openMoment(componentProps);
  }

  async promptTouchSchedule() {
    //await this.touchSchedule('update schedule');
    const alert = await this.alertCtrl.create({
      header: 'Re-populate Timeline',
      subHeader: 'You are about to delete your timeline items between the start and end dates and re-populate them. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Re-populate',
        handler: async () => {
          this.touchSchedule('repopulate timeline');
          }}, { text: 'Cancel' }]
    });
    await alert.present();
  }

  async touchSchedule(operation) {
    let schedule;
    if (operation === 'create schedule' || this.schedule._id) {
      this.schedule.startDate = new Date( this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours(), new Date(this.recurrenceStartTime).getMinutes() ).toISOString();
      this.schedule.endDate = new Date( this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours() + 1, new Date(this.recurrenceStartTime).getMinutes() ).toISOString();
      this.schedule.options.recurrenceEndDate = new Date( this.recurrenceEndDate.getFullYear(), this.recurrenceEndDate.getMonth(), this.recurrenceEndDate.getDate(), new Date(this.recurrenceEndTime).getHours(), new Date(this.recurrenceEndTime).getMinutes() ).toISOString();
      if (this.parentCategoryId === '5c915476e172e4e64590e349') {
        // for Plan, auto re-populate the timeline and save the changes
        this.schedule.operation = operation;
        this.touchPlanTimeline();
        schedule = await this.momentService.touchSchedule(this.schedule);
      } else {
        // for Activity, either create schedule or send to the backend to repopulate the timeline
        this.schedule.operation = operation;
        schedule = await this.momentService.touchSchedule(this.schedule);
      }
      if (operation === 'create schedule' && schedule && schedule._id) {
        this.schedule = schedule;
        if (this.modalPage) {
          this.closeModal();
        } else {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {scheduleId: this.schedule._id},
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
        }
      }
    }
  }

  // repopulate the Timeline (Plan only)
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

  changeSelectedDate(inputDate) {
    if (inputDate === ' ') return;
    if ( this.dateType === 'start' ) {
      this.recurrenceStartDate = inputDate;
      this.calendarService.calendar.selectedDate = new Date(inputDate.getTime());
      this.calendarService.calendar.currentViewDate = this.recurrenceEndDate;
      this.dateType = 'end';
    } else if (this.dateType === 'end') {
      this.recurrenceEndDate = inputDate;
      this.dateType = '';
      this.calendarService.calendar.selectedDate = new Date(inputDate.getTime());
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
          if (this.modalPage) {
            this.closeModal();
          } else {
            this.location.back();
            //this.router.navigate(['/app/manage/activity/' + this.programId + '/profile/' + this.programId ], { replaceUrl: true });
          }
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

  async addContenCalendar() {
    let componentProps: any;
    componentProps = {title: 'Choose from Library', categoryId: this.categoryId, allowCreate: true, allowSwitchCategory: false, scheduleId: this.scheduleId };
    if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
      componentProps.programId = this.momentId;
    } else if (this.categoryId === '5c915476e172e4e64590e349') { // pick plan
      componentProps.parent_programId = this.momentId;
      componentProps.maxMomentCount = 1;
      if (this.moment.categories.includes('5dfdbb547b00ea76b75e5a70')) { // in relationships, disable create. Only choosing is allowed. It's because creation needs to take place on the program level in order that a Plan's parent_programs is registered correctly
        componentProps.allowCreate = false;
      }
    } else { // pick other activities
      componentProps.parent_programId = this.momentId;
    }
    if (this.platform.width() >= 992) {
      componentProps.subpanel = true;
      this.router.navigate([{ outlets: { sub: ['pickfeature', componentProps ] }}]);
    } else {
      componentProps.modalPage = true;
      const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: componentProps});
      await modal.present();
      const {data: moments} = await modal.onDidDismiss();
      let selectedProgram;

      if (moments && moments[0] && moments[0].cloned === 'new') { // cloning a sample.
          // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
        moments[0].calendar = { // reset the calendar
            title: moments[0].matrix_string[0][0],
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
        moments[0].parent_programs = [this.momentId];
        const clonedMoments: any = await this.momentService.clone(moments, 'admin'); // clone and do not add admin as participants
        for (const clonedMoment of clonedMoments) {
          const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
          if (index > -1) {
            clonedMoment.resource = moments[index].resource; // clone the populated resource
          }
        }
        this.activities.unshift(...clonedMoments);
        selectedProgram = clonedMoments[0];
      } else if (moments && moments[0]) {
        selectedProgram = moments[0];
      }
      if (selectedProgram) {
        const newCalendarItem: any = {
          moment: selectedProgram._id,
          title: selectedProgram.matrix_string[0][0],
          schedule: this.schedule._id,
          startDateObj: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()), // cache datetime info for computation only. backend datetime format is in ISOString
          endDateObj: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()), // cache datetime info for computation only. backend datetime format is in ISOString
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(), // cache datetime info for computation only. backend datetime format is in ISOString
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(), // cache datetime info for computation only. backend datetime format is in ISOString
          options: { // the details of the repeating schedule
            firstReminderMinutes: 0, // reminder is defaulted to at the time of the task
          },
          uniqueAnswersPerCalendar: this.schedule.array_boolean[1]
        };
        await this.momentService.touchContentCalendarItems(this.momentId, {operation: 'create calendar item', calendaritem: newCalendarItem });
      }
    }
  }

  // add New Content to Content tab
  async addNewContent() {
    let componentProps: any;
    componentProps = {title: 'Choose from Library', categoryId: this.categoryId, allowCreate: true, allowSwitchCategory: false, disableSelect: true };
    if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
      componentProps.programId = this.momentId;
    } else if (this.categoryId === '5c915476e172e4e64590e349') { // pick plan
      componentProps.parent_programId = this.momentId;
      componentProps.maxMomentCount = 1;
      if (this.moment.categories.includes('5dfdbb547b00ea76b75e5a70')) { // in relationships, disable create. Only choosing is allowed. It's because creation needs to take place on the program level in order that a Plan's parent_programs is registered correctly
        componentProps.allowCreate = false;
      }
    } else { // pick other activities
      componentProps.parent_programId = this.momentId;
    }
    if (this.platform.width() >= 992) {
      componentProps.subpanel = true;
      this.router.navigate([{ outlets: { sub: ['pickfeature', componentProps ] }}]);
    } else {
      componentProps.modalPage = true;
      const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: componentProps});
      await modal.present();
      const {data: moments} = await modal.onDidDismiss();
      let selectedMoment;
      if (moments && moments[0] && moments[0].cloned === 'new') { // cloning a sample.
        // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
        moments[0].calendar = { // reset the calendar
          title: moments[0].matrix_string[0][0],
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
        moments[0].parent_programs = [this.momentId];
        const clonedMoments: any = await this.momentService.clone(moments, 'admin'); // clone and do not add admin as participants
        for (const clonedMoment of clonedMoments) {
          const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
          if (index > -1) {
            clonedMoment.resource = moments[index].resource; // clone the populated resource
          }
        }
        this.activities.unshift(...clonedMoments);
        selectedMoment = clonedMoments[0];
      } else if (moments && moments[0]) { // select is disabled so thi is logically impossible
        selectedMoment = moments[0];
      }
      if (selectedMoment) {
        this.chooseContent(selectedMoment);
      }
    }
  }

  async chooseContent(content) {
    this.schedule.child_moments.push(content);
    this.schedule.operation = 'update schedule';
    await this.momentService.touchSchedule(this.schedule);
    this.content.scrollToBottom(50);
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

  async defaultContentAction(event, content) {
    let actionSheet: any;
    let buttons = [];
    buttons = buttons.concat([
      {
        text: 'Add to Content list',
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.chooseContent(content);
          });
        }
      },
      {
        text: 'View', // View
        //role: 'destructive',
        //icon: 'trash',
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.openChildActivity(event, content, 'view');
          });
        }
      },
      {
        text: 'Edit', // Edit
        //role: 'destructive',
        //icon: 'trash',
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.openChildActivity(event, content, 'edit');
          });
        }
      },
      {
        text: 'Delete', // Delete
        role: 'destructive',
        //icon: 'trash',
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.deleteContent(content);
          });
        }
      },
      {
        text: 'Cancel', // Cancel
        //icon: 'close-circle',
        role: 'cancel',
      }]);
    actionSheet = await this.actionSheetCtrl.create({
      header: content.matrix_string[0][0],
      buttons: buttons,
      cssClass: 'level-15'
    });
    await actionSheet.present();
  }

  async deleteContent(content) {
    const alert = await this.alertCtrl.create({
      header: 'Delete ' + content.resource['en-US'].value[0],
      message: 'Are you sure you want to permanently delete ' + content.matrix_string[0][0] + '? All calendar items that uses this content will also be removed from the timeline.',
      buttons: [{ text: 'Ok',
        handler: () => {
          const navTransition = alert.dismiss();
          navTransition.then( async () => {
            // Remove the Content
            await this.momentService.delete(content);
          });
        }},
        { text: 'Cancel' }],
      cssClass: 'level-15'
    });
    alert.present();
  }

// this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
  customTrackBy(index: number, item: any): any {
    return index;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
