import {Injectable, NgZone, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';
import {AlertController, LoadingController, MenuController, Platform} from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Storage } from '@ionic/storage';
import {StripeService} from "ngx-stripe";

import { Badge } from '@ionic-native/badge/ngx';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { Auth } from './auth.service';
import { CalendarService } from './calendar.service';
import { NetworkService } from './network-service.service';
import * as io from 'socket.io-client';

import {User} from '../interfaces/user';
import {Capacitor, Plugins} from "@capacitor/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserData {

    @ViewChild('Contact', {static: false}) contact: Contact;
    user: any;
    communitiesboards: any; // [CommunitiesBoards];
    socket: io;
    currentCommunityIndex: number; // Update page community carousel slide actual index, it can go beyond the total number of slides (x+1 = 0)
    currentManageActivityId: string;
    loginAt: any;
    hasPlatformAdminAccess = false;
    activitiesWithAdminAccess: any = [];
    developerModeClick = 0;
    deviceToken: string;
    pushSubscription: any;
    delayPushNotificationReminder = 0;
    delayImportContactListReminder = 0;
    showDownloadLink = false;
    splitPaneState: any = 'md';
    defaultProgram: any;
    UIAdminMode = false; // Landing page displaying Admin Insight view instead of Profile view
    UIrestStatus = 'active'; // user's current UI rest status: active or away
    videoChatRoomId = ''; // the current video chat ID if one is in session
    readyToControlVideoChat = true; // the readiness of controlling video chat. only used by app runs on cordova and utilizing Jitsi capacitor plugin
    subpanelWidth = 30;
    versions = { // current app's version that will be used to compare with labels loaded from the database
        'Activity Components': 20, // this is the current activity components version used by this code, make this higher than the mongodb stored value to force reload the app's cache
        'List of Components': [ 10000, 10010, 10050, 10100, 10200, 10210, 10300, 10310, 10320, 10330, 10360, 10370, 10400, 10500, 10600, 20000, 20010, 30000, 40000, 50000, 40010, 40020, 11000, 10210, 20020, 12000 ] // this is the list of components used by this code
    };
    private _refreshUserStatus: BehaviorSubject<any> = new BehaviorSubject(null);
    private _openUserPrograms: BehaviorSubject<any> = new BehaviorSubject(null);
    private _enablePushNotification: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _refreshMyConversations: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _refreshBoards: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public readonly refreshUserStatus$: Observable<any> = this._refreshUserStatus.asObservable();
    public readonly openUserPrograms$: Observable<any> = this._openUserPrograms.asObservable();
    public readonly enablePushNotification$: Observable<boolean> = this._enablePushNotification.asObservable();
    public readonly refreshMyConversations$: Observable<boolean> = this._refreshMyConversations.asObservable();
    public readonly refreshBoards$: Observable<boolean> = this._refreshBoards.asObservable();

    constructor(private http: HttpClient,
                private zone: NgZone,
                private router: Router,
                private stripeService: StripeService,
                private electronService: ElectronService,
                private badge: Badge,
                private cache: CacheService,
                private storage: Storage,
                private platform: Platform,
                private contacts: Contacts,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private menuCtrl: MenuController,
                private authService: Auth,
                private networkService: NetworkService,
                private calendarService: CalendarService) {
    }

    refreshUserStatus(data) {
        if (data) {
            this._refreshUserStatus.next(data);
        }
    }

    openUserPrograms(data) {
        this._openUserPrograms.next(data);
    }

    enablePushNotification(activate) {
        this._enablePushNotification.next(activate);
    }

    refreshMyConversations(data) {
        this._refreshMyConversations.next(data);
    }

    refreshBoards(data) {
        this._refreshBoards.next(data);
    }

    async createUserSocket() {
        this.zone.runOutsideAngular(() => {
            if (this.networkService.domain !== 'https://server.restvo.com') { // for debugging purpose only: socket.io disconnects regularly with localhost
                this.socket = io(this.networkService.domain + '/users-namespace', {transports: ['websocket']});
            } else {
                this.socket = io(this.networkService.domain + '/users-namespace');
            }
        });
        this.socket.on('connect', () => {
            console.log("user socket id: ", this.socket.id);
            this.socket.emit('enter user', this.user._id);
        });
        this.socket.on('refresh user status', async (userId, data) => {
            console.log("got refresh");
            if (this.user._id === userId) { //only if user status update is for current user
                if (data.type === 'update admin') {
                    const result: any = await this.checkAdminAccess(this.user.churches[this.currentCommunityIndex]._id);
                    this.hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
                    this.activitiesWithAdminAccess = result ? result.activitiesWithAdminAccess : [];
                    // if the list has changed, check if currentManageActivityId is still in the list. If not, exit the Manage view
                    if (this.router.url.includes('/app/manage')) { // if user switches to a community where he is no longer an admin
                        this.router.navigateByUrl('/app/me');
                    } else {
                        this.refreshAppPages();
                    }
                } else if (data.type === 'connect conversation') {
                    this.refreshMyConversations({action: 'reload', conversationId: 'all'});
                } else if (data.type === 'disconnect conversation') {
                    await this.refreshMyConversations({action: 'disconnect chat view', conversationId: data.conversationId});
                    this.refreshMyConversations({action: 'reload', conversationId: data.conversationId});
                } else if (data.type === 'update group participation') {
                    //update user's group participation
                    await this.load();
                    this.authService.refreshGroupStatus({conversationId: data.conversationId, data: data.group});
                    this.refreshMyConversations({action: 'reload', conversationId: 'all'});
                    //this.refreshUserStatus({ type: 'load user community boards' });
                    this.refreshBoards({ type: 'refresh community board page' }); //when a user join a group with board
                } else if (data.type === 'leave group') {
                    //update user's group participation,
                    await this.load();
                    this.authService.refreshGroupStatus({conversationId: null, data: {_id: (data.groupId || data.id || null)}});
                    this.refreshUserStatus({ type: 'close group view', data: { _id: (data.groupId || data.id || null) }});
                    this.refreshMyConversations({action: 'reload', conversationId: 'all'});
                    //this.refreshUserStatus({ type: 'load user community boards' });
                    this.refreshBoards({ type: 'refresh community board page' }); // when a user leave a group with board
                    // update user's activitiesWithAdminAccess list and exit from manage view if user is kicked out as admin
                    const result: any = await this.checkAdminAccess(this.user.churches[this.currentCommunityIndex]._id);
                    this.hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
                    this.activitiesWithAdminAccess = result ? result.activitiesWithAdminAccess : [];
                    // if the list has changed, check if currentManageActivityId is still in the list. If not, exit the Manage view
                    if (this.router.url.includes('/app/manage') && this.activitiesWithAdminAccess && this.activitiesWithAdminAccess.length && !this.activitiesWithAdminAccess.includes(this.currentManageActivityId)) { // if user switches to a community where he is no longer an admin
                        this.router.navigateByUrl('/app/me');
                    }
                } else if (data.type === 'update church participation') {
                    await this.load();
                } else if (data.type === 'update moment and calendar participation') {
                    await this.calendarService.getUserCalendar();
                    this.refreshUserStatus({type: 'change aux data'});
                } else if (data.type === 'update system messages') {
                    this.refreshUserStatus({type: 'change aux data'});
                } else { // data.type === 'update user info' and the rest
                    await this.load();
                    this.refreshAppPages();
                    this.refreshUserStatus(data);
                }
            }
        });
    }

    refreshAppPages() {
        // broadcast signal to refresh main tab pages
        this.refreshBoards({ type: 'refresh community board page' });
        this.refreshMyConversations({action: 'render', data: null});
        this.refreshMyConversations({action: 'reload chat view'});
        this.refreshUserStatus({ type: 'change aux data' });
    }

    // get data from the server if connected
    async load() {
        this.user = await this.loadUser();
        this.processLoadedUserData();
        return this.user;
    }

    async processLoadedUserData() {
        this.checkRestExpired();
        if (this.user.hasOwnProperty('unreadBadgeCount')) {
            if (this.platform.is('cordova') && this.user.enablePushNotification) {
                this.badge.set(this.user.unreadBadgeCount);
            }
            if (this.electronService.isElectronApp) {
                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', (this.user.unreadBadgeCount > -1) ? this.user.unreadBadgeCount : 0);
            }
        }
        this.storage.set('user', this.user); //save in local storage for PWA's fast retrieval when booting up mobile app and reloading the myconversations page
        // save user data in native storage for share extension's use
        if (this.platform.is('ios') && Capacitor.isPluginAvailable('ShareExtension')) {
            const { ShareExtension } = Plugins;
            const token = this.authService ? (this.authService.token || '') : '';
            await ShareExtension.saveDataToKeychain({key: 'token', data: token });
        }
    }

    async checkRestExpired() {
        if (this.user.hasOwnProperty('restSchedule') && this.user.restSchedule.breakExpiredAt) {
            const restExpired = new Date().getTime() > new Date(this.user.restSchedule.breakExpiredAt).getTime();
            this.UIrestStatus = restExpired ? 'active' : 'away';
            return restExpired;
        } else {
            return true;
        }
    }

    loadUser() {
        return this.http.get<User>(this.networkService.domain + '/api/auth', this.authService.httpAuthOptions).toPromise();
    }

    async loadStoredCommunity() {
        this.currentCommunityIndex = 0;
        const restvoIndex = this.user.churches.map((c) => c._id).indexOf('5ab62be8f83e2c1a8d41f894');
        if (this.user.churches && this.user.churches.length) { //  && restvoIndex > -1 ensure the user has joined Restvo
            // always returning Restvo as the default index
            this.currentCommunityIndex = restvoIndex;
        } else { // a safeguard against app crashes before the user finishes the onboarding process and got assigned to Restvo as the default community
            this.user = await this.initializeUser();
            this.processLoadedUserData();
            this.currentCommunityIndex = this.user.churches.map((c) => c._id).indexOf('5ab62be8f83e2c1a8d41f894');
        }
        this.storage.set('currentCommunityIndex', this.currentCommunityIndex.toString());
        // change stripe key depending on server use
        let domain = await this.storage.get('serverDomain');
        if (domain && domain.length) {
            this.networkService.domain = domain;
            if (domain === 'https://server.restvo.com') {
                this.stripeService.setKey('pk_live_yJ6A4nw34iPEMTvJnAzTZPLl');
            } else {
                this.stripeService.setKey('pk_test_x6u9uWj1QBPuhpD1MtOTTriS');
            }
        } else {
            this.stripeService.setKey('pk_live_yJ6A4nw34iPEMTvJnAzTZPLl');
        }
        this.defaultProgram = await this.storage.get('defaultProgram');
        if (!this.defaultProgram) { // if not yet joined a default Program, show the download link on mobile browser
            this.showDownloadLink = true;
        }
        this.UIAdminMode = await this.storage.get('UIAdminMode');
    }

    // filter the info based on churches selection
    async changeCommunity(event) {
        event.stopPropagation();
        //this.menuCtrl.close();
        //this.currentCommunityIndex = index; // this will always be smaller than churches.length
        this.storage.set('currentCommunityIndex', this.currentCommunityIndex.toString());
        const result: any = await this.checkAdminAccess(this.user.churches[this.currentCommunityIndex]._id);
        this.hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
        this.activitiesWithAdminAccess = result ? result.activitiesWithAdminAccess : [];
        if (this.router.url.includes('/app/manage') && this.activitiesWithAdminAccess && this.activitiesWithAdminAccess.length && !this.activitiesWithAdminAccess.includes(this.currentManageActivityId)) { // if user switches to a community where he is no longer an admin
            this.router.navigateByUrl('/app/discover');
        } else {
            this.refreshAppPages();
        }
    }

    addDeviceToken(data) {
        return this.http.put(this.networkService.domain + '/api/auth/devicetoken', JSON.stringify(data), this.authService.httpAuthOptions);
    }

    async checkAdminAccess(communityId) {
        const result: any = await this.http.get<boolean>(this.networkService.domain + '/api/auth/hasadminaccess/' + communityId + '?version=1', this.authService.httpAuthOptions).toPromise();
        this.hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
        this.activitiesWithAdminAccess = result ? result.activitiesWithAdminAccess : [];
        const activityId = await this.storage.get('currentManageActivityId');
        if (activityId && this.activitiesWithAdminAccess.length) {
            if (this.activitiesWithAdminAccess.find((c) => c._id === activityId)) {
                this.currentManageActivityId = activityId;
            } else {
                this.currentManageActivityId = this.activitiesWithAdminAccess[0]._id;
                this.storage.set('currentManageActivityId', this.currentManageActivityId);
            }
        } else if (this.activitiesWithAdminAccess.length) {
            this.currentManageActivityId = this.activitiesWithAdminAccess[0]._id;
            this.storage.set('currentManageActivityId', this.currentManageActivityId);
        }
        return result;
    }

    initializeUser() {
        return this.http.get(this.networkService.domain + '/api/auth/initialize', this.authService.httpAuthOptions).toPromise();
    }

    async resetOSBadges() {
        if(this.user && this.user.hasOwnProperty('unreadBadgeCount')) {
            this.user = await this.loadUser();
            if (this.platform.is('cordova') && this.user.enablePushNotification) {
                this.badge.set(this.user.unreadBadgeCount);
            }
            if (this.electronService.isElectronApp) {
                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', (this.user.unreadBadgeCount > -1) ? this.user.unreadBadgeCount : 0);
            }
        }
    }

    loadPrograms(loadParticipants) {
        return this.http.get(this.networkService.domain + '/api/auth/programs?loadParticipants=' + loadParticipants, this.authService.httpAuthOptions).toPromise();
    }

    async refreshDefaultActivity(momentId) {
        const activities: any = await this.loadPrograms(false);
        // activities is an Array like object
        // newActivities is now an array
        if (activities) {
            const activity = activities.find((n) => !['5d5785b462489003817fee18', momentId].includes(n._id)); // finding an Activity that is not Restvo Mentor nor the removed Program);
            // activity should now be an object of the new Activity
            // update the userData default program to equal the object
            if (activity) {
                this.defaultProgram = activity;
                this.UIAdminMode = true; // toggling on the Mentoring Mode
                this.storage.set('defaultProgram', activity);
            } else {
                this.defaultProgram = activities[0];
            }
        }
    }

    loadMyChurches() {
        return this.http.get(this.networkService.domain + '/api/mychurch', this.authService.httpAuthOptions).toPromise();
    }

    loadMyAdminChurches(searchKeyword, pageNum) {
        return this.http.get(this.networkService.domain + '/api/mychurch/adminchurches?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum,  this.authService.httpAuthOptions).toPromise();
    }


    loadMyGroups() {
        return this.http.get(this.networkService.domain + '/api/mygroup', this.authService.httpAuthOptions);
    }

    loadMyFriends() {
        return this.http.get(this.networkService.domain + '/api/auth/friends', this.authService.httpAuthOptions).toPromise();
    }

    loadMySystemMessages() {
        return this.http.get<[any]>(this.networkService.domain + '/api/auth/system', this.authService.httpAuthOptions);
    }

    async update(profile) {
        const promise = await this.http.put(this.networkService.domain + '/api/auth', JSON.stringify(profile), this.authService.httpAuthOptions)
            .toPromise();
        if (this.socket) { // only emit if the user socket has been setup. eg. after a user has logged in. this will be false in the registration process
            this.socket.emit('refresh user status', this.user._id, {type: 'update user info'});
        }
        await this.load();
        return promise;
    }

    joinCommunity(church) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.checkPushNotification();
                let data = await this.joinCommunityHttp(church);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    async joinCommunityHttp(church) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        let data = await this.http.put(this.networkService.domain + '/api/mychurch', JSON.stringify(church), this.authService.httpAuthOptions)
            .toPromise();
        await this.load();
        this.currentCommunityIndex = this.user.churches.length - 1;
        this.storage.set('currentCommunityIndex', this.currentCommunityIndex.toString()); //store this for the next time the app starts up
        this.socket.emit('refresh user status', this.user._id, {type: 'update church participation'});
        return data;
    }

    async removePendingMessages(data) {
        console.log("before send", JSON.stringify(data));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);

        let promise = await this.http.put(this.networkService.domain + '/api/auth/removepending', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        this.socket.emit('refresh user status', this.user._id, {type: 'update system messages'});
        return promise;
    }

    async leaveCommunity(id) {
        let promise = await this.http.delete(this.networkService.domain + '/api/mychurch/' + id, this.authService.httpAuthOptions).toPromise();
        this.socket.emit('refresh user status', this.user._id, {type: 'update church participation'});
        await this.load();
        await this.loadStoredCommunity();
        this.cache.clearGroup("churches");
        return promise;
    }

    async joinGroup(group) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.checkPushNotification();
                let data = await this.joinGroupHTTP(group);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    async joinGroupHTTP(group) {
        let data = await this.http.put(this.networkService.domain + '/api/mygroup', JSON.stringify(group), this.authService.httpAuthOptions)
            .toPromise();
        await this.load();
        if (group.conversation) {
            this.socket.emit('refresh user status', this.user._id, {type: 'update group participation', conversationId: group.conversation._id, group: group});
            this.authService.chatSocketMessage({topic: 'chat socket emit', conversationId: group.conversation._id, data: {action: 'update group member list'}});

        } else if (group.board) {
            //this.refreshUserStatus({ type: 'load user community boards' });
            this.socket.emit('refresh user status', this.user._id, {type: 'update group participation', conversationId: "all"});
        }
        return data;
    }

    async acceptJoinGroupRequest(group) {
        try {
            const data = await this.http.put(this.networkService.domain + '/api/mygroup/accept', JSON.stringify(group), this.authService.httpAuthOptions)
                .toPromise();
            if (group.conversation) {
                this.socket.emit('refresh user status', this.user._id, {type: 'update group participation', conversationId: group.conversation, group: group}); //conversationId is unpopulated ObjectId
                this.authService.chatSocketMessage({topic: 'chat socket emit', conversationId: group.conversation, data: {action: 'update group member list'}});

            } else if (group.board) {
                //this.refreshUserStatus({ type: 'load user community boards' });
                this.socket.emit('refresh user status', this.user._id, {type: 'update group participation', conversationId: "all"});
            }
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    checkPushNotification() {
        return new Promise(async (resolve) => {
            if (!this.user.enablePushNotification) {
                if (this.delayPushNotificationReminder) {
                    resolve(false);
                } else {
                    const alert = await this.alertCtrl.create({
                        header: "Push Notification",
                        message: "This allows Restvo to send you notifications on your device when other users message you. Do you want to enable push notification?",
                        buttons: [{
                            text: 'Yes',
                            handler: () => {
                                this.enablePushNotification(true);
                                resolve(true);
                            }
                        }, { text: 'Later',
                            handler: async () => {
                                const delayPushNotificationReminder = await this.storage.get('delayPushNotificationReminder');
                                this.delayPushNotificationReminder = delayPushNotificationReminder ? delayPushNotificationReminder - 1 : 3;
                                await this.storage.set('delayPushNotificationReminder', this.delayPushNotificationReminder);
                                resolve(false);
                            }}]
                    });
                    await alert.present();
                }
            } else {
                resolve(true);
            }
        });
    }

    toggleImportContactList(importOn) {
        return new Promise(async (resolve) => {
            try {
                if (importOn && !this.user.importContactList) { // when toggling it on
                    console.log("turning import contact on");
                    let alert = await this.alertCtrl.create({
                        header: "Import Address Book",
                        message: "Connect with friends and family on Restvo by importing your address book. The data will be securely transmitted to our server for the sole purpose of connecting you to your friends on Restvo. Allow Restvo to import your address book?",
                        buttons: [{
                            text: 'Yes',
                            handler: async () => {
                                const result: any = await this.uploadContactList(2);
                                if (result === 'upload successful') {
                                    await this.update({ importContactList: true } );
                                    this.user.importContactList = true;
                                    resolve(true);
                                } else {
                                    this.user.importContactList = false; // has to manually update user info because socket.io doesn't send back to sender
                                    const errorAlert = await this.alertCtrl.create({
                                        header: 'Cannot Import Address Book',
                                        subHeader: result,
                                        buttons: ['Dismiss'],
                                        cssClass: 'level-15'
                                    });
                                    await errorAlert.present();
                                    resolve(false);
                                }
                            }
                        }, { text: 'Later',
                            handler: () => {
                                this.delayImportContactListReminder = 3;
                                this.storage.set('delayImportContactListReminder', 3);
                                resolve(false);
                            }}]
                    });
                    await alert.present();
                } else if (!importOn && this.user.importContactList) {
                    console.log("turning import contact off");
                    try {
                        await this.update({ importContactList: false} );
                        this.user.importContactList = false;
                        resolve(false);
                    } catch (err) {
                        resolve(true);
                    }
                } else { // UI state change that is not user's toggle
                    console.log("nothing happens");
                    resolve(importOn);
                }
            } catch (err) {
                this.user.importContactList = false;
                let msg = 'To enable the Import Contacts feature: ';
                if (this.platform.is('android')) {
                    msg += '1. Open your phone Settings and tap Notifications. 2. Turn on Notifications for Restvo. 3. Com back here to enable Push Notification.';
                } else {
                    msg += '1. Open your phone Settings and tap Notifications. 2. Tap Restvo. 3. Turn on Allow Notifications. 4. Com back here to enable Push Notification.';
                }
                const permissionAlert = await this.alertCtrl.create({
                    header: 'You need to give permission to Restvo',
                    subHeader: msg,
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await permissionAlert.present();
                resolve(false);
            }
        })
    }

    async toggleAllowedDiscovered(state) {
        return new Promise(async (resolve) => {
            try {
                if (state && this.user.hideInDirectory) { // when toggling it show in directory
                    await this.update({hideInDirectory: false});
                    this.user.hideInDirectory = false;
                    resolve(state); //allowed to be discovered
                } else if (!state && !this.user.hideInDirectory) { // when toggling it hidden in directory
                    await this.update({hideInDirectory: true});
                    this.user.hideInDirectory = true;
                    resolve(state);//disallowed to be discovered
                } else {
                    // UI state change that is not user's toggle
                    resolve(state);
                }
            } catch (err) {
                const alert = await this.alertCtrl.create({
                    header: 'No Internet Connection',
                    subHeader: 'Check your internet connection and try again later.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await alert.present();
                resolve(!state);
            }
        });
    }

    async toggleShareContactInfo(state) {
        return new Promise(async (resolve) => {
            try {
                if (state && !this.user.shareContactInfo) { // when toggling it to share
                    await this.update({shareContactInfo: true});
                    this.user.shareContactInfo = true;
                    resolve(state); //allowed to be discovered
                } else if (!state && this.user.shareContactInfo) { // when toggling it hidden in directory
                    await this.update({shareContactInfo: false});
                    this.user.shareContactInfo = false;
                    resolve(state);//disallowed to be discovered
                } else {
                    // UI state change that is not user's toggle
                    resolve(state);
                }
            } catch (err) {
                const alert = await this.alertCtrl.create({
                    header: 'No Internet Connection',
                    subHeader: 'Check your internet connection and try again later.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await alert.present();
                resolve(!state);
            }
        });
    }

    async leaveGroup(group) {
        let promise = await this.http.put(this.networkService.domain + '/api/mygroup/leave', JSON.stringify(group), this.authService.httpAuthOptions)
            .toPromise();
        await this.load();
        this.refreshUserStatus({ type: 'close group view', data: { _id: group._id }});
        if (group.conversation) {
            this.authService.refreshGroupStatus({conversationId: group.conversation, data: group});
            this.authService.chatSocketMessage({topic: 'chat socket emit', conversationId: group.conversation, data: {action: 'update group member list'}});
        }
        this.socket.emit('refresh user status', this.user._id, {type: 'leave group', groupId: group._id});
        return promise;
    }

    uploadContactList(delay) {

        return new Promise((resolve, reject) => {

            setTimeout(async () => {
                if (this.user && this.user._id) { //check if the user has already been loaded
                    try {
                        const newlyAddedContacts = await this.getNewlyAddedContacts();
                        console.log("contacts", newlyAddedContacts);
                        try {
                            const result = await this.uploadContactListHTTP(newlyAddedContacts); // expect res === 'success'
                            console.log("upload result", result);
                            if (result === 'success') {
                                let lastUploadedContactList = await this.storage.get("lastUploadedContactList");
                                if(lastUploadedContactList && lastUploadedContactList.length) {
                                    //console.log("lastUploadedContactList", lastUploadedContactList);
                                    lastUploadedContactList = lastUploadedContactList.concat(newlyAddedContacts);
                                    lastUploadedContactList.sort(function (a, b) {
                                        return parseFloat(a["_objectInstance"].id) - parseFloat(b["_objectInstance"].id)
                                    });
                                    this.storage.set('lastUploadedContactList', lastUploadedContactList); //store the last loaded Contact List to the local storage
                                }
                                else{
                                    this.storage.set('lastUploadedContactList', newlyAddedContacts); //store the newly imported contacts to the local storage
                                }
                                console.log("upload successful");
                                resolve("upload successful");
                            } else {
                                console.log("upload failed. server cannot process the request");
                                resolve("The server cannot process your request.");
                            }
                        } catch (err) {
                            console.log("upload failed. problem connecting to the server");
                            resolve("There is a problem connecting to the server. Please try again later.");
                        }
                    } catch (err) {
                        console.log("user refuses to provide permission.");
                        reject("user refuses to provide permission.");
                    }
                } else {
                    console.log("user is not logged in.");
                    resolve("user is not logged in.");
                }
            }, delay * 1000); //check and upload contact list after x sec
        });
    }

    uploadContactListHTTP(newlyAddedContacts) {
        return this.http.post(this.networkService.domain + '/api/contact/upload', JSON.stringify({contacts: newlyAddedContacts}), this.authService.httpAuthOptions).toPromise();
    }

    getNewlyAddedContacts() {
        return new Promise((resolve, reject) => {
            this.storage.get("lastUploadedContactList").then((lastUploadedContactList) => {
                this.contacts.find(['*'], { desiredFields: ['name', 'phoneNumbers', 'emails', 'addresses'], multiple: true }).then((contacts) => {
                    let currentContacts = contacts;
                    if (lastUploadedContactList && lastUploadedContactList.length) {
                        contacts.sort(function (a, b) {
                            return parseFloat(a["_objectInstance"].id) - parseFloat(b["_objectInstance"].id)
                        });
                        console.log("last record: ", contacts[contacts.length-1]["_objectInstance"].id, lastUploadedContactList[lastUploadedContactList.length-1]["_objectInstance"].id);
                        let newlyAddedContacts = [];
                        let lastUploadedContactIds = lastUploadedContactList.map((c)=>{return c["_objectInstance"].id});
                        for (let i = 0; i < contacts.length; i++) {
                            let j = lastUploadedContactIds.indexOf(contacts[i]["_objectInstance"].id);
                            if (j > -1) {
                                //if an existing record was changed
                                if (JSON.stringify(contacts[i]["_objectInstance"]) !== JSON.stringify(lastUploadedContactList[j]["_objectInstance"])) {
                                    newlyAddedContacts.push(contacts[i]);
                                }
                            }
                            else {
                                //if this is newly added contact
                                newlyAddedContacts.push(contacts[i]);
                            }
                        }
                        resolve(newlyAddedContacts);
                    }
                    else {
                        currentContacts.sort(function (a, b) {
                            return parseFloat(a["_objectInstance"].id) - parseFloat(b["_objectInstance"].id)
                        });
                        resolve(currentContacts);
                    }
                }, function(err) {
                    reject(err);
                });
            }, function(err) {
                reject(err);
            });
        });
    }

    inviteFriends(data) {
        return this.http.post(this.networkService.domain + '/api/auth/invitefriends', JSON.stringify(data), this.authService.httpAuthOptions);
    }

    permanentlyEraseUser() {
        return this.http.get(this.networkService.domain + '/api/auth/permanentlyeraseuser', this.authService.httpAuthOptions);
    }

    loadMyOnboardingAnswers() {
        return this.http.get(this.networkService.domain + '/api/auth/onboardinganswers', this.authService.httpAuthOptions).toPromise();
    }

    async logout() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...'
        });
        await loading.present();
        try {
            let removeBackendTokens = false;
            // remove current device token from User Data
            if (this.pushSubscription && this.pushSubscription.endpoint) {
                const userTokens = JSON.parse(JSON.stringify(this.user.deviceTokens));
                userTokens.forEach((deviceToken, index) => {
                    if (deviceToken.hasOwnProperty('endpoint') && (deviceToken.endpoint === this.pushSubscription.endpoint)) {
                        this.user.deviceTokens.splice(index, 1);
                    }
                });
                removeBackendTokens = true;
            }
            if (this.deviceToken && this.deviceToken.length) {
                const userTokens = JSON.parse(JSON.stringify(this.user.deviceTokens));
                userTokens.forEach((deviceToken, index) => {
                    if (typeof deviceToken === 'string' && deviceToken === this.deviceToken) {
                        this.user.deviceTokens.splice(index, 1);
                    }
                });
                removeBackendTokens = true;
            }
            if (removeBackendTokens) {
                await this.update({
                    _id: this.user._id,
                    deviceTokens: this.user.deviceTokens
                });
            }
            this.storage.clear();
            this.cache.clearAll();
            if (this.user.enablePushNotification) {
                if (this.platform.is('cordova') && this.user.enablePushNotification) {
                    this.badge.set(0);
                }
            }
            if (this.electronService.isElectronApp) {
                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', 0);
            }
            if (this.router.url.includes('(sub:')) {
                this.router.navigate([{ outlets: { sub: null }}], { replaceUrl: true });
            }
            setTimeout(async () => {
                await this.resetUserData();
                this.menuCtrl.enable(false);
                this.router.navigate(['/activity/5d5785b462489003817fee18']);
                loading.dismiss();
            }, 500);
        } catch (err) {
            console.log(err);
            loading.dismiss();
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please resume internet connection to complete the log out process.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    async resetUserData() {
        this.user = {};
        this.hasPlatformAdminAccess = false;
        this.activitiesWithAdminAccess = [];
        this.currentCommunityIndex = 0;
        this.currentManageActivityId = '';
        this.developerModeClick = 0;
        this.delayPushNotificationReminder = 0;
        this.delayImportContactListReminder = 0;
        this.splitPaneState = 'md';
        this.UIrestStatus = 'active';
        this.videoChatRoomId = '';
        this.readyToControlVideoChat = true;
        this.showDownloadLink = true;
        this.defaultProgram = null;
        this.UIAdminMode = false;
        this.authService.logout();
        // deviceToken is not removed because it needs to be used when another user sign in.
        // that is because the deviceToken is only fetched when the app is loaded for the first time
        this.authService.chatSocketMessage({topic: 'disconnect chat socket'});
        if (this.socket) {
            this.socket.close();
        }
        if (this.platform.is('ios')) {
            const { ShareExtension } = Plugins;
            try {
                await ShareExtension.clearNativeUserDefaults();
            } catch (err) {
                console.log(err);
            }
        }
        // clear authService cached routing history
        this.authService.cachedRouteUrl = null;
        this.authService.cachedRouteParams = null;

        // clear calendarService cached data
        this.calendarService.calendarItems = [];
    }
}
