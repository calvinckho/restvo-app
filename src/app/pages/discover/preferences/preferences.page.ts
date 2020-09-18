import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  IonInfiniteScroll,
  ModalController,
  Platform,
} from "@ionic/angular";
import {Location} from "@angular/common";
import {Storage} from "@ionic/storage";
import {Auth} from "../../../services/auth.service";
import {Chat} from "../../../services/chat.service";
import {UserData} from "../../../services/user.service";
import {Moment} from "../../../services/moment.service";
import {Resource} from "../../../services/resource.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PickfeaturePopoverPage} from "../../feature/pickfeature-popover/pickfeature-popover.page";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreferencesPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @Input() modalPage: any;
  @Input() showHeader: any;
  @Input() programId: any; // the program ID
  @Input() type: number; // 2: participants, 3: organizers, 4: leaders
  @Input() organizer = false;

  subscriptions: any = {};
  moments = [];
  ionSpinner = false;
  pageNum: number = 0;
  reachedEnd: boolean = false;
  conversation: any;
  members: any = [];
  searchKeyword = '';
  refreshNeeded = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private storage: Storage,
      public platform: Platform,
      private authService: Auth,
      private chatService: Chat,
      public userData: UserData,
      public momentService: Moment,
      private resourceService: Resource,
      private modalCtrl: ModalController) {}

  ngOnInit() {
    // link the refreshUserStatus Observable with the refresh handler. It fires on subsequent user refreshes
    this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
  }

  refreshUserStatusHandler = () => {
    if (!this.ionSpinner && this.userData && this.userData.user) { // after a user has modified the answer to the onboarding process questionniare. data is most likely { type: 'change aux data' }
      this.setup();
    }
  }

  setup() {
    if (this.userData && this.userData.user) {
      this.programId = this.programId || this.route.snapshot.paramMap.get('programId'); // the program ID
      this.type = this.type || parseInt(this.route.snapshot.paramMap.get('type'), 10); // 2: participants, 3: organizers, 4: leaders
      this.showHeader = this.showHeader || (this.route.snapshot.paramMap.get('showHeader') === 'true'); // 2: participants, 3: organizers, 4: leaders
      this.organizer = this.organizer || JSON.parse(this.route.snapshot.paramMap.get('organizer'));
      this.loadPreferences();
    } else {
      this.router.navigateByUrl('/app/discover');
    }
  }

  // load Program onboarding processes
  async loadPreferences() {
    this.ionSpinner = true;
    setTimeout(async () => {
      this.infiniteScroll.disabled = false;
      this.reachedEnd = false;
      this.pageNum = 0;
      this.moments = [];
      this.loadMorePreferences({target: this.infiniteScroll});
    }, 50);
  }

  async createMoment() {
      const data: any = { categoryId: '5e17acd47b00ea76b75e5a71' };
       if (this.programId) {
           data.programId = this.programId;
       }
      if (!this.modalPage && this.platform.width() >= 992) {
        data.subpanel = true;
        this.router.navigate([{ outlets: { sub: ['create', data] }}]);
      } else { // create other Activities
          data.modalPage = true;
          this.momentService.editMoment(data);
      }
  }

  async loadMorePreferences(event) {
    try {
      this.pageNum++;
      if (!this.reachedEnd) {
        let processes: any;
        if (this.organizer) {
          processes = await this.momentService.loadProgramOnboardActivities(this.programId, null, false);
          this.reachedEnd = true;
        } else {
          processes = await this.momentService.loadUserPreferences(this.pageNum, this.programId, null);
        }
        this.ionSpinner = false;
        if (!processes.length) {
          this.reachedEnd = true;
          event.target.disabled = true;
        } else {
          for (const process of processes) {
            process.status = !process.response ? 'New' : (process.response.matrix_number.filter((c) => c.length > 5).length < process.resource.matrix_number[0].filter((c) => c === 40000 || c === 40020).length || process.response.matrix_string.filter((c) => c.length > 1 && c[1] && c[1].length > 0).length < process.resource.matrix_number[0].filter((c) => (c === 40010)).length) ? 'Incomplete' : 'Completed';
            this.moments.push(process);
          }
          if (!this.organizer) {
            // sort the list by program Name if it is showing all user's preferences
            this.moments.sort((a, b) => {
              if (a.program.matrix_string[0][0] < b.program.matrix_string[0][0]) { return -1; }
              if (a.program.matrix_string[0][0] > b.program.matrix_string[0][0]) { return 1; }
              return 0;
            });
          }
        }
        event.target.complete();
      } else {
        this.ionSpinner = false;
        event.target.complete();
      }
    } catch (err) {
      this.ionSpinner = false;
    }
  }

  executeSearch(event) {
    event.stopPropagation();
    this.ionSpinner = true;
    this.loadPreferences();
  }

  async openOnboardingProcess(event, moment, viewType) {
    event.stopPropagation();
    if (!this.modalPage && this.platform.width() >= 992) {
      if (viewType === 'edit') { // edit
        this.router.navigate([{ outlets: { sub: ['edit', moment._id, { subpanel: true }] }}]);
      } else { // view
        this.router.navigate([{ outlets: { sub: ['details', moment._id, { subpanel: true }] }}]);
      }
    } else if (!this.modalPage && this.platform.width() >= 768) {
      if (viewType === 'edit') { // edit
        this.router.navigate(['/app/edit/' + moment._id], { replaceUrl: false });
      } else if (this.router.url.includes('app/user')) { // if opened from User -> About Me
        this.router.navigate(['/app/user/activity/' + moment._id], { replaceUrl: false });
      } else { // opening from admin view
        this.router.navigate(['/app/activity/' + moment._id]);
      }
    } else {
      if (viewType === 'edit') { // edit
        this.momentService.editMoment({ moment: moment, modalPage: true });
      } else { // view
        this.momentService.openMoment( { moment: moment, modalPage: true });
      }
    }
  }

    async chooseOnboardingProcess() {
      const componentProps: any = {title: 'Choose from Library', categoryId: '5e17acd47b00ea76b75e5a71', allowCreate: true, allowSwitchCategory: false, disableSelect: true };
      if (this.programId) {
        componentProps.programId = this.programId;
      }
      if (this.type) {
        componentProps.type = this.type;
      }
      if (!this.modalPage && this.platform.width() >= 992) {
        componentProps.subpanel = true;
        this.router.navigate([{ outlets: { sub: ['pickfeature', componentProps ] }}]);
      } else {
        componentProps.modalPage = true;
        const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps});
        await modal.present();
        const {data: moments} = await modal.onDidDismiss();
        if (moments && moments.length) {
          for (const moment of moments) {
            // prepare object for cloning. copy everything except calendar and add program and onboarding types
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
            moment.program = this.programId;
            if (this.type && moment.array_boolean.length > this.type) {
              moment.array_boolean[this.type] = true;
            }
          }
          const clonedMoments: any = await this.momentService.clone(moments, null); // clone the array of selected activities from Picker
          for (const clonedMoment of clonedMoments) {
            const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
            if (index > -1) {
              clonedMoment.resource = moments[index].resource; // clone the populated resource
            }
          }
          this.moments.unshift(...clonedMoments);
        }
      }
    }

  closeModal() {
    if (this.modalPage) {
      // because Preference page is started by EditMoment via event listener and not via modalCtrl (hence it can't return the refreshNeeded obj back to EditMoment), it is necessary to publish a 'RefreshUserStatus' event to update EditMoment
      if (this.refreshNeeded) {
        this.userData.refreshUserStatus({});
      }
      this.modalCtrl.dismiss(this.refreshNeeded);
    } else {
      this.location.back();
    }
  }

  ngOnDestroy() {
    this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
  }
}
