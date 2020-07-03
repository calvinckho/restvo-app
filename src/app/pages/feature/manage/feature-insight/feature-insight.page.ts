import {Component, Input, OnInit, ViewEncapsulation, NgZone} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController, PickerController,
  Platform
} from "@ionic/angular";
import {Moment} from "../../../../services/moment.service";
import {Location} from "@angular/common";
import {Storage} from "@ionic/storage";
import {ElectronService} from "ngx-electron";
import {Badge} from "@ionic-native/badge/ngx";
import {SwUpdate} from "@angular/service-worker";
import {ActivatedRoute, Router} from "@angular/router";
import {CacheService} from "ionic-cache";
import {UserData} from "../../../../services/user.service";
import {NetworkService} from "../../../../services/network-service.service";
import {Resource} from "../../../../services/resource.service";
import {Response} from "../../../../services/response.service";
import {MapService} from "../../../../services/map.service";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {CalendarService} from "../../../../services/calendar.service";
import {ShowfeaturePage} from "../../showfeature/showfeature.page";

@Component({
  selector: 'app-feature-insight',
  templateUrl: './feature-insight.page.html',
  styleUrls: ['./feature-insight.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FeatureInsightPage extends ShowfeaturePage implements OnInit {

  relationshipCompletion: any;
  participantAscending = true;
  leaderAscending = true;
  programAscending = true;
  progressAscending = false;
  lastActivityAscending = false;
  listOfPrograms: any = [];
  selectedProgramId: any;

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
  ) {
    super(zone, location, storage, electronService, badge, swUpdate, route, router,
        cache, platform, alertCtrl, actionSheetCtrl, loadingCtrl, modalCtrl, pickerCtrl,
        networkService, chatService, userData, authService, mapService,
        momentService, resourceService, responseService, calendarService);
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.authService.token && this.userData.user) {
      if (!this.moment._id) { // angular router may not have moment._id ready yet
        this.moment._id = this.route.snapshot.paramMap.get('id');
      }
      await this.loadInsight();
    }
  }

  // for current user refreshing the app
  loadAndProcessMomentHandler = async (data) => {
    if (this.router.url.includes('insight')) {
      // data.type - 'change aux data' or null or others. In all cases, reload moment and redo permission
      // ready to check authentication status
      this.setup(data);
      this.loadInsight();
    }
  };

  async loadInsight() {
    if (this.moment._id) { // angular router may not have moment._id ready yet
      const results: any = await this.momentService.loadProgramInsight(this.moment._id);
      if (results && results.relationship_completion) {
        this.relationshipCompletion = results.relationship_completion;
        console.log(this.relationshipCompletion)
        let objects = {};
        this.listOfPrograms = this.relationshipCompletion.map((c) => c.program).filter((program) => {
          if (objects[program._id]) {
            return false;
          }
          objects[program._id] = true;
          return true;
        });
        console.log("list", this.listOfPrograms);
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

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
