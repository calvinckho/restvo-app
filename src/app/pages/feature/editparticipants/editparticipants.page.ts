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
import { GroupchatPage } from "../../group/groupchat/groupchat.page";

@Component({
  selector: "app-editfeature",
  templateUrl: "./editparticipants.page.html",
  styleUrls: ["../editfeature/editfeature.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EditparticipantsPage extends EditfeaturePage implements OnInit {
  @Input() title = "";
  uniqueParticipantList = [];
  tempArray = []
  // relationshipCompletion: any;
  participantAscending = true;
  roleAscending = true;
  conversations: any = [];

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
    // const loading = await this.loadingCtrl.create({
    //   message: 'Please wait...',
    //   duration: 2000
    // })
    // await loading.present();
    let tempList1 = this.moment.user_list_1.slice();
    tempList1.forEach((user) => {
      user.role = [this.participantLabel];
    });
    let tempList2 = this.moment.user_list_2.slice();
    tempList2.forEach((user) => {
      user.role = [this.organizerLabel];
    });
    let tempList3 = this.moment.user_list_3.slice();
    tempList3.forEach((user) => {
      user.role = [this.leaderLabel];
    });
    this.tempArray = tempList1.concat(tempList2, tempList3);
    //tempArray => lists an array of user objects with each users role


    //this logic below checks the user._id to see if it exists in the array uniqueParticipantList
    //If it exists, we only need to concat the roles,
    //Else, we need to push the whole user object into uniqueParticipantList
    this.tempArray.forEach(el => {
      let exists = this.uniqueParticipantList.filter(function(value){
        return value._id === el._id
      })
      if(exists.length){
        let existingIndex = this.uniqueParticipantList.indexOf(exists[0])
        this.uniqueParticipantList[existingIndex].role = this.uniqueParticipantList[existingIndex].role.concat(" " + el.role)
      }
      else {
        this.uniqueParticipantList.push(el)
      }
    })

  }

  async openPopUpModalAddParticipants(event){
    this.addParticipants(event, 'connect', event.detail.value.user_list, event.detail.value.label)
  }

  async pushToMessagePage(event, user) {
    if (event) event.stopPropagation();

    const conversationId = await this.chatService.newConversation(user._id, { composedMessage : 'Administrator ' + this.userData.user.first_name + ' ' + this.userData.user.last_name + ' is now connected with you.', type: 'connect' });
    this.chatService.openChat({
      conversationId: conversationId,
      author: user,
      relativeTo: this.platform.width() >= 768 ? this.route : null
    });
    /*let chatObj = {
        conversationId: id,
        name: user.first_name + ' ' + user.last_name,
        recipient: user,
        page: 'chat',
        badge: 0,
        modalPage: this.platform.width() < 768
    };

    if (this.platform.width() >= 768) {
      this.chatService.currentChatProps.push(chatObj);
      // when clicking on a conversation, if it is displaying the group info, it will force it to get back to the chat view
      this.router.navigate(['', { outlets: { sub: 'sub_chat' }}], { relativeTo: this.route });
      // if it is displaying the chat view, it will reload the chat data
      this.userData.refreshMyConversations({action: 'reload chat view'});
    } else {
      this.chatService.currentChatProps.push(chatObj);
      const groupPage = await this.modalCtrl.create({
        component: GroupchatPage,
        componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
      });
      await groupPage.present();
    }*/
  }

  sortDisplay(type) {
    if (type === 'participant') {
      this.participantAscending = !this.participantAscending;
      const reverseOrder = this.participantAscending;
      console.log(this.uniqueParticipantList)
      this.uniqueParticipantList.sort(function(a, b) {
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
      this.uniqueParticipantList.sort(function(a, b) {
          if (a.role < b.role) {
            return reverseOrder ? -1 : 1;
          }
          if (a.role > b.role) {
            return reverseOrder ? 1 : -1;
          }
        });
    }
}
}
