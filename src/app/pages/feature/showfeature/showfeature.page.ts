import {Component, Input, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {Storage} from "@ionic/storage";
import { ElectronService } from 'ngx-electron';
import {Router, ActivatedRoute} from "@angular/router";
import {CacheService} from 'ionic-cache';
import * as Plyr from "plyr";
import {SwUpdate} from "@angular/service-worker";
import {get} from "scriptjs";
import {
    ActionSheetController,
    AlertController,
    IonContent, IonFab,
    IonInfiniteScroll,
    IonSlides, LoadingController,
    ModalController, PickerController, IonSelect,
    Platform
} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {NetworkService} from "../../../services/network-service.service";
import {Resource} from "../../../services/resource.service";
import {Moment} from "../../../services/moment.service";
import {Chat} from "../../../services/chat.service";
import {CalendarService} from "../../../services/calendar.service";
import {Response} from "../../../services/response.service";
import {MapService} from "../../../services/map.service";
import {Auth} from "../../../services/auth.service";
import {EditfeaturePage} from "../editfeature/editfeature.page";
import {OnboardfeaturePage} from "../onboardfeature/onboardfeature.page";
import {RegisterPage} from "../../user/register/register.page";
import {FocusPhotoPage} from "../../connect/focus-photo/focus-photo.page";
import {Badge} from "@ionic-native/badge/ngx";
import {EditparticipantsPage} from "../editparticipants/editparticipants.page";

@Component({
  selector: 'app-showfeature',
  templateUrl: './showfeature.page.html',
  styleUrls: ['./showfeature.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowfeaturePage implements OnInit, OnDestroy {
    @ViewChild(IonSelect, {static: false}) select: IonSelect;
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild(IonSlides, {static: false}) slides: IonSlides;
    @ViewChild('peopleSlides', {static: false}) peopleSlides: IonSlides;
    @ViewChild('plansSlides', {static: false}) plansSlides: IonSlides;
    @ViewChild('programsSlides', {static: false}) programsSlides: IonSlides;
    @ViewChild('goalsSlides', {static: false}) goalsSlides: IonSlides;
    @ViewChild(IonFab, {static: false}) fabButtons: IonFab;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @Input() moment: any = { _id: '' };
  @Input() modalPage: any; // optional: when initialing a modal page
  @Input() relationshipId: any; // optional: if Content is used in a relationship context
  @Input() calendarId: any; // optional: if Content is used multiple times so it needs to know the content calendar context
  @Input() responseId: any; // optional: if Content has no calendar (repeated content) or if calendar is deleted, use response Id to load response obj

  subpanel = false;
  subscriptions: any = {};
  mode = 'list';
  slideOpts = {
      updateOnWindowResize: true,
      autoHeight: true // turned off autoHeight coz it will mess up the pager position
  };
  loading: any;
  resource: any = {};
  description = '';
  setupPermissionCompleted = false;
  loadStatus: any;
  anyChangeMade = false;
  currentSaveState = '';
  hasAddedToCalendar = false;
  hasParticipantAccess = false;
  hasOrganizerAccess = false;
  hasLeaderAccess = false;
  mapURL = '';
  addressURL = '';
  planModules = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  mediaList: Array<{_id: string, player: Plyr}> = [];
  responseTemplate = {
      matrix_string: [],
      matrix_number: [],
      moment: '',
      array_number: []
  };
  responseObj: any = this.responseTemplate;
  token: any;
  verification_token: any;
  participant_type: any;
  expandedPrivilegesView = false;
  participantLabel = 'Participant';
  organizerLabel = 'Organizer';
  leaderLabel = 'Leader';
    participantsLabel = 'Participants';
    organizersLabel = 'Organizers';
    leadersLabel = 'Leaders';
    hasSpecialPrivilege = false;
    showSpecialAccess = false;
    scheduleViewState = 'current';
    showCurrentSchedule = true;
    showUpcomingSchedule = true;
    showPastSchedule = false;
    joinDisabled = false;

    // 10210 Schedule
    scheduleIds: any = [];
    customSchedule: any;
    toDosPrivate = false;
    adminOrPublicAccessContentCalendars = [];
    newCalendarItem = { // create the calendar object
        moment: '5e3e5743364afa55e52ce785', // the default is the To Do content moment ID
        schedule: '',
        title: null,
        startDateObj: new Date(), // cache datetime info for computation only. backend datetime format is in ISOString
        endDateObj: new Date(), // cache datetime info for computation only. backend datetime format is in ISOString
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        options: { // the details of the repeating schedule
            firstReminderMinutes: 0, // reminder is defaulted to at the time of the task
        },
        uniqueAnswersPerCalendar: null,
    };
    listOfDisplayGoals = [];
    selectedGoal = null;
    progressView = '';

  // 10500 Manage Participants
  participantsView = 'participants';

  // 12000 Notes
    notes: any = [];

  // 20020 Tabs
    tabSelection: number;

  // 30000 poll
  responses = []; // an array of responses
  interactableDisplay: any = {};     // an object of arrays of options to be displayed
  totalVoteCount: any = {};

  // interactables
  timeoutHandle: any;
  quillEditorToolbarConfig = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
  ];

  // 50000 match users
  currentView = 'people';
  reachedEnd = true;
  matchedPeople = [];
  pageNum = 0;
  loadAPIBusy = false;
  searchKeyword = '';
  ionSpinner = false;

  // Plans Sliders
  programsReachedEnd = true;
  programs = [];
  programPageNum = 0;
  categoryIds = [];

  //Slider Button
    peopleSlidesOptions = {
        slidesPerView: 1.1,
        grabCursor: true,
        updateOnWindowResize: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    };
  disablePrevBtn = true;
  disableNextBtn = false;

  // Content Calendar Item
    calendarItem: any;
    dateType = null;
    parentRelationshipListOfGoals = [];
    parentRelationshipGoalAttributes = [];
    parentRelationshipResponseObj: any = this.responseTemplate; // a user can respond to the Content's Relationship

  constructor(
      public zone: NgZone,
      public location: Location,
      public storage: Storage,
      public electronService: ElectronService,
      public badge: Badge,
      public swUpdate: SwUpdate,
      public route: ActivatedRoute,
      public router: Router,
      public cache: CacheService,
      public platform: Platform,
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public pickerCtrl: PickerController,
      public networkService: NetworkService,
      public chatService: Chat,
      public userData: UserData,
      public authService: Auth,
      public mapService: MapService,
      public momentService: Moment,
      public resourceService: Resource,
      public responseService: Response,
      public calendarService: CalendarService) {}

  async ngOnInit() {
      this.subpanel = !!this.route.snapshot.paramMap.get('subpanel');
      this.authService.cachedRouteParams = this.route.snapshot.params;
      this.authService.cachedRouteUrl = this.router.url.split(';')[0];
      this.relationshipId = this.relationshipId || this.route.snapshot.paramMap.get('relationshipId');
      if (this.relationshipId) { // if relationship context is provided (hence it is a Content Calendar), assign it to the responseObj property
          this.responseObj.relationship = this.relationshipId;
          this.parentRelationshipResponseObj.moment = this.relationshipId;
      }
      this.calendarId = this.calendarId || this.route.snapshot.paramMap.get('calendarId');
      const result: any = await this.resourceService.loadSystemResources();
      this.resource = result.find((c) => c.field === 'Activity Components v2'); // return the activity components resource object in the result array
      //this.categories = result.filter((c) => c.field === 'Activity Category'); // return the plan categories array by filtering the result array

      this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
      // link refreshUserStatus observable with the loadMoment handler. It fires on page loads and subsequent user status refresh
      this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.loadAndProcessMomentHandler);
      await this.processVerificationToken();
  }

    /** load and process Moment Handler
     *
     * @param data - data being passed by the refreshUser observable
     *
     * @example OnInit, when the component is intiated, this will get fired
     * @example PWA fast load, this function gets called 2 times. The first time was when user is not yet authenticated
     * the second time, the user is authenticated, and it sends a userRefresh observable signal and activate this handler
     * @example On normal user fresh broadcast
     */

  loadAndProcessMomentHandler = async (data) => {
      // if there are players loaded and one of them is playing or is being paused
      if (this.mediaList.length && this.mediaList.find((c) => (c && c.player && (c.player.playing || (c.player.currentTime > 0))))) {
          // do nothing
      } else { // otherwise refresh
          this.setup(data);
      }
  };

  async setup(data) {
      this.loadStatus = 'loading';
      await this.loadCalendarItem();
      if (this.moment._id) { // if called by modalCtrl.create()
          await this.loadMoment();
      } else { // if called by router outlet
          this.moment._id = this.route.snapshot.paramMap.get('id') || '5d5785b462489003817fee18';
          await this.loadMoment();
      }
      this.categoryIds = this.moment.categories ? this.moment.categories.map((c) => c._id) : [];

      if (this.moment && this.moment._id) {
          // ready to check authentication status
          if (this.authService.token && this.userData.user) {
              this.setupPermission();
          } else {
              this.setupPermissionCompleted = true;
          }
      }
      // load list of plans. it does not require authentication
      await this.loadPrograms();

      // if user has not joined, or if token is provided
      if ((this.authService.token && !this.token && !this.hasParticipantAccess && !this.hasOrganizerAccess && !this.hasLeaderAccess) || this.token) {
          // do not hide special access toolbar
          this.showSpecialAccess = true;
      } else {
          this.hasSpecialPrivilege = true;
      }
      if (data && data.type === 'search map') {
          this.searchMap();
      }
  }

  async loadCalendarItem() {
      if (this.authService.token && this.calendarId && this.relationshipId) {
          this.calendarItem = await this.momentService.touchContentCalendarItems(null, {operation: 'load calendar item', calendarId: this.calendarId});
          if (this.calendarItem && this.calendarItem.uniqueAnswersPerCalendar) { // if calendar context is provided and if it is an unique answer per calendar, also assign it to the responseObj property
              this.responseObj.calendar = this.calendarId;
          }
          // prepare to respond to the parent relationship (i.e. Choose whether the Content Calendar belongs to a Goal, which requires submitting the parentRelationshipResponseObj via submitResponse API
          const results: any = await this.responseService.findResponsesByMomentId(this.relationshipId, null, null);
          if (results && results.responses && results.responses.length) {
              // parentRelationshipResponseObj can only be correctly populated if there is at least 1 response returned
              this.parentRelationshipResponseObj = JSON.parse(JSON.stringify(results.responses[results.responses.length - 1]));
              delete this.parentRelationshipResponseObj._id; // the latest response id is erased, since it may be saved as a new doc
              // parentRelationshipListOfGoals needs to have at least a length of 1 (at least 1 goal) in order to parentRelationshipResponseObj to be sent to the backend
              this.parentRelationshipListOfGoals = results.responses[results.responses.length - 1].matrix_string.filter((c) => c[1] === 'goal'); // goals only. not master goals
              const parentRelationshipInteractable = results.responses[results.responses.length - 1].matrix_string.find((c) => c[0] === this.calendarId);
              if (parentRelationshipInteractable) {
                  this.parentRelationshipGoalAttributes = parentRelationshipInteractable.slice(10);
              }
          }
      }
  }

  refreshCalendarDisplay() {
      // calendarService.calendarItems display has already been refreshed
      // refresh the admin accessed calendars if it has any element (if one has admin access)
      for (const calendarItem of this.adminOrPublicAccessContentCalendars) {
          // check to see if there are upcoming events
          if (new Date(calendarItem.startDate).getTime() < new Date().getTime() - 2 * 24 * 60 * 60 * 1000) {
              calendarItem.status = 'Past';
          } else if (new Date(calendarItem.startDate).getTime() > new Date().getTime() + 2 * 24 * 60 * 60 * 1000) {
              calendarItem.status = 'Upcoming';
          } else {
              calendarItem.status = 'Current';
          }
          calendarItem.completed = false;
      }

      for (const response of this.responses) {
          // if to-dos are not private (if collaborative), or if it is private and the response is created by the user
          const todosPrivacyPermission = !this.toDosPrivate || (this.toDosPrivate && response.user._id === this.userData.user._id);
          // in the event that Goals is turned off, but there are still Goals, so it is goals created by Admins so they are public goals
          const goalsPrivacyPermission = todosPrivacyPermission || ((this.moment.array_boolean.length > 8) && !this.moment.array_boolean[8]);
          for (const interactable of response.matrix_string) { // process the interactable and schedule responses
              // regular user calendar items list
              for (const calendarItem of this.calendarService.calendarItems) {
                  if (todosPrivacyPermission && calendarItem._id === interactable[0] && interactable.length > 5) { // interactable[0] is a String
                      calendarItem.completed = interactable[5]; // check-in state
                  }
                  if (goalsPrivacyPermission && calendarItem._id === interactable[0] && interactable.length > 10) { // interactable[0] is a String
                      calendarItem.goals = interactable.slice(10); // grab the goal attributes
                  }
              }
              // super admin's calendar items list
              for (const calendarItem of this.adminOrPublicAccessContentCalendars) {
                  if (todosPrivacyPermission && calendarItem._id === interactable[0] && interactable.length > 5) { // interactable[0] is a String
                      calendarItem.completed = interactable[5]; // check-in state
                  }
                  if (goalsPrivacyPermission && calendarItem._id === interactable[0] && interactable.length > 10) { // interactable[0] is a String
                      calendarItem.goals = interactable.slice(10); // grab the goal attributes
                  }
              }
              // prepare the responseObj
              // responses is iterated in ascending updatedAt order, so the responseObj will have the latest response data

              // update the response Obj with to-dos data (index 0 - 5)
              if (todosPrivacyPermission && (interactable.length >= 6) && (interactable[1] === null)) { // if it has to-dos data
                  const index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(interactable[0]);
                  if (index >= 0) {
                      this.responseObj.matrix_string[index].splice(0, 5);
                      this.responseObj.matrix_string[index].unshift(...interactable.slice(0, 6));
                  } else {
                      this.responseObj.matrix_string.push(JSON.parse(JSON.stringify(interactable)));
                  }
              }
              if (goalsPrivacyPermission && (interactable.length > 10)) { // if it has goals attributes
                  const index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(interactable[0]);
                  if (index >= 0) {
                      if (this.responseObj.matrix_string[index].length < 10) {
                          this.responseObj.matrix_string[index].fill(null, this.responseObj.matrix_string[index].length, 11);
                      } else if (this.responseObj.matrix_string[index].length > 10) {
                          this.responseObj.matrix_string[index].splice(10, this.responseObj.matrix_string[index].length - 10);
                      }
                      this.responseObj.matrix_string[index].push(...interactable.slice(10));
                  } else {
                      let interactableObj = Array(10);
                      interactableObj[0] = interactable[0];
                      interactableObj.push(...interactable.slice(10));
                      this.responseObj.matrix_string.push(interactableObj);
                  }
              }
          }
      }
  }

  async loadMoment() {
      try {
          this.moment = await this.momentService.load(this.moment._id);
          console.log('loaded moment', this.moment);
      } catch (err) {
          // if the Activity is deleted and it is trying to refresh the page
          if (this.authService.token) {
              this.router.navigate(['/app/me']);
          } else {
              this.router.navigate(['/activity/5d5785b462489003817fee18']);
          }
      }
    if (this.moment) {
        if (this.moment.location && this.moment.location.geo && this.moment.location.geo.coordinates && this.moment.location.geo.coordinates.length) {
            this.mapURL = "https://maps.locationiq.com/v2/staticmap?key=pk.e5797fe100f9aa5732d5346f742b243f&center="+this.moment.location.geo.coordinates[1]+","+this.moment.location.geo.coordinates[0]+"&zoom=12&size=1000x600&maptype=roadmap&markers=icon:%20large-red-cutout%20|"+this.moment.location.geo.coordinates[1]+","+this.moment.location.geo.coordinates[0];
            this.addressURL = "http://maps.google.com/?q=" + this.moment.location.geo.coordinates[1] + "+%2C" + this.moment.location.geo.coordinates[0];
        }
        // initialize the response objects with the correct moment ID
        this.responseObj.moment = this.moment._id;
        // initialize the planModules array
        this.planModules = [];
        if (this.moment.array_moment) {
            this.moment.array_moment.forEach((moment) => {
                this.planModules.push(moment);
            });
        }
        if (this.moment.resource && this.moment.resource.matrix_number && this.moment.resource.matrix_number.length) {
            // if there is any interactable (schedule, poll, m.c., text answers), load responses
            if (this.moment.resource.matrix_number[0].find((c) => (c === 10210) || (c >= 30000 && c <= 49999))) {
                const results: any = await this.responseService.findResponsesByMomentId(this.moment._id, this.relationshipId, ((this.calendarItem && this.calendarItem.uniqueAnswersPerCalendar) ? this.calendarId : null));
                if (results && results.responses) {
                    if (this.responseId) {
                        this.responses = results.responses.filter((c) => c._id === this.responseId);
                    } else {
                        this.responses = results.responses;
                    }
                }
                if (results && results.hasOrganizerLeaderAccess) {
                    this.hasOrganizerAccess = this.hasOrganizerAccess || results.hasOrganizerLeaderAccess;
                }
                for (const response of this.responses) {
                    if (response.user._id === this.userData.user._id) {
                        this.responseObj = JSON.parse(JSON.stringify(response)); // load the response object with backend data
                    }
                }
            }
            console.log("responses", this.responses)
            // if To-Dos is turned on
            if (this.moment.resource.matrix_number[0].find((c) => c === 10210)) {
                const componentId = this.moment.resource.matrix_number[0].indexOf(10210);
                this.toDosPrivate = this.moment.matrix_number[componentId].length > 5 ? this.moment.matrix_number[componentId][5] : false;
                const schedules: any = await this.momentService.loadActivitySchedules(this.moment._id);
                if (schedules) {
                    this.customSchedule = schedules.find((c) => c.options && !c.options.recurrence); // customSchedule is a schedule with options.recurrence set to 'none'
                    this.scheduleIds = schedules.map((c) => c._id);
                }
                // load content calendars from backend.
                // if it has Organizer Access. this is for the event when a Community/Program super admin needs to access the calendar contents
                if (this.hasOrganizerAccess) {
                    const results: any = await this.calendarService.loadRelationshipContentCalendars(this.moment._id, true);
                    this.adminOrPublicAccessContentCalendars = results || [];
                // if it is unauthenticated public view, or it has enabled 'allow authenticated user to access content'
                } else if (!this.authService.token || ((this.moment.array_boolean.length > 10) && this.moment.array_boolean[10])) {
                    const results: any = await this.calendarService.loadRelationshipContentCalendars(this.moment._id, false);
                    this.adminOrPublicAccessContentCalendars = results || [];
                } else { // adminOrPublicAccessContentCalendars is used instead of calendarService.calendarItems, so no need to update user's calendar for Organizer
                    await this.calendarService.getUserCalendar(); // refresh and fetch the latest calendar items
                    this.calendarService.updateViewCalendar(); // this will recalculate the past, current, upcoming flags
                }
                if (this.authService.token && this.userData.user) {
                    await this.setupPermission(); // TODO: investigate if this is required
                }
                this.refreshCalendarDisplay();
                //console.log("adminOrPublicAccessContentCalendars", this.adminOrPublicAccessContentCalendars)
            }
            // if show participants is turned on
            if (this.moment.resource.matrix_number[0].find((c) => c === 10500)) {
                const viewMap = ['participants', 'organizers', 'leaders'];
                this.participantsView = viewMap[this.moment.matrix_number[this.moment.resource.matrix_number[0].indexOf(10500)].indexOf(1) || 0];
            }

            // set up tabs
            if (this.moment.resource.matrix_number[0].find((c) => c === 20020)) {
                if (!this.tabSelection && this.moment.matrix_number[this.moment.resource.matrix_number[0].indexOf(20020)].length > 5) { // assuming at least 1 tab has been created. if no default has been selected, use the first available tab
                    this.tabSelection = JSON.parse(JSON.stringify(this.moment.matrix_number[this.moment.resource.matrix_number[0].indexOf(20020)][0] || this.moment.matrix_number[this.moment.resource.matrix_number[0].indexOf(20020)][5]));
                }
            }

            // check if needed to load notes (12000)
            this.checkAndLoadNotes();

            // set up to display interactables (poll, MC, text answer), schedule + goal, map
            // also for Colloborative component, make sure the responseObj is updated with the lastResponse data
            this.moment.resource.matrix_number[0].forEach((componentId, componentIndex) => {
                if (this.moment.resource.matrix_number[2]) {
                    // interactableId is a Number
                    const interactableId = this.moment.resource.matrix_number[2][componentIndex]; // if interactable, grab the createdAt timestamp
                    if (componentId === 30000) { // poll
                        this.interactableDisplay[interactableId] = [];
                        for (const option of this.moment.matrix_string[componentIndex]) { // set up the poll options
                            this.interactableDisplay[interactableId].push({option: option, count: 0, votedByUser: false});
                        }
                        this.totalVoteCount[interactableId] = 0;
                        this.setupPollDisplay(interactableId, componentIndex);
                    } else if (componentId === 40000) { // multiple choice
                        this.interactableDisplay[interactableId] = [];
                        for (const option of this.moment.matrix_string[componentIndex]) { // set up the interactable options
                            this.interactableDisplay[interactableId].push({option: option, selectedByUser: false});
                        }
                        this.setupInteractableDisplay(interactableId, componentIndex);
                    } else if (componentId === 40010) { // text answer. Note: Collaborative Goals require updating this.responseObj with the latestResponse data
                        // setting the default values of the current interactableDisplay
                        if (!this.interactableDisplay[interactableId]) {
                            this.interactableDisplay[interactableId] = { editor: null, currentSaveState: '' };
                        }
                        // first determine if it is collaborative or private
                        const isCollaborative = (this.moment.matrix_number[componentIndex].length > 1) && this.moment.matrix_number[componentIndex][1];
                        this.interactableDisplay[interactableId].collaborative = isCollaborative;
                        // if collaborative, find the latest Response
                        let latestResponse: any;
                        if (isCollaborative) {
                            // this.responses is sorted by updatedAt (see server), from oldest to newest. therefore latestResponse should have the latest response
                            for (const response of this.responses) {
                                for (const interactable of response.matrix_string) {
                                    if (interactableId.toString() === interactable[0]) { // interactableId is a Number
                                        latestResponse = response;
                                    }
                                }
                            }
                            latestResponse = latestResponse || this.responseTemplate;
                        } else {
                            latestResponse = this.responseObj; // if not collaborative, shows in text editor the user's own response. if null. use an empty template
                        }
                        // setup the Display for Text Answer
                        for (const interactable of latestResponse.matrix_string) { // process the text answer responses
                            if (interactableId.toString() === interactable[0]) { // interactableId is a Number
                                let content: any;
                                if (interactable.length > 2 && interactable[2]) {
                                    content = JSON.parse(interactable[2]);
                                } else { // for backward compatibility before quill, need to build the content object from scratch
                                    content = { ops: [{ insert: interactable[1] + '\n' }] };
                                }
                                this.interactableDisplay[interactableId].content = content; // insert the response data into the display matrix
                                // prep the user's own response Obj, in case response needs to be sent out without the user changing the text answer and it will still grab the latest response text answer
                                let updatedExistingResponse;
                                for (let responseInteractable of this.responseObj.matrix_string) {
                                    if (responseInteractable[0] === interactableId.toString()) { // InteractableId is in Number
                                        responseInteractable = interactable;
                                        updatedExistingResponse = true;
                                    }
                                }
                                if (!updatedExistingResponse) { // add a new entry to array
                                    this.responseObj.matrix_number.push([interactableId]);
                                    this.responseObj.matrix_string.push(interactable);
                                }
                            }
                        }
                    } else if (componentId === 40020) { // tile choice
                        this.interactableDisplay[interactableId] = {};
                        this.moment.matrix_string[componentIndex].forEach((option, option_index) => { // set up the interactable options
                            if (option_index % 2 === 0) { // only even number, i.e. 0, 2, 4, 6
                                this.interactableDisplay[interactableId][this.moment.matrix_number[componentIndex][option_index + 5].toString()] = {createdAt: this.moment.matrix_number[componentIndex][option_index + 5], option: option, image: this.moment.matrix_string[componentIndex][option_index + 1], selectedByUser: false};
                            }
                        });
                        this.setupInteractableDisplay(interactableId, componentIndex);
                    } else if (componentId === 10210) { // goal attributes. Note: Collaborative Goals require updating this.responseObj with the latestResponse data
                        // for goals, grab the most recently updated response and use its goal records
                        if (this.responses.length) {
                            const latestResponse = this.responses[this.responses.length - 1];
                            this.listOfDisplayGoals = latestResponse.matrix_string.filter((c) => ['goal', 'master goal'].includes(c[1]));
                            // update this.responseObj with the latest goals data
                            this.responseObj.matrix_string = this.responseObj.matrix_string.filter((c) => !['goal', 'master goal'].includes(c[1]));
                            this.responseObj.matrix_string.push(...this.listOfDisplayGoals);
                        }
                        if (!this.listOfDisplayGoals.length) {
                            this.progressView = 'Current';
                        }
                    }
                }
                // set up map display
                if (componentId === 50000 && this.moment.matrix_number[componentIndex][3] === 2) {
                    get('https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.1/mapbox-gl.js', () => {
                        get('https://tiles.unwiredmaps.com/v2/js/unwired-gl.js?v=0.1.6', () => {
                            this.mapService.setupMap();
                        });
                    });
                }
            });
            this.loadStatus = 'completed';

            // set up for matching users
            if (this.moment.resource.matrix_number[0].find((c) => c === 50000)) {
                if (this.currentView === 'list' || this.currentView === 'people') {
                    await this.loadPeople();
                } else if (this.currentView === 'nearby') {
                    get('https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.1/mapbox-gl.js', () => {
                        get('https://tiles.unwiredmaps.com/v2/js/unwired-gl.js?v=0.1.6', () => {
                            this.mapService.setupMap();
                        });
                    });
                    if (this.mapService.map && this.mapService.map.loaded()) {
                        setTimeout(() => {
                            this.mapService.map.resize();
                        }, 500);
                    }
                }
            }
        } else {
            this.loadStatus = 'completed';
        }
    }
  }

  async setupPermission() {
      if (this.momentService.socket) {
        if (this.relationshipId && this.calendarId && this.calendarItem && this.calendarItem.uniqueAnswersPerCalendar) {
          this.momentService.socket.emit('join moment', this.calendarId); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
        } else if (this.relationshipId) {
            this.momentService.socket.emit('join moment', this.relationshipId);
            this.momentService.socket.emit('join moment', this.moment._id + this.relationshipId);
        } else {
            this.momentService.socket.emit('join moment', this.moment._id);
        }
    }
    const calendarItemIds = this.calendarService.calendarItems.map((c) => c._id );
    this.hasAddedToCalendar = this.moment.calendar && (calendarItemIds.indexOf(this.moment.calendar._id) > -1);
    if (this.moment.user_list_1) {
        let peopleComponentId = -1;
        if (this.moment.resource.matrix_number && this.moment.resource.matrix_number.length) {
            peopleComponentId = this.moment.resource.matrix_number[0].indexOf(10500);
        }
        if (peopleComponentId > -1) {
            this.participantLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 2 && this.moment.matrix_string[peopleComponentId][2] ? this.moment.matrix_string[peopleComponentId][2] : this.moment.resource['en-US'].matrix_string[peopleComponentId][4];
            this.organizerLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 4 && this.moment.matrix_string[peopleComponentId][4] ? this.moment.matrix_string[peopleComponentId][4] : this.moment.resource['en-US'].matrix_string[peopleComponentId][6];
            this.leaderLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 0 && this.moment.matrix_string[peopleComponentId][0] ? this.moment.matrix_string[peopleComponentId][0] : this.moment.resource['en-US'].matrix_string[peopleComponentId][8];
            this.participantsLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 3 && this.moment.matrix_string[peopleComponentId][3] ? this.moment.matrix_string[peopleComponentId][3] : this.moment.resource['en-US'].matrix_string[peopleComponentId][5];
            this.organizersLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 5 && this.moment.matrix_string[peopleComponentId][5] ? this.moment.matrix_string[peopleComponentId][5] : this.moment.resource['en-US'].matrix_string[peopleComponentId][7];
            this.leadersLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 1 && this.moment.matrix_string[peopleComponentId][1] ? this.moment.matrix_string[peopleComponentId][1] : this.moment.resource['en-US'].matrix_string[peopleComponentId][9];
        }
        // if a Content, disable join/leave function since join/leave is handled by user joining via the calendar content item (Calendar doc with user listed in users property)
        this.joinDisabled = this.moment.categories.map((c) => c._id).includes('5e1bbda67b00ea76b75e5a73') || this.moment.categories.map((c) => c._id).includes('5e17acd47b00ea76b75e5a71');
          this.hasParticipantAccess = this.moment.user_list_1.map((c) => c._id).includes(this.userData.user._id);
          // if Activity's organizer
        if (this.moment.user_list_2.map((c) => c._id).includes(this.userData.user._id)) {
          this.hasOrganizerAccess = true;
          // if Restvo staff
          } else if (['owner', 'admin', 'staff'].includes(this.userData.user.role)) {
              this.hasOrganizerAccess = true;
          // if the Activity has a parent Program and respective grandparent programs, also check their organizers list
          } else if (this.moment.parent_programs && this.moment.parent_programs.length) {
              const promises = this.moment.parent_programs.map( async (parent_program) => {
                  if (parent_program.user_list_2 && parent_program.user_list_2.includes(this.userData.user._id)) {
                      this.hasOrganizerAccess = true;
                  }
                  if (parent_program.parent_programs && parent_program.parent_programs.length) {
                      const promises2 = parent_program.parent_programs.map( async (grandparent_program) => {
                          if (grandparent_program.user_list_2 && grandparent_program.user_list_2.includes(this.userData.user._id)) {
                              this.hasOrganizerAccess = true;
                          }
                      });
                      await Promise.all(promises2);
                  }
              });
              await Promise.all(promises);
        }
        this.hasLeaderAccess = this.moment.user_list_3.map((c) => c._id).includes(this.userData.user._id);
    }
      this.setupPermissionCompleted = true;
  }

  async setupPollDisplay(interactableId, componentIndex) {
    for (const response of this.responses) {
      for (const interactable of response.matrix_number) {
        if (interactableId === interactable[0]) {
          this.totalVoteCount[interactableId]++; // set up the total vote count
          if (interactable[1] > (this.moment.matrix_string[componentIndex].length - 1)) {
            return; // if this response belongs to an option that has been deleted
          }
          if (response.user._id === this.userData.user._id) {
            this.interactableDisplay[interactableId][interactable[1]].votedByUser = true;
          }
          this.interactableDisplay[interactableId][interactable[1]].count++;
        }
      }
    }
  }

  async setupInteractableDisplay(interactableId, componentIndex) {
      for (const response of this.responses) {
          for (const interactable of response.matrix_number) { // process the interactable responses
              if (interactableId === interactable[0]) {
                  if (interactable.length - 5 > this.moment.matrix_string[componentIndex].length) {
                      return; // if this response belongs to an option that has been deleted
                  }
                  if (response.user._id === this.userData.user._id) {
                      for (let i = 5; i < interactable.length; i++) {
                          if (this.moment.resource.matrix_number[0][componentIndex] === 40020) { // for tile choice, the response records the user's choice using the option's createdAt timestamp [200819285102, 201928523192, etc]
                            this.interactableDisplay[interactableId][interactable[i].toString()].selectedByUser = true;
                          } else { // for older interactables (e.g. multiple choice), response records the user's choice using the option index [1, 5, 4]
                            this.interactableDisplay[interactableId][interactable[i]].selectedByUser = true;
                          }
                      }
                  }
              }
          }
      }
  }

  async addToCalendar(listOfConversations, listOfUsers) {
    try {
      const result: any = await this.momentService.updateMomentUserLists({
        operation: 'add to calendar',
        conversations: listOfConversations,
        users: listOfUsers,
        calendarId: this.moment.calendar._id
            }, this.token, true); // a valid token is not required, but provided in case of future change of specs
      this.anyChangeMade = true;
      this.setupPermission();
      return result;
    } catch (err) {
      console.log(err);
      this.anyChangeMade = false;
      return false;
    }
  }

  async removeFromCalendar() {
    try {
      await this.momentService.updateMomentUserLists({
        operation: 'remove from calendar',
        users: [this.userData.user._id],
        calendarId: this.moment.calendar._id
            }, this.token, true); // a valid token is not required, but provided in case of future change of specs
      this.anyChangeMade = true;
      this.setupPermission();
    } catch (err) {
      console.log(err);
      this.anyChangeMade = false;
    }
  }

  async leaveProgramWithPrivileges(user_list) {
      const role = user_list === 'user_list_2' ? 'Organizer' : 'Leader';
      const alert = await this.alertCtrl.create({
          header: 'Leave as ' + role,
          message: 'Are you sure you want to leave as ' + role + '?',
          buttons: [{ text: 'Confirm Leave',
              handler: () => {
                  this.removeFromUserList(user_list);
              }},
              { text: 'Cancel' }],
          cssClass: 'level-15'
      });
      alert.present();
  }

  async removeFromUserList(user_list) {
    try {
      if (this.networkService.hasNetwork) {
        // first reset the conversation badge count to 0, decrease the system badge count down by number of unread messages in group
        if (this.moment.conversation) {
          const count = await this.chatService.resetBadgeCount(this.moment.conversation);
          if (count) {
            if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
              this.badge.decrease(count);
            }
            if (this.electronService.isElectronApp) {
              this.electronService.ipcRenderer.send('SYSTEM_TRAY:::CHANGE_BADGE', -1 * count);
            }
          }
          // Remove user from user_list
          await this.momentService.updateMomentUserLists({
            operation: 'remove from lists',
            user_lists: [user_list],
            users: [this.userData.user._id],
            momentId: this.moment._id
          }, this.token, true); // a valid token is not required, but provided in case of future change of specs
          if (!this.modalPage) {
            this.userData.refreshUserStatus({ type: 'close group view', data: { _id: this.moment.conversation }});
          }
            this.userData.refreshDefaultActivity(this.moment._id);
            this.chatService.socket.emit('leave conversation', this.moment.conversation); // inform the socket.io server this user is leaving this room
            this.userData.refreshMyConversations({action: 'disconnect chat view', conversationId: this.moment.conversation});
            this.userData.refreshMyConversations({action: 'reload', conversationId: this.moment.conversation});
        }
      } else {
        this.noNetworkConnection();
      }
      this.anyChangeMade = true;
      await this.loadMoment();
      this.setupPermission();
    } catch (err){
      console.log(err);
      this.anyChangeMade = false;
    }
  }

  async inviteToJoin() {
      if (this.authService.token) {
            if (this.hasOrganizerAccess) {
                const modal = await this.modalCtrl.create({component: EditparticipantsPage, componentProps: { moment: this.moment, title: this.resource['en-US'].value[32] + ' to ' + this.moment.matrix_string[0][0], modalPage: true }});
                await modal.present();
            } else {
                this.momentService.addParticipants(this.moment, this.resource, 'both', ['user_list_1'], this.resource['en-US'].value[32] + ' to ' + this.moment.matrix_string[0][0], this.resource['en-US'].value[32]);
            }
      } else {
          this.openRegister(0, 'To join ' + this.moment.matrix_string[0][0] + ', please sign in or create an account.');
      }
  }

  async editMoment() {
      if (!this.modalPage && this.platform.width() >= 992) {
          this.router.navigate([{ outlets: { sub: ['edit', this.moment._id, { subpanel: true }] }}]);
      } else if (!this.modalPage && this.platform.width() >= 768) {
          this.router.navigate(['/app/edit/' + this.moment._id]);
      } else {
        const modal = await this.modalCtrl.create({component: EditfeaturePage, componentProps: { moment: this.moment, modalPage: true }});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        // activity is an a moment object see server/models/moment.js
        // activity contains a resource with info on the activity see server/models/resource.js
        if (refreshNeeded) {
            this.loadMoment();
            this.setupPermission();
            this.anyChangeMade = true;
        }
    }
  }

  async deleteMoment(intent) {
    const alert = await this.alertCtrl.create({
        header: (['owner', 'admin', 'staff'].includes(this.userData.user.role) && intent === 'archive' ? this.resource['en-US'].value[44] : this.resource['en-US'].value[19]) + ' ' + this.moment.resource['en-US'].value[0],
        message: (['owner', 'admin', 'staff'].includes(this.userData.user.role) && intent === 'archive' ? 'Are you sure you want to archive' : this.resource['en-US'].value[22]) + ' ' + this.moment.matrix_string[0][0] + '? ' + (this.moment.resource.matrix_number && this.moment.resource.matrix_number.length && (this.moment.resource.matrix_number[0].indexOf(10370) > -1) ? this.resource['en-US'].value[23] : ''),
        buttons: [{ text: 'Ok',
        handler: () => {
          const navTransition = alert.dismiss();
          navTransition.then( async () => {
            // Remove the Moment
            await this.momentService.delete(this.moment, intent);
              this.userData.refreshDefaultActivity(this.moment._id);
              this.anyChangeMade = true;
            if (this.modalPage) {
              this.closeModal();
            } else {
              this.router.navigate(['/app/me'], { replaceUrl: true });
            }
          });
        }},
        { text: 'Cancel' }],
      cssClass: 'level-15'
    });
    alert.present();
  }

  async seeUserInfo(event, user) {
    event.stopPropagation();
    user.name = user.first_name + ' ' + user.last_name;
    if (!this.authService.token) {
      this.openRegister(0, 'To see more about ' + user.name + ', sign in or create an account first.');
    } else if (!this.modalPage && this.platform.width() >= 992) {
        this.router.navigate([{ outlets: { sub: ['user', user._id, { subpanel: true } ] }}]);
    } else if (!this.modalPage && this.platform.width() >= 768) {
      this.router.navigate(['/app/person/' + user._id], { replaceUrl: false });
    } else {
        this.userData.refreshUserStatus({ type: 'show recipient', data: {recipient: user, modalPage: true}});
    }
  }

  async joinVideoConference() {
    if (this.moment.conversation) {
      if (this.modalPage && !this.platform.is('cordova')) {
        this.closeModal();
        setTimeout(() => {
          this.router.navigateByUrl('/app/activity/' + this.moment._id);
        }, 500);
      }
      this.chatService.toggleVideoChat({
        videoChatRoomId: this.moment.conversation,
        videoChatRoomSubject: this.moment.matrix_string[0][0],
        channelLastN: '6', // only the last 6 active dominate speakers' stream will be sent
        startWithAudioMuted: true,
        startWithVideoMuted: false,
      });
    } else {
      console.log("missing moment's conversation id");
    }
  }

  async voteOnPoll(event, componentIndex, pollOptionIndex) {
    event.stopPropagation();
    this.anyChangeMade = true;
    const interactableId = this.moment.resource.matrix_number[2][componentIndex];
    let updatedExistingVote = false;
    for (const interactable of this.responseObj.matrix_number) {
      if (interactable[0] === interactableId) {
        interactable[1] = pollOptionIndex; // update an existing vote
        updatedExistingVote = true;
      }
    }
    if (!updatedExistingVote) { // submit a new vote
      this.responseObj.matrix_number.push([interactableId, pollOptionIndex]);
    }
    this.momentService.submitResponse(this.moment, this.responseObj, true);
  }

  // when a user respond to an interactive question (multiple choice, tile choice)
  // interactableOptionIndex is either the option index (m.c.) or option createdAt timestamp (tile choice)
    async respondToInteractable(event, componentIndex, interactableOption) {
        event.stopPropagation();
        this.anyChangeMade = true;
        const interactableId = this.moment.resource.matrix_number[2][componentIndex];
        let updatedExistingResponse = false;
        for (let interactable of this.responseObj.matrix_number) { // each interactable is an array of user choices for each question
          if (interactable[0] === interactableId) {
            for (let i = interactable.length - 1; i > 4; i--) {
              // for multiple choice or tile choice
              if (interactable[i] === interactableOption) { // de-select an existing selection
                interactable.splice(i, 1);
                updatedExistingResponse = true;
              }
            }
            if (!updatedExistingResponse) { // append a new selection
              interactable.push(interactableOption);
              updatedExistingResponse = true;
              let maxNumOfSelections = 1; // default is 1 if multiple selection is off
              if (this.moment.matrix_number[componentIndex][0]) { // if multiple selection is on
                maxNumOfSelections = this.moment.matrix_number[componentIndex][1] || this.moment.matrix_string[componentIndex].length; // if max number of selections has not been set (null), use the number of available options
              }
              while ((interactable.length - 5) > maxNumOfSelections) { // splice the oldest selection until it satisfies the max num of selections
                interactable.splice(5, 1);
              }
            }
          }
        }
        if (!updatedExistingResponse) { // add a new entry to array
          this.responseObj.matrix_number.push([interactableId, null, null, null, null, interactableOption]);
        }
        const response = await this.momentService.submitResponse(this.moment, this.responseObj, false);
        const index = this.responses.map((c) => c._id).indexOf(response._id);
        if (index < 0) { // if the response hasn't been added to the response list
            this.responses.push(response);
        } else { // if it has been added, replace with the incoming one
            this.responses.splice(index, 1, response);
        }
        // reset MC selection
        if (this.moment.resource.matrix_number[0][componentIndex] === 40020) {
          for (const key of Object.keys(this.interactableDisplay[interactableId])) {
            this.interactableDisplay[interactableId][key].selectedByUser = false;
          }
        } else {
          this.interactableDisplay[interactableId].forEach((interactableOption) => {
            interactableOption.selectedByUser = false;
          });
        }
        this.setupInteractableDisplay(interactableId, componentIndex);
    }

    async touchCalendarItemResponse(event, selectedCalendarItem, type) {
        event.stopPropagation();
        const newState = selectedCalendarItem.completed ? null : 'completed';
        const interactable = this.responseObj.matrix_string.find((c) => c[0] === selectedCalendarItem._id);
        if (interactable) { // if response already exists
            if (type === 'check-in') {
                interactable[5] = newState;
            } else if (type === 'goal attributes') {
                if (interactable.length < 10) { // if shorter than 10, pad it with 0
                    interactable.fill(null, interactable.length, 11);
                } else if (interactable.length > 10) { // if longer than 10, replace the goal attributes
                    interactable.splice(10, interactable.length - 1); // remove existing goal attributes
                }
                interactable.push(...selectedCalendarItem.goals); // push onto array
            }
        } else { // response does not exist. add a new entry to array
            if (type === 'check-in') {
                this.responseObj.matrix_string.push([selectedCalendarItem._id, null, null, null, null, newState]);
            } else if (type === 'goal attributes') {
                let interactableObj = new Array(10);
                interactableObj[0] = selectedCalendarItem._id;
                if (selectedCalendarItem.goals) {
                    interactableObj.push(...selectedCalendarItem.goals);
                }
                this.responseObj.matrix_string.push(interactableObj);
            }
        }
        if (type === 'check-in') {
            // update the user calendar items list (for display) before the async operation
            for (const calendarItem of this.calendarService.calendarItems) {
                if (calendarItem._id === selectedCalendarItem._id) { // interactable[0] is a String
                    calendarItem.completed = newState;
                }
            }
            // update the super admin calendar items list (ad hoc) before the async operation
            for (const calendarItem of this.adminOrPublicAccessContentCalendars) {
                if (calendarItem._id === selectedCalendarItem._id) { // interactable[0] is a String
                    calendarItem.completed = newState;
                }
            }
        }
        console.log("sending response", this.responseObj)
        const response = await this.momentService.submitResponse(this.moment, this.responseObj, false);
        const socketData: any = {
            calendarId: selectedCalendarItem._id,
            interactable: this.responseObj.matrix_string.find((c) => c[0] === selectedCalendarItem._id),
            author: {
                _id: this.userData.user._id,
                first_name: this.userData.user.first_name,
                last_name: this.userData.user.last_name,
                avatar: this.userData.user.avatar
            }
        };
        if (type === 'check-in') {
            socketData.state = newState;
        } else if (type === 'goal attributes') {
            if (selectedCalendarItem.goals) {
                socketData.goals = selectedCalendarItem.goals;
            } else {
                socketData.goals = [];
            }
        }
        this.momentService.socket.emit('refresh moment', this.moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other users in the same momentId room

        const index = this.responses.map((c) => c._id).indexOf(response._id);
        if (index < 0) { // if the response hasn't been added to the response list
            this.responses.push(response);
        } else { // if it has been added, replace with the incoming one
            this.responses.splice(index, 1, response);
        }
    }

    async createQuillEditor(event, interactableId) {
      if (this.interactableDisplay[interactableId].content) {
          event.setContents(this.interactableDisplay[interactableId].content.ops, 'silent');
      }
      this.interactableDisplay[interactableId]['editor'] = event;
    }

    async checkAndLoadNotes() {
        // if there is the tab component
        if (this.moment && this.moment.resource && this.moment.resource.matrix_number[0].find((c) => c === 20020)) {
            // if note is being selected in current Tab
            const index = this.moment.resource.matrix_number[0].indexOf(12000);
            if (index >= 0 && this.moment.resource.matrix_number[3][index] === this.tabSelection) {
                // if default tab selection has selected the Notes view, check and load notes
                const result: any = await this.momentService.loadNotes(this.moment._id, null);
                if (result && result.length) {
                    this.notes = result[0].docs;
                }
            }
        // if there is no tab component
        } else if (this.moment && this.moment.resource) {
            // check if needed to load notes (12000)
            if (this.moment.resource.matrix_number[0].find((c) => c === 12000)) {
                const result: any = await this.momentService.loadNotes(this.moment._id, null);
                if (result && result.length) {
                    this.notes = result[0].docs;
                }
            }
        }
        this.notes.sort((a, b) => { // sort notes with the most recent first
            const e: any = new Date(a.updatedAt);
            const f: any = new Date(b.updatedAt);
            return (f - e);
        });
    }

    async respondToTextArea(event, componentIndex) {
      console.log("quill changed")
        this.anyChangeMade = true;
        // Showing the user that the content is saving
        this.interactableDisplay[this.moment.resource.matrix_number[2][componentIndex]].currentSaveState = "Saving...";
        clearTimeout(this.timeoutHandle);
        let updatedExistingResponse = false;
        // first, emit the delta via socket.io
        // interactableId is Number
        const interactableId = this.moment.resource.matrix_number[2][componentIndex];
        const responseType = this.moment.matrix_number[componentIndex][1];
        if (responseType) { // if response type is collaborative
            const socketData = {
                delta: event.delta,
                interactableId: interactableId,
                collaborate: true,
                author: {
                    _id: this.userData.user._id
                }
            };
            // for text answers, user is sending delta operation via socket.io in real time for collaborative purposes
            // there are 3 levels of broadcast. see moment event handler at the top
            if (this.relationshipId && this.calendarId && this.calendarItem && this.calendarItem.uniqueAnswersPerCalendar) {
                this.momentService.socket.emit('refresh moment', this.calendarId, socketData); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
            } else if (this.relationshipId) {
                this.momentService.socket.emit('refresh moment', this.moment._id + this.relationshipId, socketData); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
            } else {
                this.momentService.socket.emit('refresh moment', this.moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
            }
        }

        for (const interactable of this.responseObj.matrix_string) {
            if (interactable[0] === interactableId.toString()) { // InteractableId is in Number
                interactable[1] = event.text;
                interactable[2] = JSON.stringify(event.content);//JSON.stringify(event.content);
                interactable[3] = JSON.stringify(event.delta);
                updatedExistingResponse = true;
            }
        }

        if (!updatedExistingResponse) { // add a new entry to array
            this.responseObj.matrix_number.push([interactableId]);
            this.responseObj.matrix_string.push([interactableId.toString(), event.text, JSON.stringify(event.content), JSON.stringify(event.delta)]);
        }
        this.timeoutHandle = setTimeout(async () => {
            // server update only happens every 3 secs
            const response = await this.momentService.submitResponse(this.moment, this.responseObj, false);
            if (response) {
                const index = this.responses.map((c) => c._id).indexOf(response._id);
                if (index < 0) { // if the response hasn't been added to the response list
                    this.responses.push(response);
                } else { // if it has been added, replace with the incoming one
                    this.responses.splice(index, 1, response);
                }
                if (this.moment.program) {
                    this.userData.refreshUserStatus({});
                }
                // Showing the user that the content has been saved at the end of the timeout
                this.interactableDisplay[this.moment.resource.matrix_number[2][componentIndex]].currentSaveState = "Saved";

                setTimeout(() => {
                  // setting the interactableDisplay on the current textarea to a blank state after saving data
                  this.interactableDisplay[this.moment.resource.matrix_number[2][componentIndex]].currentSaveState = "";
                }, 3000);
            } else {
              // setting the interactableDisplay on the current textarea to a failure message
              this.interactableDisplay[this.moment.resource.matrix_number[2][componentIndex]].currentSaveState = "Failed";
            }
        }, 1500);
    }

  async changeView(event) {
    this.currentView = event.detail.value;
    switch (this.currentView) {
      case 'list':
        await this.loadPeople();
        break;
      case 'nearby':
        get('https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.1/mapbox-gl.js', () => {
          get('https://tiles.unwiredmaps.com/v2/js/unwired-gl.js?v=0.1.6', () => {
            this.mapService.setupMap();
          });
        });
        break;
    }
  }

  async swipePeopleSlide() {
      this.disablePrevBtn = await this.slides.isBeginning();
      this.disableNextBtn = await this.slides.isEnd();
    if (this.peopleSlides && this.loadStatus !== 'loading') {
      const currentSlideIndex = await this.peopleSlides.getActiveIndex();
      if (currentSlideIndex === this.matchedPeople.length - 4) {
        this.loadMorePeople(null);
      }
    }
  }

  async loadPeople() {
    if (this.loadStatus !== 'loading') {
        if (this.authService.token && this.infiniteScroll) { // infinite scroll for 50000 match users only shows for authenticated users
            this.infiniteScroll.disabled = false;
        }
        this.reachedEnd = false;
        this.matchedPeople = [];
        this.pageNum = 0;
        if (this.moment._id) {
            this.loadMorePeople({target: this.infiniteScroll});
        }
    }
  }

  async loadMorePeople(event) {
    this.pageNum++;
    if (!this.reachedEnd && !this.loadAPIBusy) { // loadAPIBusy is used to safeguard against iOS calling the (ionInfiniteScroll) function from the DOM that races with the loadMorePeople function
        this.loadAPIBusy = true;
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this.zone.run(() => {
                    this.loadAPIBusy = false;
                });
            }, 10000);
        });
      const results: any = await this.momentService.loadMatchedPeople(this.moment._id || '', this.searchKeyword, this.pageNum);
      console.log("matched", results);
      this.loadAPIBusy = false;
      this.ionSpinner = false;
      if (!results.length) {
        this.reachedEnd = true;
        if (event && event.target) event.target.disabled = true;
      } else {
        for (const result of results) {
          this.matchedPeople.push(result);
        }
      }
    }
  }

  async searchMap() {
    console.log('searching');
    // first clear markers
    this.mapService.markers.forEach((marker) => {
      marker.remove();
    });
    if (this.authService.token && this.infiniteScroll) { // infinite scroll for 50000 match users only shows for authenticated users
      this.infiniteScroll.disabled = false;
    }
    this.mapService.reachedEnd = false;
    this.mapService.mapData = [];
    this.mapService.pageNum = 0;
    setTimeout( () => {
      this.loadMoreSearchResults({target: this.infiniteScroll});
    }, 50);
  }

  async loadMoreSearchResults(event) {
    this.mapService.pageNum++;
    if (!this.mapService.reachedEnd && !this.mapService.loadAPIBusy) { // loadAPIBusy is used to safeguard against iOS calling the (ionInfiniteScroll) function from the DOM that races with the loadMoreSearchResults function
      this.mapService.loadAPIBusy = true;
      this.mapService.searchRadius =  this.platform.width() * 97.27157 * 0.5 * Math.cos(this.mapService.userLocation.lat * Math.PI / 180) / Math.pow(2, this.mapService.userZoom);
      const searchType = 'user'; // (this.filterSelections[1] ? 'user+' : '') + (this.filterSelections[2] ? 'group+' : '') + (this.filterSelections[3] ? 'moment+' : '') + (this.filterSelections[4] ? 'church+' : '');
      this.zone.run(async () => {
        const results: any = await this.momentService.loadNearbyPublicActivities(this.searchKeyword, searchType, this.mapService.userLocation, this.mapService.pageNum, this.mapService.searchRadius);
        this.mapService.loadAPIBusy = false;
        this.mapService.ionSpinner = false;
        if (!results.length) {
          this.mapService.reachedEnd = true;
          event.target.disabled = true;
        } else {
          for (let result of results) {
            this.mapService.mapData.push(result);
          }
          // console.log("map data", this.mapData);
          if (this.mapService.pageNum === 1) {
            this.mapService.renderMarkers();
          }
        }
      });
      if (event.target) event.target.complete();
    } else {
      this.mapService.ionSpinner = false;
      if (event.target) event.target.complete();
    }
  }

  async joinActivity() {
    if (this.authService.token) {
      this.openOnboarding(2);
    } else {
      this.openRegister(0, 'To join ' + this.moment.matrix_string[0][0] + ', please sign in or create an account.');
    }
  }

  async acceptInvitation(event) {
    event.stopPropagation();
    if (this.authService.token && this.participant_type && this.token) {
        this.openOnboarding(this.participant_type);
    } else {
        this.openRegister(0, 'You need to sign in or create an account first before you can accept the invitation.');
    }
  }

    async openOnboarding(participant_type) {
        const modal = await this.modalCtrl.create({component: OnboardfeaturePage, componentProps: { programId: this.moment._id, type: participant_type, token: this.token, modalPage: true }});
        await modal.present();
    }

    async openNote(note) {
      if (note.content_id) {
          const momentId = note.content_id;
          let params: any;
          let componentProps: any;
          params = { relationshipId: this.moment._id };
          componentProps = { moment: { _id: momentId }, relationshipId: this.moment._id, modalPage: true };
          // if calendar Id exists, send it in params
          if (note.calendar_id) {
              params.calendarId = note.calendar_id;
              componentProps.calendarId = note.calendar_id;
          }
          // if no calendar Id, send the response id
          if (!note.calendar_id && note.response_id) {
              params.responseId = note.response_id;
              componentProps.responseId = note.response_id;
          }
          if (this.platform.width() >= 992) {
              if (this.authService.token) {
                  params.subpanel = true;
                  this.router.navigate([{ outlets: { sub: ['details', momentId, params ] }}]);
              } else { // for unauthenticated user and in landing page view, which is not a common case
                  this.router.navigate(['/activity/' + momentId], { replaceUrl: false });
              }
          } else if (this.platform.width() >= 768) {
              if (this.authService.token) {
                  this.router.navigate(['/app/activity/' + momentId, params ], { replaceUrl: false });
              } else { // for unauthenticated user and in landing page view, which is not a common case
                  this.router.navigate(['/activity/' + momentId], { replaceUrl: false });
              }
          } else {
              if (this.authService.token) { // for authenticated user, use modalCtrl for in app experience
                  const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: componentProps });
                  await modal.present();
                  const { data: refreshNeeded } = await modal.onDidDismiss();
                  if (refreshNeeded) {
                      this.checkAndLoadNotes();
                  }
              } else { // for unauthenticated user and in landing page view, which is not a common case
                  this.router.navigate(['/activity/' + momentId], { replaceUrl: false });
              }
          }
      }
    }

    async moreParticipantOptions() {
      let actionSheet: any;
      let buttons = [];
      if (!this.hasParticipantAccess) {
        buttons.push({
          text: this.resource['en-US'].value[15], // Join X
          icon: 'log-in',
          handler: () => {
              const navTransition = actionSheet.dismiss();
              navTransition.then( async () => {
                  this.joinActivity();
              });
          }
        });
      } else {
          if (this.moment._id !== '5d5785b462489003817fee18') { // for all Activities except Restvo
              buttons.push(...[{
                  text: this.resource['en-US'].value[16], // Leave Activity
                  icon: 'log-out',
                  handler: () => {
                      const navTransition = actionSheet.dismiss();
                      navTransition.then( async () => {
                          this.removeFromUserList('user_list_1');
                      });
                  }
              }]);
          }
        buttons.push(...[{
            text: this.resource['en-US'].value[35], // View Onboarding Answers
            icon: 'list',
            handler: () => {
                const navTransition = actionSheet.dismiss();
                navTransition.then( async () => {
                    if (this.modalPage) {
                        this.momentService.openPreferences({ programId: this.moment._id, modalPage: true });
                    } else {
                        this.router.navigate(['/app/preferences/' + this.moment._id, { showHeader: true }]);
                    }
                });
            }
        }]);
      }
      // if a participant or an organizer, and if participant chat is turned on
      if ((this.hasParticipantAccess || this.hasLeaderAccess || this.hasOrganizerAccess) && this.moment.array_boolean && this.moment.array_boolean.length && this.moment.array_boolean.length > 5 && this.moment.array_boolean[5]) {
          buttons.push({
              text: this.resource['en-US'].value[41], // View Chat
              icon: 'chatbubbles',
              handler: () => {
                  const navTransition = actionSheet.dismiss();
                  navTransition.then( async () => {
                      if (this.modalPage) {
                          const moment = this.moment;
                          moment.name = this.moment.matrix_string[0][0];
                          this.chatService.openChat({conversationId: this.moment.conversation, moment: moment});
                      } else {
                          this.chatService.currentChatProps.push({
                              conversationId: this.moment.conversation,
                              name: this.moment.matrix_string[0][0],
                              moment: this.moment,
                              page: 'chat',
                              badge: true,
                              modalPage: true,
                              cssClass: 'level-10'
                          });
                          this.router.navigate(['/app/myconversations/chat']);
                          this.userData.refreshMyConversations({action: 'reload chat view'});
                      }
                  });
              }
          });
      }
      // add to calendar option is hidden for category Content, Onboarding Process
      if (!this.moment.categories.map((c) => c._id).includes('5e1bbda67b00ea76b75e5a73') && !this.moment.categories.map((c) => c._id).includes('5e17acd47b00ea76b75e5a71')) {
          if (!this.hasAddedToCalendar) {
              buttons.push({
                  text: this.resource['en-US'].value[13], // Add to Calendar
                  icon: 'notifications',
                  handler: () => {
                      const navTransition = actionSheet.dismiss();
                      navTransition.then( async () => {
                          this.addToCalendar(null, [this.userData.user._id]);
                      });
                  }
              });
          } else {
              buttons.push({
                  text: this.resource['en-US'].value[14], // Remove from Calendar
                  icon: 'notifications-off',
                  handler: () => {
                      const navTransition = actionSheet.dismiss();
                      navTransition.then( async () => {
                          this.removeFromCalendar();
                      });
                  }
              });
          }
      }
        actionSheet = await this.actionSheetCtrl.create({
            header: this.moment.matrix_string[0][0],
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    async moreOrganizerActions() {
        let actionSheet: any;
        let buttons = [];
        buttons = buttons.concat([{
            text: this.resource['en-US'].value[43] + ' ' + this.moment.resource['en-US'].value[0], // Manage Community or Program
            icon: 'bulb',
            handler: () => {
                const navTransition = actionSheet.dismiss();
                navTransition.then( async () => {
                    this.momentService.manageMoment({ moment: this.moment, modalPage: this.modalPage });
                });
            },
        }]);

        if (this.hasOrganizerAccess) { // for general Admins and Restvo staff
            buttons = buttons.concat([
                {
                    text: this.resource['en-US'].value[18], // Edit
                    icon: 'code-working',
                    handler: () => {
                        const navTransition = actionSheet.dismiss();
                        navTransition.then( async () => {
                            this.expandedPrivilegesView = false;
                            this.editMoment();
                        });
                    }
                }
            ]);
            if (['owner', 'admin', 'staff'].includes(this.userData.user.role)) { // for Staff
                buttons = buttons.concat([
                    {
                        text: 'Clone', // Clone
                        icon: 'copy',
                        handler: () => {
                            const navTransition = actionSheet.dismiss();
                            navTransition.then( async () => {
                                this.momentService.cloneMoment(this.moment);
                            });
                        }
                    },
                    {
                        text: this.resource['en-US'].value[44], // Archive for staff
                        icon: 'archive',
                        handler: () => {
                            const navTransition = actionSheet.dismiss();
                            navTransition.then( async () => {
                                this.deleteMoment('archive');
                            });
                        }
                    },
                    {
                        text: this.resource['en-US'].value[19], // Delete for staff
                        role: 'destructive',
                        icon: 'trash',
                        handler: () => {
                            const navTransition = actionSheet.dismiss();
                            navTransition.then( async () => {
                                this.deleteMoment('delete');
                            });
                        }
                    }]);
            } else {
                buttons = buttons.concat([
                    {
                        text: this.resource['en-US'].value[19], // Delete for General Admins (archive in the backend)
                        role: 'destructive',
                        icon: 'trash',
                        handler: () => {
                            const navTransition = actionSheet.dismiss();
                            navTransition.then( async () => {
                                this.deleteMoment('archive');
                            });
                        }
                    }
                ]);
            }
            if (this.moment.array_boolean && this.moment.array_boolean.length && this.moment.array_boolean.length > 6 && this.moment.array_boolean[6]) {
                buttons.push({
                    text: this.resource['en-US'].value[41], // View Chat
                    icon: 'chatbubbles',
                    handler: () => {
                        const navTransition = actionSheet.dismiss();
                        navTransition.then( async () => {
                            if (this.modalPage) {
                                const moment = this.moment;
                                moment.name = this.moment.matrix_string[0][0] + ' (' + this.organizersLabel + ')';
                                this.chatService.openChat({conversationId: this.moment.conversation_2, moment: moment});
                            } else {
                                this.chatService.currentChatProps.push({
                                    conversationId: this.moment.conversation_2,
                                    name: this.moment.matrix_string[0][0] + ' (' + this.organizersLabel + ')',
                                    moment: this.moment,
                                    page: 'chat',
                                    badge: true,
                                    modalPage: true,
                                    cssClass: 'level-10'
                                });
                                this.router.navigate(['/app/myconversations/chat']);
                                this.userData.refreshMyConversations({action: 'reload chat view'});
                            }
                        });
                    }
                });
            }
        }
        if (this.moment.user_list_2.map((c) => c._id).includes(this.userData.user._id)) {
            buttons = buttons.concat([{
                text: 'Leave as ' + this.organizerLabel,
                icon: 'log-out',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        this.leaveProgramWithPrivileges('user_list_2');
                    });
                }
            }]);
        }
        buttons = buttons.concat([{
            text: this.resource['en-US'].value[33], // Cancel
            icon: 'close-circle',
            role: 'cancel',
        }]);
        actionSheet = await this.actionSheetCtrl.create({
            header: this.moment.matrix_string[0][0],
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    async moreLeaderOptions() {
        let actionSheet: any;
        let buttons = [];
        if (this.hasLeaderAccess) { // since organizer can also open this menu, needs to check for Leader's privilege
            buttons = buttons.concat([{
                text: this.resource['en-US'].value[35], // View Onboarding Answers
                icon: 'list',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        if (this.modalPage) {
                            this.momentService.openPreferences({ programId: this.moment._id, modalPage: true });
                        } else {
                            this.router.navigate(['/app/preferences/' + this.moment._id, { showHeader: true }]);
                        }
                    });
                }
            }]);
        }
        // if a leader or an organizer, and if leader's chat is turned on
        if ((this.hasLeaderAccess || this.hasOrganizerAccess) && this.moment.array_boolean && this.moment.array_boolean.length && this.moment.array_boolean.length > 7 && this.moment.array_boolean[7]) {
            buttons.push({
                text: this.resource['en-US'].value[41], // View Chat
                icon: 'chatbubbles',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        if (this.modalPage) {
                            const moment = this.moment;
                            moment.name = this.moment.matrix_string[0][0] + ' (' + this.leadersLabel + ')';
                            this.chatService.openChat({conversationId: this.moment.conversation_3, moment: moment});
                        } else {
                            this.chatService.currentChatProps.push({
                                conversationId: this.moment.conversation_3,
                                name: this.moment.matrix_string[0][0] + ' (' + this.leadersLabel + ')',
                                moment: this.moment,
                                page: 'chat',
                                badge: true,
                                modalPage: true,
                                cssClass: 'level-10'
                            });
                            this.router.navigate(['/app/myconversations/chat']);
                            this.userData.refreshMyConversations({action: 'reload chat view'});
                        }
                    });
                }
            });
        }
        if (this.hasLeaderAccess) { // since organizer can also open this menu, needs to check for Leader's privilege
            buttons = buttons.concat([{
                text: 'Leave as ' + this.leaderLabel,
                icon: 'log-out',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        this.leaveProgramWithPrivileges('user_list_3');
                    });
                }
            }]);
        }
        buttons = buttons.concat([{
            text: this.resource['en-US'].value[33], // Cancel
            icon: 'close-circle',
            role: 'cancel',
        }]);
        actionSheet = await this.actionSheetCtrl.create({
            header: this.moment.matrix_string[0][0],
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    expandPrivilegesView() {
      this.expandedPrivilegesView = !this.expandedPrivilegesView;
      clearTimeout(this.timeoutHandle);
        if (!this.expandedPrivilegesView) {
            setTimeout(() => {
                this.showSpecialAccess = false;
            }, 2000);
        }
    }

  destroyPlayers(mediaId) {
    if (mediaId) {
      const media = this.mediaList.find((c) => c._id === mediaId);
      media.player.destroy();
    } else {
      for (const media of this.mediaList) {
        media.player.destroy();
      }
    }
  }

  // References Slider
  async loadPrograms() {
      this.programsReachedEnd = false;
      this.programs = [];
      this.programPageNum = 0;
      this.loadMorePrograms();
  }

  async loadMorePrograms() {
    this.programPageNum++;
    if (!this.programsReachedEnd) { // loadAPIBusy is used to safeguard against iOS calling the (ionInfiniteScroll) function from the DOM that races with the loadMoreMentors function
      const results: any = await this.momentService.loadPublicActivityByCategory('all', this.programPageNum);
      this.ionSpinner = false;
      if (!results.length) {
        this.programsReachedEnd = true;
      } else {
        for (const result of results) {
          if (this.moment._id !== result._id) { // do not show the current program in the list
            this.programs.push(result);
          }
        }
      }
    }
  }

  async swipeProgramslide(event) {
    event.stopPropagation();
    if (this.programsSlides) {
      const currentSlideIndex = await this.programsSlides.getActiveIndex();
      if (currentSlideIndex === this.matchedPeople.length - 4) {
        this.loadMorePrograms();
      }
    }
  }

  async openProgram(event, moment) {
    if (event) event.stopPropagation();
    if (!this.authService.token) {
        this.router.navigate(['/app/activity/' + moment._id], { replaceUrl: false });
    } else if (!this.modalPage && this.platform.width() >= 992) {
        this.router.navigate([{ outlets: { sub: ['details', moment._id, { subpanel: true } ] }}]);
    } else if (!this.modalPage && this.platform.width() >= 768) {
        if (this.router.url.includes('/app/manage')) {
            this.router.navigate([{ outlets: { sub: ['details', moment._id, { subpanel: true } ] }}]);
        } else {
            this.router.navigate(['/app/activity/' + moment._id], { replaceUrl: false });
        }
    } else {
        const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: { moment: { _id: moment._id }, modalPage: true}} );
        await modal.present();
    }
  }

    // open Content requires providing the relationshipId
    async openContent(event, calendarItem) {
      if (event) event.stopPropagation();
        const momentId = typeof calendarItem.moment === 'object' ? calendarItem.moment._id : calendarItem.moment;
        let params: any;
        let componentProps: any;
        params = { relationshipId: this.moment._id };
        componentProps = { moment: { _id: momentId }, relationshipId: this.moment._id, modalPage: true };
        if (calendarItem._id) {
            params.calendarId = calendarItem._id;
            componentProps.calendarId = calendarItem._id;
        }
        if (!this.authService.token) { // for authenticated user, use modalCtrl for in app experience
            this.router.navigate(['/activity/' + momentId, params ], { replaceUrl: false });
        } else if (!this.modalPage && this.platform.width() >= 992) {
            params.subpanel = true;
            this.router.navigate([{ outlets: { sub: ['details', momentId, params ] }}]);
        } else if (!this.modalPage && this.platform.width() >= 768) {
            this.router.navigate(['/app/activity/' + momentId, params ], { replaceUrl: false });
        } else {
            const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: componentProps });
            await modal.present();
        }
    }

    async promptNewGoalName(event) {
        event.stopPropagation();
        await this.fabButtons.close();
        const alert = await this.alertCtrl.create({
            header: 'Enter Goal Name',
            inputs: [{
                name: 'goalName',
                type: 'text',
                placeholder: 'Goal Name'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel Create Goal');
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
        this.content.scrollToBottom(50);
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
      // if Goal is disabled, do not proceed
        if ((this.moment.array_boolean.length > 8) && !this.moment.array_boolean[8]) return;
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

    async moreGoalFunctions(event, goal, componentIndex) {
      event.stopPropagation();
      const masterGoalLabel = (this.moment.matrix_string[componentIndex].length && this.moment.matrix_string[componentIndex][0]) ? this.moment.matrix_string[componentIndex][0] : this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10210)][6];
      let buttons = [];
      if (this.moment.matrix_number[componentIndex][1] && goal[1] === 'goal') { // if enabled Favorite Goal
          buttons = buttons.concat([
              {
                  // Set as Favorite Goal
                  text: this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10210)][9] + ' ' + masterGoalLabel,
                  handler: () => {
                      goal[1] = 'master goal';
                      this.touchGoal(goal, 'master toggle');
                  }
              }
          ]);
      }
      if (goal[1] === 'master goal') { // if master goal, show unfavorite option
          buttons = buttons.concat([
              {
                  // Set as Favorite Goal, Remove Favorite
                  text: this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10210)][11],
                  handler: () => {
                      goal[1] = 'goal';
                      this.touchGoal(goal, 'master toggle');
                  }
              }
          ]);
      }
        // Tag to a Favorite Goal
        if (this.moment.matrix_number[componentIndex][1] && goal[1] === 'goal' && this.responseObj.matrix_string.filter((c) => ['master goal'].includes(c[1])).length) {
            buttons = buttons.concat([
                {
                    text: this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10210)][10] + ' ' + masterGoalLabel,
                    handler: () => {
                        const navTransition = actionSheet.dismiss();
                        navTransition.then( async () => {
                            const picker = await this.pickerCtrl.create({
                                columns: this.getColumns(1),
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel'
                                    },
                                    {
                                        text: 'Confirm',
                                        handler: (result) => {
                                            console.log('selected', result['col-0'].value);
                                            goal[4] = result['col-0'].value[0]; // assign the master goal id to current goal
                                            this.touchGoal(goal, 'assign to master goal');
                                        }
                                    }
                                ]
                            });

                            await picker.present();
                        });
                    }
                }
            ]);
        }
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

    getColumns(numColumns) {
        let columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push({
                name: `col-${i}`,
                options: this.getColumnOptions(i)
            });
        }

        return columns;
    }

    getColumnOptions(columnIndex) {
        let options = [];
        for (let i = 0; i < this.responseObj.matrix_string.filter((c) => ['master goal'].includes(c[1])).length; i++) {
            options.push({
                text: this.responseObj.matrix_string.filter((c) => ['master goal'].includes(c[1]))[i][5],//.substring(0, 10) + (this.responseObj.matrix_string.filter((c) => ['master goal'].includes(c[1]))[i][5].length > 10) ? '...' : '',
                value: this.responseObj.matrix_string.filter((c) => ['master goal'].includes(c[1]))[i]
            });
        }
        options.push({
            text: 'Clear Tag',
            value: ['']
        });
        return options;
    }

    async createCalendarItem(event, momentId) {
        await this.fabButtons.close();
        event.stopPropagation();
        this.newCalendarItem.moment = momentId;
        this.newCalendarItem.schedule = this.customSchedule._id;
        this.newCalendarItem.startDateObj = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()); // cache datetime info for computation only. backend datetime format is in ISOString
        this.newCalendarItem.endDateObj = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()); // cache datetime info for computation only. backend datetime format is in ISOString
        this.newCalendarItem.startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(); // cache datetime info for computation only. backend datetime format is in ISOString
        this.newCalendarItem.endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(); // cache datetime info for computation only. backend datetime format is in ISOString
        this.newCalendarItem.uniqueAnswersPerCalendar = (this.customSchedule.array_boolean.length > 1) && this.customSchedule.array_boolean[1];
        const createdContentCalendarItem: any = await this.momentService.touchContentCalendarItems(this.moment._id, {operation: 'create calendar item', calendaritem: this.newCalendarItem });
        this.openContent(null, createdContentCalendarItem);
        // for Note, also submit an empty response
        if (momentId === '5e4b39cd76ffc96ae6aba323') {
            const responseObj: any = JSON.parse(JSON.stringify(this.responseTemplate));
            responseObj.moment = momentId;
            responseObj.relationship = this.moment._id;
            responseObj.calendar = createdContentCalendarItem._id;
            responseObj.matrix_string.push(['1581143965852193','','','']); // default text answer in Note
            await this.momentService.submitResponse({ _id: momentId }, responseObj, false);
        }
        //this.progressView = 'Current';
    }

    // saving the Content Calendar Item
    async saveCalendarItem() {
      this.calendarItem.endDate = this.calendarItem.startDate; // update the endDate as well
      if (this.moment._id !== this.responseObj.moment) { // in the event that the this.moment._id has been changed to another object id TODO: find out what this scenario is. (e.g. deleting a To-Do would convert the To-Do to Note?)
          // create a new Content Calendar
          this.calendarItem.moment = this.moment._id;
          const calendarItem: any = await this.momentService.touchContentCalendarItems(this.relationshipId, {operation: 'create calendar item', calendaritem: this.calendarItem });

          // create a new responseObj with new data
          this.responseObj.calendar = calendarItem._id;
          this.responseObj.moment = this.moment._id;
          // create a new response
          await this.momentService.submitResponse({ _id: this.moment._id }, this.responseObj, false);

          this.momentService.touchContentCalendarItems(this.relationshipId, {operation: 'delete calendar items', calendaritems: [this.calendarItem] });
      } else { // for all other Content Calendar item save
            // just updating the calendar
          await this.momentService.touchContentCalendarItems(this.relationshipId, {operation: 'update calendar item', calendaritem: this.calendarItem });
          // update the parent Relationship's Goal response entry
          if (this.parentRelationshipListOfGoals && this.parentRelationshipListOfGoals.length) {
              const index = this.parentRelationshipResponseObj.matrix_string.map((c) => c[0]).indexOf(this.calendarId);
              if (index >= 0) {
                  if (this.parentRelationshipResponseObj.matrix_string[index].length < 10) {
                      this.parentRelationshipResponseObj.matrix_string[index].fill(null, this.parentRelationshipResponseObj.matrix_string[index].length, 11);
                  } else if (this.parentRelationshipResponseObj.matrix_string[index].length > 10) {
                      this.parentRelationshipResponseObj.matrix_string[index].splice(10, this.parentRelationshipResponseObj.matrix_string[index].length - 10);
                  }
                  this.parentRelationshipResponseObj.matrix_string[index].push(...this.parentRelationshipGoalAttributes);
              } else {
                  const interactableObj = new Array(10);
                  interactableObj[0] = this.calendarId;
                  if (this.parentRelationshipGoalAttributes) {
                      interactableObj.push(...this.parentRelationshipGoalAttributes);
                  }
                  this.parentRelationshipResponseObj.matrix_string.push(interactableObj);
              }
              // save the Goal attributes via Response
              await this.momentService.submitResponse({ _id: this.relationshipId }, this.parentRelationshipResponseObj, false);
              let socketData: any;
              socketData = {
                  calendarId: this.calendarId,
                  interactable: this.parentRelationshipResponseObj.matrix_string.find((c) => c[0] === this.calendarId),
                  goals: this.parentRelationshipGoalAttributes,
                  author: {
                      _id: this.userData.user._id,
                      first_name: this.userData.user.first_name,
                      last_name: this.userData.user.last_name,
                      avatar: this.userData.user.avatar
                  }
              };
              // signal parent relationship to update data via socket.io
              this.momentService.socket.emit('refresh moment', this.relationshipId, socketData); // Using the moment service socket.io to signal real time dynamic update for other users in the same momentId room
          }
      }
        this.closeModal();
    }

    changeCalendarItemSelectedDate(inputDate) {
        if (inputDate === ' ') return;
        this.calendarService.calendar.selectedDate = new Date(inputDate.getTime());
        this.calendarItem.startDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), new Date(this.calendarItem.startDate).getHours(), new Date(this.calendarItem.startDate).getMinutes()).toISOString();
        this.anyChangeMade = true;
    }

    deleteCalendarItem(event) {
        event.stopPropagation();
        this.momentService.touchContentCalendarItems(this.relationshipId, {operation: 'delete calendar items',  calendaritems: [this.calendarItem]});
        this.closeModal();
    }

  async openRegister(slide, loginStatus) {
    //   const registerModal = await this.modalCtrl.create({component: RegisterPage, componentProps: { slide: slide, loginStatus: loginStatus, modalPage: true}});
      const modalObject: any = {component: RegisterPage, componentProps: { slide: slide, loginStatus: loginStatus, modalPage: true } };
      if (this.platform.width() >= 768) {
          modalObject.cssClass = 'fullScreen';
      }
      const registerModal = await this.modalCtrl.create(modalObject);
      await registerModal.present();
  }

  async focusPhoto(event, object) {
    event.stopPropagation();
    const modal = await this.modalCtrl.create({component: FocusPhotoPage, componentProps: {imageUri: object}});
    await modal.present();
  }

  changeTabSelection(event) {
      this.tabSelection = parseInt(event.detail.value, 10);
      // check if Notes section needs to be refresh
      this.checkAndLoadNotes();
  }

  closeModal() {
    this.destroyPlayers(null);
    // for Content Calendar Item that just got created but not named (i.e. abandoned)
    if (this.relationshipId && this.calendarId && this.calendarItem && !this.calendarItem.title && !this.anyChangeMade) {
        // in a special case when a calendarItem was created but not named, delete it upon exit
        this.momentService.touchContentCalendarItems(this.relationshipId, {operation: 'delete calendar items',  calendaritems: [this.calendarItem]});
    }
    if (this.authService.token && this.modalPage) {
      this.modalCtrl.dismiss(this.anyChangeMade);
    } else if (this.participant_type || this.token) {
      this.router.navigateByUrl('/app/discover');
    } else if (this.router.url.includes('/app/myconversation')) {
      this.router.navigate(['/app/myconversations/chat'], { skipLocationChange: true });
    } else {
        if (this.relationshipId && this.anyChangeMade) {
            setTimeout(() => {
                this.momentService.refreshMoment({ momentId: this.relationshipId, data: { type: 'refresh notes' }});
            }, 2000);
        }
      this.location.back();
    }
  }

  toggleSpecialAccess(event) {
      event.stopPropagation();
      this.content.scrollToTop(100);
      this.showSpecialAccess = !this.showSpecialAccess;
  }


    async processVerificationToken() {
        this.token = this.route.snapshot.paramMap.get('token');
        this.verification_token = this.route.snapshot.paramMap.get('verify');
        this.participant_type = this.route.snapshot.paramMap.get('type') ? parseInt(this.route.snapshot.paramMap.get('type'), 10) : null;
        if (this.verification_token) {
            try {
                this.loading = await this.loadingCtrl.create({
                    message: 'Verifying...'
                });
                await this.loading.present();
                const result: any = await this.authService.verifyEmail({verification_token: this.verification_token});
                if (result.success && result.token) {
                    this.authService.cachedRouteParams = null; // remove the route params, including the verification token
                    this.authService.cachedRouteParams = { type: this.participant_type, token: this.token }; // reinstate the invitation params
                    // this will reload the app by first validating the returned auth token
                    const res: any = await this.authService.checkAuthenticationWithToken(result.token);
                    this.loading.dismiss();
                    if (res.content === 'Success') {
                        console.log('Token authorized');
                        this.userData.user = res.user;
                        this.userData.processLoadedUserData();
                        await this.userData.loadStoredCommunity();
                        this.userData.refreshAppPages();
                    } else {
                        console.log('Token is not authorized');
                        const alert = await this.alertCtrl.create({
                            header: 'Something went wrong',
                            message: 'Please try again later.',
                            buttons: [{
                                text: 'OK',
                                handler: () => {
                                }
                            }],
                            cssClass: 'level-15'
                        });
                        alert.present();
                        this.setupPermissionCompleted = true;
                    }
                } else {
                    this.loading.dismiss();
                    const alert = await this.alertCtrl.create({
                        header: 'Account Activated',
                        message: result.msg,
                        buttons: [{
                            text: 'OK',
                            handler: () => {
                            }
                        }],
                        cssClass: 'level-15'
                    });
                    alert.present();
                }
            } catch (err) {
                this.loading.dismiss();
                console.log('Error in authentication');
            }
            this.setupPermissionCompleted = true;
        }
    }

    async upOneLevel(momentId) {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        } else if (this.userData.activitiesWithAdminAccess.find((c) => c._id === momentId)) {
            this.userData.currentManageActivityId = momentId;
            this.router.navigate(['/app/manage/activity/' + momentId + '/insight/' + momentId]);
        } else {
            this.router.navigate(['/app/activity/' + momentId]);
        }
    }

  async noNetworkConnection(){
    const networkAlert = await this.alertCtrl.create({
      header: 'No Internet Connection',
      message: 'Please check your internet connection.',
      buttons: ['Dismiss'],
      cssClass: 'level-15'
    });
    await networkAlert.present();
  }

  // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
  customTrackBy(index: number, item: any): any {
    return index;
  }

  ngOnDestroy() {
    if (this.authService.token && this.moment && this.moment._id && this.momentService.socket) {
      if (this.relationshipId && this.calendarId && this.calendarItem && this.calendarItem.uniqueAnswersPerCalendar) {
          this.momentService.socket.emit('leave moment', this.calendarId) ;
      } else if (this.relationshipId) {
          this.momentService.socket.emit('leave moment', this.relationshipId) ;
          this.momentService.socket.emit('leave moment', this.moment._id + this.relationshipId) ;
      } else {
          this.momentService.socket.emit('leave moment', this.moment._id) ;
      }
    }
    if (this.subscriptions.refreshUserStatus) this.subscriptions['refreshUserStatus'].unsubscribe(this.loadAndProcessMomentHandler);
    if (this.subscriptions.refreshMoment) this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
  }

    // for refreshing moment either because of real-time interactables, or for refreshing participation
    refreshMomentHandler = async (res) => {
        console.log("incoming refresh", res)
        if (res && res.momentId && res.data) {
            const momentId = res.momentId;
            const data = res.data;
            if (momentId === this.moment._id && data.operation === 'deleted moment') {
                this.closeModal();
                // for Content Item to refresh its parent relationship responses (any update on the parent should refresh the current content item's copy of parentRelationshipResponseObj), because the parentRelationshipResponseObj will be sent out so it needs to be fresh)
            } else if (momentId === this.relationshipId) {
                if (data.calendarId) {
                    // keep the parentRelationshipResponseObj fresh
                    const index = this.parentRelationshipResponseObj.matrix_string.map((c) => c[0]).indexOf(data.calendarId);
                    if (index >= 0) {
                        this.parentRelationshipResponseObj.matrix_string.splice(index, 1, data.interactable);
                    } else {
                        this.parentRelationshipResponseObj.matrix_string.push(data.interactable);
                    }
                } else if (data.goal) {
                    if (data.action === 'delete') {
                        // keep the parentRelationshipResponseObj fresh by removing goal
                        const index = this.parentRelationshipResponseObj.matrix_string.map((c) => c[0]).indexOf(data.goal[0]);
                        if (index >= 0) {
                            this.parentRelationshipResponseObj.matrix_string.splice(index, 1);
                        }
                    } else {
                        // keep the goal fresh in parentRelationshipResponseObj
                        const i = this.parentRelationshipResponseObj.matrix_string.map((c) => c[0]).indexOf(data.goal[0]);
                        if (i >= 0) {
                            this.parentRelationshipResponseObj.matrix_string.splice(i, 1, data.goal);
                        } else {
                            this.parentRelationshipResponseObj.matrix_string.push(data.goal);
                        }
                    }
                }
                // for all other socket io moment room signal, including moment._id, momentId + relationshipId, calendarId
            } else if ((this.moment._id === momentId) || (this.moment._id + (this.relationshipId || '') === momentId) || ((this.calendarId || '') === momentId)) {
                if (data.response) {
                    const index = this.responses.map((c) => c._id).indexOf(data.response._id);
                    if (index < 0) { // if the response hasn't been added to the response list
                        this.responses.push(data.response);
                    } else { // if it has been added, replace with the incoming one
                        this.responses.splice(index, 1, data.response);
                    }
                    // now the latest response have been included, reset the display array for Poll
                    if (data.response.matrix_number) {
                        for (const interactable of data.response.matrix_number) {
                            const interactableId = interactable[0];
                            if (this.interactableDisplay.hasOwnProperty(interactableId)) {
                                // if the response includes a Poll
                                const componentId = this.moment.resource.matrix_number[0][this.moment.resource.matrix_number[2].indexOf(interactableId)];
                                if (componentId === 30000) {
                                    // reset vote count to zero
                                    this.interactableDisplay[interactableId].forEach((displayItem) => {
                                        displayItem.count = 0;
                                        displayItem.votedByUser = false;
                                    });
                                    // reconstruct the interactable Display array
                                    this.totalVoteCount[interactableId] = 0;
                                    this.setupPollDisplay(interactableId, this.moment.resource.matrix_number[2].indexOf(interactableId));
                                } else if (componentId === 40000) { // multiple choice
                                    this.setupInteractableDisplay(interactableId, this.moment.resource.matrix_number[2].indexOf(interactableId));
                                } else if (componentId === 40010) { // text answer
                                    // using delta. see below
                                } else if (componentId === 40020) { // tile choice
                                    this.setupInteractableDisplay(interactableId, this.moment.resource.matrix_number[2].indexOf(interactableId));
                                }
                            }
                        }
                    }
                } else if (data.type === 'refresh participation') {
                    await this.loadMoment();
                    if (this.moment && this.moment._id) {
                        if (this.authService.token && this.userData.user) {
                            this.setupPermission();
                        } else {
                            this.setupPermissionCompleted = true;
                        }
                    }
                    // text answer interactable
                    // socket.io is broadcasted on 3 levels:
                    // 1. to the entire momentId room. use case is an onboarding process or a regular Activity that has an interactable
                    // 2. to momentId - relationshipId room. use case is in a Relationship's Content, when user is responding to Content that can be used by multiple Relationships
                    // 3. to momentId - relationshipId room, but also include a calendarId tag. use case is for a specific Content that is being repeated by a schedule, and the response is different for each Content calendar item.
                    // { delta: Delta object }, interactableId: Number, author: { _id: String }, collaborate: Boolean }
                } else if (data.type === 'refresh calendar items') {
                    // load content calendars from backend.
                    // if it has Organizer Access. this is for the event when a Community/Program super admin needs to access the calendar contents
                    if (this.hasOrganizerAccess) {
                        const results: any = await this.calendarService.loadRelationshipContentCalendars(this.moment._id, true);
                        this.adminOrPublicAccessContentCalendars = results || [];
                        // if it is unauthenticated public view, or it has enabled 'allow authenticated user to access content'
                    } else if (!this.authService.token || ((this.moment.array_boolean.length > 10) && this.moment.array_boolean[10])) {
                        const results: any = await this.calendarService.loadRelationshipContentCalendars(this.moment._id, false);
                        this.adminOrPublicAccessContentCalendars = results || [];
                    } else { // adminOrPublicAccessContentCalendars is used instead of calendarService.calendarItems, so no need to update user's calendar for Organizer
                        await this.calendarService.getUserCalendar(); // refresh and fetch the latest calendar items
                        this.calendarService.updateViewCalendar(); // this will recalculate the past, current, upcoming flags
                    }
                    this.refreshCalendarDisplay();
                    this.checkAndLoadNotes();
                } else if (data.type === 'refresh notes') {
                    this.checkAndLoadNotes();
                } else if (data.delta && data.interactableId && this.interactableDisplay.hasOwnProperty(data.interactableId)) {
                    // update the interactable Display (private or collaborative view)
                    console.log("delta", this.interactableDisplay)
                    if (this.interactableDisplay.hasOwnProperty(data.interactableId) && this.interactableDisplay[data.interactableId].editor) {
                        this.interactableDisplay[data.interactableId].editor.updateContents(data.delta, 'silent');
                    }
                } else if (data.calendarId) {
                    // if to-dos are not private (collaborative), or if it is private and the response is created by the user
                    const todosPrivacyPermission = !this.toDosPrivate || (this.toDosPrivate && data.author._id === this.userData.user._id);
                    // in the event that Goals is turned off, but there are still Goal update, it must be sent by an admin so we can grant permission
                    const goalsPrivacyPermission = todosPrivacyPermission || ((this.moment.array_boolean.length > 8) && !this.moment.array_boolean[8]);

                    // update user's calendar items array
                    for (const calendarItem of this.calendarService.calendarItems) {
                        if (calendarItem._id === data.calendarId) { // interactable[0] is a String
                            if (todosPrivacyPermission && data.state) {
                                calendarItem.completed = data.state;
                            } else if (goalsPrivacyPermission && data.goals) {
                                calendarItem.goals = data.goals;
                            }
                        }
                    }
                    // update super admin's calendar items list (ad hoc for super admin. normally empty for regular user who is not a super admin)
                    for (const calendarItem of this.adminOrPublicAccessContentCalendars) {
                        if (calendarItem._id === data.calendarId) { // interactable[0] is a String
                            if (todosPrivacyPermission && data.hasOwnProperty('state')) {
                                calendarItem.completed = data.state;
                            } else if (goalsPrivacyPermission && data.goals) {
                                calendarItem.goals = data.goals;
                            }
                        }
                    }
                    // keep the responseObj fresh
                    // if it is to toggle the to-do state
                    if (todosPrivacyPermission && data.hasOwnProperty('state')) {
                        const index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(data.calendarId);
                        if (index >= 0) {
                            this.responseObj.matrix_string[index].splice(0, 5);
                            this.responseObj.matrix_string[index].unshift(...data.interactable.slice(0, 6));
                        } else {
                            this.responseObj.matrix_string.push(JSON.parse(JSON.stringify(data.interactable)));
                        }
                        // if it is to change a content calendar's goal attributes
                    } else if (goalsPrivacyPermission && data.goals) {
                        const index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(data.calendarId);
                        if (index >= 0) {
                            if (this.responseObj.matrix_string[index].length < 10) {
                                this.responseObj.matrix_string[index].fill(null, this.responseObj.matrix_string[index].length, 11);
                            } else if (this.responseObj.matrix_string[index].length > 10) {
                                this.responseObj.matrix_string[index].splice(10, this.responseObj.matrix_string[index].length - 10);
                            }
                            this.responseObj.matrix_string[index].push(...data.goals);
                        } else {
                            let interactableObj = Array(10);
                            interactableObj[0] = data.calendarId;
                            interactableObj.push(...data.goals);
                            this.responseObj.matrix_string.push(interactableObj);
                        }
                    }
                } else if (data.goal) {
                    if (data.action === 'delete') {
                        let index = this.listOfDisplayGoals.map((c) => c[0]).indexOf(data.goal[0]);
                        if (index >= 0) {
                            this.listOfDisplayGoals.splice(index, 1);
                        }
                        // keep the responseObj fresh by removing goal
                        index = this.responseObj.matrix_string.map((c) => c[0]).indexOf(data.goal[0]);
                        if (index >= 0) {
                            this.responseObj.matrix_string.splice(index, 1);
                        }
                    } else {
                        let index =  this.listOfDisplayGoals.map((c) => c[0]).indexOf(data.goal[0]);
                        if (index >= 0) {
                            this.listOfDisplayGoals.splice(index, 1, data.goal);
                        } else {
                            this.listOfDisplayGoals.push(data.goal);
                        }
                        for (let interactable of this.listOfDisplayGoals) {
                            interactable[2] = (interactable[2] == 'true'); // convert type to boolean
                        }

                        // keep the goal fresh in responseObj
                        const i = this.responseObj.matrix_string.map((c) => c[0]).indexOf(data.goal[0]);
                        if (i >= 0) {
                            this.responseObj.matrix_string.splice(i, 1, data.goal);
                        } else {
                            this.responseObj.matrix_string.push(data.goal);
                        }
                    }
                }
                // if refreshing the parent Relationship (when viewing a Content that belongs to a relationship)
            }
        }
    };
}
