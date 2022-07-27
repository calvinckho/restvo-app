import {Component, OnInit, ViewChild, ViewEncapsulation, NgZone, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  ActionSheetController,
  AlertController, IonSelect,
  LoadingController,
  ModalController, PickerController,
  Platform
} from '@ionic/angular';
import {Moment} from '../../../../services/moment.service';
import {Location} from '@angular/common';
import {Storage} from '@ionic/storage';
import {ElectronService} from 'ngx-electron';
import {Badge} from '@ionic-native/badge/ngx';
import {SwUpdate} from '@angular/service-worker';
import {ActivatedRoute, Router} from '@angular/router';
import {CacheService} from 'ionic-cache';
import {UserData} from '../../../../services/user.service';
import {NetworkService} from '../../../../services/network-service.service';
import {Resource} from '../../../../services/resource.service';
import {Response} from '../../../../services/response.service';
import {MapService} from '../../../../services/map.service';
import {Auth} from '../../../../services/auth.service';
import {Chat} from '../../../../services/chat.service';
import {CalendarService} from '../../../../services/calendar.service';
import {ShowfeaturePage} from '../../showfeature/showfeature.page';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {Systemlog} from '../../../../services/systemlog.service';

@Component({
  selector: 'app-feature-insight',
  templateUrl: './feature-insight.page.html',
  styleUrls: ['./feature-insight.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CalendarService ]
})

export class FeatureInsightPage extends ShowfeaturePage implements OnInit, OnChanges {
  @ViewChild('OpenFilter', { static: false }) openFilter: IonSelect;
  relationshipCompletion: any;
  participantAscending = true;
  leaderAscending = true;
  programAscending = true;
  progressAscending = false;
  lastActivityAscending = false;
  listOfPrograms: any = [];
  selectedProgramId: any;

  multi: any[];
  // view: any[] = [700, 300];

  date = new Date();

  // options
  schemeType = 'linear';
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = false;
  showXAxisLabel = false;
  xAxisLabel = 'Day';
  xScaleMin: string;
  xScaleMax: string;
  yAxisLabel = 'Activity';
  timeline = true;

  // duration unit and value
  durationValue = 7;
  durationUnit = 'day';
  currentDayValue = '7';

  colorScheme = {
    // add more hex color values for more color variety
    domain: ['#F2A573']
  };

  // value for the circle graph
  circleGraphValue = 90;
  radius = 54;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;

  // value for activeParticipants
  activeParticipants = 0;


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
      public calendarService: CalendarService,
      public systemlogService: Systemlog
  ) {
    super(zone, location, storage, electronService, badge, swUpdate, route, router,
        cache, platform, alertCtrl, actionSheetCtrl, loadingCtrl, modalCtrl, pickerCtrl,
        networkService, chatService, userData, authService, mapService,
        momentService, resourceService, responseService, calendarService);
    this.progress(this.circleGraphValue);
  }

  private progress(value: number) {
    const progress = value / 100;
    this.dashoffset = this.circumference * (1 - progress);
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.authService.token && this.userData.user) {
      if (!this.moment._id) { // angular router may not have moment._id ready yet
        this.moment._id = this.route.snapshot.paramMap.get('id');
      }
      this.loadInsight();
      this.loadMetrics('thisWeek');
    }
    console.log('this progress:', this.circleGraphValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value.currentValue !== changes.value.previousValue) {
      this.progress(changes.value.currentValue);
    }
  }

  // for current user refreshing the app
  loadAndProcessMomentHandler = async (data) => {
    if (this.router.url.includes('insight')) {
      // data.type - 'change aux data' or null or others. In all cases, reload moment and redo permission
      // ready to check authentication status
      this.setup(data, !!(this.authService.token && this.userData.user));
      this.loadInsight();
      this.loadMetrics(this.currentDayValue);
      /*if (this.activeParticipants) { // to avoid double value on page init
        this.loadMetrics(this.currentDayValue);
      }*/
    }
  }

  async loadMetrics(event) {
    const dayValue = event && event.target && event.target.value ? event.target.value : null;
    // find a way to utilize xmin on chart
    this.currentDayValue = dayValue;
    this.activeParticipants = 0;
    switch (dayValue) {
      case 'thisWeek':
        // line area chart doc link https://swimlane.gitbook.io/ngx-charts/v/docs-test/examples/line-area-charts/line-chart
        const currentDay = this.date.getDay();
        const difference = this.date.getDate() - currentDay;
        const firstDayInMilliSeconds = this.date.setDate(difference);
        const firstDayOfWeek = new Date(firstDayInMilliSeconds).toISOString();
        console.log('check for firstDayOfWeek', firstDayOfWeek, typeof firstDayOfWeek);
        this.xScaleMin = firstDayOfWeek;
        console.log('check if this.xScaleMin updated', this.xScaleMin);
        this.durationValue = 7;
        this.durationUnit = 'day';
        break;
      case 'thisMonth':
        this.durationValue = 30; // to change later when xScaleMin works
        this.durationUnit = 'day';
        break;
      case '30':
        this.durationValue = 1;
        this.durationUnit = 'month';
        break;
      case '90':
        this.durationValue = 3;
        this.durationUnit = 'month';
        break;
      case 'thisYear':
        this.durationValue = 1;
        this.durationUnit = 'year';
        break;
      default:
        this.durationValue = 7;
        this.durationUnit = 'day';
    }

    // this.multi = [{
    //   name: 'Activity',
    //   series: []
    // }];
    // possibly add parameters for duationUnit and durationValue to loadMetrics method?
    const results: any = await this.systemlogService.loadMetrics(this.moment._id, this.durationUnit, this.durationValue);
    console.log('check for load metrics', results);
    this.multi = [{
      name: 'Activity',
      series: results
    }];
    this.calculateActiveParticipants(this.durationValue, results);
  }

  async loadInsight() {
    if (this.moment._id) { // angular router may not have moment._id ready yet
      try {
        const results: any = await this.momentService.loadProgramInsight(this.moment._id);
        if (results && results.relationship_completion) {
          this.relationshipCompletion = results.relationship_completion;
          //console.log(this.relationshipCompletion);
          const objects = {};
          this.listOfPrograms = this.relationshipCompletion.map((c) => c.program).filter((program) => {
            if (objects[program._id]) {
              return false;
            }
            objects[program._id] = true;
            return true;
          });
        }
      } catch (err) {
        this.router.navigate(['/app/me']);
      }
    }
  }

  sortDisplay(type) {
      if (type === 'participant') {
        this.participantAscending = !this.participantAscending;
        const reverseOrder = this.participantAscending;
        this.relationshipCompletion.sort(function(a, b) {
          if (a.participants[0].first_name < b.participants[0].first_name) {
            return reverseOrder ? -1 : 1;
          }
          if (a.participants[0].first_name > b.participants[0].first_name) {
            return reverseOrder ? 1 : -1;
          }
        });
      } else if (type === 'leader') {
        this.leaderAscending = !this.leaderAscending;
        const reverseOrder = this.leaderAscending;
        this.relationshipCompletion.sort(function(a, b) {
            if (a.leaders[0].first_name < b.leaders[0].first_name) {
              return reverseOrder ? -1 : 1;
            }
            if (a.leaders[0].first_name > b.leaders[0].first_name) {
              return reverseOrder ? 1 : -1;
            }
          });
      } else if (type === 'program') {
        this.programAscending = !this.programAscending;
        const reverseOrder = this.programAscending;
        this.relationshipCompletion.sort(function(a, b) {
          if (a.program.name < b.program.name) {
            return reverseOrder ? -1 : 1;
          }
          if (a.program.name > b.program.name) {
            return reverseOrder ? 1 : -1;
          }
        });
      } else if (type === 'progress') {
        this.progressAscending = !this.progressAscending;
        const reverseOrder = this.progressAscending;
        this.relationshipCompletion.sort(function (a, b) {
          const c: any = a.completed_count / a.content_calendar_count;
          const d: any = b.completed_count / b.content_calendar_count;
          return (reverseOrder ? 1 : -1 ) * (d - c);
        });
      } else if (type === 'lastDate') {
        this.lastActivityAscending = !this.lastActivityAscending;
        const reverseOrder = this.lastActivityAscending;
        this.relationshipCompletion.sort(function (a, b) {
          const c: any = new Date(a.last_response_date);
          const d: any = new Date(b.last_response_date);
          return (reverseOrder ? 1 : -1 ) * (d - c);
        });
      }
  }

  calculateActiveParticipants(day, results) {
    results.forEach((arrayItem) => {
      const x = arrayItem.value;
      this.activeParticipants = this.activeParticipants + x;
    });
    console.log('this is active', Math.round(this.activeParticipants / day));
  }

  dateTickFormatting(dateTime) {
    return new Date(dateTime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
