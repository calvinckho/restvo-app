import {ChangeDetectorRef, Component, OnInit, Input, ViewChild, ViewEncapsulation, OnDestroy} from '@angular/core';
import { ElectronService } from 'ngx-electron';
import * as Plyr from 'plyr';
import {SwUpdate} from '@angular/service-worker';
import {ActivatedRoute, Router} from '@angular/router';
import {
    ActionSheetController,
    AlertController,
    IonContent, LoadingController,
    ModalController,
    Platform,
    PopoverController,
    ToastController
} from '@ionic/angular';
import {Location} from '@angular/common';

import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';
import {Chat} from '../../../services/chat.service';
import {Churches} from '../../../services/church.service';
import {UserData} from '../../../services/user.service';
import {Aws} from '../../../services/aws.service';
import {Moment} from '../../../services/moment.service';
import {Resource} from '../../../services/resource.service';
import {Response} from '../../../services/response.service';
import {CalendarService} from '../../../services/calendar.service';
import {NetworkService} from '../../../services/network-service.service';
import {UploadmediaPage} from '../uploadmedia/uploadmedia.page';
import {PickfeaturePopoverPage} from '../pickfeature-popover/pickfeature-popover.page';

@Component({
  selector: 'app-editfeature',
  templateUrl: './editfeature.page.html',
  styleUrls: ['./editfeature.page.scss'],
  encapsulation: ViewEncapsulation.None,
    providers: [ CalendarService ]
})
export class EditfeaturePage implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;

  @Input() modalPage: any; // whether the page is opened with hte modalController
  @Input() moment: any; // the object to store the activity
    @Input() categoryId: any;
    // for Onboarding Activity
    @Input() programId: any; //  program Id the onboarding activity is associated with
    @Input() type = 2; // type 2: participant onboarding, 3: organizer onboarding, 4: leader onboarding
    // for Child Activity
    @Input() parent_programId: any; // parent Program ID
    // for Content (which is a child Activity)
    @Input() scheduleId: string; // if Content created will be associated with a content calendar (managed by Schedule)
    @Input() goalId: string; // if Content Calendar created is affliated withe a Goal ID

    @Input() visibleComponents: any;

    subpanel = false;
    subscriptions: any = {};
    editTemplate = true;
    addComponentActivated = false;
  templateChanged = false;
  ionSpinner = false;

  reminders: any = [];
  group: any;
  churchId = '';
  selectedAppUsers: any = [];
  resource: any = {}; // general resource for the EditFeaturePage
  categories: any;
  peer_preferences: any;
  preferences: any;
  peer_responses = [];
  loadedPeerOnboardingProcesses = false;
  match_configs: any;

  startDate = new Date();
  endDate = new Date();
  startTime: string;
  endTime: string;
  allDay = false;
  dateType = ''; // specifies if user is changing start date or end date

  localTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  loading: any;
  addressURL = '';
  addressSearchString = '';
  searchAddressResults: any;
  churches: Array<{_id: string, name: string, selected: boolean}> = [];
  mediaList: Array<{_id: string, player: Plyr}> = [];
  referenceActivities = [];
  removedMoments = [];
  participantsView = 'participants';
  anyChangeMade: any;
  advancedFeature = false;
  initialSetupCompleted = false;
    participantLabel = 'Participant';
    organizerLabel = 'Organizer';
    leaderLabel = 'Leader';
    participantsLabel = 'Participants';
    organizersLabel = 'Organizers';
    leadersLabel = 'Leaders';
    childActivityLabel = 'Plan';
    tempTabComponentSelection = [];
    interactableDisplay: any = {};     // an object of arrays of options to be displayed

    activityResourceObj = { // default template object
      field: 'User Defined Activity',
      matrix_number: [[], [], [], [], []],
      'en-US': {
          value: [''],
          matrix_string: []
      }
  };

  momentObj = { // default Activity object
      resource: {}, // template
      categories: [], // do not need to pre-define it because it is optional
      child_categories: [], // do not need to pre-define it because it is optional
      matrix_number: [],
      matrix_string: [],
      conversations: [],
      array_boolean: Array(11), // default to not published in Discover (0), and not a Restvo system activity (1), not a participant onboarding activity (2), not a organizer onboarding activity (3), not a leader onboarding activity (4)
      array_community: ['5ab62be8f83e2c1a8d41f894'], // Restvo as default community
      assets: [],
      program: '',
      parent_programs: [],
      location: {
          location: '',
          street: '',
          city: '',
          state: '',
          geo: {
              type: 'Point',
              coordinates: []
          }
      },
      calendar: {       // create the calendar object
          title: '',    // if title is empty because 10200 and 10400 are both turned off when creating, the entire calendar object is deleted on moment creation
          location: '',
          notes: '',
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          options: {
              firstReminderMinutes: 0,
              secondReminderMinutes: 0,
              reminders: []
          }
      }
  };
    responseObj = {
        matrix_string: [],
        matrix_number: [],
        moment: '',
        dependent_moment: '',
        createdAt: new Date()
    };

    quillEditorToolbarConfig = [
        ['bold', 'italic'], // toggled buttons
        ['link'],           // link and image, video
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],
        ['clean'],  // remove formatting button
    ];

  constructor (
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
      public calendarService: CalendarService
  ) {}

    // Use cases:

    // Restvo Activity
    // Restvo Program, User-defined Activity, which can access all the components offered by this class

    // Onboarding Activity
    // Onboarding Questions uses mainly the multiple choice and text input components. It needs to have an associated program ID and a type number (2 for participants onboarding, 3 for organizers, 4 for leaders)

  async ngOnInit() {
      this.subpanel = !!this.route.snapshot.paramMap.get('subpanel');
      this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
      this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.reloadEditPage);
      this.subscriptions['refreshUserCalendar'] = this.userData.refreshUserCalendar$.subscribe(async (res) => {
          this.calendarService.getUserCalendar();
      });
  }

    // for Desktop routing, it is possible for user to jump between page views without properly using the back button (closeModal and ngOnDestroy).
    // assumption: leaving the page improperly will lose all unsaved changes. Re-entering will refresh the edit page to its initial state.
    // in such case, ionViewWillEnter listener is used to detect re-entering a page view and reloading the page
  ionViewWillEnter() {
      // re-entering edit on Desktop only
      if (this.userData.user && this.moment && this.moment._id && !this.modalPage) {
          this.setup();
      }
  }

    reloadEditPage = async () => { // refresh the Edit Page if it has loaded data. it is only called on entry for PDA fast load when authService has completed
      if (this.userData.user && !this.initialSetupCompleted) {
          this.setup();
      }
    }

    // for refreshing moment either because of real-time interactables, or for refreshing participations
    refreshMomentHandler = async (res) => {
        if (res && res.data && res.data.type === 'refresh participation' && this.moment && this.moment._id) {
            await this.reloadMomentUserLists();
            if (!['owner', 'staff', 'admin'].includes(this.userData.user.role) && !this.moment.user_list_2.map((c) => c._id).includes(this.userData.user._id)) {
                // if user is no longer an organizer, and if not a system admin, exit edit view
                this.closeModal(true);
            }
        } else if (res && res.data && this.moment && res.momentId === this.moment._id && res.data.operation === 'deleted moment') {
            if (this.modalPage) {
                this.closeModal(false);
            } else {
                this.subscriptions['refreshUserStatus'].unsubscribe(this.reloadEditPage);
            }
            // for Content Item to refresh its parent relationship responses (any update on the parent should refresh the current content item's copy of parentRelationshipResponseObj), because the parentRelationshipResponseObj will be sent out so it needs to be fresh)
        }
    }

  async setup() {
      try {
          this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
          this.awsService.sessionAllowedCount = 9999; // allow up to 9999 files upload
          this.churches = this.userData.user.churches.map((c) => ({_id: c._id, name: c.name, selected: false}));
          this.churches.find((c) => c._id === '5ab62be8f83e2c1a8d41f894').selected = true;
          this.churches.unshift({_id: '', name: 'None', selected: false});

          if (!this.modalPage) { // if angular routing, load the params
              this.programId = this.route.snapshot.paramMap.get('programId'); // the program ID
              this.type = parseInt(this.route.snapshot.paramMap.get('type'), 10); // 2: participants, 3: organizers, 4: leaders
              this.categoryId = this.route.snapshot.paramMap.get('categoryId'); // get the categoryId
              this.parent_programId = this.route.snapshot.paramMap.get('parent_programId'); // the program ID
              this.scheduleId = this.scheduleId || this.route.snapshot.paramMap.get('scheduleId');
              this.goalId = this.goalId || this.route.snapshot.paramMap.get('goalId');

              if (this.route.snapshot.paramMap.get('id')) {
                  this.moment = await this.momentService.load(this.route.snapshot.paramMap.get('id'));
              }
          } else if (this.modalPage && this.moment && this.moment._id) { // if enter via modalPage, load moment by default
              this.moment = await this.momentService.load(this.moment._id);
          }
          // determine visible components based on @Input or param
          this.visibleComponents = (this.visibleComponents || this.route.snapshot.paramMap.get('visibleComponents') || []);
          if (this.visibleComponents && this.visibleComponents.length) {
              if (typeof this.visibleComponents === 'string') {
                  this.visibleComponents = this.visibleComponents.split(',').map((c) => parseInt(c, 10));
              }
              this.editTemplate = false;
          }
          console.log('loaded moment', this.moment);

          // there are now 3 scenarios: 1) create a new Activity, 2) create a new activity with a predefined template, 3) load an existing activity (with the predefined template with it)

          // 1. if creating a new Activity, only run this once
          if (!this.moment && !this.initialSetupCompleted) {
              this.editTemplate = true;
              this.moment = JSON.parse(JSON.stringify(this.momentObj));

              // load the default template object
              this.moment.resource = JSON.parse(JSON.stringify(this.activityResourceObj));

              if (this.programId) { // creating new onboarding process
                  this.moment.program = this.programId;
                  this.moment.array_boolean[(this.type || 2)] = true; // default to participant onboarding
              } else {
                  delete this.moment.program; // null will cause mongoDB error when trying to convert it to ObjectId
              }

              if (this.parent_programId) { // creating new child Activity
                  this.moment.parent_programs = [this.parent_programId];
              } else {
                  delete this.moment.parent_programs; // empty array will cause mongoDB error when trying to convert it to ObjectId
              }
          }

          const result: any = await this.resourceService.loadSystemResources();
          this.resource = result.find((c) => c.field === 'Activity Components v2'); // return the activity components resource object in the result array
          this.categories = result.filter((c) => c.field === 'Activity Category'); // return the Activity Category array by filtering the result array
          this.childActivityLabel = this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10370)][0]; // assign 'Plan' to childActivityLabel as default

          // 2. create a new activity with a predefined template

          if (!this.initialSetupCompleted) {
              // hard code the components to be added by calling addComponents with the component IDs (consult Restvo Feature Schematic.txt file)
              if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Onboarding Process
                  this.moment.resource['en-US'].value[0] = this.categories.find((c) => c._id === this.categoryId)['en-US'].value[0]; // Onboarding Process
                  this.moment.categories = ['5e17acd47b00ea76b75e5a71'];
                  this.addComponent(10000); // add the "Activity Name"
                  this.addComponent(20000); // Visibility
                  this.addComponent(20010); // add the slider to enable the walkthrough
                  this.addComponent(40010); // add text answer
                  this.editTemplate = true;
              } else if (this.categoryId === '5c915324e172e4e64590e346') { // Community
                  this.moment.resource['en-US'].value[0] = this.categories.find((c) => c._id === this.categoryId)['en-US'].value[0]; // 'Community';
                  this.moment.categories = ['5c915324e172e4e64590e346'];
                  this.moment.child_categories = ['5c915475e172e4e64590e348', '5e17acd47b00ea76b75e5a71']; // program, onboarding
                  this.addComponent(10000); // add the "Community Name"
                  this.addComponent(20000); // Visibility
                  this.addComponent(10300); // Upload Media
                  this.addComponent(10050); // section header
                  this.addComponent(10010); // Description
                  // assign default Community description
                  this.moment.matrix_string[this.moment.resource.matrix_number[0].indexOf(10010)][0] = this.resource['en-US'].value[34];
                  this.addComponent(10370); // References
                  this.addComponent(10500); // People
                  this.addComponent(11000); // Chat
                  this.editTemplate = true;
              } else if (this.categoryId === '5c915475e172e4e64590e348') { // Program
                  this.moment.resource['en-US'].value[0] = this.categories.find((c) => c._id === this.categoryId)['en-US'].value[0]; // 'Program';
                  this.moment.categories = ['5c915475e172e4e64590e348'];
                  this.addComponent(10000); // add the "Program Name"
                  this.addComponent(20000); // Visibility
                  this.addComponent(50000); // Directory
                  this.addComponent(10050); // section header
                  this.addComponent(10010); // Description
                  this.addComponent(10500); // People
                  this.addComponent(11000); // Chat
                  this.editTemplate = true;
              } else if (this.categoryId === '5dfdbb547b00ea76b75e5a70') { // Relationship
                  this.moment.resource['en-US'].value[0] = this.categories.find((c) => c._id === this.categoryId)['en-US'].value[0]; // 'Relationship';
                  this.moment.categories = ['5dfdbb547b00ea76b75e5a70'];
                  this.addComponent(10000); // add the "Relationship Name"
                  this.addComponent(20000); // Visibility
                  this.addComponent(10300); // Upload Media
                  this.addComponent(10050); // section header
                  this.addComponent(10010); // Description
                  this.addComponent(10370); // Plan
                  this.addComponent(10500); // People
                  this.addComponent(11000); // Chat
                  this.editTemplate = true;
              } else if (this.categoryId === '5e1bbda67b00ea76b75e5a73') { // Content
                  this.moment.array_boolean[9] = true;
                  this.moment.resource['en-US'].value[0] = this.categories.find((c) => c._id === this.categoryId)['en-US'].value[0]; // 'Content';
                  this.moment.categories = ['5e1bbda67b00ea76b75e5a73'];
                  this.addComponent(10000); // add the "Content Name"
                  // this.addComponent(20000); // Visibility
                  this.editTemplate = true;
              } else if (this.categoryId) {
                  this.moment.resource['en-US'].value[0] = this.resource['en-US'].value[0]; // 'Activity';
                  this.categories = [this.categoryId];
                  this.addComponent(10000); // add the "Activity Name"
                  this.editTemplate = true;
              }
          }

          // 3. if loading an existing Activity
          if (this.moment && this.moment._id) {
              //this.moment = await this.momentService.load(this.moment._id); // this load the activity with the template as its resource
              // setup People (10500) labels
              let peopleComponentId = -1;
              if (this.moment.resource.matrix_number && this.moment.resource.matrix_number.length) {
                  peopleComponentId = this.moment.resource.matrix_number[0].indexOf(10500);
                  while (this.moment.resource.matrix_number.length < 5) { // if the matrix_number has not added all 5 sets of array yet
                      this.moment.resource.matrix_number.push(Array(this.moment.resource.matrix_number[0].length));
                      this.templateChanged = true;
                  }
              }
              if (peopleComponentId > -1) {
                  this.participantLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 3 && this.moment.matrix_string[peopleComponentId][2] ? this.moment.matrix_string[peopleComponentId][2] : (this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][4] > 4) ? this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][4] : this.participantLabel;
                  this.organizerLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 5 && this.moment.matrix_string[peopleComponentId][4] ? this.moment.matrix_string[peopleComponentId][4] : (this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][6].length > 6) ? this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][6] : this.organizerLabel;
                  this.leaderLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 1 && this.moment.matrix_string[peopleComponentId][0] ? this.moment.matrix_string[peopleComponentId][0] : (this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][8].length > 8) ? this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][8] : this.leaderLabel;
                  this.participantsLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 3 && this.moment.matrix_string[peopleComponentId][3] ? this.moment.matrix_string[peopleComponentId][3] : (this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)].length > 5) ? this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][5] : this.participantsLabel;
                  this.organizersLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 5 && this.moment.matrix_string[peopleComponentId][5] ? this.moment.matrix_string[peopleComponentId][5] : (this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)].length > 7) ? this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][7] : this.organizersLabel;
                  this.leadersLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 1 && this.moment.matrix_string[peopleComponentId][1] ? this.moment.matrix_string[peopleComponentId][1] : (this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)].length > 9) ? this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(10500)][9] : this.leadersLabel;
              }
              this.referenceActivities = [];
              this.moment.array_moment.forEach((moment) => {
                  this.referenceActivities.push(moment);
              });
              if (this.moment.hasOwnProperty('array_community') && this.moment.array_community.length && typeof this.moment.array_community[0] === 'object') {
                  // convert populated community back to ids
                  const communityIds = this.moment.array_community.map((c) => c._id);
                  delete this.moment.array_community;
                  this.moment.array_community = communityIds;
                  if (this.moment.array_community.indexOf('5ab62be8f83e2c1a8d41f894') < 0) {
                      this.moment.array_community.push('5ab62be8f83e2c1a8d41f894'); // Restvo is added by default
                  }
                  // add any outside community to the list
                  const listOfChurchIds = this.churches.map((c) => c._id );
                  const promises = this.moment.array_community.map( async (communityId) => {
                      const index = listOfChurchIds.indexOf(communityId);
                      if (index < 0) { // add the outside community to the list
                          const [church] = await this.churchService.loadChurchProfile(communityId);
                          this.churches.push({_id: church._id, name: church.name, selected: true});
                      }
                  });
                  await Promise.all(promises);
              } else {
                  this.moment.array_community = ['5ab62be8f83e2c1a8d41f894'];
              }
              if (this.moment.hasOwnProperty('categories') && this.moment.categories.length && typeof this.moment.categories[0] === 'object') {
                  // convert populated categories back to ids
                  const categoryIds = this.moment.categories.map((c) => c._id);
                  delete this.moment.categories;
                  this.moment.categories = categoryIds;
              }
              if (!this.moment.hasOwnProperty('array_boolean')) {
                  this.moment.array_boolean = [false, false]; // if array_boolean empty, initialize it for boolean values for list in Discover and show in Marketplace
              } else if (this.moment.array_boolean && this.moment.array_boolean.length === 1) { // if index 1 (show in Marketplace) is missing, set default to false
                  this.moment.array_boolean.push(false);
              } else if (this.moment.array_boolean[2]) { // participant onboarding
                  this.loadPeerOnboardActivities(2);
              } else if (this.moment.array_boolean[3]) { // organizer onboarding
                  this.loadPeerOnboardActivities(3);
              } else if (this.moment.array_boolean[4]) { // leader onboarding
                  this.loadPeerOnboardActivities(4);
              } else if (this.moment.resource.hasOwnProperty('matrix_number') && this.moment.resource.matrix_number.length && this.moment.resource.matrix_number[0].indexOf(50000) > -1) {
                  this.loadProgramOnboardActivities(); // load list of onboarding processes
              }
              if (!this.moment.location) {
                  this.moment.location = {
                      location: ''
                  };
              }
              if (this.moment.resource.matrix_number.length) {
                  this.moment.resource.matrix_number[0].forEach((componentId, index) => {
                      if ((componentId >= 10300 && componentId <= 10360 || componentId === 20000) && !this.moment.matrix_number[index].length) {
                          this.moment.matrix_number[index].push(...[0, 0]); // default: hide photo = false (pos 0), show caption = false (pos 1)
                      }
                  });
              }
              // if the template has at least 1 component in it
              if (this.moment.resource.hasOwnProperty('matrix_number') && this.moment.resource.matrix_number.length) {
                  // rebuild the moment assets array using raw data
                  this.moment.assets = [];
                  this.moment.resource.matrix_number[0].forEach((componentId, index) => { // loop through all component ids
                      if (componentId >= 10300 && componentId <= 10360 || (componentId === 10010) || (componentId === 40010)) {
                          for (const asset of this.moment.matrix_string[index]) { // loop through all media file and add the ones that is an image to the moment.assets array
                              if (asset && asset.length && (['jpg', 'jpeg', 'gif', 'png']).includes(asset.substring(asset.lastIndexOf('.') + 1).toLowerCase())) {
                                  this.moment.assets.push(asset);
                              }
                          }
                      }
                  });
              }
              this.awsService.sessionAssets[this.moment._id] = this.moment.assets; // store all asset urls associated with this moment in the awsAssets
          } else {
              this.startTime = new Date(new Date().setMinutes(0)).toISOString();
              this.endTime = new Date(new Date().setMinutes(0)).toISOString();
          }
          this.moment.resource.matrix_number[2].forEach((interactableId, index) => { // process the text answer responses
              const interactable = this.moment.matrix_string[index];
              if (!this.interactableDisplay[interactableId]) {
                  this.interactableDisplay[interactableId] = { editor: null };
              }
              if (this.moment.resource.matrix_number[0][index] === 10010) { // interactableId is a Number
                  let content: any;
                  if (interactable.length > 2 && interactable[2]) {
                      content = JSON.parse(interactable[2]);
                  } else { // for backward compatibility before quill, need to build the content object from scratch
                      content = {ops: [{insert: (interactable[0] || '') + '\n'}]};
                  }
                  this.interactableDisplay[interactableId].content = content; // insert the response data into the display matrix
              }
          });
          if (this.moment.location && this.moment.location.geo && this.moment.location.geo.coordinates && this.moment.location.geo.coordinates.length) {
              this.addressURL = 'https://maps.locationiq.com/v2/staticmap?key=pk.e5797fe100f9aa5732d5346f742b243f&center=' + this.moment.location.geo.coordinates[1] + ',' + this.moment.location.geo.coordinates[0] + '&zoom=12&size=1000x600&maptype=roadmap&markers=icon:%20large-red-cutout%20|' + this.moment.location.geo.coordinates[1] + ',' + this.moment.location.geo.coordinates[0];
          }
          if (this.moment.calendar && this.moment.calendar._id) {
              this.startDate = new Date(this.moment.calendar.startDate);
              this.endDate = new Date(this.moment.calendar.endDate);
              this.startTime = this.startDate.toISOString();
              this.endTime = this.endDate.toISOString();
              if ((this.endDate.getTime() - this.startDate.getTime()) === (24 * 60 * 60 * 1000)) { // determine whether it is an all-day event
                  this.allDay = true;
              }
              if (this.moment.calendar.options && this.moment.calendar.options.firstReminderMinutes) {
                  this.reminders[0] = this.moment.calendar.options.firstReminderMinutes.toString();
              }
              if (this.moment.calendar.options && this.moment.calendar.options.secondReminderMinutes) {
                  this.reminders[1] = this.moment.calendar.options.secondReminderMinutes.toString();
              }
          } else { // a calendar property is required as of 1.7.4+. all Activity will now show up in the creator's timeline
              this.moment.calendar = JSON.parse(JSON.stringify(this.momentObj.calendar));
          }
          // it renders the template and populate Activity with the components
          if (this.moment.resource.matrix_number && this.moment.resource.matrix_number.length) { // prepare activity for display
              this.moment.resource.matrix_number[0].forEach( async (componentOptionId, component_index) => {
                  const resource_index = this.resource.matrix_number[0].indexOf(componentOptionId);
                  if (resource_index > -1) {
                      this.resource.matrix_number[1][resource_index]--; // reduce the available component count
                  }
              });
          }
          if (!this.visibleComponents.length) {
              if (this.categoryId === '5e1bbda67b00ea76b75e5a73' || (this.moment.categories && this.moment.categories.includes('5e1bbda67b00ea76b75e5a73'))) { // content default components
                  this.visibleComponents = [10000, 10010, 10050, 10300, 20020, 30000, 40010, 40020];
              } else if (this.categoryId === '5e17acd47b00ea76b75e5a71' || (this.moment.categories && this.moment.categories.includes('5e17acd47b00ea76b75e5a71'))) { // onboarding default components
                  this.visibleComponents = [10000, 10010, 10300, 20010, 40010, 40020];
              }
          }
          this.initialSetupCompleted = true;
          console.log('editfeature setup completed', this.moment, this.interactableDisplay);
      } catch (err) {
          console.log('editfeature setup error', err);
          // currently, if an Activity is deleted and the user was in the Admin view, needs to redirect to Me coz the url is no longer valid
          this.router.navigate(['/app/me']);
      }
  }

    async edit() { // toggle template edit mode
        this.editTemplate = !this.editTemplate;
        if (!this.editTemplate) { // save change
            const createdResource: any = await this.resourceService.create(this.moment.resource); // template returned from server, with template id
            this.moment.resource._id = createdResource._id; // the only thing needed from the server is the newly generated template ID
            this.templateChanged = false;
        }
    }

  async addComponent(componentId) {
      if (this.userData.versions['List of Components'].indexOf(componentId) < 0) {
          const versionAlert = await this.alertCtrl.create({
              header: 'Upgrade Required',
              message: 'To add this component, please upgrade your app to the latest version.',
              buttons: ['OK'],
              cssClass: 'level-15'
          });
          await versionAlert.present();
          return;
      }
      this.addComponentActivated = false;
      // append component id, max count, input field in moment object
      if (componentId === 10000) { // for Title
          this.moment.matrix_number.push([]); // input field
          this.moment.matrix_string.push(['']); // input field
      } else if (componentId === 10220) { // for Lesson
          this.moment.matrix_number.push([]); // input field
          this.moment.matrix_string.push([]); // input field
          this.moment.array_boolean[10] = true; // allow unauthenticated access
      } else if (componentId >= 10300 && componentId <= 10360 || componentId === 20000 || componentId === 10010) {
          this.moment.matrix_number.push([0, 0, null, null, null]); // default values for display settings
          this.moment.matrix_string.push([]); // input field
      } else if (componentId === 10500) { // People
          this.moment.matrix_number.push(Array(13));
          this.moment.matrix_string.push([]); // input field
      } else if (componentId === 10600) { // for Video Conference, default to 1000
          this.moment.matrix_number.push([1000]); // input field
          this.moment.matrix_string.push(['']); // input field
      } else if (componentId === 20000) { // Visibility in Content
          this.moment.matrix_number.push([]); // input field
          this.moment.matrix_string.push([]); // input field
      } else if (componentId === 20020) { // Tabs
          this.moment.matrix_number.push(Array(5));
          this.moment.matrix_string.push([]); // input field
      } else if (componentId === 40000) { // multiple choice
          this.moment.matrix_number.push([0, null]); // initial value (allow multiple selections, max number of selections)
          this.moment.matrix_string.push(['']); // input field
      } else if (componentId === 40010) { // text answer
          this.moment.matrix_number.push([1, 0]); // initial value (allow multiple selections, max number of selections)
          this.moment.matrix_string.push([]); // input fields
      } else if (componentId === 40020) { // tile choice
          this.moment.matrix_number.push([1, 200, 0, null, null, Math.floor((Math.random() + new Date().getTime()) * 1000), null]); // initial value (allow multiple selections, max number of selections)
          this.moment.matrix_string.push(['', '']); // input fields
      } else if (componentId === 50000) { // directory
          this.moment.matrix_number.push([1, 1, 1, 0]); // default settings (show participants, organizers, leaders, display type)
          this.moment.matrix_string.push(['']); // input field
          if (this.moment._id) { this.loadProgramOnboardActivities(); }
      } else {
          this.moment.matrix_number.push([]); // input field
          this.moment.matrix_string.push([]); // input field
      }

      // append default labels in resource object, e.g. (section header default label is 'Information')
      this.moment.resource['en-US'].matrix_string.push(JSON.parse(JSON.stringify(this.resource['en-US'].matrix_string[this.resource.matrix_number[0].indexOf(componentId)])));

      // append placeholder and content in moment's resource object
      this.moment.resource.matrix_number[1].push(this.resource.matrix_number[1][this.resource.matrix_number[0].indexOf(componentId)]); // add maxCount to row index 1
      this.moment.resource.matrix_number[2].push( Math.floor((Math.random() + new Date().getTime()) * 1000)); // append a randomly generated id to row index 2
      this.moment.resource.matrix_number[3].push(null); // activate row index 3
      this.moment.resource.matrix_number[4].push(null); // activate row index 4

      // matrix_number[0] should be appended last, since it is used to iterate each component for display so by now all component arrays need to be ready
      this.moment.resource.matrix_number[0].push(componentId); // add the component id to row 0

      if (!this.categoryId) { // If creating new activity with pre-existing template
          setTimeout(() => {
              this.content.scrollToBottom(50);
          }, 50);
      }
      // reduce the available component count
      this.resource.matrix_number[1][this.resource.matrix_number[0].indexOf(componentId)]--;
      // console.log("updated moment", this.moment);
  }

  removeComponent(index, componentId) {
      // restore the available component count
      const i = this.resource.matrix_number[0].indexOf(componentId);
      if (i > -1) {
          this.resource.matrix_number[1][i]++;
      }
      // remove component id, max count, and inputed value from moment object
      this.moment.matrix_number.splice(index, 1); // input field
      this.moment.matrix_string.splice(index, 1); // input field
      // remove placeholder and content from moment's resource object
      this.moment.resource.matrix_number[0].splice(index, 1);
      this.moment.resource.matrix_number[1].splice(index, 1);
      this.moment.resource.matrix_number[2].splice(index, 1);
      this.moment.resource.matrix_number[3].splice(index, 1);
      this.moment.resource.matrix_number[4].splice(index, 1);
      this.moment.resource['en-US'].matrix_string.splice(index, 1);
      this.templateChanged = true;
  }

  reorderComponents(event) {
      this.templateChanged = true;
      this.resourceService.showPixabay = -1;
      // reorder resource first, because of how Quill editor interactableDisplay is designed
      this.moment.resource.matrix_number[1] = this.reorderArray(this.moment.resource.matrix_number[1], event.detail.from, event.detail.to);
      this.moment.resource.matrix_number[2] = this.reorderArray(this.moment.resource.matrix_number[2], event.detail.from, event.detail.to);
      this.moment.resource.matrix_number[3] = this.reorderArray(this.moment.resource.matrix_number[3], event.detail.from, event.detail.to);
      this.moment.resource.matrix_number[4] = this.reorderArray(this.moment.resource.matrix_number[4], event.detail.from, event.detail.to);
      // then reorder matrix's
      if (this.moment.matrix_number && this.moment.matrix_number.length) {
          this.moment.matrix_number = this.reorderArray(this.moment.matrix_number, event.detail.from, event.detail.to);
      }
      this.moment.matrix_string = this.reorderArray(this.moment.matrix_string, event.detail.from, event.detail.to);

      this.moment.resource['en-US'].matrix_string = this.reorderArray(this.moment.resource['en-US'].matrix_string, event.detail.from, event.detail.to);
      setTimeout(() => {
          this.moment.resource.matrix_number[0] = event.detail.complete(this.moment.resource.matrix_number[0]);
      }, 50);
  }

  reorderPlanItems(event) {
      this.referenceActivities = event.detail.complete(this.referenceActivities);
  }

  reorderArray(array, from, to) {
      const draggedItem = array.splice(from, 1)[0];
      array.splice(to, 0, draggedItem);
      return array;
  }

  changeStartTime() {
    if (this.startTime > this.endTime) {
      this.endTime = this.startTime;
    }
  }

  changeSelectedDate( inputDate ) {
    if (inputDate === ' ') { return; }
      this.calendarService.calendar.selectedDate = new Date(inputDate.getTime());
    if ( this.dateType === 'start' ) {
      this.startDate = inputDate;
      this.dateType = 'end';
      if (inputDate.getTime() > this.endDate.getTime()) {
        this.endDate = inputDate;
      }
    } else if (this.dateType === 'end') {
      this.endDate = inputDate;
      this.dateType = '';
    }
  }

    async selectFileFromDeviceAndUpload(event, i) {
      try {
          await this.awsService.uploadFile('users', this.userData.user._id, event.target.files[0], this.moment._id);
          this.moment.matrix_string[i][0] = this.awsService.sessionAssets[this.moment._id][this.awsService.sessionAssets[this.moment._id].length - 1];
      } catch (err) {
          console.log(err);
      }
    }

  async selectStockPhoto(photo, component_index, option_index) {
      await this.awsService.selectStockPhoto(photo, this.moment._id);
      if (this.moment.resource.matrix_number[0][component_index] === 40020) {
          this.moment.matrix_string[component_index][option_index] = this.awsService.sessionAssets[this.moment._id][this.awsService.sessionAssets[this.moment._id].length - 1];
      } else {
          this.moment.matrix_string[component_index][0] = this.awsService.sessionAssets[this.moment._id][this.awsService.sessionAssets[this.moment._id].length - 1];
      }
  }

  async toggleSearchPixaBay(component_index, option_index) {
      // for tile photos upload
      if (this.moment.resource.matrix_number[0][component_index] === 40020) {
          this.resourceService.showPixabay = this.moment.matrix_number[component_index][option_index];
      } else { // for stock photo upload
          /*if (this.moment.matrix_string[component_index].length && this.moment.matrix_string[component_index][0].length) {
              return; // if already selected photo, exit
          }*/
          this.resourceService.showPixabay = component_index;
      }
      console.log('show pixa', component_index, option_index, this.moment.matrix_number[component_index], this.resourceService.showPixabay);
  }

  async removeMedia(i, j) {
      const sessionId = this.moment._id || 'blank';
      const url = this.moment.matrix_string[i][j];
      const index = this.awsService.sessionAssets[sessionId].indexOf(url);
      if (index > -1) {
          this.awsService.sessionAssets[sessionId].splice(index, 1);
      }
      this.moment.matrix_string[i].splice(j, 1);
  }

    async promptVideoUrl(provider, i) {
        const alert2 = await this.alertCtrl.create({
            header: 'Input the Youtube link',
            inputs: [{
                name: 'src',
                type: 'text',
                placeholder: 'Youtube link'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel video upload');
                        return;
                    }
                }, {
                    text: 'Ok',
                    handler: data => {
                        this.moment.matrix_string[i][0] = data.src;
                    }
                }
            ],
            cssClass: 'level-15'
        });
        await alert2.present();
    }

  // reminder methods
  addNewReminder() {
    if (this.reminders.length < 3) {
      this.reminders.push('60');
    }
  }

  deleteReminder(event, index) {
    event.stopPropagation();
    this.reminders.splice( index , 1 );
  }

  async seeUserInfo(event, user) {
    event.stopPropagation();
    user.name = user.first_name + ' ' + user.last_name;
      if (!this.modalPage && this.platform.width() >= 768) {
          this.router.navigate([{ outlets: { sub: ['user', user._id, { subpanel: true } ] }}]);
      } else {
          this.userData.refreshUserStatus({ type: 'show recipient', data: {recipient: user, modalPage: true}});
      }
  }

    async reloadMomentUserLists() {
        const moment: any = await this.momentService.load(this.moment._id); // this load the activity with the template as its resource
        if (moment.hasOwnProperty('user_list_1')) { this.moment.user_list_1 = moment.user_list_1; }
        if (moment.hasOwnProperty('user_list_2')) { this.moment.user_list_2 = moment.user_list_2; }
        if (moment.hasOwnProperty('user_list_3')) { this.moment.user_list_3 = moment.user_list_3; }
    }

    async addParticipants(event, filter, listOfNames, inviteeLabel) {
        event.stopPropagation();
        const response: any = await this.momentService.addParticipants(this.moment, this.resource, filter, listOfNames, this.resource['en-US'].value[31] + ' ' + inviteeLabel, this.resource['en-US'].value[31]);
        if (response === 'success') {
            this.anyChangeMade = true;
            this.reloadMomentUserLists();
        }
    }

    async removeFromUserLists(listOfNames, listOfUserIds) {
        try {
            this.momentService.ionSpinner = true;
            const { success: success }: any = await this.momentService.updateMomentUserLists({
                operation: 'remove from lists',
                user_lists: listOfNames,
                users: listOfUserIds,
                momentId: this.moment._id
            }, null, true);
            this.momentService.ionSpinner = false;
            if (success === 'success') {
                this.anyChangeMade = true;
                this.reloadMomentUserLists();
                this.userData.refreshDefaultActivity(this.moment._id);
            }
        } catch (err) {
            console.log(err);
            this.anyChangeMade = false;
        }
    }

    async removeParticipant(event, type, user_index) {
        event.stopPropagation();
        if (type === 'participant') {
            const alert = await this.alertCtrl.create({
                header: 'Remove Participant',
                subHeader: 'You are about to remove ' + this.moment.user_list_1[user_index].first_name + ' ' + this.moment.user_list_1[user_index].last_name + ' as a participant. Are you sure you want to proceed?',
                cssClass: 'level-15',
                buttons: [{ text: 'Remove',
                    handler: async () => {
                        alert.dismiss();
                        this.removeFromUserLists(['user_list_1'], [this.moment.user_list_1[user_index]._id]);
                    }}, { text: 'Cancel' }]
            });
            await alert.present();
        } else if (type === 'organizer') {
            const alert = await this.alertCtrl.create({
                header: 'Remove Organizer',
                subHeader: 'You are about to remove ' + this.moment.user_list_2[user_index].first_name + ' ' + this.moment.user_list_2[user_index].last_name + ' as a organizer. Are you sure you want to proceed?',
                cssClass: 'level-15',
                buttons: [{ text: 'Remove',
                    handler: async () => {
                        alert.dismiss();
                        this.removeFromUserLists(['user_list_2'], [this.moment.user_list_2[user_index]._id]);
                    }}, { text: 'Cancel' }]
            });
            await alert.present();
        } else if (type === 'leader') {
            const alert = await this.alertCtrl.create({
                header: 'Remove Leader',
                subHeader: 'You are about to remove ' + this.moment.user_list_3[user_index].first_name + ' ' + this.moment.user_list_3[user_index].last_name + ' as a leader. Are you sure you want to proceed?',
                cssClass: 'level-15',
                buttons: [{ text: 'Remove',
                    handler: async () => {
                        alert.dismiss();
                        this.removeFromUserLists(['user_list_3'], [this.moment.user_list_3[user_index]._id]);
                    }}, { text: 'Cancel' }]
            });
            await alert.present();
        }
    }

  async searchAddress() {
    if (this.addressSearchString.length) {
      this.searchAddressResults = await this.resourceService.forwardGeocode(this.addressSearchString);
      this.searchAddressResults.push({
        display_name: 'Use Custom Location'
      });
    }
  }

  selectAddress(selection) {
    if (selection.display_name === 'Use Custom Location') {
      this.moment.location = {
        location: JSON.parse(JSON.stringify(this.addressSearchString))
      };
      this.addressURL = '';
    } else {
      this.moment.location = {
        location: selection.display_name,
        geo: {
          type: 'Point',
          coordinates: [parseFloat(selection.lon), parseFloat(selection.lat)]
        }
      };
      this.moment.location.location = selection.display_name;
      this.addressURL = 'https://maps.locationiq.com/v2/staticmap?key=pk.e5797fe100f9aa5732d5346f742b243f&center=' + selection.lat + ',' + selection.lon + '&zoom=20&size=1000x600&maptype=roadmap&markers=icon:%20large-red-cutout%20|' + selection.lat + ',' + selection.lon;
    }
    this.addressSearchString = '';
    this.searchAddressResults = [];
  }

  clearAddress() {
    this.moment.location = { location: '' };
    this.addressURL = '';
  }

    async addReference() {
        let categoryId: any;
        let allowSwitchCategory = true;
        // if the current Activity is a Community, the references can only be Programs
        if (this.moment.categories && this.moment.categories.includes('5c915324e172e4e64590e346')) {
            categoryId = '5c915475e172e4e64590e348'; // only program is allowed in Picker
            allowSwitchCategory = false; // lock it so user is not allowed to switch category
        // if the current Activity is a Relationship, the references can only be Journey
        } else if (this.moment.categories && this.moment.categories.includes('5dfdbb547b00ea76b75e5a70')) {
            categoryId = '5e9f46e1c8bf1a622fec69d5'; // only Journey is allowed in Picker
            allowSwitchCategory = false; // lock it so user is not allowed to switch category
        }
        // limit to modalPage usage because subpanel view picker will only clone Recent activities.
        // because we want to enable referencing of Recent activities, we are limited to only using a picker modal
        const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Choose from Library', categoryId: categoryId, allowSwitchCategory: allowSwitchCategory, modalPage: true}});
        await modal.present();
        const {data: moments} = await modal.onDidDismiss();
        if (moments && moments.length) {
            for (const moment of moments) {
                if (moment && moment.cloned === 'new') { // cloning a sample. copy everything except calendar and add Activity ID to parent_programs property
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
                    moment.parent_programs = (this.moment && this.moment._id) ? [this.moment._id] : []; // if creating new Activity (Create Community), parent_programs is empty because Community has not been created yet
                    this.referenceActivities.push(moment);
                } else {
                    this.referenceActivities.push(moment);
                }
            }
            const selectedMoments = moments.filter((c) => c.cloned === 'new');
            if (selectedMoments && selectedMoments.length) {
                const clonedMoments: any = await this.momentService.clone(selectedMoments, 'admin');
                if (clonedMoments) {
                    for (const clonedMoment of clonedMoments) {
                        clonedMoment.cloned = 'new';
                        const index = this.referenceActivities.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
                        if (index > -1) {
                            clonedMoment.resource = this.referenceActivities[index].resource; // clone the populated resource
                            this.referenceActivities.splice(index, 1, clonedMoment);
                        }
                    }
                }
            }
        }
    }

    removeReference(event, index) {
        event.stopPropagation();
        if (this.referenceActivities[index] && this.referenceActivities[index]._id && this.referenceActivities[index].cloned === 'new') {
            console.log('remove cloned Activity');
            this.removedMoments.push(this.referenceActivities[index]);
        }
        this.referenceActivities.splice(index, 1);
    }

    async openReference(index) {
        const moment = this.referenceActivities[index];
        if (moment) {
            // first check if user has organizer's access
            let hasOrganizerAccess: any;
            if (moment.user_list_2 && moment.user_list_2.length && moment.user_list_2[0] && typeof moment.user_list_2[0] === 'object') { // if user_list is populated, i.e. array of objects
                hasOrganizerAccess = moment.user_list_2.map((c) => c._id).includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
            } else if (moment.user_list_2 && moment.user_list_2.length && moment.user_list_2[0] && typeof moment.user_list_2[0] === 'string') { // if user_list is not populated, i.e. array of strings
                hasOrganizerAccess = moment.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
            } else {
                hasOrganizerAccess = ['owner', 'admin', 'staff'].includes(this.userData.user.role);
            }
            // if organizer, enter edit view
            if (hasOrganizerAccess) {
                const modal = await this.modalCtrl.create({component: EditfeaturePage, componentProps: { moment: this.referenceActivities[index], modalPage: true }});
                await modal.present();
                const {data: modifiedMoment} = await modal.onDidDismiss();
                if (modifiedMoment) {
                    this.referenceActivities[index] = modifiedMoment;
                }
            } else { // otherwise, enter show Activity view
                this.momentService.openMoment( { moment: this.referenceActivities[index], modalPage: true });
            }
        }
    }

    addInteractableItem(component_index) {
        if (this.moment.resource.matrix_number[0][component_index] === 40020) {
            this.moment.matrix_string[component_index].push(...['', '']); // first is label, second is image url
            this.moment.matrix_number[component_index].push(...[Math.floor((Math.random() + new Date().getTime()) * 1000), null]); // append a timestamp and an empty placeholder
        } else {
            this.moment.matrix_string[component_index].push(''); // append the label
        }
    }

    removeInteractableItem(event, component_index, pollOption_index) {
        event.stopPropagation();
        if (this.moment.resource.matrix_number[0][component_index] === 40020) {
            this.moment.matrix_string[component_index].splice(pollOption_index, 2); // splice the label and the image url
            this.moment.matrix_number[component_index].splice(pollOption_index + 5, 2); // splice the timestamp and the empty placeholder (null)
        } else {
            this.moment.matrix_string[component_index].splice(pollOption_index, 1); // splice the label
        }
    }

    // for editing onboarding process, when a user toggle advanced mode, she is able to select another onboarding process which this current one will depend one (which parent process unlocks the current one)
    // TODO: type is provided but may not be necessary, since a child process can be unlocked by a parent process that is currently in a different participation type. it will just not be shown. it is an edge case but won't break the algorithm
    // load list of peer onboarding processes in order to set up an array for picking which peer onboarding process will act as a parent process
    async loadPeerOnboardActivities(type) {
        this.loadedPeerOnboardingProcesses = true;
        const results: any = await this.momentService.loadProgramOnboardActivities(this.moment.program, type, true);
        this.peer_preferences = results.preferences;
        this.peer_preferences.unshift({ _id: '', matrix_string: [['None']]}); // add the 'None'' option as the first element
        if (this.moment._id) { this.peer_preferences.splice(this.peer_preferences.map((c) => c._id).indexOf(this.moment._id), 1); } // remove the current moment from the list, so one cannot be dependent on itself

        // prep the peer onboarding activities responses
        // it is the parent/child relationship records (e.g. an onboarding process is only shown if a user answers the same in the parent onboarding questions)
        this.peer_responses = results.responses.preferences;
        if (!this.peer_responses.length) {
            this.peer_responses.push({
                index: null,
                moment: null,
                dependent_moment: this.moment._id,
                selectedComponentIndex: null,
                selectionOptionIndexes: [],
                matrix_number: [],
                createdAt: null
            });
        } else {
            this.peer_responses.forEach((response) => {
                response.index = this.peer_preferences.map((c) => c._id).indexOf(response.moment);
                console.log('index', response.index, this.peer_preferences);
                response.selectedComponentIndex = this.peer_preferences[response.index].resource.matrix_number[2].indexOf(this.peer_preferences[response.index].response.matrix_number[0][0]);
                response.selectedOptionIndexes = JSON.parse(JSON.stringify(this.peer_preferences[response.index].response.matrix_number[0]));
                response.selectedOptionIndexes.splice(0, 5);
                if (!this.peer_preferences[response.index].matrix_number[response.selectedComponentIndex][0]) { // if multiple selection is off
                    response.selectedOptionIndexes = response.selectedOptionIndexes[0]; // convert from array to integer
                }
            });
        }
        console.log('index', this.peer_preferences, this.peer_responses);
    }

    async loadProgramOnboardActivities() { // load list of onboarding processes and configs
        const results: any = await this.momentService.loadProgramOnboardActivities(this.moment._id, null, true);
        this.preferences = results.preferences;

        // prep the matching config
        this.match_configs = results.responses.matching_config;
        this.preferences.forEach((preference) => {
            // config records the question_id [0], logical operator type [1], weighing factor [2]
            // matching_configs is the data array that stores the backend data
            // preference.config stores a modified version of that data for display purposes. For example, weighing factor [2] is converted into natural log to display the 0 - 1 segment more prominently
            preference.config = [];
            if (preference.resource) { // exclude the None option
                preference.resource.matrix_number[2].forEach((question_id, index) => {
                    const config = this.match_configs.find((c) => c.matrix_number[0][0] === question_id);
                    if (config) { // if a config exists from the backend
                        preference.config.push(JSON.parse(JSON.stringify(config.matrix_number[0])));
                        preference.config[index][3] = Math.log(preference.config[index][3]); // convert weighing factor (position 3) to natural log scale
                    } else { // if no config exists, populate the display arrays
                        preference.config.push([question_id, 1, 1, 0, null]); // weighing factor (position 3)'s default is 1 (log(1) = 0)
                    }
                });
            }
        });
        // console.log("cool", this.match_configs, this.preferences);
    }

    async selectedParentMoment(response) {
        if (response.moment) {
            response.index = this.peer_preferences.map((c) => c._id).indexOf(response.moment);
            const preference_cached = this.peer_preferences[response.index].resource.matrix_number[0];
            this.peer_preferences[response.index].resource.matrix_number[0] = [];
            setTimeout(() => { // need to hide the question selection for 100 ms in order to refresh it
                this.peer_preferences[response.index].resource.matrix_number[0] = preference_cached;
                response.index = this.peer_preferences.map((c) => c._id).indexOf(response.moment);
                response.moment = this.peer_preferences[response.index]._id;
                response.selectedComponentIndex = null;
                response.selectedOptionIndexes = null;
            }, 100);
        }
    }

    async selectedParentQuestion(response) {
        response.selectedOptionIndexes = null;
    }

    async selectedParentAnswers(response) {
        response.createdAt = new Date();
    }

    async changedMatchingConfig(momentId, selectedConfigIndex, match_config_type, event) {
        // config type 1 corresponds to the operation
        // config type 2 corresponds to the matching condition
        // config type 3 corresponds to the weighing factor
        event.detail.value = event.detail.value || '0';
        const question_id = this.preferences.find((c) => c._id === momentId).resource.matrix_number[2][selectedConfigIndex];
        const config = this.match_configs.find((c) => c.matrix_number[0][0] === question_id);
        if (config) { // when there is an existing config record, update it
            // for weighing factor, convert it back to base 10 number
            config.matrix_number[0][match_config_type] = match_config_type === 3 ? Math.exp(parseFloat(event.detail.value)) : parseFloat(event.detail.value);
        } else { // when no existing config, create a new one
            this.match_configs.push({
                moment: momentId,
                dependent_moment: this.moment._id,
                matrix_number: [[question_id, match_config_type === 1 ? parseInt(event.detail.value, 10) : 1,  match_config_type === 2 ? parseInt(event.detail.value, 10) : 1, match_config_type === 3 ? Math.exp(parseFloat(event.detail.value)) : null, null]],
                array_number: [50000],
                createdAt: new Date()
            });
        }
        this.preferences.find((c) => c._id === momentId).config[selectedConfigIndex][match_config_type] = parseFloat(event.detail.value);
        console.log('after changing match config', this.match_configs, this.preferences);
    }

    addPeopleProfileBio(componentIndex) {
      if (this.moment.matrix_number[componentIndex].length < 11) {
          this.moment.matrix_number[componentIndex].length = 11;
      }
      this.moment.matrix_number[componentIndex].length = this.moment.matrix_number[componentIndex].length + 3;
      console.log('show', this.moment.matrix_number[componentIndex]);
    }

    enablePreview() {
        // if the component tab attribute array has not been added to resource's matrix_number yet, add it
        while (this.moment.resource && this.moment.resource.matrix_number && this.moment.resource.matrix_number.length < 5) {
            this.moment.resource.matrix_number.push(Array(this.moment.resource.matrix_number[0].length));
            this.templateChanged = true;
        }
    }

    addTab(componentIndex) {
      // if the component tab attribute array has not been added to resource's matrix_number yet, add it
        if (this.moment.resource && this.moment.resource.matrix_number && this.moment.resource.matrix_number.length < 4) {
            this.moment.resource.matrix_number.push(Array(this.moment.resource.matrix_number[0].length));
            this.templateChanged = true;
        }
      this.moment.matrix_number[componentIndex].push(Math.floor((Math.random() + new Date().getTime()) * 1000)); // add a new tabId which is a random number
    }

    removeTab(componentIndex, tabIndex) {
        this.moment.matrix_number[componentIndex].splice(tabIndex + 5, 1);
        this.moment.matrix_string[componentIndex].splice(tabIndex, 1);
    }

    addTabComponent(resourceIndex, tabId, event) {
      const index = this.moment.resource.matrix_number[2].indexOf(event.detail.value);
      if (index >= 0) {
          this.moment.resource.matrix_number[resourceIndex][index] = tabId;
          this.templateChanged = true;
      }
      setTimeout(() => {
          this.tempTabComponentSelection = Array(this.moment.resource.matrix_number[0].length);
      }, 50);
    }

    removeTabComponent(resourceIndex, componentIndex) {
        this.moment.resource.matrix_number[resourceIndex][componentIndex] = null;
        this.templateChanged = true;
    }

    async explainWeight() {
        const alertCtrl = await await this.alertCtrl.create({
            header: this.moment.resource['en-US'].matrix_string[this.moment.resource.matrix_number[0].indexOf(50000)][13],
            message: this.moment.resource['en-US'].matrix_string[this.moment.resource.matrix_number[0].indexOf(50000)][14],
            buttons: [{ text: 'Ok',
                handler: () => {
                    alertCtrl.dismiss();
                }}],
            cssClass: 'level-15'
        });
        await alertCtrl.present();
    }

    async respondToTextArea(event, componentIndex) {
        this.anyChangeMade = true;
        this.moment.matrix_string[componentIndex][0] = event.text;
        this.moment.matrix_string[componentIndex][2] = JSON.stringify(event.content);
        this.moment.matrix_string[componentIndex][3] = JSON.stringify(event.delta);
    }

  async saveActivity(closeModal) {
      this.loading = await this.loadingCtrl.create({
          message: 'Saving...',
          duration: 5000
      });
      await this.loading.present();
      if (!this.moment.matrix_string[0].length || (this.moment.matrix_string[0].length && !this.moment.matrix_string[0][0])) {
          this.presentToast('Please enter a name for this ' + this.moment.resource['en-US'].value[0] || this.resource['en-US'].value[0]);
          return;
      }
      if (this.templateChanged || !this.moment.resource._id) { // if template has been edited but not saved or in edit mode
          const createdResource: any = await this.resourceService.create(this.moment.resource);
          this.moment.resource._id = createdResource._id;
      }

      // for all day events, start time is set to 12a on selected date and end time is set to 12a the following day
      if (this.moment.resource.matrix_number[0].includes(10200)) {
            if (this.allDay) {
                this.startDate = new Date( this.calendarService.calendar.selectedDate.getFullYear(), this.calendarService.calendar.selectedDate.getMonth(), this.calendarService.calendar.selectedDate.getDate(), 0, 0, 0 );
                this.endDate = new Date( this.calendarService.calendar.selectedDate.getFullYear(), this.calendarService.calendar.selectedDate.getMonth(), this.calendarService.calendar.selectedDate.getDate() + 1, 0, 0);
            } else {
                const selectedStartTimeObj = new Date(this.startTime);
                this.startDate = new Date( this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), selectedStartTimeObj.getHours(), selectedStartTimeObj.getMinutes() );
                const selectedEndTimeObj = new Date(this.endTime);
                this.endDate = new Date( this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), selectedEndTimeObj.getHours(), selectedEndTimeObj.getMinutes() );
            }
            if (this.startDate.getTime() > this.endDate.getTime()) {
                await this.loading.dismiss();
                const alertCtrl = await await this.alertCtrl.create({
                    header: this.moment.resource['en-US'].matrix_string[this.moment.resource.matrix_number[0].indexOf(10200)][5],
                    message: this.moment.resource['en-US'].matrix_string[this.moment.resource.matrix_number[0].indexOf(10200)][6],
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            alertCtrl.dismiss();
                        }}],
                    cssClass: 'level-15'
                });
                await alertCtrl.present();
                return;
            }
      }

      this.moment.author = this.userData.user._id;
      // remove Restvo community from event communities list because it is listed by default
      this.moment.array_community.forEach((community, index) => {
          if (community === '5ab62be8f83e2c1a8d41f894') {
              this.moment.array_community.splice(index, 1);
          }
      });
      // prepare calendar object for upload
      this.moment.calendar.title = this.moment.matrix_string[0][0]; // this value is required by default
      this.moment.calendar.startDate = this.startDate.toISOString();
      this.moment.calendar.endDate = this.endDate.toISOString();

      // process reminder data
      if (this.moment.resource.matrix_number[0].includes(10400)) {
          this.moment.calendar.options.reminders = []; // if it is to update the record, empty it first
          this.reminders.sort((a, b) => {
              return parseInt(b, 10) - parseInt(a, 10);
          });
          for (let i = 0; i < this.reminders.length; i++) {
              // convert reminders from string to number, then add to reminder object
              this.reminders[i] = parseInt(this.reminders[i], 10);
              // the new array to store the reminders in mongoDB with reminderSent boolean field
              this.moment.calendar.options.reminders.push({
                  remindAt: new Date(this.startDate.getTime() - (this.reminders[i] * 60 * 1000)).toISOString(),
                  reminderSent: false
              });
          }
          if (this.reminders.length === 1) {
              this.moment.calendar.options.firstReminderMinutes = this.reminders[0];
              delete this.moment.calendar.options.secondReminderMinutes;
          } else if (this.reminders.length === 2) {
              this.moment.calendar.options.firstReminderMinutes = this.reminders[0];
              this.moment.calendar.options.secondReminderMinutes = this.reminders[1];
          }
      }

      if (this.moment.resource.matrix_number[0].includes(10370)) { // processing references
          this.moment.array_moment = this.referenceActivities.map((c) => c._id);
      }

      // clean up DO of unlinked media URLs in this.moment.assets before it is overwritten by sessionAssets
      await this.awsService.cleanUp(this.moment._id, this.moment.assets);
      // sessionAssets has the latest, valid media URLs for this moment. Store it in moment.assets before save
      // if sessionAssets has not been initiated and hence return null, reassign it back to an empty array
      this.moment.assets = this.awsService.sessionAssets[this.moment._id] || [];
      if (this.moment._id) { // sending moment object with fully populated resource object to server
          try {
              await this.momentService.update(this.moment);
          } catch (err) {
              return this.closeModal(this.anyChangeMade);
          }
      } else { // if create new, create moment in the backend
          const createdMoment: any = await this.momentService.create(this.moment); // create feature
          this.moment._id = createdMoment._id;
          this.moment.access_tokens = createdMoment.access_tokens;
          this.moment.user_list_1 = createdMoment.user_list_1;
          this.moment.user_list_2 = createdMoment.user_list_2;
          this.moment.user_list_3 = createdMoment.user_list_3;
          this.moment.calendar._id = createdMoment.calendar; // the newly returned createdMoment has calendar _id
      }
      // process Parent/Child relationship responses for onboarding processes
      // peer_responses are the parent/child relationship records (e.g. an onboarding process is only shown if a user answers the same in the parent onboarding questions)
      const responseObj = [];
      for (const response of this.peer_responses) {
          if (response.selectedComponentIndex && response.selectedOptionIndexes !== null) { // remove response element with unfinished choice
              // push interactable ID and selection options (multiple selection or single integer) into matrix
              response.matrix_number = [[this.peer_preferences[response.index].resource.matrix_number[2][response.selectedComponentIndex], null, null, null, null].concat(response.selectedOptionIndexes)];
              responseObj.push(response);
          }
      }
      if (this.loadedPeerOnboardingProcesses) { // only if Advanced mode was touched
          await this.responseService.submitDependentResponse({class: 1000, dependentMomentId: this.moment._id, responses: responseObj});
      }
      // process matching config settings
      if (this.moment.resource.matrix_number[0].includes(50000)) {
          await this.responseService.submitDependentResponse({class: 50000, dependentMomentId: this.moment._id, responses: this.match_configs});
      }
      if (this.moment._id && this.parent_programId && this.scheduleId) {
          const newCalendarItem: any = {
              moment: this.moment._id,
              title: this.moment.matrix_string[0][0],
              schedule: this.scheduleId,
              startDateObj: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()), // cache datetime info for computation only. backend datetime format is in ISOString
              endDateObj: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()), // cache datetime info for computation only. backend datetime format is in ISOString
              startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(), // cache datetime info for computation only. backend datetime format is in ISOString
              endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(), // cache datetime info for computation only. backend datetime format is in ISOString
              options: { // the details of the repeating schedule
                  firstReminderMinutes: 0, // reminder is defaulted to at the time of the task
              }
          };
          // const result: any = await this.momentService.loadSchedule(this.scheduleId);
          // newCalendarItem.uniqueAnswersPerCalendar = (result && result.schedule && result.schedule.array_boolean && result.schedule.array_boolean.length > 1) ? result.schedule.array_boolean[1] : false;
          const data: any = { operation: 'create calendar item', calendaritem: newCalendarItem };
          if (this.goalId) {
              data.goalId = this.goalId;
          }
          await this.momentService.touchContentCalendarItems(this.parent_programId, data);
      }
      await this.loading.dismiss();
      if (closeModal) { // for editFeature.ts
          const alert = await this.alertCtrl.create({
              header: this.resource['en-US'].value[10], // updated
              message: this.moment.matrix_string[0][0] + this.resource['en-US'].value[11] + (this.moment.array_boolean[0] ? this.resource['en-US'].value[12] : ''),
              buttons: [{ text: 'Ok',
                  handler: () => {
                    this.closeModal(this.moment);
                  }}],
              cssClass: 'level-15'
          });
          await alert.present();
      }
      this.userData.refreshUserStatus({ type: 'change aux data' }); // this will refresh the pickfeature-popover.page.ts and managefeature.page.ts
  }

    private async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top',
            color: 'darkgrey'
        });
        toast.present();
    }

    async explainDiscover(item) {
        const resourceIndex = this.resource.matrix_number[0].indexOf(item);
        const activityType = this.moment.resource['en-US'].value[0] || this.resource['en-US'].value[0];
        const alert = await this.alertCtrl.create({
            header: this.resource['en-US'].matrix_string[resourceIndex][1],
            subHeader: this.resource['en-US'].matrix_string[resourceIndex][3] + activityType.toLowerCase() + this.resource['en-US'].matrix_string[resourceIndex][4],
            buttons: [{ text: 'Ok'}],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async explainTemplate(item) {
        const resourceIndex = this.resource.matrix_number[0].indexOf(item);
        const activityType = this.moment.resource['en-US'].value[0] || this.resource['en-US'].value[0];
        const alert = await this.alertCtrl.create({
            header: this.resource['en-US'].matrix_string[resourceIndex][7],
            subHeader: 'A template can be used by any participant in a Community to clone a new ' + activityType.toLowerCase() + '. Once enabled, it is shown publicly to all who belong to a Community.',
            buttons: [{ text: 'Ok'}],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async inviteLinkAction(type) {
        const url = this.networkService.webapp_domain + '/app/activity/' + this.moment._id + ';type=' + type + ';token=' + this.moment.access_tokens[type - 2];
        try {
            await Share.share({
                text: url
            });
        } catch (err) {
            console.log(err);
            if (err.name !== 'AbortError') { // handle the special condition when Share was loaded but aborted by user
                await Clipboard.write({
                    url: url
                });
                const alert = await this.alertCtrl.create({
                    header: 'Share Link Ready',
                    message: 'The invitation link ' + url + 'has been copied to your clipboard.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await alert.present();
            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Invitation Link',
                    message: url,
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await alert.present();
            }
        }
    }

    async editOnboarding(event, type) {
      event.stopPropagation();
      if (this.subpanel) {
          this.router.navigate(['/app/home/preferences', { programId: this.moment._id, type: type, organizer: true, showHeader: true }]);
      } else {
          const alertCtrl = await this.alertCtrl.create({
              header: 'Unsaved Changes',
              message: 'You are leaving the Edit Mode. Ensure you save your changes before you proceed.',
              buttons: [{ text: 'Proceed',
                  handler: async () => {
                      if (this.modalPage) {
                          this.momentService.openPreferences({ programId: this.moment._id, type: type, organizer: true, modalPage: true });
                      } else {
                          this.router.navigate(['/app/home/preferences', { programId: this.moment._id, type: type, organizer: true, showHeader: true }]);
                      }
                  }}, {
                  text: 'Cancel'}],
              cssClass: 'level-15'
          });
          await alertCtrl.present();
      }
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    destroyPlayers(mediaId) {
        if (mediaId) {
            const media = this.mediaList.find((c) => c._id === mediaId );
            media.player.destroy();
        } else {
            for (const media of this.mediaList) {
                media.player.destroy();
            }
        }
    }

    async openUploadMedia(i, componentIndex) {
      const modal = await this.modalCtrl.create({component: UploadmediaPage, componentProps: { sessionId: this.moment._id, modalPage: true }});
      await modal.present();
        const {data: media_list} = await modal.onDidDismiss();
        // event is an a moment object see server/models/moment.js
        // event contains a resource with info on the event see server/models/resource.js
        if (media_list) {
            if ((componentIndex === 10010 || componentIndex === 40010) && this.moment.matrix_string[i].length < 11) { // only when initiating textarea + media component
                this.moment.matrix_string[i].length = 11;
            }
            this.moment.matrix_string[i].push(...media_list);
        }
    }

    async createQuillEditor(event, interactableId) {
        if (this.interactableDisplay[interactableId] && this.interactableDisplay[interactableId].content) {
            event.setContents(this.interactableDisplay[interactableId].content.ops, 'silent');
            this.interactableDisplay[interactableId]['editor'] = event;
        }
    }

  // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
  customTrackBy(index: number, item: any): any {
    return index;
  }

  async closeModal(refreshNeeded) {
      this.destroyPlayers(null);
      this.awsService.cleanUp(this.moment._id, true); // clean up the temporarily uploaded media
      /*const promises = this.removedMoments.map( async (moment) => {
          console.log('removing abandoned Programs', moment);
          await this.momentService.delete(moment);
      });
      await Promise.all(promises);*/
      if (this.subscriptions.hasOwnProperty('refreshUserStatus')) {
          this.subscriptions['refreshUserStatus'].unsubscribe(this.reloadEditPage);
      }
      if (this.subscriptions.hasOwnProperty('refreshMoment')) {
          this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
      }
      if (this.modalPage) {
          this.modalCtrl.dismiss(refreshNeeded);
      } else {
          this.location.back();
          this.userData.refreshUserStatus({});
      }
      this.awsService.sessionAllowedCount = 1; // reset the allowed files count to 1
  }

  ngOnDestroy(): void {
      if (this.subscriptions && this.subscriptions.refreshUserStatus)  {
          this.subscriptions['refreshUserStatus'].unsubscribe(this.reloadEditPage);
      }
      if (this.subscriptions && this.subscriptions.refreshMoment)  {
          this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
      }
      if (this.subscriptions && this.subscriptions.refreshUserCalendar) { this.subscriptions['refreshUserCalendar'].unsubscribe((res) => {
          this.calendarService.getUserCalendar();
      }); }
  }
}
