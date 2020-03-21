import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import { Aws } from './aws.service';
import { Chat } from './chat.service';
import { Auth } from './auth.service';
import { Response } from './response.service';
import { Resource } from './resource.service';
import { UserData } from './user.service'
import { CalendarService } from './calendar.service';
import { NetworkService } from './network-service.service';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/timeout'; import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';
import {PickpeoplePopoverPage} from '../pages/feature/pickpeople-popover/pickpeople-popover.page';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Moment {

    socket: io;
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

    public readonly openMoment$: Observable<any> = this._openMoment.asObservable();
    public readonly editMoment$: Observable<any> = this._editMoment.asObservable()
    public readonly refreshMoment$: Observable<any> = this._refreshMoment.asObservable();
    public readonly manageMoment$: Observable<any> = this._manageMoment.asObservable();
    public readonly openPreferences$: Observable<any> = this._openPreferences.asObservable();
    public readonly editParticipants$: Observable<any> = this._editParticipants.asObservable();

    constructor(private http: HttpClient,
                private platform: Platform,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private awsService: Aws,
                private authService: Auth,
                private userData: UserData,
                private chatService: Chat,
                private responseService: Response,
                private resourceService: Resource,
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
        this._manageMoment.next(data);
    }

    openPreferences(data) {
        this._openPreferences.next(data);
    }

    editParticipants(data) {
        this._editParticipants.next(data);
    }

    async createMomentSocket() {
        if (this.platform.is('cordova') || (this.networkService.domain !== 'https://server.restvo.com')) {
            // turn off long polling for mobile apps. Without long polling, this will fail when connecting behind firewall
            this.socket = io(this.networkService.domain + '/moments-namespace', { transports: ['websocket']}); // only for mobile apps
        } else {
            this.socket = io(this.networkService.domain + '/moments-namespace');
        }
        this.socket.on('connect', () => {
        });
        this.socket.on('refresh moment', async (momentId, data) => {
            this.refreshMoment({ momentId: momentId, data: data});
            console.log('refresh moment');
        });
    }

    load(id) {
        return this.http.get(this.networkService.domain + '/api/moment/' + id, this.authService.httpAuthOptions).toPromise();
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

    loadSampleActivities(categoryId) {
        return this.http.get(this.networkService.domain + '/api/moment/samples?version=1&category=' + (categoryId || ''), this.authService.httpAuthOptions).toPromise();
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

    loadPublicMoment(id) {
        return this.http.get(this.networkService.domain + '/api/moment/public/' + id, this.authService.httpOptions).toPromise();
    }

    loadPublicActivityByCategory(categoryId, pageNum){
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
    };

    async clone(moments, optOutReason) {
        const promises = await this.http.put(this.networkService.domain + '/api/moment/clone', JSON.stringify({moments: moments, optOutReason: optOutReason}), this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        await this.chatService.getAllUserConversations();
        this.userData.refreshAppPages();
        return promises;
    }

    async update(moment) {
        let data = JSON.parse(JSON.stringify(moment));
        if (data.resource && data.resource._id){
            data.resource = data.resource._id; //depopulate resource before update
        }
        delete data.conversations; //no need to send the converastions field
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

    async share(moment) {
        if (moment.conversations && moment.conversations.length) { // moment.conversations are chat rooms to be associated with this moment. this is to be distinguished from moment.conversation, which is moment's own chat room. consult models/moment.js for detail
            let result = '';
            if (moment.calendar && moment.calendar._id) {
                const data = { // add all user in chat to the moment's calendar
                    operation: 'add to calendar',
                    user_lists: [],
                    momentId: moment._id,
                    conversations: moment.conversations.map((obj) => obj.conversation._id),
                    calendarId: moment.calendar._id
                };
                if (moment.resource && moment.resource.hasOwnProperty('en-US') && moment.resource['en-US'].value[0] === 'Goal' || moment.resource['en-US'].value[0] === 'Meetup'){
                    data.operation = 'add to lists and calendar';
                    data.user_lists = ['user_list_1', 'user_list_2'];
                }
                result = await this.updateMomentUserLists(data, null);
            } else {
                result = 'success'; // for feature that doesn't require adding users to the calendar
            }
            if (result === 'success') {
                try {
                    const promises = moment.conversations.map( async (obj) => {
                        if (obj.conversation.group) {
                            await this.chatService.sendReply(obj.conversation._id, {
                                moment: moment._id,
                                page: obj.conversation.type === 'connect' ? "MessagePage" : "GroupmessagePage",
                                groupId: obj.conversation.type === 'connect' ? null : obj.conversation.group._id,
                                groupName: obj.conversation.type === 'connect' ? null : obj.conversation.group.name
                            }, {
                                conversationId: obj.conversation._id,
                                moment: moment,
                                createdAt: new Date(),
                                author: {
                                    _id: this.userData.user._id,
                                    first_name: this.userData.user.first_name,
                                    last_name: this.userData.user.last_name,
                                    avatar: this.userData.user.avatar
                                },
                                status: "pending",
                                confirmId: Math.random()
                            });
                        } else {
                            await this.chatService.sendReply(obj.conversation._id, {
                                moment: moment._id,
                                page: obj.conversation.type === 'connect' ? "MessagePage" : "GroupmessagePage"
                            }, {
                                conversationId: obj.conversation._id,
                                moment: moment,
                                createdAt: new Date(),
                                author: {
                                    _id: this.userData.user._id,
                                    first_name: this.userData.user.first_name,
                                    last_name: this.userData.user.last_name,
                                    avatar: this.userData.user.avatar
                                },
                                status: "pending",
                                confirmId: Math.random()
                            });
                        }
                    });
                    await Promise.all(promises);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    async updateMomentUserLists(data, token) {
        const promise = await this.http.put<string>(this.networkService.domain + '/api/moment/updatemomentuserlists?token=' + token, JSON.stringify(data), this.authService.httpAuthOptions)
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
        }
        this.calendarService.getUserCalendar();
        this.chatService.getAllUserConversations();
        this.userData.refreshAppPages();
        this.authService.checkIncompleteOnboarding(false);
        return promise;
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
            const socketData = {
                moment: moment,
                createdAt: new Date(),
                response: response,
                author: {
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                },
                status: 'pending',
                confirmId: Math.random()
            };
            if (enableSocketIO) {
                this.socket.emit('refresh moment', moment._id, socketData); // Using the moment service socket.io to signal real time dynamic update for other devices in the same conversationId room
            }
            return response;
        } catch (err) {
            this.networkService.showNoNetworkAlert();
        }
    }

    // user actively joins an Activity
    async addUserToProgramUserList(momentId, user_list, type, token, notifyUser) {
        const moment: any = await this.load(momentId);
        if (this.userData.user) {
            try {
                const result: any = await this.updateMomentUserLists({
                    operation: 'add to lists and calendar',
                    user_lists: [user_list],
                    users: [this.userData.user._id],
                    momentId: moment._id,
                    calendarId: moment.calendar._id
                }, token);
                if (notifyUser) { // open modal box to notify user of status of joining the program
                    if (result === 'success') {
                        if (type <= 2) { // participant
                            const alert = await this.alertCtrl.create({
                                header: 'Success',
                                message: 'You have successfully joined ' + moment.matrix_string[0][0],
                                buttons: [{ text: 'Ok',
                                    handler: () => {
                                        const navTransition = alert.dismiss();
                                        navTransition.then( async () => {
                                        });
                                    }}],
                                cssClass: 'level-15'
                            });
                            alert.present();
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
                return result;
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
            const peopleComponentId = moment.resource.matrix_number[0].indexOf(10500);
            let participantsLabel = 'Participants';
            if (peopleComponentId > -1) {
                participantsLabel = moment.matrix_string[peopleComponentId].length && moment.matrix_string[peopleComponentId].length > 3 && moment.matrix_string[peopleComponentId][3] ? moment.matrix_string[peopleComponentId][3] : moment.resource['en-US'].matrix_string[peopleComponentId][5];
            }
            this.addParticipants(moment, this.resourceService.resource, 'both', ['user_list_1'], this.resourceService.resource['en-US'].value[32] + ' to ' + moment.matrix_string[0][0], this.resourceService.resource['en-US'].value[32], participantsLabel);
        }
    }

    // an user adding another user to an Activity's participant list. 
    // Only 1 list (e.g. 'user_list_1') is handled at this time even though listOfNames is an array of one element. i.e. ['user_list_1']
    async addParticipants(moment, resource, filter, listOfNames, title, action, inviteeLabel) {
        this.chatService.addSelfToConversation(); // add user's own profile to the conversation list for display purposes
        const selectedPersonOrGroup = [];
        this.chatService.conversations.forEach((item) => {
            if ((item.conversation.type === 'connect' || item.conversation.type === 'self') && item.data.participant && moment[listOfNames[0]].map((c) => c._id).indexOf(item.data.participant._id) > -1) {
                item.locked = true;
                selectedPersonOrGroup.push(item);
            }
        });
        const modal = await this.modalCtrl.create({component: PickpeoplePopoverPage, componentProps: { moment: moment, invitationType: listOfNames[0], filter: filter, includeSelf: true, title: title, action: action, conversations: selectedPersonOrGroup }});
        await modal.present();
        const {data: result} = await modal.onDidDismiss();
        let response: any;
        // the selected people will be added to moment participants list, and then shared the moment with the invitees via chat'
        let userObjectIds = [];
        const conversations = (result && result.conversations) ? result.conversations : [];
        const listOfAppUsers = (result && result.listOfAppUsers) ? result.listOfAppUsers : [];
        if (conversations && conversations.length) {
            result.conversations.forEach((item) => {
                if (item.data.participant._id) {
                    userObjectIds.push(item.data.participant._id);
                }
            });
        }
        if (listOfAppUsers && listOfAppUsers.length) {
            listOfAppUsers.forEach((appUser) => {
                if (appUser._id) {
                    userObjectIds.push(appUser._id);
                }
            });
        }
        userObjectIds = [...new Set(userObjectIds)]; // create unique set of user Ids
        // add selected users to participant list
        if (userObjectIds.length) {
            response = await this.updateMomentUserLists({
                operation: 'add to lists and calendar',
                user_lists: listOfNames,
                users: userObjectIds,
                momentId: moment._id,
                calendarId: moment.calendar._id
            }, null);
        }
        if (response === 'success') { // only if the users are successfully added do we prepare to send out notifications
            // check if there is any unconnected individual. If so, it needs to create conversations first so chat rooms are ready to receive notifications
            if (listOfAppUsers && listOfAppUsers.length) {
                const promises = listOfAppUsers.map( async (appUser) => {
                    if (appUser._id === this.userData.user._id) return; // terminate if the recipient selected is the user herself
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
        return response;
    }

    async delete(moment) {
        const promise = await this.http.delete(this.networkService.domain + '/api/moment/' + moment._id, this.authService.httpAuthOptions)
            .toPromise();
        await this.calendarService.getUserCalendar();
        await this.chatService.getAllUserConversations();
        this.userData.refreshAppPages();
        return promise;
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


