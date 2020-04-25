import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {ActivatedRoute, Router} from "@angular/router";
import {CacheService} from "ionic-cache";
import {
  ActionSheetController,
  AlertController, IonContent, IonSelect,
  LoadingController,
  ModalController,
  Platform, PopoverController, ToastController
} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {NetworkService} from "../../../services/network-service.service";
import {Resource} from "../../../services/resource.service";
import {Response} from "../../../services/response.service";
import {Moment} from "../../../services/moment.service";
import {Chat} from "../../../services/chat.service";
import {CalendarService} from "../../../services/calendar.service";
import {EditfeaturePage} from "../editfeature/editfeature.page";
import {Churches} from "../../../services/church.service";
import {Groups} from "../../../services/group.service";
import {Aws} from "../../../services/aws.service";
import {FeatureInsightPage} from "./feature-insight/feature-insight.page";
import {EditparticipantsPage} from "../editparticipants/editparticipants.page";
import {FeatureChildActivitiesPage} from "./feature-childactivities/feature-childactivities.page";
import {FeatureSchedulePage} from "./feature-schedule/feature-schedule.page";
import {FeatureBillingPage} from "./feature-billing/feature-billing.page";
import {FeatureSubscriptionPage} from "./feature-subscription/feature-subscription.page";
import {PaymentService} from "../../../services/payment.service";
import {GroupchatPage} from '../../group/groupchat/groupchat.page';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-managefeature',
  templateUrl: './managefeature.page.html',
  styleUrls: ['./managefeature.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagefeaturePage extends EditfeaturePage implements OnInit {
  @ViewChild(IonSelect, {static: false}) select: IonSelect;
  selectedMenuOption = '';
  menu: any;
  schedules: any;
  selectedSchedule: any;
  stripeCustomer: any;
  datas: any = [];
  searchKeyword = '';
  noConversationLoaded: boolean = true;
  finishedLoading: boolean = false;

  constructor(
      public cache: CacheService,
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
      public calendarService: CalendarService,
      public paymentService: PaymentService,
      private storage: Storage
  ) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.platform.width() >= 768 && this.router.url.includes('profile')) {
      this.selectedMenuOption = 'profile';
    }
  }

  reloadEditPage = async () => { // refresh the Edit Page if desktop is in Manage view, or if opened by modalPage
    if (this.userData.user && (this.router.url.includes('manage') || this.modalPage)) {
      const momentId = (this.moment && this.moment._id) ? this.moment._id : this.route.snapshot.paramMap.get('id');
      if (!this.modalPage) {
        this.userData.currentManageActivityId = momentId;
        this.storage.set('currentManageActivityId', momentId);
      }

      this.loadSchedules(momentId);

      await this.setup(); // need to load Editfeature's setup() because reloadEditPage overrides the parent handler of the same name
      if (this.moment && this.moment.categories.includes('5c915324e172e4e64590e346') && this.moment.subscriptionId) { // only check if it is a Community
        this.stripeCustomer = await this.paymentService.loadCustomer(this.moment._id);
      }

      if (this.moment) {
        console.log("there is a moment")
        this.pushToMessagePage(null, this.chatService.conversations[0]);
      } else {
        console.log("no moment")
      }
    }
  };

  async loadSchedules(momentId) {
    // check to see if it has any schedules
    this.schedules = await this.momentService.loadActivitySchedules(momentId);
  }

  sortConversations(datas) {
      datas.forEach((obj, index) => { // to do a stable sort, first remember the order
          obj.order = index;
      });
      datas.sort((a, b) => {
          let badge_diff = b.data.badge - a.data.badge;
          if (badge_diff !== 0) {
              return badge_diff; // only sort when there is an actual difference
          } else {
              return a.order - b.order; // preserve the order
          }
      });
  }

  async renderConversations() {
      this.datas = [];
      const listOfChurchIds = this.userData.user.churches.map((c) => c._id );
      this.chatService.conversations.forEach((obj: any) => {
          // Friends
          if (obj.conversation.type === 'connect') {
              this.noConversationLoaded = false;
              if(obj.data.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1){
                  this.datas.push(obj); //push the conversation object into an array
              }
          }
          // Community Groups
          else if (obj.conversation.group && obj.conversation.group.churchId && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === obj.conversation.group.churchId || this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')){
              this.noConversationLoaded = false;
              if (obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                  this.datas.push(obj); //push the conversation object into an array
              }
          }
          // Personal Groups
          else if (obj.conversation.group && !obj.conversation.group.churchId && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')){
              this.noConversationLoaded = false;
              if (obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                  this.datas.push(obj); //push the conversation object into an array
              }
          }
          // Outside Groups
          else if (obj.conversation.group && listOfChurchIds.indexOf(obj.conversation.group.churchId) === -1 && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')){
              this.noConversationLoaded = false;
              if (obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                  this.datas.push(obj); //push the conversation object into an array
              }
          }
          // Moment (Program, Plan, etc)
          else if (obj.conversation.moment && (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
              this.noConversationLoaded = false;
              if (obj.data.name && obj.data.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                  this.datas.push(obj); //push the conversation object into an array
              }
          }
          if (obj.message && Object.keys(obj.message).length > 0) {
              obj.message.preview = ((obj.message.author === this.userData.user._id) ? "You: " : '') + (obj.message.body || '') + ((obj.message.moment && obj.message.moment.resource) ? obj.message.moment.resource['en-US'].value[0] : '') + (obj.message.attachments && obj.message.attachments.length ? '📁' : '');
          }
      });
      this.sortConversations(this.datas);
      // load the chat room when initiating in wide screen view
      if (!this.chatService.currentChatProps.length && this.platform.width() >= 768 && this.datas.length) {
          this.pushToMessagePage(null, this.datas[0]);
      }
      this.finishedLoading = true;
  }

  async pushToMessagePage(event, object) {
      if (event) event.stopPropagation();
      let chatObj;
      if (object.conversation.type === 'connect') {
          chatObj = {
              conversationId: object.conversation._id,
              name: object.data.name,
              recipient: object.data.participant,
              page: 'chat',
              badge: object.data.badge,
              modalPage: this.platform.width() < 768
          };
      } else if (object.conversation.type === 'group') {
          chatObj = {
              conversationId: object.conversation.group.conversation,
              name: object.conversation.group.name,
              group: object.conversation.group,
              page: 'chat',
              badge: object.data.badge,
              modalPage: this.platform.width() < 768
          };
      } else if (object.conversation.type === 'moment') {
          chatObj = {
              conversationId: object.conversation._id,
              name: object.data.name,
              moment: object.conversation.moment,
              page: 'chat',
              badge: object.data.badge,
              modalPage: this.platform.width() < 768
          };
      }

      if (this.platform.width() >= 768) {
          this.chatService.currentChatProps.push(chatObj);
          // when clicking on a conversation, if it is displaying the group info, it will force it to get back to the chat view
          console.log("moment ID " + this.moment._id)
          this.router.navigate(['/app/manage/activity/' + this.moment._id + '/chat'], { skipLocationChange: true });
          // if it is displaying the chat view, it will reload the chat data
          this.userData.refreshMyConversations({action: 'reload chat view'});
      } else {
          this.chatService.currentChatProps.push(chatObj);
          const groupPage = await this.modalCtrl.create({
              component: GroupchatPage,
              componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
          });
          await groupPage.present();
      }

      if (this.electronService.isElectronApp) { // since electron doesn't detect appStateChange, manually refreshTabBadges at every pushToMessage()
          this.chatService.refreshTabBadges();
      }
      // reorder the list
      this.searchKeyword = '';
      object.data.badge = 0;
  }

  // async createChatConversation() {
  //   await this.userData.checkPushNotification();
  //   const newConversationId = await this.chatService.newConversation(this.recipient._id, { composedMessage : welcomeMessage, type: "connect" });
  //   this.chatService.refreshTabBadges();
  //   this.isConnected = true;
  //   this.chatService.openChat({conversationId: newConversationId, author: this.recipient});
  // }

  async clickManageMenu(menuOption, selectedSchedule) {
    this.menu = [
      {
        url: 'insight',
        label: 'Insight',
        component: FeatureInsightPage,
      },
      {
        url: 'profile',
        label: 'Profile',
        component: null, // this is not required as we are using event to open this component to avoid circular dependency
      },
      {
        url: 'people',
        label: 'People',
        component: EditparticipantsPage,
      },
      {
        url: 'programs',
        label: 'Programs',
        categoryId: '5c915475e172e4e64590e348', // program's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5c915475e172e4e64590e348',
        }
      },
        {
            url: 'journey',
            label: 'Journey',
            categoryId: '5e9f46e1c8bf1a622fec69d5', // journey category ID
            component: FeatureChildActivitiesPage,
            params: {
                categoryId: '5e9f46e1c8bf1a622fec69d5',
            }
        },
      {
        url: 'mentoring',
        label: 'Mentoring',
        categoryId: '5e9fe372c8bf1a622fec69d8', // mentoring category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5e9fe372c8bf1a622fec69d8',
        }
      },
      {
        url: 'groups',
        label: 'Groups',
        categoryId: '5e9fe35cc8bf1a622fec69d7', // group category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5e9fe35cc8bf1a622fec69d7',
        }
      },
      {
        url: 'plans',
        label: 'Plans',
        categoryId: '5c915476e172e4e64590e349', // plan's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5c915476e172e4e64590e349',
        }
      },
      {
        url: 'contents',
        label: 'Contents',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        component: FeatureChildActivitiesPage,
        params: {
          categoryId: '5e1bbda67b00ea76b75e5a73',
        }
      },
      {
        url: 'schedule',
        label: 'Schedule',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], // sends in the parent category ID
        component: FeatureSchedulePage,
        params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73', scheduleId: selectedSchedule ? selectedSchedule._id : null } // sends in the parent category ID
      },
      {
        url: 'new-schedule',
        label: 'New Schedule',
        categoryId: '5e1bbda67b00ea76b75e5a73', // content's category ID
        parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], // sends in the parent category ID
        component: FeatureSchedulePage,
        params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73' } // sends in the parent category ID
      },
      {
        url: 'onboarding',
        label: 'Onboarding Processes',
        component: null, // this is not required as we are using event to open this component to avoid circular dependency
        params: { programId: this.moment._id, organizer: true, showHeader: false }
      },
      {
        url: 'billing',
        label: 'Billing',
        component: FeatureBillingPage,
      },
      {
        url: 'subscription',
        label: 'Subscription',
        component: FeatureSubscriptionPage,
      },
    ];
    const menuItem = this.menu.find((c) => c.url === menuOption);
    if (this.platform.width() >= 768) {
      this.selectedMenuOption = menuOption;
      this.router.navigate(['/app/manage/activity/' + this.moment._id + '/' + menuOption + '/' + this.moment._id, (menuItem.params || {}) ], { replaceUrl: true });
    } else {
      this.selectedMenuOption = '';
      if (menuOption === 'onboarding') {
        this.momentService.openPreferences({ programId: this.moment._id, organizer: true, modalPage: true });
      } else if (menuOption === 'profile') {
        this.momentService.openMoment( { moment: this.moment, modalPage: true });
      } else {
        const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: { moment: this.moment, categoryId: menuItem.categoryId, parentCategoryId: menuItem.parentCategoryId, title: menuItem.label, scheduleId: (selectedSchedule ? selectedSchedule._id : null), modalPage: true } });
        await manageModal.present();
      }
    }
    if (selectedSchedule) {
      this.selectedSchedule = selectedSchedule;
    }
  }

  async switchToUserView() {
    if (this.platform.width() >= 768) {
      this.router.navigate(['/app/activity/' + this.moment._id], {replaceUrl: false});
    } else {
      if (this.modalPage) {
        this.closeModal(false);
      }
      this.momentService.openMoment( {moment: this.moment, modalPage: true});
    }
  }

  async edit() {
    if (this.modalPage) {
      const editModal = await this.modalCtrl.create({component: EditfeaturePage, componentProps: { moment: this.moment, modalPage: true }});
      await editModal.present();
    } else {
      this.router.navigate(['/app/edit/' + this.moment._id]);
    }
  }

  async changeManageActivity(event) {
    event.stopPropagation();
    this.storage.set('currentManageActivityId', event.detail.value);
    this.userData.currentManageActivityId = event.detail.value;
    if (!this.modalPage) {
      this.router.navigate(['/app/manage/activity/' + event.detail.value + '/insight/' + event.detail.value]);
    }
  }

  async upOneLevel(momentId) {
    this.userData.currentManageActivityId = momentId;
    if (this.modalPage) {
      this.modalCtrl.dismiss();
    } else if (this.userData.activitiesWithAdminAccess.find((c) => c._id === momentId)) {
      this.router.navigate(['/app/manage/activity/' + momentId + '/insight/' + momentId]);
    } else {
      this.router.navigate(['/app/activity/' + momentId]);
    }
  }
}
