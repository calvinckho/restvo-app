import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {PickfeaturePopoverPage} from "../../pickfeature-popover/pickfeature-popover.page";
import {ActivatedRoute, Router} from "@angular/router";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {UserData} from "../../../../services/user.service";
import {Moment} from "../../../../services/moment.service";
import {Resource} from "../../../../services/resource.service";

@Component({
  selector: 'app-feature-childactivities',
  templateUrl: './feature-childactivities.page.html',
  styleUrls: ['./feature-childactivities.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureChildActivitiesPage implements OnInit, OnDestroy {

  @Input() modalPage: any;
  @Input() moment: any; // the moment object
  @Input() categoryId: any; // the category ID
  subscriptions: any = {};
  momentId: any;
  categoryLabel = '';
  ionSpinner = false;
  activities: any;
  selectedActivities = [];
  cachedActivities = [];
  searchKeyword = '';
  refreshNeeded = false;
  activityAscending = true;
  typeAscending = true;
  shareAscending = false;
  view = '1';
  selectedSample: any;
  newActivityName: any;
  categorySampleMap = [
    { categoryLabel: 'Journey', categoryId: '5e9f46e1c8bf1a622fec69d5', sampleId: '5ea350d2dede5c7f29cf8490' },
    { categoryLabel: 'Group', categoryId: '5e9fe35cc8bf1a622fec69d7', sampleId: '5ea398fadede5c7f29cf85c4' },
    { categoryLabel: 'Mentoring', categoryId: '5e9fe372c8bf1a622fec69d8', sampleId: '5df88e7669f2546c0a26a7f3' },
    { categoryLabel: 'Program', categoryId: '5c915475e172e4e64590e348', sampleId: '5ea1fa876240cd58bb82a694' }
  ];

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public platform: Platform,
      public alertCtrl: AlertController,
      public authService: Auth,
      public chatService: Chat,
      public userData: UserData,
      public momentService: Moment,
      public resourceService: Resource,
      public modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.resourceService.loadSystemResources();
    // link the refreshUserStatus Observable with the loadChildActivities handler. It fires on page loads and subsequent user status refresh
    this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.reloadChildActivitiesHandler);
  }

  reloadChildActivitiesHandler = async () => {
    this.setupChildActivitiesPage();
  };

  async setupChildActivitiesPage() {
    if (this.userData && this.userData.user) {
      if (this.moment) {
        this.momentId = this.moment._id;
      } else {
        this.momentId = this.route.snapshot.paramMap.get('id'); // the moment object
        this.moment = await this.momentService.load(this.momentId);
        this.moment.categories = this.moment.categories.map((c) => c._id);
      }
      this.categoryId = this.categoryId || this.route.snapshot.paramMap.get('categoryId');
      this.categoryLabel = this.resourceService.categories.find((c) => c._id === this.categoryId)['en-US'].value[0];
      this.loadChildActivities();
    }
  }

  // load Program child activities
  async loadChildActivities() {
      this.activities = await this.momentService.loadProgramChildActivities(this.momentId, this.categoryId);
      this.activities.map((c) => c.select = false);
      this.cachedActivities = this.activities;

    this.activities.sort((a, b) => {
      if (a.deletedAt && !b.deletedAt) {
        return 1;
      }
      if (!a.deletedAt && b.deletedAt) {
        return -1;
      }
    });
  }

  async openChildActivity(event, moment, viewType) {
    event.stopPropagation();
    if (this.modalPage || this.platform.width() < 768) {
      // view
      if (viewType === 'manage') { // manage
        this.momentService.manageMoment({ moment: moment, modalPage: true });
      } else if (viewType === 'edit') { // edit
        this.momentService.editMoment({ moment: moment, modalPage: true });
      } else { // view
        this.momentService.openMoment( { moment: moment, modalPage: true });
      }
    } else {
      if (viewType === 'manage') { // manage
        this.router.navigate(['/app/manage/activity/' + moment._id + '/profile/' + moment._id], {replaceUrl: false});
      } else if (viewType === 'edit') { // edit
        this.router.navigate([{ outlets: { sub: ['edit', moment._id, { subpanel: true }] }}]);
      } else { // view
        this.router.navigate([{ outlets: { sub: ['details', moment._id, { subpanel: true }] }}]);
      }
    }
  }

  async removeActivity(event, activity) {
    event.stopPropagation();
    this.momentService.adoptPlan({
      operation: 'un-adopt plan',
      planIds: [activity._id],
      parent_programId: this.momentId
    });
  }

  sortDisplay(type) {
    if (type === 'activity') {
      this.activityAscending = !this.activityAscending;
      const reverseOrder = this.activityAscending;
      this.activities.sort(function(a, b) {
        if (a.matrix_string[0][0] < b.matrix_string[0][0]) {
          return reverseOrder ? -1 : 1;
        }
        if (a.matrix_string[0][0] > b.matrix_string[0][0]) {
          return reverseOrder ? 1 : -1;
        }
      });
    } else if (type === 'type') {
      this.typeAscending = !this.typeAscending;
      const reverseOrder = this.typeAscending;
      this.activities.sort(function(a, b) {
        if (a.resource['en-US'].value[0] < b.resource['en-US'].value[0]) {
          return reverseOrder ? -1 : 1;
        }
        if (a.resource['en-US'].value[0] > b.resource['en-US'].value[0]) {
          return reverseOrder ? 1 : -1;
        }
      });
    } else if (type === 'share') {
      this.shareAscending = !this.shareAscending;
      const reverseOrder = this.shareAscending;
      this.activities.sort(function(a, b) {
        if (a.array_boolean[1] < b.array_boolean[1]) {
          return reverseOrder ? -1 : 1;
        }
        if (a.array_boolean[1] > b.array_boolean[1]) {
          return reverseOrder ? 1 : -1;
        }
      });
    }
  }

  renderUniqueParticipantList() {
    this.activities = this.cachedActivities.filter((c) => (c.matrix_string[0][0]).toLowerCase().includes(this.searchKeyword.toLowerCase()));
    for (const activity of this.activities) {
      if (this.selectedActivities.find((c) => c._id === activity._id)) {
        activity.selected = true;
      }
    }
  }

  selectActivity(event, activity) {
    event.stopPropagation();
    if (activity.select) {
      activity.select = false;
      const index = this.selectedActivities.indexOf(activity);
      this.selectedActivities.splice(index, 1);
    } else {
      activity.select = true;
      this.selectedActivities.push(activity);
    }
  }

  unselectActivity(event, activity) {
    event.stopPropagation();
    let index = this.selectedActivities.indexOf(activity);
    if (index > -1) {
      this.selectedActivities[index].select = false;
    }
    index = this.selectedActivities.indexOf(activity);
    if (index > -1) {
      this.selectedActivities.splice(index, 1);
    }
  }

  async multiSelectAction(action) {
    if (!this.selectedActivities.length) return; // if no child activity or remove type selected, exit
    const alert = await this.alertCtrl.create({
      header: (['owner', 'admin', 'staff'].includes(this.userData.user.role) && action === 'Archive' ? this.resourceService.resource['en-US'].value[44] : this.resourceService.resource['en-US'].value[19]) + ' ' + this.categoryLabel + (this.selectedActivities.length === 1 ? 's' : ''),
      subHeader: 'You are about to ' + (['owner', 'admin', 'staff'].includes(this.userData.user.role) && action === 'Archive' ? this.resourceService.resource['en-US'].value[44] : this.resourceService.resource['en-US'].value[19]).toLowerCase() + ' ' + (this.selectedActivities.length === 1 ? (this.selectedActivities[0].matrix_string[0][0]) : (this.selectedActivities.length + ' ' + this.categoryLabel + 's')) + '. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Proceed',
        handler: async () => {
          alert.dismiss();
          for (const selectedActivity of this.selectedActivities) {
            await this.momentService.delete(selectedActivity, action.toLowerCase());
          }
          this.selectedActivities = [];
          this.renderUniqueParticipantList();
        }}, { text: 'Cancel' }]
    });
    await alert.present();
  }

  // allow the user to choose to clone an Activity from the marketplace
  async chooseFromMarketplace() {
    let componentProps: any;
    componentProps = {title: 'Choose from Available Templates', categoryId: this.categoryId, allowCreate: false, allowSwitchCategory: false, disableSelect: true };
    if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
      componentProps.programId = this.moment._id;
    } else { // pick other activities
      componentProps.parent_programId = this.moment._id;
    }
    if (this.modalPage) {
      componentProps.modalPage = true;
      const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: componentProps});
      await modal.present();
      const {data: moments} = await modal.onDidDismiss();
      if (moments && moments.length) {
        const sampleMoments = moments.filter((c) => c.cloned === 'new');
        if (sampleMoments && sampleMoments.length) {
          for (const moment of sampleMoments) {
            // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
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
            moment.parent_programs = [this.moment._id];
          }
          const clonedMoments: any = await this.momentService.clone(sampleMoments, null); // clone the array of selected activities from Picker
          for (const clonedMoment of clonedMoments) {
            const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
            if (index > -1) {
              clonedMoment.resource = moments[index].resource; // clone the populated resource
            }
          }
          this.activities.push(...clonedMoments);
        }
      }
    } else {
      this.router.navigate(['/app/manage/activity/' + this.moment._id + '/newplan/', componentProps ], { replaceUrl: false });
    }
  }

  async loadSample() {
    this.selectedSample = await this.momentService.load(this.categorySampleMap.find((c) => c.categoryId === this.categoryId).sampleId);
  }

  async createPlan() {
    this.ionSpinner = true;
    this.selectedSample.matrix_string[0][0] = this.newActivityName;
    // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
    this.selectedSample.calendar = { // reset the calendar
      title: this.selectedSample.matrix_string[0][0],
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
    this.selectedSample.parent_programs = [this.moment._id];
    const clonedMoments: any = await this.momentService.clone([this.selectedSample], 'admin'); // clone and do not add admin as participants
    if (clonedMoments && clonedMoments.length) {
      if (this.platform.width() >= 768) {
        this.router.navigate(['/app/manage/activity/' + this.moment._id + '/creator/' + clonedMoments[0]._id + '/overview/' + clonedMoments[0]._id, { visibleComponents: '10000,10010,10050,10300' }]);
      } else {
        this.momentService.openCreator({ moment: clonedMoments[0], modalPage: true });
      }
      this.newActivityName = ''; // reset name
    }
    this.ionSpinner = false; // turn off spinner
    this.view = '1'; // reset view
  }

  back() {
    if (this.view === '2') {
      this.view = '1';
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions['refreshUserStatus'].unsubscribe();
  }
}
