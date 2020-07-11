import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionSheetController, AlertController, IonContent, ModalController, Platform} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {CalendarService} from "../../../../services/calendar.service";
import {UserData} from "../../../../services/user.service";
import {Moment} from "../../../../services/moment.service";
import {Response} from "../../../../services/response.service";
import {Resource} from "../../../../services/resource.service";
import {FeatureSchedulePage} from "../feature-schedule/feature-schedule.page";
import {Location} from "@angular/common";

@Component({
  selector: 'app-feature-curriculum',
  templateUrl: './feature-curriculum.page.html',
  styleUrls: ['./feature-curriculum.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureCurriculumPage extends FeatureSchedulePage implements OnInit {

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public location: Location,
      public platform: Platform,
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      public authService: Auth,
      public chatService: Chat,
      public calendarService: CalendarService,
      public userData: UserData,
      public momentService: Moment,
      public resourceService: Resource,
      public modalCtrl: ModalController,
      public responseService: Response
  ) {
    super(route, router, location, platform, alertCtrl, authService, chatService,
        userData, momentService, resourceService, modalCtrl, actionSheetCtrl, calendarService, responseService);
  }

  async ngOnInit() {
    await super.ngOnInit();
    this.setupSchedulePage();
  }

  // because this component extends feature-schedule.page.ts, the following handler overrides the handler with the same name in the parent component
  reloadChildActivitiesHandler = async () => {
    this.setupSchedulePage();
    this.setupChildActivitiesPage();
  };

}
