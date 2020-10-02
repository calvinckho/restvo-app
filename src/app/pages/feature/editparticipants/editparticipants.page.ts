import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  ViewEncapsulation, ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ElectronService } from "ngx-electron";
import { SwUpdate } from "@angular/service-worker";
import {
  ActionSheetController,
  AlertController, IonSelect,
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
  @ViewChild('InviteSelect', {static: false}) inviteSelect: IonSelect;
  @ViewChild('RolesSelect', {static: false}) rolesSelect: IonSelect;
  @ViewChild('RemoveSelect', {static: false}) removeSelect: IonSelect;
  @Input() title = '';
  uniqueParticipantList = [];
  displayParticipantList = [];
  selectedParticipants = [];
  rolesFilter: any = [];
  // relationshipCompletion: any;
  participantAscending = true;
  roleAscending = true;
  searchKeyword = '';

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
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

  // for Desktop routing, it is possible for user to jump between page views without properly using the back button (closeModal and ngOnDestroy).
  // assumption: leaving the page improperly will lose all unsaved changes. Re-entering will refresh the edit page to its initial state.
  // in such case, ionViewWillEnter listener is used to detect re-entering a page view and reloading the page
  async ionViewWillEnter() {
    // re-entering edit on Desktop only
    if (this.userData.user && this.moment && this.moment._id && !this.modalPage) {
      await this.setup();
      this.prepareParticipantsIntoUniqueParticipantList();
      this.renderUniqueParticipantList();
    }
  }

  reloadEditPage = async () => {
    // refresh the Edit Page if it has loaded data. it is only called on entry for PDA fast load when authService has completed
    if (this.userData.user) {
      await this.setup();
      this.prepareParticipantsIntoUniqueParticipantList();
      this.renderUniqueParticipantList();
    }
  };

  prepareParticipantsIntoUniqueParticipantList() {
    this.uniqueParticipantList = [];
    const user_list_1 = this.moment.user_list_1.slice();
    user_list_1.forEach((user) => {
      user.roles = [this.participantLabel];
    });
    const user_list_2 = this.moment.user_list_2.slice();
    user_list_2.forEach((user) => {
      user.roles = [this.organizerLabel];
    });
    const user_list_3 = this.moment.user_list_3.slice();
    user_list_3.forEach((user) => {
      user.roles = [this.leaderLabel];
    });
    const user_list_123 = user_list_1.concat(user_list_2, user_list_3);
    //tempArray => lists an array of user objects with each users role

    //this logic below checks the user._id to see if it exists in the array uniqueParticipantList
    //If it exists, we only need to concat the roles,
    //Else, we need to push the whole user object into uniqueParticipantList
    user_list_123.forEach(user => {
      user.select = false;
      // checks each user from the temp array to see if that user exists in the uniqueParticipantList array
      const uniqueParticipant = this.uniqueParticipantList.find((c) => c._id === user._id);
      // if user existed already in uniqueParticipantArray, the "exists" variable will have a length
      if (uniqueParticipant) {
        const existingIndex = this.uniqueParticipantList.indexOf(uniqueParticipant);
        this.uniqueParticipantList[existingIndex].roles.push(user.roles[0]);
      } else {
        this.uniqueParticipantList.push(user);
      }
    });
  };

  renderUniqueParticipantList() {
    this.displayParticipantList = this.uniqueParticipantList.filter((c) => (c.first_name + ' ' + c.last_name).toLowerCase().includes(this.searchKeyword.toLowerCase()));

    if (this.rolesFilter.length) { // only filter by role if at least one type is selected
      for (let i = this.displayParticipantList.length - 1; i >= 0; i--) {
        let matchRolesFilter = true;
        this.rolesFilter.forEach((role) => {
          if (!this.displayParticipantList[i].roles.includes(role)) {
            matchRolesFilter = false;
          }
        });
        if (!matchRolesFilter) { // if it does not match the filter selections, remove from list
          this.displayParticipantList.splice(i, 1);
        }
      }
    }
  }

  async openPopUpModalAddParticipants(event) {
    if (event.detail.value) {
      this.addParticipants(event, 'connect', event.detail.value.user_list, event.detail.value.label);
      this.inviteSelect.value = null;
    }
  }

  async pushToMessagePage(event, user) {
    if (event) event.stopPropagation();

    const conversationId = await this.chatService.newConversation(user._id, { composedMessage : 'Administrator ' + this.userData.user.first_name + ' ' + this.userData.user.last_name + ' is now connected with you.', type: 'connect' });
    this.chatService.openChat({
      conversationId: conversationId,
      author: user,
      subpanel: this.platform.width() >= 768
    });
  }

  sortDisplay(type) {
    if (type === 'participant') {
      this.participantAscending = !this.participantAscending;
      const reverseOrder = this.participantAscending;
      this.displayParticipantList.sort(function(a, b) {
        if (a.first_name < b.first_name) {
          return reverseOrder ? -1 : 1;
        }
        if (a.first_name > b.first_name) {
          return reverseOrder ? 1 : -1;
        }
      });
    } else if (type === 'role') {
      this.roleAscending = !this.roleAscending;
      const reverseOrder = this.roleAscending;
      this.displayParticipantList.sort(function(a, b) {
          if (a.roles < b.roles) {
            return reverseOrder ? -1 : 1;
          }
          if (a.roles > b.roles) {
            return reverseOrder ? 1 : -1;
          }
        });
    }
  }

  selectParticipant(user) {
    if (user.select) {
      user.select = false;
      const index = this.selectedParticipants.indexOf(user);
      this.selectedParticipants.splice(index, 1);
    } else {
      user.select = true;
      this.selectedParticipants.push(user);
      //this.searchbar.setFocus();
    }
  }

  unselectParticipant(user) {
    let index = this.selectedParticipants.indexOf(user);
    if (index > -1) {
      this.selectedParticipants[index].select = false;
    }
    index = this.selectedParticipants.indexOf(user);
    if (index > -1) {
      this.selectedParticipants.splice(index, 1);
    }
  }

  async multiSelectAction(event) {
    event.stopPropagation();
    if (!this.selectedParticipants.length || !event.detail.value.length) return; // if no participant or remove type selected, exit
    const alert = await this.alertCtrl.create({
      header: 'Remove ' + (this.selectedParticipants.length === 1 ? event.detail.value[0].singularLabel : event.detail.value[0].pluralLabel),
      subHeader: 'You are about to remove ' + (this.selectedParticipants.length === 1 ? (this.selectedParticipants[0].first_name + ' ' + this.selectedParticipants[0].last_name + ' as a ' + event.detail.value[0].singularLabel) : (this.selectedParticipants.length + ' ' + event.detail.value[0].pluralLabel)) + '. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Remove',
        handler: async () => {
          alert.dismiss();
          this.removeFromUserLists(event.detail.value.map((c) => c.user_list), this.selectedParticipants.map((c) => c._id));
          // if admin is removing herself, exit manage view
          if (event.detail.value.find((c) => c.user_list === 'user_list_2') && this.selectedParticipants.find((c) => c._id === this.userData.user._id)) {
            if (this.modalPage) {
              this.closeModal(true);
            } else {
              this.router.navigate(['/app/activity/' + this.moment._id]);
            }
          }
          this.selectedParticipants = []; // empty the selected array
        }}, { text: 'Cancel' }]
    });
    this.removeSelect.value = null;
    await alert.present();
  }
}
