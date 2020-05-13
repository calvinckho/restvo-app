import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ElectronService } from "ngx-electron";
import { SwUpdate } from "@angular/service-worker";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  Platform,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { Chat } from "../../../services/chat.service";
import { Churches } from "../../../services/church.service";
import { Groups } from "../../../services/group.service";
import { NetworkService } from "../../../services/network-service.service";
import { UserData } from "../../../services/user.service";
import { Aws } from "../../../services/aws.service";
import { Moment } from "../../../services/moment.service";
import { Resource } from "../../../services/resource.service";
import { Response } from "../../../services/response.service";
import { CalendarService } from "../../../services/calendar.service";
import { EditfeaturePage } from "../editfeature/editfeature.page";

@Component({
  selector: "app-editfeature",
  templateUrl: "./editparticipants.page.html",
  styleUrls: ["../editfeature/editfeature.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EditparticipantsPage extends EditfeaturePage implements OnInit {
  @Input() title = "";
  uniqueParticipantList = [];

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
    public calendarService: CalendarService
  ) {
    super(
      route,
      router,
      location,
      electronService,
      swUpdate,
      change,
      platform,
      alertCtrl,
      toastCtrl,
      actionSheetCtrl,
      popoverCtrl,
      modalCtrl,
      loadingCtrl,
      chatService,
      churchService,
      groupService,
      networkService,
      userData,
      awsService,
      momentService,
      resourceService,
      responseService,
      calendarService
    );
  }

  // for Desktop routing, it is possible for user to jump between page views without properly using the back button (closeModal and ngOnDestroy).
  // assumption: leaving the page improperly will lose all unsaved changes. Re-entering will refresh the edit page to its initial state.
  // in such case, ionViewWillEnter listener is used to detect re-entering a page view and reloading the page
  async ionViewWillEnter() {
    // re-entering edit on Desktop only
    if (
      this.userData.user &&
      this.moment &&
      this.moment._id &&
      !this.modalPage
    ) {
      await this.setup();
      this.mergeParticipantsIntoUniqueParticipantList();
      console.log("moment", this.moment)
    }
  }

  reloadEditPage = async () => {
    // refresh the Edit Page if it has loaded data. it is only called on entry for PDA fast load when authService has completed
    if (this.userData.user && !this.initialSetupCompleted) {
      await this.setup();
      this.mergeParticipantsIntoUniqueParticipantList();
    }
  };

  mergeParticipantsIntoUniqueParticipantList = async () => {
    // this.moment is ready to go
    // this.moment.user_list_1 - participant
    // this.moment.user_list_2 - organizer
    // this.moment.user_list_3 - leader
    let tempList1 = this.moment.user_list_1.slice();
    tempList1.forEach((user) => {
      user.role = this.participantLabel;
    });
    let tempList2 = this.moment.user_list_2.slice();
    tempList2.forEach((user) => {
      user.role = this.organizerLabel;
    });
    let tempList3 = this.moment.user_list_3.slice();
    tempList3.forEach((user) => {
      user.role = this.leaderLabel;
    });
    this.uniqueParticipantList = tempList1.concat(tempList2, tempList3);
  }

  async openPopUpModalAddParticipants(event){
    console.log("testing event!", event)
    this.addParticipants(event, 'connect', event.detail.value.user_list, event.detail.value.label)
  }
}
