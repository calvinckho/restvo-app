import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {PickfeaturePopoverPage} from "../../pickfeature-popover/pickfeature-popover.page";
import {ActivatedRoute, Router} from "@angular/router";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {UserData} from "../../../../services/user.service";
import {Moment} from "../../../../services/moment.service";
import {Resource} from "../../../../services/resource.service";
import {GroupchatPage} from "../../../group/groupchat/groupchat.page";

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
  searchKeyword = '';
  refreshNeeded = false;
  activityAscending = true;
  typeAscending = true;
  shareAscending = false;
  planPage = 'createOrChoose';
  actionType: any;

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
      this.categoryLabel = this.resourceService.categories.find((c) => c._id === this.categoryId)['en-US'].value[0] + 's';
      this.loadChildActivities();
    }
  }

  // load Program child activities
  async loadChildActivities() {
      this.activities = await this.momentService.loadProgramChildActivities(this.momentId, this.categoryId);
      this.activities.map((c) => c.select = false);
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
        this.userData.currentManageActivityId = moment._id;
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

  async pushToMessagePage(event, activity) {
    if (event) event.stopPropagation();
    let chatObj = {
      conversationId: activity.conversation,
      name: activity.matrix_string[0][0],
      moment: activity,
      page: 'chat',
      badge: 0,
      modalPage: this.platform.width() < 768
    };

    if (this.platform.width() >= 768) {
      this.chatService.currentChatProps.push(chatObj);
      // when clicking on a conversation, if it is displaying the group info, it will force it to get back to the chat view
      this.router.navigate([{ outlets: { sub: ['chat', { subpanel: true }] }}]);
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

  selectActivity(event, user) {
    event.stopPropagation();
    if (user.select) {
      user.select = false;
      const index = this.selectedActivities.indexOf(user);
      this.selectedActivities.splice(index, 1);
    } else {
      user.select = true;
      this.selectedActivities.push(user);
      //this.searchbar.setFocus();
    }
  }

  unselectActivity(event, user) {
    event.stopPropagation();
    let index = this.selectedActivities.indexOf(user);
    if (index > -1) {
      this.selectedActivities[index].select = false;
    }
    index = this.selectedActivities.indexOf(user);
    if (index > -1) {
      this.selectedActivities.splice(index, 1);
    }
  }

  async multiSelectAction(event) {
    event.stopPropagation();
    if (!this.selectedActivities.length || !event.detail.value.length) return; // if no participant or remove type selected, exit
    const alert = await this.alertCtrl.create({
      header: 'Remove ' + (this.selectedActivities.length === 1 ? event.detail.value[0].singularLabel : event.detail.value[0].pluralLabel),
      subHeader: 'You are about to remove ' + (this.selectedActivities.length === 1 ? (this.selectedActivities[0].first_name + ' ' + this.selectedActivities[0].last_name + ' as a ' + event.detail.value[0].singularLabel) : (this.selectedActivities.length + ' ' + event.detail.value[0].pluralLabel)) + '. Are you sure you want to proceed?',
      cssClass: 'level-15',
      buttons: [{ text: 'Remove',
        handler: async () => {
          alert.dismiss();
          //this.removeFromUserLists(event.detail.value.map((c) => c.user_list), this.selectedActivities.map((c) => c._id));
        }}, { text: 'Cancel' }]
    });
    await alert.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions['refreshUserStatus'].unsubscribe();
  }
}
