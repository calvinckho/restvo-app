import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import {Badge} from "@ionic-native/badge/ngx";
import { ElectronService } from 'ngx-electron';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { NetworkService } from './network-service.service';
import * as io from 'socket.io-client';
import { Storage } from '@ionic/storage';
import { Conversation } from '../interfaces/chat';
import {Router} from "@angular/router";
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Chat {

    socket: io;
    conversations: any = [];
    connectTabBadge: number;
    currentChatProps: any = [];

    onlineUsers: any = [];
    onlineUsersSockets: any = [];
    liveConversations: any = {};
    liveVideoChats: any = {};

    private _openChat: BehaviorSubject<any> = new BehaviorSubject(null);
    private _toggleVideoChat: BehaviorSubject<any> = new BehaviorSubject(null);
    private _toastNotification: BehaviorSubject<any> = new BehaviorSubject(null);
    private _chatMessage: BehaviorSubject<any> = new BehaviorSubject(null);


    public readonly openChat$: Observable<any> = this._openChat.asObservable();
    public readonly toggleVideoChat$: Observable<any> = this._toggleVideoChat.asObservable();
    public readonly toastNotification$: Observable<any> = this._toastNotification.asObservable();
    public readonly chatMessage$: Observable<any> = this._chatMessage.asObservable();


    constructor(private http: HttpClient,
                private zone: NgZone,
                private router: Router,
                private alertCtrl: AlertController,
                private authService: Auth,
                private electronService: ElectronService,
                private badge: Badge,
                private networkService: NetworkService,
                private platform: Platform,
                private userData: UserData,
                private storage: Storage) {
        console.log('Hello Chat Provider');
        this.connectTabBadge = 0;
    }

    openChat(data) {
        this._openChat.next(data);
    }

    toggleVideoChat(data) {
        this._toggleVideoChat.next(data);
    }

    toastNotification(res) {
        this._toastNotification.next(res);
    }

    broadcastChatMessage(res) {
        this._chatMessage.next(res);
    }

    async createConversationSocket() {
        this.zone.runOutsideAngular(() => {
            if (this.networkService.domain !== 'https://server.restvo.com') { // for debugging purpose only: socket.io disconnects regularly with localhost
                this.socket = io(this.networkService.domain + '/', {transports: ['websocket']});
            } else {
                this.socket = io(this.networkService.domain + '/');
                // console.log("initiating chat socket io", this.socket ? this.socket.id : null)
            }
        });
        this.socket.on('connect', async () => { //callback after successful socket.io connection
            const conversations = await this.storage.get('conversations');
            this.conversations = conversations || [];
            // console.log("chat socket id: ", this.socket.id, "conv in storage:", this.conversations.length);
            if (this.conversations.length){
                for(let i = 0; i < this.conversations.length; i++) {
                    // join conversation rooms in socket.io, also send online status if enabled
                    this.socket.emit('enter conversation', this.conversations[i].conversation._id, this.userData.user._id, (await this.userData.checkRestExpired() ? { action: 'ping', state: 'online', origin: this.socket.id } : null));
                }
            }
        });
        this.socket.on('reconnect', async () => {
            console.log('reconnect chat id', this.socket.id);
            if (this.conversations.length) {
                for (let i = 0; i < this.conversations.length; i++) {
                    // join conversation rooms in socket.io, also send online status if enabled
                    this.socket.emit('enter conversation', this.conversations[i].conversation._id, this.userData.user._id, (await this.userData.checkRestExpired() ? { action: 'ping', state: 'online', origin: this.socket.id } : null));
                }
            }
        });
        this.socket.on('online status', async (conversationId, userId, status) => { //socket.io update on change in friends' online status
            try {
                if (status.state === 'online') { //if a friend is entering active mode
                    if (userId !== this.userData.user._id) { // only add to arrays if from other users
                        if (status.action === 'ping') { //send a pong to update the friend about my online status
                            if (await this.userData.checkRestExpired()) this.socket.emit('online status', conversationId, this.userData.user._id, { action: 'pong', state: 'online', origin: status.origin, videoChatRoomId: (conversationId === this.userData.videoChatRoomId ? this.userData.videoChatRoomId : '') });
                        }
                        if (this.onlineUsersSockets.indexOf(status.origin) < 0) { //only if unique
                            this.onlineUsers.push(userId);
                            this.onlineUsersSockets.push(status.origin);
                        }
                        if (!this.liveConversations.hasOwnProperty(conversationId)) { // if not yet initiated
                            this.liveConversations[conversationId] = {users: [userId], sockets: [status.origin]};
                            //console.log('add live conv', this.liveConversations[conversationId]);
                        } else {
                            if (this.liveConversations[conversationId].sockets.indexOf(status.origin) < 0) { //only if unique userId
                                this.liveConversations[conversationId].users.push(userId);
                                this.liveConversations[conversationId].sockets.push(status.origin);
                                //console.log('add more live conv', this.liveConversations[conversationId]);
                            }
                        }
                        if (status.hasOwnProperty('videoChatRoomId') && status.videoChatRoomId.length) { //if the friend is in a chat room
                            if (!this.liveVideoChats.hasOwnProperty(conversationId)) { // if user in a video chat room and not yet initiated
                                this.liveVideoChats[conversationId] = {users: [userId], sockets: [status.origin]};
                            } else {
                                if (this.liveVideoChats[conversationId].sockets.indexOf(status.origin) < 0) { //only if unique userId
                                    this.liveVideoChats[conversationId].users.push(userId);
                                    this.liveVideoChats[conversationId].sockets.push(status.origin);
                                }
                            }
                        }
                        //console.log("online", conversationId, userId, status);
                    }
                } else if (status.state === 'leave video chat') {
                    if (this.liveVideoChats.hasOwnProperty(status.videoChatRoomId)) {
                        let i = this.liveVideoChats[status.videoChatRoomId].sockets.indexOf(status.origin);
                        if (i > -1) {
                            this.liveVideoChats[status.videoChatRoomId].users.splice(i, 1); //remove userId from live chat users array
                            this.liveVideoChats[status.videoChatRoomId].sockets.splice(i, 1); //remove userId from live chat users array
                        }
                    }
                    this.onlineUsersSockets.forEach((socket, index) => { //remove userId and socket id from the online users arrays
                        if (socket === status.origin) {
                            this.onlineUsers.splice(index, 1);
                            this.onlineUsersSockets.splice(index, 1);
                        }
                    });
                } else if (status.state === 'offline') { //if a friend's status became offline (including away mode)
                    if (this.liveConversations.hasOwnProperty(conversationId)) {
                        let i = this.liveConversations[conversationId].sockets.indexOf(status.origin);
                        if (i > -1) {
                            this.liveConversations[conversationId].users.splice(i, 1); //remove userId from live conversation users array
                            this.liveConversations[conversationId].sockets.splice(i, 1); //remove userId from live conversation users array
                            //console.log('offline', this.liveConversations[conversationId]);
                        }
                    }
                    if (this.liveVideoChats.hasOwnProperty(conversationId)) {
                        let j = this.liveVideoChats[conversationId].sockets.indexOf(status.origin);
                        if (j > -1) {
                            this.liveVideoChats[conversationId].users.splice(j, 1); //remove userId from live chat users array
                            this.liveVideoChats[conversationId].sockets.splice(j, 1); //remove userId from live chat users array
                        }
                    }
                    this.onlineUsersSockets.forEach((socket, index) => { //remove userId and socket id from the online users arrays
                        if (socket === status.origin) {
                            this.onlineUsers.splice(index, 1);
                            this.onlineUsersSockets.splice(index, 1);
                        }
                    });
                }
            } catch (err) {
                console.log('something went wrong with the online status algorithm', err);
            }
        });
        this.socket.on('refresh messages', async (message) => { //got an incoming message, including one's own send message confirmation
            console.log('incoming message...', message);
            this.broadcastChatMessage(message); // broadcast an incoming message
            if (message.author._id !== this.userData.user._id) { // incrementing the badges when incoming message is received from another user
                this.connectTabBadge++; // increment the Chat Tab badge count
                if (!this.router.url.includes('/app/myconversations') || !this.currentChatProps.length || (this.platform.width() < 768 && this.currentChatProps.length && this.currentChatProps[this.currentChatProps.length - 1].conversationId !== message.conversationId)) { // if the user is not in the chat room or is outside of the chat view
                    this.toastNotification({type: 'message', data: message});
                }
                const index = this.conversations.map((c) => c.conversation._id).indexOf(message.conversationId);
                if (index > -1) { // move the incoming message to top of list
                    const conversation = this.conversations[index];
                    this.conversations.splice(index, 1);
                    this.conversations.unshift(conversation);
                }
                const currentChatProp = this.currentChatProps.find((c) => c.conversationId === message.conversationId);
                if (currentChatProp) {
                    currentChatProp.badge++;
                    console.log('chatProp badge...', currentChatProp.badge);
                }
            }
        });
        //socket.io broadcasting refresh status update about a group/topic/conversation
        this.socket.on('refresh status', async (conversationId, data) => {
            console.log("receiving refresh", data);
            if (data.action === 'update leader status'){
                this.authService.refreshGroupStatus({conversationId: conversationId, data: data});
            } else if (data.action === 'update group member list'){
                await this.userData.load(); //for the rare case that a user's other device is viewing the group info
                this.authService.refreshGroupStatus({conversationId: conversationId, data: data});
            } else if (data.action === 'leave group'){
                await this.userData.load();
                this.userData.refreshUserStatus({ type: 'close group view', data: { _id: data.groupId }});
            } else if (data.action === 'refresh moment'){
                // sending moment update using moment's conversation socket.io
                // ex. Goal is due, Poll is due
                this.toastNotification({type: 'moment', data: data}); //this triggers app.component.ts line
            } else {
                console.log("receiving refresh 2", data);
                await this.userData.load();
                this.userData.refreshMyConversations({action: 'reload', conversationId: 'all'});
                this.authService.refreshGroupStatus({conversationId: conversationId, data: data});
            }
        });
    };

    getAllUserConversationIds() {
        return lastValueFrom(this.http.get<[{_id: string}]>(this.networkService.domain + '/api/chat/ids', this.authService.httpAuthOptions)
            );
        /*return new Promise((resolve) => {
            this.http.get<[{_id: string}]>(this.networkService.domain + '/api/chat/ids', this.authService.httpAuthOptions)
                .map((result) => {
                    resolve(result);
                });
        });*/
    }

    async getAllUserConversations() {
        try {
            let conversations = await this.storage.get('conversations');
            this.conversations = conversations || [];
        } catch (err) {
            console.log('no conversation in storage');
        }
        const lastUpdatedAt = this.findLatestTimeStamp(this.conversations);
        try {
            // the app only checks for conversations updated/created after the caches' last updatedAt timestamp
            const latestConversations = await this.fetchLatestConversations(lastUpdatedAt);
            for (let i = latestConversations.length - 1; i > -1; i--) {
                const index = this.conversations.map((c) => c.conversation._id).indexOf(latestConversations[i].conversation._id);
                if (index > -1) { // if the conversation was loaded and new update is available
                    this.conversations.splice(index, 1);
                    this.conversations.unshift(latestConversations[i]);
                } else { // if the conversation has not been loaded before
                    this.conversations.unshift(latestConversations[i]);
                    this.socket.emit('enter conversation', latestConversations[i].conversation._id, this.userData.user._id, (await this.userData.checkRestExpired() ? { action: 'ping', state: 'online', origin: this.socket.id } : null));
                }
            }
            if (this.conversations.length) {
                // fetching all conversation ids from backend and check for consistency. this is needed since we are cahcing old conversations, and it ensures the integrity of the cached conversation data
                // eg. when user deletes a conversation on another device, and this device needs to update its cache
                let conversationIdsFromServer = await this.getAllUserConversationIds();
                for (let i = this.conversations.map((c) => c.conversation._id).length - 1; i > -1; i--) {
                    const index = conversationIdsFromServer.indexOf(this.conversations.map((c) => c.conversation._id)[i]);
                    if (index > -1) { // if a cached conversation is current with the server record
                        conversationIdsFromServer.splice(index, 1); // remove the conversation Id from the list
                    } else { // check for disconnected conversations
                        this.socket.emit('leave conversation', this.conversations.map((c) => c.conversation._id)[i], this.userData.user._id, (await this.userData.checkRestExpired() ? { action: 'ping', state: 'offline' } : null));
                        this.conversations.splice(i, 1);
                    }
                }
                if (conversationIdsFromServer.length) { // if a conversation is missing in the cached conversation array, get a fresh copy of the conversations array from the server
                    this.conversations = await this.fetchLatestConversations(null);
                }
            }
            if (this.conversations.length) {
                this.storage.set('conversations', this.conversations);
            }
            // console.log('current conv length', this.conversations.length, this.conversations.find((c) => c.conversation._id === '5e0e6f8200b2420a07547c2c'));
            this.userData.refreshMyConversations({action: 'render', data: null}); // refresh the list of conversation
            return this.conversations;
        } catch (err) {
            console.log(err);
            return await this.storage.get('conversations');
        }
    };

    async fetchLatestConversations(lastUpdatedAt){
        let urlString = lastUpdatedAt ? '?lastUpdatedAt=' + new Date(lastUpdatedAt).getTime() : '';
        let conversations = await lastValueFrom(this.http.get<[any]>(this.networkService.domain + '/api/chat' + urlString, this.authService.httpAuthOptions));
        if (!urlString && conversations && conversations.length) { // if loading conversations for the first time, do a sort by updatedAt in descending order
            conversations.sort((a, b) => {
                const c: any = new Date(a.conversation.updatedAt);
                const d: any = new Date(b.conversation.updatedAt);
                return (d - c);
            });
        }
        return conversations;
    }

    findLatestTimeStamp(conversations) {
        let latestTimeStamp = 0;
        conversations.forEach((obj) => {
            latestTimeStamp = (new Date(obj.conversation.updatedAt).getTime() > new Date(latestTimeStamp).getTime()) ? obj.conversation.updatedAt : latestTimeStamp;
        });
        return latestTimeStamp;
    }

    async refreshTabBadges() {
        let connectTabBadge = 0;
        const conversations = await this.getAllUserConversations();
        if (conversations) {
            conversations.forEach((obj) => {
                if (obj.data && obj.data.badge) {
                    connectTabBadge += obj.data.badge;
                }
            });
            this.connectTabBadge = connectTabBadge;
            if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                this.badge.set(this.connectTabBadge);
            }
            if (this.electronService.isElectronApp) {
                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', (this.connectTabBadge > -1) ? this.connectTabBadge : 0);
            }
        }
    };

    getConversationByRecipientId(recipientId, returnRecipientData, programId) {
        return lastValueFrom(this.http.get<any>(this.networkService.domain + '/api/chat/check/' + recipientId + (returnRecipientData ? '?version=2' : '' + (programId ? '&programId=' + programId : '')), this.authService.httpAuthOptions)
            );
    };

    getConversationById(conversationId, pageNum) {
        return lastValueFrom(this.http.get<Conversation>(this.networkService.domain + '/api/chat/' + conversationId + '?pageNum=' + pageNum, this.authService.httpAuthOptions)
            );
    };

    async newConversation(recipientId, message){
        const promise = await lastValueFrom(this.http.post(this.networkService.domain + '/api/chat/new/' + recipientId, JSON.stringify(message), this.authService.httpAuthOptions)
            );
        this.userData.socket.emit('refresh user status', recipientId, {type: 'connect conversation'});
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'connect conversation'});
        return promise;
    };

    resetBadgeCount(conversationId){
        return lastValueFrom(this.http.post<number>(this.networkService.domain + '/api/chat/resetbadgecount/' + conversationId, {}, this.authService.httpAuthOptions)
            );
    };

    async sendReply(conversationId, serverData, socketData){
        let promise = await lastValueFrom(this.http.post(this.networkService.domain + '/api/chat/' + conversationId, JSON.stringify(serverData), this.authService.httpAuthOptions)
            );
        if (serverData.groupId) {
            socketData.group = {_id: serverData.groupId, name: serverData.groupName};
        }
        this.socket.emit('send message', conversationId, socketData);
        return promise;
    };

    async notifyOfInvitation(conversations, moment, user_list) {
        try {
            const peopleComponentId = moment.resource.matrix_number[0].indexOf(10500);
            let inviteeLabel = 'Participant';
            if (peopleComponentId > -1) {
                switch (user_list) {
                    case 'user_list_1':
                        inviteeLabel = moment.matrix_string[peopleComponentId].length && moment.matrix_string[peopleComponentId].length > 2 && moment.matrix_string[peopleComponentId][2] ? moment.matrix_string[peopleComponentId][2] : moment.resource['en-US'].matrix_string[peopleComponentId][4];
                        break;
                    case 'user_list_2':
                        inviteeLabel = moment.matrix_string[peopleComponentId].length && moment.matrix_string[peopleComponentId].length > 4 && moment.matrix_string[peopleComponentId][4] ? moment.matrix_string[peopleComponentId][4] : moment.resource['en-US'].matrix_string[peopleComponentId][6];
                        break;
                    case 'user_list_3':
                        inviteeLabel = moment.matrix_string[peopleComponentId].length && moment.matrix_string[peopleComponentId].length > 0 && moment.matrix_string[peopleComponentId][0] ? moment.matrix_string[peopleComponentId][0] : moment.resource['en-US'].matrix_string[peopleComponentId][8];
                        break;
                }
            }
            conversations.forEach( async (obj) => {
                if (obj.conversation.type === 'self') return; // no need to send notification if the conversation record is self
                await this.sendReply(obj.conversation._id, {
                    composedMessage: this.userData.user.first_name + ' ' + this.userData.user.last_name + ' added you as ' + inviteeLabel,
                    page: obj.conversation.type === 'connect' ? "MessagePage" : "GroupmessagePage",
                    groupId: obj.conversation.type === 'connect' ? null : obj.conversation.group._id,
                    groupName: obj.conversation.type === 'connect' ? null : obj.conversation.group.name
                }, {
                    conversationId: obj.conversation._id,
                    body: this.userData.user.first_name + ' ' + this.userData.user.last_name + ' has added you as ' + inviteeLabel,
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
                setTimeout(() => {
                    this.sendReply(obj.conversation._id, {
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
                }, 1000);
            });
        } catch (err) {
            console.log(err);
        }
    }

    eraseUserMessages(memberId, conversationId) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/chat/erasemessages', JSON.stringify({
            memberId: memberId,
            conversationId: conversationId
        }), this.authService.httpAuthOptions))
    };

    shareContactInfo(conversationId){
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/chat/sharecontactinfo/' + conversationId, {}, this.authService.httpAuthOptions)
            );
    }

    async blockConversation(conversationId, recipientId, data){
        let promise = await lastValueFrom(this.http.put(this.networkService.domain + '/api/chat/block/' + conversationId, data,this.authService.httpAuthOptions)
            );
        this.userData.socket.emit('refresh user status', recipientId, {type: 'disconnect conversation', conversationId: conversationId});
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'disconnect conversation', conversationId: conversationId});
        return promise;
    };

    async unblockConversation(conversationId, recipientId){
        let promise = await lastValueFrom(this.http.put(this.networkService.domain + '/api/chat/unblock/' + conversationId, null,this.authService.httpAuthOptions)
            );
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'connect conversation', data: {_id: conversationId}});
        this.userData.socket.emit('refresh user status', recipientId, {type: 'connect conversation', data: {_id: conversationId}});
        return promise;
    };

    async deleteConversation(conversationId, recipientId){
        let promise = lastValueFrom(this.http.delete(this.networkService.domain + '/api/chat/' + conversationId, this.authService.httpAuthOptions));
        this.userData.socket.emit('refresh user status', recipientId, {type: 'disconnect conversation', conversationId: conversationId});
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'disconnect conversation', conversationId: conversationId});
        return promise;
    };

    togglePushNotification(conversationId, preference){
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/chat/pushnotification/' + conversationId, JSON.stringify({preference: preference}), this.authService.httpAuthOptions));
    }

    async toggleRestStatus(event) {
        try {
            if (!this.userData.user.hasOwnProperty('restSchedule') && event === 'away') { // if toggling for the first time
                const expiredAt = new Date(new Date().getTime() + 8 * 60 * 60 * 1000); // set rest expired to 8 hours later
                await this.userData.update({ restSchedule: { breakExpiredAt: expiredAt }} );
                this.userData.UIrestStatus = 'away';
                this.conversations.forEach((obj) => {
                    this.socket.emit('online status', obj.conversation._id, this.userData.user._id, { action: 'ping', state: 'offline', origin: this.socket.id });
                });
            } else if (await this.userData.checkRestExpired() && event === 'away') { // when switching from active to away
                const expiredAt = new Date(new Date().getTime() + 8 * 60 * 60 * 1000); // set rest expired to 8 hours later
                await this.userData.update({ restSchedule: { breakExpiredAt: expiredAt }} );
                this.userData.UIrestStatus = 'away';
                this.conversations.forEach((obj) => {
                    this.socket.emit('online status', obj.conversation._id, this.userData.user._id, { action: 'ping', state: 'offline', origin: this.socket.id });
                });
            } else if (event === 'active') { // when switching from rest to active
                const expiredAt = new Date(new Date().getTime() - 60 * 60 * 1000); // set rest expired to an arbitrary past date (i.e. 1 hour ago)
                await this.userData.update({ restSchedule: { breakExpiredAt: expiredAt }} );
                this.userData.UIrestStatus = 'active';
                this.conversations.forEach((obj) => {
                    this.socket.emit('online status', obj.conversation._id, this.userData.user._id, { action: 'ping', state: 'online', origin: this.socket.id });
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}
