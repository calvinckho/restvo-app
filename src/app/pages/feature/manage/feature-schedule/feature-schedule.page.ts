import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetController, AlertController, IonContent, IonSelect, ModalController, Platform} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Moment} from "../../../../services/moment.service"
import {Response} from "../../../../services/response.service";
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
  @ViewChild('SelectGoals', {static: false}) select: IonSelect;

  @Input() modalPage: any;
  @Input() moment: any; // the program object
  @Input() schedule: any; // the schedule object
  @Input() parentCategoryId: any; // the category ID
  scheduleId: any;
  programId: any;
  ionSpinner = false;
  searchKeyword = '';
  view = 'timeline';
  resource: any;

  timeline = [];
  calendaritems = [];
  responses = [];
  responseTemplate = {
    matrix_string: [],
    matrix_number: [],
    moment: '',
    array_number: []
  };
  responseObj: any = this.responseTemplate;
  listOfDisplayGoals = [];
  selectCalendarItem: any = { goals: [] };
  timeoutHandle: any;

  recurrenceStartDate = new Date();
  recurrenceEndDate = new Date();
  recurrenceStartTime: string;
  recurrenceEndTime: string;
  recurrenceByDay = [];
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
      public responseService: Response
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
          this.timeline = result.calendaritems; // timeline is already sorted in backend, in ascending order
          for (const calendaritem of this.timeline) {
            calendaritem.goals = [];
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
        if (this.schedule.options.recurrenceByDay) {
          this.recurrenceByDay = this.schedule.options.recurrenceByDay.split(',');
        } else {
          this.recurrenceByDay = [this.getWeekDay(this.recurrenceStartDate)];
        }
      }
      await this.loadGoals();
    }
    console.log("line", this.timeline, this.responses)
  }

  async loadGoals() {
    const result: any = await this.resourceService.loadSystemResources();
    this.resource = result.find((c) => c.field === 'Activity Components v2'); // return the activity components resource object in the result array
    const results: any = await this.responseService.findResponsesByMomentId(this.programId, null, null);
    if (results && results.responses) {
      this.responses = results.responses;
    }
    for (const response of this.responses) {
      if (response.user._id === this.userData.user._id) {
        this.responseObj = JSON.parse(JSON.stringify(response)); // load the response object with backend data
      }
    }
    if (this.responses.length) {
      await this.refreshCalendarDisplay();
      const latestResponse = this.responses[this.responses.length - 1];
      this.listOfDisplayGoals = latestResponse.matrix_string.filter((c) => ['goal', 'master goal'].includes(c[1]));
      // update this.responseObj with the latest goals data
      this.responseObj.matrix_string = this.responseObj.matrix_string.filter((c) => !['goal', 'master goal'].includes(c[1]));
      this.responseObj.matrix_string.push(...latestResponse.matrix_string.filter((c) => ['goal', 'master goal'].includes(c[1])));
    }
  }

  refreshCalendarDisplay() {
    for (const response of this.responses) {
      for (const interactable of response.matrix_string) { // process the interactable and schedule responses
        // content calendar list
        for (const calendarItem of this.timeline) {
          if (calendarItem._id === interactable[0] && interactable.length > 10) { // interactable[0] is a String
            calendarItem.goals = interactable.slice(10).filter((c) => this.listOfDisplayGoals.map((c) => c[0]).includes(c)); // grab the goal attributes
          }
        }
        // also update the response Obj, in ascending updatedAt order, so the responseObj will have the latest response data
        const index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(interactable[0]);
        if (index >= 0) {
          this.responseObj.matrix_string.splice(index, 1, interactable);
        } else {
          this.responseObj.matrix_string.push(interactable);
        }
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
    this.schedule.options.recurrenceByDay = this.recurrenceByDay.toString();
    if (this.schedule._id || operation === 'create schedule') {
      this.schedule.startDate = new Date( this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours(), new Date(this.recurrenceStartTime).getMinutes() ).toISOString();
      this.schedule.endDate = new Date( this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours() + 1, new Date(this.recurrenceStartTime).getMinutes() ).toISOString();
      this.schedule.options.recurrenceEndDate = new Date( this.recurrenceEndDate.getFullYear(), this.recurrenceEndDate.getMonth(), this.recurrenceEndDate.getDate(), new Date(this.recurrenceEndTime).getHours(), new Date(this.recurrenceEndTime).getMinutes() ).toISOString();
      // for Activity, either create schedule or send to the backend to repopulate the timeline
      this.schedule.operation = operation;
      schedule = await this.momentService.touchSchedule(this.schedule);
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

  async changeContentCalendarItem(calendaritem, type) {
    if (type === 'date') {
      calendaritem.endDate = calendaritem.startDate;
      this.timeline.sort((a, b) => {
        const e: any = new Date(a.startDate);
        const f: any = new Date(b.startDate);
        return (e - f);
      });
    }
    this.momentService.touchContentCalendarItems(null, {operation: 'update calendar item', calendaritem: calendaritem });
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

  async addContenCalendar(goal) {
    let componentProps: any;
    componentProps = {title: 'Choose from Library', categoryId: this.categoryId, allowCreate: true, allowSwitchCategory: false, scheduleId: this.scheduleId };
    if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
      componentProps.programId = this.momentId;
    } else { // pick other activities
      componentProps.parent_programId = this.momentId;
    }
    if (goal && goal.length) {
      componentProps.goalId = goal[0];
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

  async promptEditContentCalendar(event, calendaritem) {
    event.stopPropagation();
    let actionSheet: any;
    let buttons = [];
    if (calendaritem.moment.user_list_2 && calendaritem.moment.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role)) {
      buttons = buttons.concat([
        {
          text: 'Edit',
          handler: () => {
            const navTransition = actionSheet.dismiss();
            navTransition.then( async () => {
              this.openChildActivity(event, calendaritem.moment, 'edit');
            });
          }
        }]);
    }
    if (this.listOfDisplayGoals.length) {
      buttons = buttons.concat([
        {
          text: 'Assign To',
          handler: () => {
            const navTransition = actionSheet.dismiss();
            navTransition.then( async () => {
              this.select.disabled = true;
              this.selectCalendarItem = calendaritem;
              setTimeout(() => {
                this.select.disabled = false;
                this.select.open(event);
              }, 50);
            });
          }
        }]);
    }
    buttons = buttons.concat([
      {
        text: 'Cancel', // Cancel
        role: 'cancel',
      }]);
    actionSheet = await this.actionSheetCtrl.create({
      header: calendaritem.moment.matrix_string[0][0],
      buttons: buttons,
      cssClass: 'level-15'
    });
    await actionSheet.present();
  }

  async assignGoal() {
    if (!this.select.disabled) {
      if (this.listOfDisplayGoals && this.listOfDisplayGoals.length) {
        const index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(this.selectCalendarItem);
        if (index >= 0) {
          this.responseObj.matrix_string[index].splice(10, this.responseObj.matrix_string[index].length - 10);
          this.responseObj.matrix_string[index].push(...this.selectCalendarItem.goals);
        } else {
          const interactableObj = new Array(10);
          interactableObj[0] = this.selectCalendarItem._id;
          if (this.selectCalendarItem.goals) {
            interactableObj.push(...this.selectCalendarItem.goals);
          }
          this.responseObj.matrix_string.push(interactableObj);
        }
        // save the Goal attributes via Response
        await this.momentService.submitResponse({ _id: this.programId }, this.responseObj, false);
        let socketData: any;
        socketData = {
          calendarId: this.selectCalendarItem._id,
          interactable: this.responseObj.matrix_string.find((c) => c[0] === this.selectCalendarItem._id),
          goals: this.selectCalendarItem.goals,
          author: {
            _id: this.userData.user._id,
            first_name: this.userData.user.first_name,
            last_name: this.userData.user.last_name,
            avatar: this.userData.user.avatar
          }
        };
        // signal parent relationship to update data via socket.io
        this.momentService.socket.emit('refresh moment', this.programId, socketData); // Using the moment service socket.io to signal real time dynamic update for other users in the same momentId room
      }
    }
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
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.openChildActivity(event, content, 'view');
          });
        }
      },
      {
        text: 'Edit', // Edit
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
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.deleteContent(content);
          });
        }
      },
      {
        text: 'Cancel', // Cancel
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

  async promptNewGoalName(event) {
    event.stopPropagation();
    //await this.fabButtons.close();
    const alert = await this.alertCtrl.create({
      header: 'Enter Section Name',
      inputs: [{
        name: 'goalName',
        type: 'text',
        placeholder: 'Section Name'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.addGoal(data.goalName);
          }
        }
      ],
      cssClass: 'level-15'
    });
    await alert.present();
  }

  async addGoal(goalName) {
    for (const color_option of this.resourceService.color_arrays) {
      for (const goal of this.listOfDisplayGoals) {
        if (color_option.color === goal[3]) {
          color_option.status = 'used';
        }
      }
    }
    const goalData = [Math.floor((Math.random() + new Date().getTime()) * 1000).toString(), 'goal', null, this.resourceService.color_arrays.find((c) => !c.status).color, null, goalName];
    this.listOfDisplayGoals.push(goalData);
    this.responseObj.matrix_string.push(goalData);
    this.momentService.submitResponse(this.moment, this.responseObj, false);
    const socketData = {
      goal: goalData,
      author: {
        _id: this.userData.user._id,
        first_name: this.userData.user.first_name,
        last_name: this.userData.user.last_name,
        avatar: this.userData.user.avatar
      }
    };
    this.momentService.socket.emit('refresh moment', this.moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other users in the same momentId room
    //this.content.scrollToBottom(50);
  }

  async removeGoal(goal) {
    let index = this.listOfDisplayGoals.map((c) => c[0]).indexOf(goal[0]);
    if (index >= 0) {
      this.listOfDisplayGoals.splice(index, 1);
    }
    index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(goal[0]);
    if (index >= 0) {
      this.responseObj.matrix_string.splice(index, 1);
    }
    this.momentService.submitResponse(this.moment, this.responseObj, false);
    const socketData = {
      goal: goal,
      action: 'delete',
      author: {
        _id: this.userData.user._id,
        first_name: this.userData.user.first_name,
        last_name: this.userData.user.last_name,
        avatar: this.userData.user.avatar
      }
    };
    this.momentService.socket.emit('refresh moment', this.moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other users in the same momentId room
    // free up the color palette
    for (const color_option of this.resourceService.color_arrays) {
      if (color_option.color === goal[3]) {
        color_option.status = null;
      }
    }
  }

  async touchGoal(goal, type) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      let updatedExistingGoal = false;
      for (const responseInteractable of this.responseObj.matrix_string) {
        if (goal[0] === responseInteractable[0]) {
          if (type === 'text') {
            responseInteractable[5] = goal[5];
          } else if (type === 'master toggle') {
            responseInteractable[1] = goal[1];
          } else if (type === 'assign to master goal') {
            responseInteractable[4] = goal[4];
          }
          updatedExistingGoal = true;
        }
      }
      if (!updatedExistingGoal) {
        this.responseObj.matrix_string.push(goal);
      }
      this.momentService.submitResponse(this.moment, this.responseObj, false);
      const socketData = {
        goal: goal,
        author: {
          _id: this.userData.user._id,
          first_name: this.userData.user.first_name,
          last_name: this.userData.user.last_name,
          avatar: this.userData.user.avatar
        }
      };
      this.momentService.socket.emit('refresh moment', this.moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other users in the same momentId room

    }, type === 'text' ? 500 : 0);
  }

  async moreGoalFunctions(event, goal) {
    event.stopPropagation();
    let buttons = [];
    buttons = buttons.concat([
      {
        text: 'Delete', // Delete Goal
        handler: () => {
          const navTransition = actionSheet.dismiss();
          navTransition.then( async () => {
            this.removeGoal(goal);
          });
        }
      }
    ]);
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: buttons,
      cssClass: 'level-15'
    });
    await actionSheet.present();
  }

  getWeekDay(dateObj) {
    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return days[dateObj.getDay()];
  }

// this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
  customTrackBy(index: number, item: any): any {
    return index;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
