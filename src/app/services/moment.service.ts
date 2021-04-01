import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import { Aws } from './aws.service';
import { Chat } from './chat.service';
import { Auth } from './auth.service';
import { Response } from './response.service';
import { Resource } from './resource.service';
import { UserData } from './user.service';
import { CalendarService } from './calendar.service';
import { NetworkService } from './network-service.service';

import * as io from 'socket.io-client';
import {PickpeoplePopoverPage} from '../pages/feature/pickpeople-popover/pickpeople-popover.page';
import {SuccessPopoverPage} from '../pages/feature/success-popover/success-popover.page';
import { Observable, BehaviorSubject } from 'rxjs';
import {Storage} from '@ionic/storage';
import {PaymentService} from './payment.service';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Moment {

    socket: io;
    ionSpinner = false;
    icons = [
        {
            field: 'Track',
            url: 'assets/img/Peak_Gray.png',
            color: 'primary'
        },
        {
            field: 'Meetup',
            url: 'assets/img/transparent-avatar.png',
            color: 'tertiary'
        },
        {
            field: 'Goal',
            url: 'assets/img/Peak_Gray.png',
            color: 'success'
        },
        {
            field: 'Event',
            url: 'assets/img/Calendar_Gray.png',
            color: 'tertiary'
        },
        {
            field: 'Poll',
            url: 'assets/img/Poll_Gray.png',
            color: 'success'
        },
        {
            field: 'User Defined Activity',
            url: 'assets/img/Calendar_Gray.png',
            color: 'primary'
        },
    ];

    private _openMoment: BehaviorSubject<any> = new BehaviorSubject(null);
    private _editMoment: BehaviorSubject<any> = new BehaviorSubject(null);
    private _refreshMoment: BehaviorSubject<any> = new BehaviorSubject(null);
    private _manageMoment: BehaviorSubject<any> = new BehaviorSubject(null);
    private _openPreferences: BehaviorSubject<any> = new BehaviorSubject(null);
    private _editParticipants: BehaviorSubject<any> = new BehaviorSubject(null);
    private _openCreator: BehaviorSubject<any> = new BehaviorSubject(null);

    public readonly openMoment$: Observable<any> = this._openMoment.asObservable();
    public readonly editMoment$: Observable<any> = this._editMoment.asObservable();
    public readonly refreshMoment$: Observable<any> = this._refreshMoment.asObservable();
    public readonly manageMoment$: Observable<any> = this._manageMoment.asObservable();
    public readonly openPreferences$: Observable<any> = this._openPreferences.asObservable();
    public readonly editParticipants$: Observable<any> = this._editParticipants.asObservable();
    public readonly openCreator$: Observable<any> = this._openCreator.asObservable();

    constructor(private http: HttpClient,
                private zone: NgZone,
                private router: Router,
                private storage: Storage,
                private platform: Platform,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private awsService: Aws,
                private authService: Auth,
                private userData: UserData,
                private chatService: Chat,
                private responseService: Response,
                private resourceService: Resource,
                private paymentService: PaymentService,
                private calendarService: CalendarService,
                private networkService: NetworkService) {
    }

    openMoment(data) {
        this._openMoment.next(data);
    }

    editMoment(data) {
        this._editMoment.next(data);
    }

    refreshMoment(data) {
        this._refreshMoment.next(data);
    }

    manageMoment(data) {
        if (data && !data.modalPage) {
            this.userData.currentManageActivityId = data.moment._id;
        }
        this._manageMoment.next(data);
    }

    openPreferences(data) {
        this._openPreferences.next(data);
    }

    editParticipants(data) {
        this._editParticipants.next(data);
    }

    openCreator(data) {
        this._openCreator.next(data);
    }

    async createMomentSocket() {
        this.zone.runOutsideAngular(() => {
            if (this.networkService.domain !== 'https://server.restvo.com') { // for debugging purpose only: socket.io disconnects regularly with localhost
                this.socket = io(this.networkService.domain + '/moments-namespace', {transports: ['websocket']});
            } else {
                this.socket = io(this.networkService.domain + '/moments-namespace');
            }
        });
        this.socket.on('connect', () => {});
        this.socket.on('refresh moment', async (momentId, data) => {
            this.refreshMoment({ momentId: momentId, data: data});
            console.log('refresh moment');
        });
    }

    async load(id) {
        let promise: any;
        if (this.authService.token) {
            promise = await this.http.get(this.networkService.domain + '/api/moment/' + id, this.authService.httpAuthOptions).toPromise();
        } else {
            promise = await this.http.get(this.networkService.domain + '/api/moment/public/' + id, this.authService.httpOptions).toPromise();
        }
        return promise;
    }

    async cloneMoment(moment) {
        const momentToBeCloned = JSON.parse(JSON.stringify(moment));
        momentToBeCloned.calendar = { // reset the calendar
            title: momentToBeCloned.matrix_string[0][0],
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
        const clonedMoments: any = await this.clone([momentToBeCloned], 'staff');
        if (clonedMoments && clonedMoments.length) {
            const networkAlert = await this.alertCtrl.create({
                header: 'Success',
                message: 'You have successfully cloned ' + clonedMoments[0].matrix_string[0][0] + '. It is now available in the Platform Manage Activities page.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    loadUserPreferences(pageNum, programId, type) {
        return this.http.get(this.networkService.domain + '/api/moment/preferences?pageNum=' + pageNum + '&programId=' + (programId || '') + '&type=' + (type || ''), this.authService.httpAuthOptions).toPromise();
    }

    loadProgramOnboardActivities(programId, type, returnResponses) {
        return this.http.get(this.networkService.domain + '/api/moment/onboardactivities/' + programId + '?version=' + (returnResponses ? '1' : '') + (type ? '&type=' + type : ''), this.authService.httpAuthOptions).toPromise();
    }

    loadProgramChildActivities(programId, categoryId) {
        return this.http.get(this.networkService.domain + '/api/moment/childactivities/' + programId + '?category=' + categoryId, this.authService.httpAuthOptions).toPromise();
    }

    async loadSampleActivities(categoryId) {
        let promise: any;
        if (this.authService.token) {
            promise = await this.http.get(this.networkService.domain + '/api/moment/samples?version=1&category=' + (categoryId || ''), this.authService.httpAuthOptions).toPromise();
        } else {
            promise = await this.http.get(this.networkService.domain + '/api/moment/discover/public?version=1&category=' + (categoryId || ''), this.authService.httpOptions).toPromise();
        }
        return promise;
    }

    loadNotes(relationshipId, calendarId) {
        if (this.authService.token) {
            return this.http.get(this.networkService.domain + '/api/moment/notes?relationship=' + (relationshipId || '') + '&calendar=' + (calendarId || ''), this.authService.httpAuthOptions).toPromise();
        } else {
            return [];
        }
    }

    loadMatchedPeople(momentId, searchKeyword, pageNum) {
        return this.http.get(this.networkService.domain + '/api/moment/match?momentId=' + momentId + '&searchKeyword=' + searchKeyword + '&pageNum=' + pageNum, this.authService.httpAuthOptions).toPromise();
    }

    loadOnboardingFlow(momentId, searchKeyword, pageNum) { // admin only - Manage Development page
        return this.http.get(this.networkService.domain + '/api/moment/onboarding?momentId=' + (momentId || '') + '&searchKeyword=' + searchKeyword + '&pageNum=' + pageNum, this.authService.httpAuthOptions).toPromise();
    }

    loadPublicActivityByCategory(categoryId, pageNum) {
        return this.http.get(this.networkService.domain + '/api/moment/activity/' + categoryId + '?pageNum=' + pageNum).toPromise();
    }

    loadPublicActivities(searchKeyword, time, pageNum) {
        return this.http.get(this.networkService.domain + '/api/moment/activity/v2' + '?type=moment&time=' + time + '&pageNum=' + pageNum + '&keyword=' + searchKeyword).toPromise();
    }

    loadNearbyPublicActivities(searchKeyword, searchType, userLocation, pageNum, searchRadius) {
        return this.http.get(this.networkService.domain + '/api/moment/activity/v3' + '?type=' + searchType + '&keyword=' + searchKeyword + '&page=' + pageNum + '&lat=' + userLocation.lat + '&lng=' + userLocation.lng + '&radius=' + searchRadius).toPromise();
    }

    async create(moment) {
        const data = JSON.parse(JSON.stringify(moment));
        if (data.resource && data.resource._id) {
            data.resource = data.resource._id; // depopulate resource before creation
        }
        delete data.conversations; // no need to send the converastions field
        const promise = await this.http.post(this.networkService.domain + '/api/moment/create', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        await this.chatService.getAllUserConversations();
        this.userData.refreshAppPages();
        return promise;
    }

    async clone(moments, optOutReason) {
        const promises = await this.http.put(this.networkService.domain + '/api/moment/clone', JSON.stringify({moments: moments, optOutReason: optOutReason}), this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        await this.chatService.getAllUserConversations();
        this.userData.refreshAppPages();
        return promises;
    }

    async update(moment) {
        const data = JSON.parse(JSON.stringify(moment));
        if (data.resource && data.resource._id) {
            data.resource = data.resource._id; // depopulate resource before update
        }
        delete data.conversations; // no need to send the converastions field
        const promise = await this.http.put(this.networkService.domain + '/api/moment/update', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        await this.chatService.getAllUserConversations();
        this.userData.refreshAppPages();
        return promise;
    }

    async adoptPlan(data) {
        const promise = await this.http.put(this.networkService.domain + '/api/moment/plan/adopt', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        this.userData.refreshAppPages();
        return promise;
    }

    async share(moment, conversationId) {
        const conversation = this.chatService.conversations.find((c) => c.conversation._id === conversationId).conversation;
        if (moment && conversation) { // conversation is the share destination
            let result: any;
            if (moment.calendar && moment.calendar._id) {
                const data = { // add all user in chat to the moment's calendar
                    operation: 'add to calendar',
                    user_lists: [],
                    momentId: moment._id,
                    conversations: [conversation._id],
                    calendarId: moment.calendar._id
                };
                if (moment.resource && moment.resource.hasOwnProperty('en-US') && moment.resource['en-US'].value[0] === 'Goal' || moment.resource['en-US'].value[0] === 'Meetup') {
                    data.operation = 'add to lists and calendar';
                    data.user_lists = ['user_list_1', 'user_list_2'];
                }
                const response = await this.updateMomentUserLists(data, null, true);
                result = response && response.success;
            } else {
                result = 'success'; // for feature that doesn't require adding users to the calendar
            }
            if (result === 'success') {
                try {
                    if (conversation.group) {
                        await this.chatService.sendReply(conversation._id, {
                            moment: moment._id,
                            page: conversation.type === 'connect' ? 'MessagePage' : 'GroupmessagePage',
                            groupId: conversation.type === 'connect' ? null : conversation.group._id,
                            groupName: conversation.type === 'connect' ? null : conversation.group.name
                        }, {
                            conversationId: conversation._id,
                            moment: moment,
                            createdAt: new Date(),
                            author: {
                                _id: this.userData.user._id,
                                first_name: this.userData.user.first_name,
                                last_name: this.userData.user.last_name,
                                avatar: this.userData.user.avatar
                            },
                            status: 'pending',
                            confirmId: Math.random()
                        });
                    } else {
                        await this.chatService.sendReply(conversation._id, {
                            moment: moment._id,
                            page: conversation.type === 'connect' ? 'MessagePage' : 'GroupmessagePage'
                        }, {
                            conversationId: conversation._id,
                            moment: moment,
                            createdAt: new Date(),
                            author: {
                                _id: this.userData.user._id,
                                first_name: this.userData.user.first_name,
                                last_name: this.userData.user.last_name,
                                avatar: this.userData.user.avatar
                            },
                            status: 'pending',
                            confirmId: Math.random()
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    async updateMomentUserLists(data, token, refreshAppPages) {
        const promise: any = await this.http.put<string>(this.networkService.domain + '/api/moment/updatemomentuserlists?token=' + token, JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        this.socket.emit('refresh moment', data.momentId, {type: 'refresh participation'});
        if (data.operation === 'remove from lists') {
            data.users.forEach((user) => {
                // force reload on user's other devices, including closeGroupView event which forces the user's group chat view to close
                this.userData.socket.emit('refresh user status', user, {
                    type: 'leave group',
                    id: data.momentId
                });
            });
            // if leaving the admin role, reload the check Admin Access data
            if (data.user_lists.includes('user_list_2') && this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
                await this.userData.checkAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
            }
        }
        if (refreshAppPages) {
            this.calendarService.getUserCalendar();
            this.chatService.getAllUserConversations();
            this.userData.refreshAppPages();
        }
        const incompleteOnboardingExists = this.authService.checkIncompleteOnboarding(false);
        return { success: promise, incompleteOnboardingExists: incompleteOnboardingExists};
    }

    async submitVote(event, moment, index) {
        event.stopPropagation();
        try {
            const responseObj = {
                matrix_string: [],
                matrix_number: [[moment.resource.matrix_number[2][1], index]],
                moment: moment._id,
                array_number: moment.resource.matrix_number[0],
                createdAt: new Date()
            };
            this.submitResponse(moment, responseObj, true);
        } catch (err) {
            this.networkService.showNoNetworkAlert();
        }
    }

    async submitResponse(moment, serverData, enableSocketIO) { // need to keep this as a moment service to utilize the moment's socket.io object
        try {
            const response = await this.responseService.submit(serverData);
            if (response && response.status === 'success' && response._id) { // response example: { _id: xxx, status: 'success' }
                const responseToBeReturned = JSON.parse(JSON.stringify(serverData));
                responseToBeReturned._id = response._id;
                responseToBeReturned.user = {
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                };
                const socketData = {
                    moment: moment,
                    createdAt: new Date(),
                    response: responseToBeReturned,
                    author: responseToBeReturned.user,
                    status: 'pending',
                    confirmId: Math.random()
                };
                if (enableSocketIO) {
                    this.socket.emit('refresh moment', moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
                }
                return responseToBeReturned;
            } else {
                throw new Error('Failed to Submit Response');
            }
        } catch (err) {
            this.networkService.showNoNetworkAlert();
        }
    }

    // user actively joins an Activity (from Onboarding Slideshow)
    async addUserToProgramUserList(moment, user_list, token, notifyUser, refreshAppPages) {
        let response: any;
        if (moment && moment._id && !moment.resource) {
            const result: any = await this.load(moment._id);
            moment = JSON.parse(JSON.stringify(result));
        }
        if (this.userData.user) {
            try {
                response = await this.updateMomentUserLists({
                    operation: 'add to lists and calendar',
                    user_lists: [user_list],
                    users: [this.userData.user._id],
                    momentId: moment._id,
                    calendarId: moment.calendar._id
                }, token, refreshAppPages);
                if (notifyUser) { // open modal box to notify user of status of joining the program
                    if (response && response.success === 'success') {
                        if (user_list === 'user_list_1') { // participant
                            const modal = await this.modalCtrl.create({component: SuccessPopoverPage, componentProps: {}});
                            await modal.present();
                        } else {
                            const alert = await this.alertCtrl.create({
                                header: 'Success',
                                message: 'You have now been added as ' + (user_list === 'user_list_2' ? 'an organizer of ' : (user_list === 'user_list_3' ? 'a leader of ' : '')) + moment.matrix_string[0][0],
                                buttons: [{ text: 'Ok',
                                    handler: () => {
                                        const navTransition = alert.dismiss();
                                        navTransition.then( async () => {
                                        });
                                    }}],
                                cssClass: 'level-15'
                            });
                            alert.present();
                        }
                    } else {
                        const alert = await this.alertCtrl.create({
                            header: 'Permission Denied',
                            message: 'You do not have the required permission. Please contact the organizer for assistance.',
                            buttons: [{ text: 'Dismiss',
                                handler: () => {
                                    const navTransition = alert.dismiss();
                                    navTransition.then( async () => {
                                    });
                                }}],
                            cssClass: 'level-15'
                        });
                        alert.present();
                    }
                }
                // This logic changes the userData.defaultProgram to equal the activity just joined
                // IF they successfully joined an Activity
                // AND it is the second activity the user has joined (the first is the default Restvo Community)
                if (response && response.success === 'success') {
                    const activities: any = await this.userData.loadPrograms(true);
                    // newActivities is now an array
                    if (activities.length === 2) { // only do it if joining the first non-Restvo Activity
                        const activity = activities.find((n) => n._id !== '5d5785b462489003817fee18'); // finding an Activity that is not Restvo Mentor);
                        if (activity) {
                            this.userData.defaultProgram = activity;
                            this.userData.UIAdminMode = true; // toggling on the Mentoring Mode
                            this.storage.set('defaultProgram', activity);
                        }
                    }
                }
                return response;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }

    // decide whether to open the participants edit mode (for organizer) or select from the PeoplePicker and add as participant to an Activity
    async initiateParticipantsView(moment, loading) {
        await this.resourceService.loadSystemResources(); // this is required to ensure resource has already been loaded
        let hasOrganizerAccess: any;
        if (moment.user_list_2 && moment.user_list_2.length && moment.user_list_2[0] && typeof moment.user_list_2[0] === 'object') { // if user_list is populated, i.e. array of objects
            hasOrganizerAccess = moment.user_list_2.map((c) => c._id).includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
        } else if (moment.user_list_2 && moment.user_list_2.length && moment.user_list_2[0] && typeof moment.user_list_2[0] === 'string') { // if user_list is not populated, i.e. array of strings
            hasOrganizerAccess = moment.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
        }
        if (loading) {
            await loading.dismiss();
        }
        if (hasOrganizerAccess) {
            this.editParticipants( { moment: moment, title: this.resourceService.resource['en-US'].value[32] + ' to ' + moment.matrix_string[0][0], modalPage: true });
        } else {
            this.addParticipants(moment, this.resourceService.resource, 'both', ['user_list_1'], this.resourceService.resource['en-US'].value[32] + ' to ' + moment.matrix_string[0][0], this.resourceService.resource['en-US'].value[32]);
        }
    }

    // an user adding another user to an Activity's participant list.
    // Only 1 list (e.g. 'user_list_1') is handled at this time even though listOfNames is an array of one element. i.e. ['user_list_1']
    async addParticipants(moment, resource, filter, listOfNames, title, action) {
        const success = await this.paymentService.checkSubscriptionAllowance(moment);
        if (!success) { return; }
        const selectedPersonOrGroup = [];
        this.chatService.conversations.forEach((item) => {
            if ((item.conversation.type === 'connect' || item.conversation.type === 'self') && item.data.participant && moment[listOfNames[0]].map((c) => c._id).includes(item.data.participant._id)) {
                item.locked = true;
                selectedPersonOrGroup.push(item);
            }
        });
        if (moment[listOfNames[0]].map((c) => c._id).includes(this.userData.user._id)) { // add self to the selectedPersonOrGroup list if user is included in the user_list
            selectedPersonOrGroup.push({
                select: true,
                locked: true,
                conversation: {
                    _id: this.userData.user._id, // this is not applicable because such a conversation does not exist. this exception will be handled in chat.service.ts notifyOfInvitation()
                    type: 'self',
                    updatedAt: new Date().toISOString()
                },
                data: {
                    name: this.userData.user.first_name + ' ' + this.userData.user.last_name,
                    participant: {
                        _id: this.userData.user._id,
                        first_name: this.userData.user.first_name,
                        last_name: this.userData.user.last_name,
                        avatar: this.userData.user.avatar
                    }
                },
            });
        }
        const modal = await this.modalCtrl.create({component: PickpeoplePopoverPage, componentProps: { moment: moment, invitationType: listOfNames[0], filter: filter, includeSelf: true, title: title, action: action, conversations: selectedPersonOrGroup }});
        await modal.present();
        const {data: result} = await modal.onDidDismiss();
        let response: any;
        // the selected people will be added to moment participants list, and then shared the moment with the invitees via chat'
        let userObjectIds = [];
        const conversations = (result && result.conversations) ? result.conversations : [];
        const listOfAppUsers = (result && result.listOfAppUsers) ? result.listOfAppUsers : [];
        if (conversations && conversations.length) { // process selected users from selectedConversations
            result.conversations.forEach((item) => {
                if (item.data.participant._id) {
                    userObjectIds.push(item.data.participant._id);
                }
            });
        }
        if (listOfAppUsers && listOfAppUsers.length) { // process users selected from selected App Users
            listOfAppUsers.forEach((appUser) => {
                if (appUser._id) {
                    userObjectIds.push(appUser._id);
                }
            });
        }
        // process if user has selected self
        if (result && result.conversations && result.conversations.find((c) => c.conversation._id === this.userData.user._id)) {
            userObjectIds.push(this.userData.user._id);
        }
        userObjectIds = [...new Set(userObjectIds)]; // create unique set of user Ids
        // add selected users to participant list
        if (userObjectIds.length) {
            this.ionSpinner = true;
            setTimeout(() => {
                this.ionSpinner = false;
            }, 8000);
            response = await this.updateMomentUserLists({
                operation: 'add to lists and calendar',
                user_lists: listOfNames,
                users: userObjectIds,
                momentId: moment._id,
                calendarId: moment.calendar._id
            }, null, true);
        }
        this.ionSpinner = false;
        if (response && response.success === 'success') { // only if the users are successfully added do we prepare to send out notifications
            // check if there is any unconnected individual. If so, it needs to create conversations first so chat rooms are ready to receive notifications
            if (listOfAppUsers && listOfAppUsers.length) {
                const promises = listOfAppUsers.map( async (appUser) => {
                    if (appUser._id === this.userData.user._id) { return; } // terminate if the recipient selected is the user herself
                    const isConnected: any = await this.chatService.getConversationByRecipientId(appUser._id, false, false); // API-controlled recipient info access permission
                    if (isConnected && isConnected.conversation) { // if the recipient has been connected
                        const conversation = isConnected.conversation;
                        if (conversation.type === 'connect') {
                            // add the conversation to the list
                            conversations.push({ conversation: isConnected.conversation });
                        } // ignore if the conversation is blocked
                    } else {
                        // if a new conversation needs to be created
                        const welcomeMessage = this.userData.user.first_name + ' ' + this.userData.user.last_name + ' is now connected with you.';
                        const newConversationId = await this.chatService.newConversation(appUser._id, { composedMessage : welcomeMessage, type: 'connect' });
                        conversations.push({ conversation: { _id: newConversationId, type: 'connect' } });
                    }
                });
                await Promise.all(promises);
                this.chatService.refreshTabBadges();
            }
            this.chatService.notifyOfInvitation(conversations, moment, listOfNames[0]);
        }
        return (response ? response.success : false );
    }

    async delete(moment, intent) {
        const promise = await this.http.delete(this.networkService.domain + '/api/moment/' + moment._id + (intent === 'archive' ? '?archive=true' : ''), this.authService.httpAuthOptions)
            .toPromise();
        let duration = 5;
        if (this.router.url.includes('outlets')) { // just in case the subpanel view of the deleted Moment is open
            this.router.navigate([{ outlets: { sub: null }}], { replaceUrl: true });
            duration = 1500; // if reseting outlet, provide a 1.5 sec delay
        }
        setTimeout(async () => {
            await this.refreshMoment({ momentId: moment._id, data: { operation: 'deleted moment'}});
            await this.calendarService.getUserCalendar();
            await this.chatService.getAllUserConversations();
            setTimeout(() => {
                this.userData.refreshAppPages();
            }, 500);
            // reload the check Admin Access data
            if (this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
                await this.userData.checkAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
            }
            return promise;
        }, duration);
    }

    async loadActivitySchedules(activityId) {
        if (this.authService.token) {
            return await this.http.get(this.networkService.domain + '/api/moment/activityschedules/' + activityId, this.authService.httpAuthOptions)
                .toPromise();
        } else {
            return [];
        }
    }

    async loadSchedule(scheduleId) {
        return await this.http.get(this.networkService.domain + '/api/moment/schedule/' + scheduleId, this.authService.httpAuthOptions)
            .toPromise();
    }

    async loadProgramInsight(programId) {
        return await this.http.get(this.networkService.domain + '/api/moment/program/insight/' + programId, this.authService.httpAuthOptions)
            .toPromise();
    }

    async touchSchedule(data) {
        const schedule = JSON.parse(JSON.stringify(data));
        if (schedule && schedule.child_moments && schedule.child_moments.length && typeof schedule.child_moments[0] === 'object') { // depopulate child_moments before send them back to server
            schedule.child_moments = schedule.child_moments.map((c) => c._id);
        }
        if (schedule.options && schedule.options.hasOwnProperty('recurrence') && schedule.options.recurrence === '') {
            delete schedule.options.recurrence;
        }
        const promise = await this.http.put(this.networkService.domain + '/api/moment/schedule/touch', JSON.stringify(schedule), this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        await this.userData.refreshAppPages();
        return promise;
    }

    async touchContentCalendarItems(momentId, data) {
        const promise = await this.http.put(this.networkService.domain + '/api/moment/contentcalendaritems/touch', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        const socketData = {
            type: 'refresh calendar items',
            author: {
                _id: this.userData.user._id,
                first_name: this.userData.user.first_name,
                last_name: this.userData.user.last_name,
                avatar: this.userData.user.avatar
            }
        };
        if (momentId) {
            this.socket.emit('refresh moment', momentId, socketData); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
            await this.calendarService.getUserCalendar();
            this.userData.refreshAppPages();
        }
        return promise;
    }

    loadIcon(field) {
        const color = this.icons.find((c) => c.field === field);
        return color || this.icons.find((c) => c.field === 'User Defined Activity');
    }
}


