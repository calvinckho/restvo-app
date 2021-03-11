import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy} from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ElectronService } from 'ngx-electron';
import {
    START_NOTIFICATION_SERVICE,
    NOTIFICATION_SERVICE_STARTED,
    NOTIFICATION_SERVICE_ERROR,
    NOTIFICATION_RECEIVED as ON_NOTIFICATION_RECEIVED,
    TOKEN_UPDATED,
} from 'electron-push-receiver/src/constants';
import { Capacitor, Plugins, PushNotificationToken } from '@capacitor/core';
const { App, Network, LocalNotifications } = Plugins;
import { CacheService } from 'ionic-cache';

import {Chat} from '../../services/chat.service';
import {UserData} from '../../services/user.service';
import {NetworkService} from '../../services/network-service.service';

import {GroupchatPage} from '../group/groupchat/groupchat.page';
import {
    ActionSheetController,
    AlertController,
    MenuController,
    ModalController,
    NavController,
    Platform,
    ToastController
} from '@ionic/angular';
import {Badge} from '@ionic-native/badge/ngx';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Board} from '../../services/board.service';
import {Moment} from '../../services/moment.service';
import {Systemlog} from '../../services/systemlog.service';
import {Auth} from '../../services/auth.service';
import {Resource} from '../../services/resource.service';
import 'capacitor-jitsi-meet';
import {PreferencesPage} from '../user/about/preferences/preferences.page';
import {OnboardfeaturePage} from '../feature/onboardfeature/onboardfeature.page';
import {ShowfeaturePage} from '../feature/showfeature/showfeature.page';
import {EditfeaturePage} from '../feature/editfeature/editfeature.page';
import {CalendarService} from '../../services/calendar.service';
import {EditparticipantsPage} from '../feature/editparticipants/editparticipants.page';
import {ManagefeaturePage} from '../feature/manage/managefeature.page';
import {ProgramsPage} from '../user/programs/programs.page';
import {FeatureCreatorPage} from '../feature/manage/feature-creator/feature-creator.page';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.page.html',
  styleUrls: ['./main-tab.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainTabPage implements OnInit, OnDestroy {
    @ViewChild('videoSpace', {static: false}) videoSpace: any;

    networkHandler: any;
    pushHandler: any;
    readyToDetectNetworkChange = false;
    hasSetupEventListeners = false;
    jitsi: any;
    pendingVideoChatRoomId = '';
    subscriptions: any = {};

    constructor(      public router: Router,
                      private swPush: SwPush,
                      private cache: CacheService,
                      private electronService: ElectronService,
                      private screenOrientation: ScreenOrientation,
                      private storage: Storage,
                      private badge: Badge,
                      private actionSheetCtrl: ActionSheetController,
                      private alertCtrl: AlertController,
                      private menuCtrl: MenuController,
                      private modalCtrl: ModalController,
                      private navCtrl: NavController,
                      public platform: Platform,
                      private toastCtrl: ToastController,
                      private authService: Auth,
                      private networkService: NetworkService,
                      private resourceService: Resource,
                      private calendarService: CalendarService,
                      public userData: UserData,
                      private systemLog: Systemlog,
                      private momentService: Moment,
                      private boardService: Board,
                      public chatService: Chat) { }

    async ngOnInit() {
        console.log('platform info:', this.platform.platforms());
        this.processAuth(); // first-time loading app and entering authentication section
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe((data) => {
            if (data && data.type === 'setup device') { // from recover page, or from re-logging in
                this.setupDevice();
            }
            // if authentication takes a long time, this listen to when user data is ready and can be used to update the Jitsi
            if (this.authService.token && this.userData.user && this.jitsi && this.userData.readyToControlVideoChat) {
                this.jitsi.executeCommand('displayName', this.userData.user.first_name + ' ' + this.userData.user.last_name);
                if (this.userData && this.userData.user && this.userData.user.avatar) {
                    this.jitsi.executeCommand('avatarUrl', this.userData.user.avatar);
                }
            }
        });
        if (this.platform.is('cordova')) {
            const status = await Network.getStatus();
            if (!status.connected) {
                this.networkService.showNoNetworkAlert();
            }
            this.addNetworkListener();
            setTimeout(() => {
                this.readyToDetectNetworkChange = true;
            }, 2000);
            /*App.addListener('appRestoredResult', (data: any) => {
                // when restoring Camera data

            });*/
        } else {
            console.log('Not on a mobile device. Cannot perform certain functions. ');
        }
    }

    async ionViewWillEnter() {
        try {
            await this.storage.ready();
            const user: any = await this.storage.get('user');
            if (user && user._id) {
                // turn on menu in most cases except when showing video on desktop or tablet
                if (this.router.url.includes('/app/video') && (this.platform.is('desktop') || this.platform.is('tablet'))) {
                    // menu remains disabled
                } else {
                    this.menuCtrl.enable(true);
                }
                this.userData.user = user;
                await this.userData.loadStoredCommunity();
                this.setupDevice();
            }
        } catch (err) { // if err, still show the menu bar to allow access to the menu bar
            this.menuCtrl.enable(true);
        }
    }

    async processAuth() { // Process Auth
        try {
            const res: any = await this.authService.checkAuthenticationWithToken(null);
            if (res.content === 'Success') {
                console.log('Token authorized');
                try {
                    this.userData.user = res.user;
                    this.userData.processLoadedUserData();
                    await this.userData.loadStoredCommunity();
                    // in the event of deep linking to tab pages, the tab page renders using user data from storage first and then listens to the following events to refresh its view with fresh user data from server
                    // publish event to refresh the dashboard page with new userData from server
                    // publish event to finish loading the Board page as it needs to wait for boardService.socket to start
                    this.userData.refreshAppPages();
                } catch (err) {
                    this.networkService.showNoNetworkAlert();
                }
            } else if (res.content === 'Offline mode') {
                console.log('offline mode');
            } else if (res.content === 'Unauthenticated') {
                console.log('Unauthenticated', res.message);
            } else {
                console.log('no token found. originating url:', this.router.url);
            }
        } catch (err) {
            console.log('Not already authorized');
        }
    }

    async setupDevice() {
        if (await this.networkService.hasNetwork()) {
            // defer iOS push notification permission request until later (after finished onboarding)
          if (this.platform.is('ios') && !this.userData.user.enablePushNotification) {
          } else { // automatically set up Push Notification for all device type except iOS mobile web
              this.initPushNotification();
              this.requestBadgePermission(); // badge API requires notification permission
          }
          if (this.platform.is('cordova')) {
              if (this.userData.user.importContactList) {
                  this.userData.uploadContactList(10);
              } else {
                  const delayImportContactListReminder = await this.storage.get('delayImportContactListReminder');
                  this.userData.delayImportContactListReminder = delayImportContactListReminder ?  delayImportContactListReminder - 1 : 0;
                  await this.storage.set('delayImportContactListReminder', this.userData.delayImportContactListReminder);
              }
          }
          // setup the various socket.io connectors
          this.chatService.createConversationSocket();
          this.userData.createUserSocket();
          this.momentService.createMomentSocket();
          this.boardService.createBoardSocket();
          // refresh the conversation and calendar cache
          this.chatService.refreshTabBadges();
          this.calendarService.getUserCalendar();
          this.userData.loginAt = new Date(); // log the sign-on time. will be used later for calculating total session time to be stored in system log
          if (!this.hasSetupEventListeners) { // only set up listeners once
              this.startEventSubscription();
          }
          if (this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
              await this.userData.checkAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
          }
      }
    }

    async requestBadgePermission() {
        try {
            if (this.platform.is('cordova')) {
                const hasPermission = await this.badge.hasPermission();
                console.log(hasPermission);
                if (!hasPermission) {
                    const permission = await this.badge.requestPermission();
                    console.log(permission);
                }
            }
        } catch (e) {
            console.log('Batch is not working. Possibly running on virtual environment.');
        }
    }

    async addNetworkListener() {
        this.networkHandler = Network.addListener('networkStatusChange', async (status) => {
            if (!this.networkService.networkSuccess && status.connected && this.readyToDetectNetworkChange) {
                this.networkService.networkSuccess = true;
                this.networkService.showHasNetworkAlert();
                await this.userData.load();
                await this.userData.loadStoredCommunity();
                if (this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
                    const result: any = await this.userData.checkAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
                    this.userData.hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
                    this.userData.activitiesWithAdminAccess = result ? result.activitiesWithAdminAccess : [];
                }
                // hasSetupEventListeners is true if setupDevice() was run successfully on startup.
                // therefore, on network status change detection, if setupDevice() was not carried up successfully on start up, run setupDevice() again
                if (!this.hasSetupEventListeners) {
                    this.setupDevice();
                    window.location.reload(); // force reload .js and .css in index.html
                }
                this.userData.refreshAppPages();
            }
            if (!status.connected) {
                this.networkService.networkSuccess = false;
                this.networkService.showNoNetworkAlert();
            }
            console.log('Network status changed', status);
        });
    }

    async initPushNotification() {
        if (this.platform.is('cordova')) { // native device push notification strategy
            try {
                if (!this.pushHandler) {
                    const {PushNotifications} = Plugins;
                    PushNotifications.register();
                    this.pushHandler = PushNotifications.addListener('registration', async (token: PushNotificationToken) => {
                        if (token && token.value) {
                            console.log('device token ->', token.value);
                            this.userData.addDeviceToken({token: token.value}).subscribe(() => {
                                this.userData.deviceToken = token.value;
                                if (token.value.length === 64) { // APN token is converted to lower case for Capacitor Push's (upper case) compatibility with cordova's Push (lower case) in database
                                    this.userData.deviceToken = token.value.toLowerCase();
                                }
                                this.userData.user.enablePushNotification = true;
                                this.userData.refreshUserStatus({});
                            }, (err) => {
                                console.log('cannot store device token in database.');
                            });
                        }
                    });
                    PushNotifications.addListener('registrationError', async (error: any) => {
                        this.pushHandler = null;
                        console.log('error on register ' + JSON.stringify(error));
                    });
                    PushNotifications.addListener('pushNotificationReceived', async (notification) => {
                        console.log('received notification ' + JSON.stringify(notification), JSON.stringify(notification.data));
                    });
                    PushNotifications.addListener('pushNotificationActionPerformed', async (result) => {
                        console.log('push action', result.notification.data);
                        if (result.notification.data.page === 'MessagePage') {
                            const data = result.notification.data;
                            if (data.moment) {
                                data.moment = JSON.parse(data.moment); // android push data payload is a string and needs to be parse into json
                            }
                            if (data.group) {
                                data.group = JSON.parse(data.group); // android push data payload is a string and needs to be parse into json
                            }
                            if (data.author) {
                                data.author = JSON.parse(data.author); // android push data payload is a string and needs to be parse into json
                            }
                            this.openGroupChat(data);
                        } else if (result.notification.data.page === 'Moment') {
                            const params: any = {};
                            if (result.notification.data.relationshipId) {
                                params.relationshipId = result.notification.data.relationshipId;
                            }
                            if (result.notification.data.calendarId) {
                                params.calendarId = result.notification.data.calendarId;
                            }
                            if (this.platform.width() < 768) {
                                params.moment = { _id: result.notification.data.momentId };
                                params.modalPage = true;
                                this.momentService.openMoment(params);
                            } else {
                                this.router.navigate(['/app/home/activity/' + result.notification.data.momentId, params]);
                            }
                        }
                    });
                }
            } catch (err) {
                let msg = 'To enable the Import Contacts feature: ';
                if (this.platform.is('android')) {
                    msg += '1. Open your phone Settings and tap Notifications. 2. Turn on Notifications for Restvo.';
                } else {
                    msg += '1. Open your phone Settings and tap Notifications. 2. Tap Restvo. 3. Turn on Allow Notifications.';
                }
                const permissionAlert = await this.alertCtrl.create({
                    header: 'You need to give permission to Restvo',
                    subHeader: msg,
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await permissionAlert.present();
            }
        } else { // On non-native platform
            try {
                if (this.electronService.isElectronApp) { // electron
                    console.log('trying to set up electron Web Push');
                    if (!this.pushHandler) {
                        this.electronService.ipcRenderer.on(TOKEN_UPDATED, (_, deviceToken) => {
                            console.log('electron device token ->', deviceToken);
                            this.userData.addDeviceToken({token: deviceToken}).subscribe(() => {
                                this.userData.deviceToken = deviceToken; // FCM token doesn't need to be modified
                                this.userData.user.enablePushNotification = true;
                                this.userData.refreshUserStatus({});
                            }, (err) => {
                                console.log('cannot store device token in database.');
                            });
                        });
                        this.electronService.ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, deviceToken) => {
                            console.log('electron loading previous token', deviceToken);
                            this.userData.addDeviceToken({token: deviceToken}).subscribe(() => {
                                this.userData.deviceToken = deviceToken; // FCM token doesn't need to be modified
                                this.userData.user.enablePushNotification = true;
                                this.userData.refreshUserStatus({});
                            }, (err) => {
                                console.log('cannot store device token in database.');
                            });
                        });
                        this.electronService.ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
                            console.log('electron push notification setup error', error);
                        });
                        this.pushHandler = this.electronService.ipcRenderer.on(ON_NOTIFICATION_RECEIVED, (_, notification) => {
                            console.log('electron receiving notification', notification);
                            this.electronService.ipcRenderer.send('SYSTEM_NOTIFICATION:::DISPLAY_INCOMING_NOTIFICATION', notification);
                        }); // display notification);
                    }
                    this.electronService.ipcRenderer.send(START_NOTIFICATION_SERVICE, 'AAAA0J-WxVY:APA91bHHjlrBbQi60NW1KJAmWHhN-1OabdfQ-mgJzbOVA8vK-WKTQHBDumHKGsu2_RVuR6kDBrv2VVBsIIAY-SmvBw3KWFVoJfJlJZ5ixxxbFw6UdmW3JiYHEQDsZISVfvAb6rvLwl0M');
                } else if (this.swPush.isEnabled) { // Chrome's Web Push
                    console.log('trying to set up Web Push');
                    const pushSubscription = await this.swPush.requestSubscription({
                        serverPublicKey: 'BE4sP7Uc5NLOHj4yyIUbPSWdDnRQfoMv9Vj6jL3s3BqnWYbVLNoYE_wkZXu9-ej1KuEqOPzmu2W8v4fOA58J_FA'
                    });
                    this.userData.addDeviceToken({token: pushSubscription}).subscribe(() => {
                        this.userData.pushSubscription = pushSubscription;
                        this.userData.user.enablePushNotification = true;
                        this.userData.refreshUserStatus({});
                        console.log('Web Push Subscription Obj', this.userData.pushSubscription);
                    }, (err) => {
                        console.log('cannot store push subscription object in database.');
                    });
                } else {
                    console.log('no valid push strategy available.');
                }
            } catch (err) {
                console.log('cannot subscribe to push notification on browser', err);
            }
        }
    }

    startEventSubscription() {
        if (Capacitor.isPluginAvailable('App')) {
            App.addListener('appStateChange', async (appState: any) => {
                if (appState.isActive) {
                    console.log('app state change');
                    this.userData.loginAt = new Date();
                    try {
                        if (this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
                            await this.userData.checkAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
                        }
                    } catch (err) {
                        console.log('failed to check admin access');
                    }
                    await this.chatService.refreshTabBadges();
                    this.userData.refreshAppPages();
                    this.userData.resetOSBadges();
                    const status = await Network.getStatus();
                    if (!status.connected) {
                        this.networkService.showNoNetworkAlert();
                    }
                    setTimeout(() => {
                        this.readyToDetectNetworkChange = true;
                    }, 2000);
                    if (this.platform.is('cordova')) { this.screenOrientation.unlock(); } // unlock screen orientation upon resume
                } else {
                    if (this.platform.is('cordova')) { this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); } // lock screen orientation so it won't rotate in pocket
                    if (this.userData.loginAt) {
                        const usageTimeInSec = Math.ceil((new Date().getTime() - this.userData.loginAt.getTime()) / 1000); // convert from ms to sec, and then round it up to sec.
                        await this.systemLog.logAppUsage(usageTimeInSec);
                    }
                    this.readyToDetectNetworkChange = false;
                }
            });
        }
        this.subscriptions['enablePushNotification'] = this.userData.enablePushNotification$.subscribe( (activate) => { // listen to event when a user gives permission
            if (activate) {
                this.initPushNotification(); // set up push notification
                this.requestBadgePermission(); // badge API requires notification permission
            }

        });
        try {
            if (!this.platform.is('android') && Capacitor.isPluginAvailable('LocalNotifications')) { // do not register local notifications for android
                Plugins.LocalNotifications.registerActionTypes({
                    types: [
                        {
                            id: 'SHOW_CHAT',
                            actions: [{
                                id: 'openchat',
                                title: 'Open Chat Room'
                            }]
                        },
                        {
                            id: 'SHOW_MOMENT',
                            actions: [{
                                id: 'openmoment',
                                title: 'Show Restvo Feature'
                            }]
                        }
                    ] });

                Plugins.LocalNotifications.addListener('localNotificationActionPerformed', async (result) => {
                    console.log('Notification action performed', result.notification);
                    if (result.notification.extra.type === 'message') {
                        this.openGroupChat(result.notification.extra.data);
                    } else if (result.notification.extra.type === 'moment') {
                        const params: any = {};
                        if (result.notification.extra.data.relationshipId) {
                            params.relationshipId = result.notification.extra.data.relationshipId;
                        }
                        if (result.notification.extra.data.calendarId) {
                            params.calendarId = result.notification.extra.data.calendarId;
                        }
                        if (this.platform.width() < 768) {
                            params.moment = { _id: result.notification.extra.data.momentId };
                            params.modalPage = true;
                            this.momentService.openMoment(params);
                        } else {
                            if (this.router.url.includes('video')) { // if already in a video tab, open the chat in a new tab
                                window.open(window.location.protocol + '//' + window.location.host + '/app/myconversations/chat', '_blank');
                            } else {
                                this.router.navigate(['/app/home/activity/' + result.notification.extra.data.momentId, params]);
                            }
                        }
                    }
                });
            }
        } catch (error) {}
        this.subscriptions['toastNotification'] = this.chatService.toastNotification$.subscribe(async (res) => {
            if (!res || this.platform.is('android')) { return; } // local notification is turned off on android
            if (this.platform.is('cordova') && this.userData.user.enablePushNotification) { // only iOS
                this.badge.increase(1);
            }
            const data = res.data;
            const type = res.type;
            if (type === 'message') { // local notification with the source of the type of a message. i.e. Text message, attachment, but not moment.
                if (this.platform.is('cordova') && Capacitor.isPluginAvailable('LocalNotifications')) { // on native devices or platform that supports local notifications
                    LocalNotifications.schedule({
                        notifications: [
                            {
                                title: data.author ? data.author.first_name + ' ' + data.author.last_name : data.author_pending_member.name,
                                body: (data.body || '') + ((data.moment && data.moment.resource) ? data.moment.resource['en-US'].value[0] : '') + (!(data.body || data.moment || data.response) ? 'sent you an attachment.' : ''),
                                id: 1001,
                                schedule: { at: new Date(Date.now() + 1000 ) },
                                sound: null,
                                attachments: null,
                                actionTypeId: 'SHOW_CHAT',
                                extra: {type: type, data: data}
                            }
                        ]
                    });
                } else { // on PWA
                    const toast = await this.toastCtrl.create({
                        message: (data.author ? data.author.first_name + ' ' + data.author.last_name : data.author_pending_member.name) +  ': ' + (data.body || '') + ((data.moment && data.moment.resource) ? data.moment.resource['en-US'].value[0] : '') + (!(data.body || data.moment || data.response) ? 'sent you an attachment.' : ''),
                        buttons: [
                            {
                                text: 'Open',
                                role: 'cancel'
                            }
                        ],
                        duration: 5000,
                        position: 'top',
                        color: 'darkgrey'
                    });
                    toast.present();
                    let closedByTimeout = false;
                    const timeoutHandle = setTimeout(() => { closedByTimeout = true; toast.dismiss(); }, 5000);
                    await toast.onDidDismiss();
                    if (closedByTimeout) {
                        return;
                    }
                    clearTimeout(timeoutHandle);
                    this.openGroupChat(data);
                }
            } else if (type === 'moment') { // local notification with the source of the type a moment (e.g. event reminder, etc)
                if (this.platform.is('cordova') && Capacitor.isPluginAvailable('LocalNotifications')) { // on native devices
                    LocalNotifications.schedule({
                        notifications: [
                            {
                                title: data.title,
                                body: data.body,
                                id: 1002,
                                schedule: { at: new Date(Date.now() + 1000 ) },
                                sound: null,
                                attachments: null,
                                actionTypeId: 'SHOW_MOMENT',
                                extra: {type: type, data: data}
                            }
                        ]
                    });
                } else { // on PWA
                    const toast = await this.toastCtrl.create({
                        message: data.title + ': ' + data.body,
                        buttons: [
                            {
                                text: 'Open',
                                role: 'cancel'
                            }
                        ],
                        duration: 5000,
                        position: 'top',
                        color: 'darkgrey'
                    });
                    let closedByTimeout = false;
                    const timeoutHandle = setTimeout(() => {
                        closedByTimeout = true;
                        toast.dismiss();
                    }, 5000);
                    await toast.onDidDismiss();
                    if (closedByTimeout) {
                        return;
                    }
                    clearTimeout(timeoutHandle);
                    this.router.navigate(['/app/activity/' + data.momentId]);
                }
            }
        });
        this.subscriptions['openChat'] = this.chatService.openChat$.subscribe(async (data) => {
            this.openGroupChat(data);
        });
        this.subscriptions['openMoment'] = this.momentService.openMoment$.subscribe(async (data) => {
            if (data && data.modalPage) {
                const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: data});
                await modal.present();
            } else if (data && data.momentId && data.subpanel) {
                this.router.navigate([{ outlets: { sub: ['details', data.momentId, data ]}}]);
            } else if (data && data.momentId) {
                this.router.navigate(['/app/activity/' + data.momentId, data ]);
            }
        });
        this.subscriptions['openUserPrograms'] = this.userData.openUserPrograms$.subscribe(async (data) => {
            if (!data) { return; }
            if (data.modalPage) {
                const manageModal = await this.modalCtrl.create({ component: ProgramsPage, componentProps: { modalPage: true } });
                await manageModal.present();
            } else {
                this.router.navigate(['/app/user/programs']);
            }
        });

        this.subscriptions['editMoment'] = this.momentService.editMoment$.subscribe( async (data) => {
            if (data && data.modalPage) {
                const modal = await this.modalCtrl.create({component: EditfeaturePage, componentProps: data});
                await modal.present();
            } else if (data && data.momentId) {
                this.router.navigate(['/app/edit/' + data.momentId]);
            }
        });
        this.subscriptions['manageMoment'] = this.momentService.manageMoment$.subscribe( async (data) => {
            if (data && data.modalPage) {
                const managePage = await this.modalCtrl.create({
                    component: ManagefeaturePage,
                    componentProps: data
                });
                await managePage.present();
            } else if (data && data.moment && data.moment._id) {
                this.router.navigate(['/app/manage/activity/' + data.moment._id + '/profile/' + data.moment._id]);
            }
        });
        this.subscriptions['openOnboarding'] = this.authService.openOnboarding$.subscribe( async (data) => {
            if (data) {
                const modal = await this.modalCtrl.create({component: OnboardfeaturePage, componentProps: data});
                await modal.present();
            }
        });
        this.subscriptions['openPreferences'] = this.momentService.openPreferences$.subscribe( async (data) => {
            if (data) {
                const messagePage = await this.modalCtrl.create({
                    component: PreferencesPage,
                    componentProps: data
                });
                await messagePage.present();
            }
        });
        this.subscriptions['editParticipants'] = this.momentService.editParticipants$.subscribe(async (data) => {
            if (data) {
                const modal = await this.modalCtrl.create({component: EditparticipantsPage, componentProps: data});
                await modal.present();
            }
        });
        this.subscriptions['openCreator'] = this.momentService.openCreator$.subscribe( async (data) => {
            if (data) {
                const modal = await this.modalCtrl.create({component: FeatureCreatorPage, componentProps: data});
                await modal.present();
            }
        });
        // chat socket message observable
        this.subscriptions['chatSocketMessage'] = this.authService.chatSocketMessage$.subscribe(res => {// 'chat socket emit', async (conversationId, data) => {
            if (res) {
                if (res.topic === 'chat socket emit') {
                    this.chatService.socket.emit('update status', res.conversationId, res.data);
                } else if (res.topic === 'disconnect chat socket') {
                    // reset variables and close socket
                    this.chatService.onlineUsersSockets = [];
                    this.chatService.onlineUsers = [];
                    this.chatService.currentChatProps = []; // empty chat Props
                    if (this.chatService.socket) {
                        this.chatService.socket.close();
                    }
                }
            }
        });
        if (this.electronService.isElectronApp) {
            this.electronService.ipcRenderer.on('CHAT:::OPEN', async (_, data) => {
                this.openGroupChat(data);
            });
            this.electronService.ipcRenderer.on('CHAT:::SEND_REPLY', async (_, data) => {
                const socketData = {
                    conversationId: data.conversationId,
                    body: data.composedMessage,
                    quote: {
                        body: '',
                        attachments: [],
                        author: ''
                    },
                    createdAt: new Date(),
                    author: {
                        _id: this.userData.user._id,
                        first_name: this.userData.user.first_name,
                        last_name: this.userData.user.last_name,
                        avatar: this.userData.user.avatar
                    },
                    status: 'pending',
                    confirmId: Math.random()
                };
                // send to server and via socket.io
                const serverData = {
                    replyQuote: null,
                    composedMessage: data.composedMessage,
                    groupId: (data.group) ? data.group._id : null,
                    groupName: (data.group) ? data.group.name : null
                };
                await this.chatService.sendReply(data.conversationId, serverData, socketData);
            });
        }
        this.subscriptions['toggleVideoChat'] = this.chatService.toggleVideoChat$.subscribe( (params) => {
            if (params) {
                this.toggleVideoChat(params);
                this.pendingVideoChatRoomId = params.videoChatRoomId;
            }
        });
        this.hasSetupEventListeners = true;
    }

    async openGroupChat(data) {
        if (data) {
            console.log('incoming data', typeof data);
            if (data.group) { // for a group chat
                this.chatService.currentChatProps.push({
                    conversationId: data.conversationId,
                    name: data.group.name,
                    page: 'chat',
                    group: data.group,
                    badge: true,
                    modalPage: true,
                });
            } else if (data.moment) { // if no author is provided but only the moment object, it is to view the moment's conversation
                this.chatService.currentChatProps.push({
                    conversationId: data.conversationId,
                    name: data.moment.name || (data.moment.matrix_string ? data.moment.matrix_string[0][0] : ''),
                    page: 'chat',
                    moment: data.moment,
                    badge: true,
                    modalPage: true,
                });
            } else if (data.author) { // for a 1-1 message, which can be a text message or sending a moment as the content
                this.chatService.currentChatProps.push({
                    conversationId: data.conversationId,
                    name: data.author.first_name + ' ' + data.author.last_name,
                    page: 'chat',
                    recipient: data.author,
                    badge: true,
                    modalPage: true,
                });
            }
            if (data.subpanel) {
                this.router.navigate([{ outlets: { sub: ['chat', { subpanel: true }] }}]);
                // if it is displaying the chat view, it will reload the chat data
                this.userData.refreshMyConversations({action: 'reload chat view'});
            } else {
                const messagePage = await this.modalCtrl.create({
                    component: GroupchatPage,
                    componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                });
                await messagePage.present();
            }
        }
    }

    async toggleVideoChat(params) {
        try {
            this.userData.readyToControlVideoChat = false;
            setTimeout(() => {
                this.userData.readyToControlVideoChat = true;
            }, 10000); // default video chat load timeout = 10s
            const videoEndpoint: any = await this.resourceService.assignVideoEndpoint(params.videoChatRoomId);
            if (this.platform.is('cordova')) { // native device, open jitsi capacitor plugin
                const { Jitsi } = Plugins;
                await Jitsi.joinConference({
                    roomName: params.videoChatRoomId,
                    url: videoEndpoint.ssl + videoEndpoint.url,
                    channelLastN: params.channelLastN,
                    displayName: this.userData && this.userData.user ? this.userData.user.first_name + ' ' + this.userData.user.last_name : null,
                    avatarURL: this.userData && this.userData.user ? this.userData.user.avatar : null,
                    startWithAudioMuted: params.startWithAudioMuted,
                    startWithVideoMuted: params.startWithVideoMuted,
                    chatEnabled: false,
                    inviteEnabled: false,
                });
                window.addEventListener('onConferenceJoined', this.onJitsiLoaded);
                window.addEventListener('onConferenceLeft', this.onJitsiUnloaded);
            } else if (this.electronService.isElectronApp) { // eletron app, open in browser window. In electron, it doesn't recognize window.location so need to hardcode the domain
                window.open('https://app.restvo.com/app/video/' + this.pendingVideoChatRoomId + ';channelLastN=' + params.channelLastN + ';startWithAudioMuted=' + params.startWithAudioMuted + ';startWithVideoMuted=' + params.startWithVideoMuted + ';videoChatRoomSubject=' + encodeURIComponent(params.videoChatRoomSubject).replace(/\(/g, '').replace(/\)/g, ''), '_blank');
            } else if (!this.platform.is('ios')) { // Desktop, Android, etc that is not iOS
                window.open(window.location.protocol + '//' + window.location.host + '/app/video/' + this.pendingVideoChatRoomId + ';channelLastN=' + params.channelLastN + ';startWithAudioMuted=' + params.startWithAudioMuted + ';startWithVideoMuted=' + params.startWithVideoMuted + ';videoChatRoomSubject=' + encodeURIComponent(params.videoChatRoomSubject).replace(/\(/g, '').replace(/\)/g, ''), '_blank');
            } else { // on iOS
                await this.menuCtrl.enable(false);
                this.router.navigate(['/app/video/' + this.pendingVideoChatRoomId]);
                if (this.userData.videoChatRoomId) { // if video chat wasn't exited correctly, reload the window
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }
        } catch (err) {
            this.userData.readyToControlVideoChat = true;
            const networkAlert = await await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    onJitsiLoaded = async (params) => {
        console.log('loaded Jitsi');
        this.userData.readyToControlVideoChat = true;
        this.userData.videoChatRoomId = this.pendingVideoChatRoomId;
        if (this.userData.user && await this.userData.checkRestExpired()) { this.chatService.socket.emit('online status', this.userData.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'online', origin: this.chatService.socket.id, videoChatRoomId: this.userData.videoChatRoomId }); }
        if (!this.platform.is('cordova')) {
            if (this.userData.user) {
                this.jitsi.executeCommand('displayName', this.userData.user.first_name + ' ' + this.userData.user.last_name);
            }
            if (this.userData.user.avatar) {
                this.jitsi.executeCommand('avatarUrl', this.userData.user.avatar);
            }
            this.jitsi.executeCommand('subject', params.videoChatRoomSubject || ' ');
            this.jitsi.on('readyToClose', this.onJitsiUnloaded);
        }
    }

    onJitsiUnloaded = async () => {
        console.log('unloading Jitsi');
        this.userData.readyToControlVideoChat = true;
        if (this.userData.user && await this.userData.checkRestExpired()) {
            this.chatService.socket.emit('online status', this.userData.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.userData.videoChatRoomId });
        }
        this.userData.videoChatRoomId = '';
        if (!this.platform.is('cordova')) {
            await this.jitsi.dispose();
            // @ts-ignore
            $(`#videoSpace`).empty();
        }
    }

    ngOnDestroy () {
        if (this.subscriptions && this.hasSetupEventListeners) {
            this.subscriptions['enablePushNotification'].unsubscribe('enablePushNotification', () => { // listen to event when a user gives permission
                this.initPushNotification(); // set up push notification
                this.requestBadgePermission(); // badge API requires notification permission
            });
            this.subscriptions['openChat'].unsubscribe('openChat', async (data) => {
                this.openGroupChat(data);
            });
            this.subscriptions['openMoment'].unsubscribe('openMoment', async (data) => {
                if (data.modalPage) {
                    const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: data});
                    await modal.present();
                } else {
                    this.router.navigate(['/app/activity/' + data.momentId]);
                }
            });
            this.subscriptions['openUserPrograms'].unsubscribe('openUserPrograms', async (data) => {
                if (data.modalPage) {
                    const manageModal = await this.modalCtrl.create({ component: ProgramsPage, componentProps: { modalPage: true } });
                    await manageModal.present();
                } else {
                    this.router.navigate(['/app/user/programs']);
                }
            });

            this.subscriptions['editMoment'].unsubscribe('editMoment', async (data) => {
                if (data.modalPage) {
                    const modal = await this.modalCtrl.create({component: EditfeaturePage, componentProps: data});
                    await modal.present();
                } else {
                    this.router.navigate(['/app/edit/' + data.momentId]);
                }
            });
            this.subscriptions['manageMoment'].unsubscribe('manageMoment', async (data) => {
                if (data.modalPage) {
                    const managePage = await this.modalCtrl.create({
                        component: ManagefeaturePage,
                        componentProps: data
                    });
                    await managePage.present();
                } else {
                    this.router.navigate(['/app/manage/activity/' + data.moment._id + '/profile/' + data.moment._id]);
                }
            });

            this.subscriptions['openOnboarding'].unsubscribe('openOnboarding', async (data) => {
                const modal = await this.modalCtrl.create({component: OnboardfeaturePage, componentProps: data});
                await modal.present();
            });
            this.subscriptions['openPreferences'].unsubscribe('openPreferences', async (data) => {
                const messagePage = await this.modalCtrl.create({
                    component: PreferencesPage,
                    componentProps: data
                });
                await messagePage.present();
            });
            this.subscriptions['editParticipants'].unsubscribe('editParticipants', async (data) => {
                const modal = await this.modalCtrl.create({component: EditparticipantsPage, componentProps: data});
                await modal.present();
            });
            this.subscriptions['toggleVideoChat'].unsubscribe('toggleVideoChat', (params) => {
                this.toggleVideoChat(params);
                this.pendingVideoChatRoomId = params.videoChatRoomId;
            });
            this.subscriptions['chatSocketMessage'].unsubscribe(res => { // 'chat socket emit', async (conversationId, data) => {
                if (res) {
                    if (res.topic === 'chat socket emit') {
                        this.chatService.socket.emit('update status', res.conversationId, res.data);
                    } else if (res.topic === 'disconnect chat socket') {
                        // reset variables and close socket
                        this.chatService.onlineUsersSockets = [];
                        this.chatService.onlineUsers = [];
                        this.chatService.currentChatProps = []; // empty chat Props
                        if (this.chatService.socket) {
                            this.chatService.socket.close();
                        }
                    }
                }
            });
        }
    }
}
