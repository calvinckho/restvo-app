import {ChangeDetectorRef, Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {
  ActionSheetController,
  AlertController,
  LoadingController, ModalController,
  Platform,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {Chat} from "../../../services/chat.service";
import {Churches} from "../../../services/church.service";
import {Groups} from "../../../services/group.service";
import {NetworkService} from "../../../services/network-service.service";
import {UserData} from "../../../services/user.service";
import {Aws} from "../../../services/aws.service";
import {Moment} from "../../../services/moment.service";
import {Resource} from "../../../services/resource.service";
import {Response} from "../../../services/response.service";
import {CalendarService} from "../../../services/calendar.service";
import {EditfeaturePage} from "../editfeature/editfeature.page";

@Component({
  selector: 'app-editfeature',
  templateUrl: './editparticipants.page.html',
  styleUrls: ['../editfeature/editfeature.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditparticipantsPage extends EditfeaturePage implements OnInit {

  @Input() title = '';

  constructor(
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
              public groupService: Groups,
              public networkService: NetworkService,
              public userData: UserData,
              public awsService: Aws,
              public momentService: Moment,
              public resourceService: Resource,
              public responseService: Response,
              public calendarService: CalendarService) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }


}
