import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController, Platform} from "@ionic/angular";
import {PickfeaturePopoverPage} from "../../pickfeature-popover/pickfeature-popover.page";
import {ActivatedRoute, Router} from "@angular/router";
import {Auth} from "../../../../services/auth.service";
import {Chat} from "../../../../services/chat.service";
import {UserData} from "../../../../services/user.service";
import {Moment} from "../../../../services/moment.service";
import {Resource} from "../../../../services/resource.service";
import {ManagefeaturePage} from "../managefeature.page";
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
  samples: any;
  searchKeyword = '';
  refreshNeeded = false;

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public platform: Platform,
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
      this.samples = await this.momentService.loadProgramChildActivities(this.momentId, this.categoryId);
  }

  async openChildActivity(event, moment, viewType) {
    event.stopPropagation();
    if (this.modalPage || this.platform.width() < 768) {
      // view
      if (viewType === 'view') { //for journey and relationship, (moment.categories.map((c) => c._id).includes('5e9f46e1c8bf1a622fec69d5') || moment.categories.map((c) => c._id).includes('5dfdbb547b00ea76b75e5a70'))) {
        this.momentService.openMoment( { moment: moment, modalPage: true });
      } else { // manage
        this.momentService.manageMoment({ moment: moment, modalPage: true });
      }
    } else {
      if (viewType === 'view') { // view
        this.router.navigate(['', { outlets: { sub: ['sub_activity', moment._id ] }}], { relativeTo: this.route });
      } else {
        this.userData.currentManageActivityId = moment._id;
        this.router.navigate(['/app/manage/activity/' + moment._id + '/profile/' + moment._id], {replaceUrl: false});
      }
    }
  }

  async chooseChildActivity() {
      let componentProps: any;
      componentProps = {title: 'Choose from Library', categoryId: this.categoryId, allowCreate: true, allowSwitchCategory: false, modalPage: true };
      if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
          componentProps.programId = this.momentId;
      } else if (this.categoryId === '5c915476e172e4e64590e349') { // pick plan
          componentProps.parent_programId = this.momentId;
          componentProps.maxMomentCount = 1;
          if (this.moment.categories.includes('5dfdbb547b00ea76b75e5a70')) { // in relationships, disable create. Only choosing is allowed. It's because creation needs to take place on the program level in order that a Plan's parent_programs is registered correctly
            componentProps.allowCreate = false;
          }
      } else { // pick other activities
          componentProps.parent_programId = this.momentId;
      }
    const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: componentProps});
    await modal.present();
    const {data: moments} = await modal.onDidDismiss();
    if (moments && moments.length) {
      // if choosing Plans as child activities
      if (this.categoryId === '5c915476e172e4e64590e349') {
        // only if To-Do is enabled (e.g. relationships)
        if (this.moment.resource.matrix_number[0].includes(10210)) {
          await this.momentService.adoptPlan({
            operation: 'adopt plan',
            planIds: moments.map((moment) => moment._id),
            parent_programId: this.momentId,
          });
        }
      } else {
        for (const moment of moments) {
          // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
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
          moment.parent_programs = [this.momentId];
        }
        const clonedMoments: any = await this.momentService.clone(moments, 'admin'); // clone and do not add admin as participants
        for (const clonedMoment of clonedMoments) {
          const index = moments.map((moment) => moment.resource._id).indexOf(clonedMoment.resource);
          if (index > -1) {
            clonedMoment.resource = moments[index].resource; // clone the populated resource
          }
        }
        this.samples.unshift(...clonedMoments);
      }
    }
  }

  async openActivity(event, activity) {
    event.stopPropagation();
    if (this.platform.width() < 768) {
      this.momentService.editMoment({ moment: activity, modalPage: true });
    } else {
      this.router.navigate(['/app/edit/' + activity._id]);
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
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions['refreshUserStatus'].unsubscribe();
  }
}
