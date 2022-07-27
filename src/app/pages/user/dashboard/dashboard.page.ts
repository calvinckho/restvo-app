import {Component, Input, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Storage } from '@ionic/storage';
import {
    IonContent, LoadingController, AlertController, ModalController, NavController, PopoverController, Platform
} from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import { Moment } from '../../../services/moment.service';
import { CalendarService } from '../../../services/calendar.service';
import { Chat } from '../../../services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NetworkService} from '../../../services/network-service.service';
import {AboutPage} from '../about/about.page';
import {ShowfeaturePage} from '../../feature/showfeature/showfeature.page';
import {Auth} from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None,
    providers: [ CalendarService ]
})
export class DashboardPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: false}) content: IonContent;

    @Input() view: any;
    @Input() modalPage: any;
    pendingNotifications: any = [];
    numberOfNotifications = 0;
    noSystemMessage = true;
    deviceToken: any;
    loading: any = true;
    activities: any;
    journeys: any;
    myMentors: any;
    myMentees: any;
    programs: any;
    groups: any;
    role: any;
    bio: any;

    searchKeyword = '';
    slide = 0;
    ionSpinner = true;
    moreOptions = false;
    selectedProgram: any;
    resource: any;

    subscriptions: any = {};

  constructor(public router: Router,
              private route: ActivatedRoute,
              public platform: Platform,
              private cache: CacheService,
              private storage: Storage,
              private alertCtrl: AlertController,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              public userData: UserData,
              public authService: Auth,
              public calendarService: CalendarService,
              public networkService: NetworkService,
              public chatService: Chat,
              public momentService: Moment) {

      this.calendarService.updateViewCalendar();
  }

    async ngOnInit() {
        // link the refreshUserStatus Observable with the refresh handler. It fires on subsequent user refreshes
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshDashboardPageHandler);
        this.subscriptions['refreshUserCalendar'] = this.userData.refreshUserCalendar$.subscribe(async (res) => {
            this.calendarService.getUserCalendar();
        });
        this.view = this.view || this.route.snapshot.paramMap.get('view') || 'profile';
    }

    refreshDashboardPageHandler = () => {
      if (this.userData && this.userData.user) {
          this.setup();
      }
    }

    ionViewWillEnter() {
        // after loading userData from storage, userData should be ready
        if (this.userData && this.userData.user) {
            this.ionSpinner = false;
            this.setup();
            this.storage.set('lastVisitedTab', 'me');
        }
        const currentDateWithoutTime = new Date( this.calendarService.calendar.currentDate.getFullYear(), this.calendarService.calendar.currentDate.getMonth(), this.calendarService.calendar.currentDate.getDate() );
        this.changeSelectedDate( currentDateWithoutTime );
    }

    setup() {
        if (this.view === 'profile') {
            this.loadAnswers();
            this.loadPrograms();
        } else if (this.view === 'calendar') {
            this.loadDashboard();
        }
        const userRequest = this.userData.loadMySystemMessages();
        const userResponse = this.cache.loadFromDelayedObservable('loadMySystemMessages', userRequest, 'system', 1, 'all');
        userResponse.subscribe(pendingNotifications => {
            this.ionSpinner = false;
            this.numberOfNotifications = pendingNotifications.length;
            this.pendingNotifications = pendingNotifications;
            this.noSystemMessage = !this.numberOfNotifications;
        });
    }

    async loadAnswers() {
        const result: any = await this.userData.loadMyOnboardingAnswers();
        this.ionSpinner = false;
        if (result.programs) {
            for (const program of result.programs) {
                for (const leader of program.leader) {
                    if (leader.role) {
                        this.userData.user.title = leader.role;
                    }
                    if (leader._id === 1570150762856667 && leader.user_answer.length) {
                        this.userData.user.bio = leader.user_answer[0];
                    }
                }
            }
        }
    }

    async openAboutMe() {
        if (this.platform.width() >= 768) {
            this.router.navigate(['/app/user/about']);
        } else {
            const modal = await this.modalCtrl.create({ component: AboutPage, componentProps: { modalPage: true } });
            await modal.present();
            const {data: refreshNeeded} = await modal.onDidDismiss();
            if (refreshNeeded) {
                this.loadAnswers();
            }
        }
    }

    loadDashboard() {
        this.pendingNotifications = [];
    }

    async handleSystemMessages(action) {
        try {
            // check push notification settings
            this.userData.checkPushNotification();
            if (action === 'accept') {
                for (const pendingNotification of this.pendingNotifications) {
                    await this.processPendingMessage(pendingNotification);
                }
            }
            await this.userData.removePendingMessages({messages: this.pendingNotifications});
            this.pendingNotifications = [];
            this.numberOfNotifications = 0;
            this.noSystemMessage = true;
            await this.userData.load();
        } catch (err) {
            console.log(err);
        }
    }

    async processPendingMessage(pendingNotification) {
        if (pendingNotification.community) {
            await this.userData.joinCommunityHttp(pendingNotification.community);
        } else if (pendingNotification.group) {
            await this.userData.acceptJoinGroupRequest(pendingNotification.group);
        } else if (pendingNotification.person) {
            const data: any = await this.chatService.getConversationByRecipientId(pendingNotification.person._id, false, null);
            if (!data.length) {// if the recipient has not been connected
                // console.log("new conversation...");
                const welcomeMessage = this.userData.user.first_name + ' ' + this.userData.user.last_name + ' is now connected with you.';
                await this.chatService.newConversation(pendingNotification.person._id, {composedMessage: welcomeMessage, type: 'connect'});
            }
        }
        return;
    }

    async viewMessage(event, pendingNotification) {
        event.stopPropagation();
        if (pendingNotification.community) {
            const alert = await this.alertCtrl.create({
                header: 'Invitation to join ' + pendingNotification.community.name,
                message: pendingNotification.message,
                buttons: [{ text: 'Accept',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            const result = await this.userData.joinCommunity(pendingNotification.community);
                            if (result === 'cancel') {return; }
                            this.cache.clearGroup('system');
                            this.loadDashboard();
                        });
                    }}, { text: 'Ignore',
                    handler: () => {
                        // console.log("Removing pending message...");
                        this.removePendingMessage(pendingNotification);
                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            return await alert.present();
        } else if (pendingNotification.group) {
            const alert = await this.alertCtrl.create({
                header: 'Invitation to join ' + pendingNotification.group.name,
                message: pendingNotification.message,
                buttons: [{ text: 'Accept',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(async () => {
                            await this.userData.checkPushNotification();
                            const result = await this.userData.acceptJoinGroupRequest(pendingNotification.group);
                            if (result === 'cancel') {return; }
                            this.cache.clearGroup('system');
                            this.loadDashboard();
                            if (result['churchId']) {
                                // console.log("church id: ", result['churchId']);
                                const churchIdList = this.userData.user.churches.map((c) => {
                                    return c._id;
                                });
                                let index = churchIdList.indexOf(result['churchId']);
                                if (index < 0) {
                                    index = this.userData.user.churches.length;
                                }
                                this.userData.currentCommunityIndex = index;
                                this.storage.set('currentCommunityIndex', this.userData.currentCommunityIndex.toString()); // store this for the next time the app starts up
                            }
                        });
                    }}, { text: 'Ignore',
                    handler: () => {
                        // console.log("Removing pending message...");
                        this.removePendingMessage(pendingNotification);

                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            return await alert.present();
        } else if (pendingNotification.person) {
            const alert = await this.alertCtrl.create({
                header: 'Connect with ' + pendingNotification.person.first_name + ' ' + pendingNotification.person.last_name,
                message: pendingNotification.message,
                buttons: [{ text: 'Connect',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(async () => {
                            const data: any = await this.chatService.getConversationByRecipientId(pendingNotification.person._id, false, null);
                            if (data.length) {// if the recipient has been connected
                                const alert2 = await this.alertCtrl.create({
                                    header: 'You are already connected with this user',
                                    message: 'You can direct message with this user in the Conversations page.',
                                    cssClass: 'level-15',
                                    buttons: [{ text: 'Dismiss',
                                        handler: () => {
                                            // console.log("Removing pending message...");
                                            this.removePendingMessage(pendingNotification);
                                        }
                                    }]});
                                await alert2.present();
                            } else {
                                // console.log("new conversation...");
                                await this.userData.checkPushNotification();
                                const welcomeMessage = this.userData.user.first_name + ' ' + this.userData.user.last_name + ' is now connected with you.';
                                await this.chatService.newConversation(pendingNotification.person._id, {composedMessage: welcomeMessage, type: 'connect'});
                                this.removePendingMessage(pendingNotification);
                            }
                        });
                    }}, { text: 'Ignore',
                    handler: () => {
                        console.log('Removing pending message...');
                        this.removePendingMessage(pendingNotification);
                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            return await alert.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: 'System Message',
                message: pendingNotification.message,
                buttons: [{ text: 'OK, delete message.',
                    handler: () => {
                        this.removePendingMessage(pendingNotification);
                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            return await alert.present();
        }
    }

    async removePendingMessage(pendingNotification) {
        try {
            await this.userData.removePendingMessages({messages: [pendingNotification]});
            // Remove locally
            const index = this.pendingNotifications.indexOf(pendingNotification);
            if (index > -1) {
                this.pendingNotifications.splice(index, 1);
            }
            if (!this.pendingNotifications.length) {
                this.noSystemMessage = true;
            }
            this.cache.clearGroup('system');
            this.numberOfNotifications--;
        } catch (err) {
            console.log(err);
        }
    }

    async updateUserProfile() {
        try {
            await this.userData.update(this.userData.user);
            const alert = await this.alertCtrl.create({
                header: 'Success',
                message: 'User profile updated.',
                buttons: [{text: 'Ok'}],
                cssClass: 'level-15'
            });
            return await alert.present();
        } catch (err) {
            console.log(err);
            const alert = await this.alertCtrl.create({
                header: 'Something Went Wrong',
                message: 'We are unable to save your profile. Please try again.',
                buttons: [{text: 'Ok'}],
                cssClass: 'level-15'
            });
            return await alert.present();
        }
    }

/*
    async slideChange(event){
        event.stopPropagation();
        this.slide = await this.slides.getActiveIndex();
    }*/

    changeSelectedDate( inputDate ) {
        if (inputDate === ' ') { return; }
        this.calendarService.calendar.selectedDate = new Date(inputDate.getTime());
        this.calendarService.calendar.daysInViewWeek = this.calendarService.getDaysInWeek( inputDate.getDate() , inputDate.getMonth() , inputDate.getFullYear() );
    }

    async clickCalendarItem(calendarItem) {
        // restore moment as parent and calendar as child object
        const calendar = JSON.parse(JSON.stringify(calendarItem));
        const moment = JSON.parse(JSON.stringify(calendarItem.moment));
        const componentProps: any = { moment: moment, modalPage: true };
        const params: any = {};
        calendar.moment = moment._id;
        moment.calendar = calendar;
        if (calendar.relationship) {
            componentProps.calendarId = calendar._id;
            params.calendarId = calendar._id;
            componentProps.relationshipId = calendar.relationship;
            params.relationshipId = calendar.relationship;
        }
        if (this.modalPage) {
            const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps });
            await modal.present();
            const {data: refreshNeeded} = await modal.onDidDismiss();
            if (refreshNeeded) {
                return this.loadDashboard();
            }
        } else {
            this.router.navigate(['/app/activity/' + moment._id, params]);
        }
    }

    async loadPrograms() {
        this.activities = await this.userData.loadPrograms(true);
        this.journeys = [];
        this.loading = false;
        this.myMentors = [];
        this.myMentees = [];
        this.groups = [];
        this.programs = [];
        this.activities.forEach((activity) => {
            activity.mentors = [];
            activity.mentees = [];
            activity.uniqueUsers = [];
            // sort activities into categories
            if (activity.categories.includes('5e9fe35cc8bf1a622fec69d7')) { // group is matched first, because groups can have both group and journey affinity
                this.groups.push(activity);
            } else if (activity.categories.includes('5e9f46e1c8bf1a622fec69d5')) { // then journeys
                this.journeys.push(activity);
            } else if (activity.categories.includes('5c915324e172e4e64590e346') || activity.categories.includes('5c915475e172e4e64590e348')) { // programs or communities
                this.programs.push(activity);
            } else { // mentoring
                activity.program = 'Restvo';
                const combinedUsers = activity.user_list_1.concat(activity.user_list_3);
                combinedUsers.forEach((user) => {
                    if (!activity.uniqueUsers.map((c) => c._id).includes(user._id)) {
                        // each unique user is assigned either as a mentor or a mentee
                        if (activity.user_list_1.map((c) => c._id).includes(user._id)) {
                            activity.mentees.push(user);
                        }
                        if (activity.user_list_3.map((c) => c._id).includes(user._id)) {
                            activity.mentors.push(user);
                        }
                        activity.uniqueUsers.push(user);
                    }
                });
                activity.numberOfMentorsDisplayed = (activity.mentors.map((c) => c._id).filter((c) => c._id !== this.userData.user._id).length > 3) ? 3 : activity.mentors.map((c) => c._id).filter((c) => c._id !== this.userData.user._id).length;
                activity.numberOfMenteesDisplayed = (activity.mentees.map((c) => c._id).filter((c) => c._id !== this.userData.user._id).length > 3) ? 3 : activity.mentees.map((c) => c._id).filter((c) => c._id !== this.userData.user._id).length;

                // insert the parent program name
                if (activity.parent_programs && activity.parent_programs.length && activity.parent_programs[0].matrix_string) {
                    activity.program = activity.parent_programs[0].matrix_string[0][0];
                }
                if (activity.uniqueUsers && activity.uniqueUsers.length > 4) { // if the relationship has more than 3 users, list it under Community
                    this.groups.push(activity);
                } else { // else, list it under either MyMentors or MyMentees
                    if (activity.mentors.map((c) => c._id).includes(this.userData.user._id)) { // if user is in the mentors list or is an admin
                        this.myMentees.push(activity);
                    } else if (activity.mentees.map((c) => c._id).includes(this.userData.user._id)) { // else, the user is a mentee
                        this.myMentors.push(activity);
                    } else { // if only an admin
                        this.myMentees.push(activity);
                    }
                }
            }
        });
    }

    async openProgram(event, program) {
        event.stopPropagation();
        if (this.platform.width() >= 768) {
            if (program.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role)) { // admin access
                this.router.navigate(['/app/manage/activity/' + program._id + '/profile/' + program._id]);
            } else {
                this.router.navigate(['/app/activity/' + program._id]);
            }
        } else { // on mobile devices
            // if admin and opening community or program
            if (program.user_list_2.includes(this.userData.user._id) && (program.categories.includes('5c915324e172e4e64590e346') || program.categories.includes('5c915475e172e4e64590e348'))) {
                this.router.navigate(['/app/manage/activity/' + program._id + '/profile/' + program._id]);
            } else {
                const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: { moment: { _id: program._id }, modalPage: true}} );
                await modal.present();
            }
        }
    }

    async finishOnboarding(event) {
        event.stopPropagation();
        this.authService.openOnboarding({ modalPage: true });
    }

    executeSearch(event) {
        event.stopPropagation();
    }

    cancelSearch(event) {
        event.stopPropagation();
    }

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    closeModal() {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        }
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshDashboardPageHandler);
        if (this.subscriptions && this.subscriptions.refreshUserCalendar) { this.subscriptions['refreshUserCalendar'].unsubscribe((res) => {
            this.calendarService.getUserCalendar();
        }); }
    }
}
