import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertController, Events, Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Chat } from './chat.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { CalendarService } from './calendar.service';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { NetworkService } from './network-service.service';

@Injectable({ providedIn: 'root' })
export class Board {

    socket: io;

    constructor(private http: HttpClient,
                private events: Events,
                private platform: Platform,
                private storage: Storage,
                private alertCtrl: AlertController,
                private authService: Auth,
                private userData: UserData,
                private chatService: Chat,
                private calendarService: CalendarService,
                private networkService: NetworkService) {
    }

    async createBoardSocket() {
        if (this.platform.is('cordova') || (this.networkService.domain !== 'https://server.restvo.com')) {
            // turn off long polling for mobile apps. Without long polling, this will fail when connecting behind firewall
            this.socket = io(this.networkService.domain + '/boards-namespace', { transports: ['websocket']}); // only for mobile apps
        } else {
            this.socket = io(this.networkService.domain + '/boards-namespace');
        }
        this.socket.on('connect', () => {
            console.log("board socket id: ", this.socket.id);
        });
        this.socket.on('refresh board', async (boardId, data) => {
            this.events.publish('refreshBoard', boardId, data);
            console.log("refresh board", data);
        });
        this.events.subscribe('loadUserChurchBoards', () => {
            this.loadUserChurchBoards();
        })
    }

    async loadUserChurchBoards() {
        this.userData.communitiesboards = await this.loadUserChurchBoardsHTTP();
        for (let community of this.userData.communitiesboards) {
            for (let board of community.boards) {
                if (this.socket) this.socket.emit('join board', board._id);
            }
        }
        this.storage.set('communitiesboards', this.userData.communitiesboards); //save in local storage for PWA's fast retrieval when reloading the board page
        return this.userData.communitiesboards;
    }

    loadUserChurchBoardsHTTP() {
        return this.http.get(this.networkService.domain + '/api/auth/loaduserchurchboards?sort=true', this.authService.httpAuthOptions).toPromise();
    }

    loadBoard(boardId) {
        return this.http.get(this.networkService.domain + '/api/board/' + boardId, this.authService.httpAuthOptions).toPromise();
    }

    loadBoardBuckets(boardId, searchKeyword, pageNum) {
        return this.http.get<[any]>(this.networkService.domain + '/api/board/buckets/' + boardId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum.toString() , this.authService.httpAuthOptions).toPromise();
    }

    loadBoardBucket(bucketId, postId){
        return this.http.get(this.networkService.domain + '/api/board/bucket/' + bucketId + '?postId=' + postId, this.authService.httpAuthOptions)
            .toPromise();
    }

    async createPost(boardId, data){
        data.post.author = this.userData.user._id; //depopulate author
        let post = await this.http.post(this.networkService.domain + '/api/board/createpost', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        this.events.publish('refreshCommunityBoardsPage');
        this.socket.emit('refresh board', boardId, {action: 'create post', post: post});
        return post;
    };

    async updatePost(boardId, post){
        delete post.comments; //no need to send comments
        let serverData = JSON.parse(JSON.stringify(post));
        serverData.author = post.author._id; //depopulate author
        serverData.boardId = boardId;
        if(serverData.moments.length) serverData.moments[0] = serverData.moments[0]._id; //depopulate moments
        let promise = await this.http.put(this.networkService.domain + '/api/board/updatepost', JSON.stringify(serverData),this.authService.httpAuthOptions)
            .toPromise();
        //post.author = this.userData.user; //populate author
        this.events.publish('refreshCommunityBoardsPage');
        this.events.publish('refreshManagePage');
        this.socket.emit('refresh board', boardId, {action: 'update post', post: post});
        return promise;
    }

    async likePost(boardId, bucketId, postId, action){
        let promise = await this.http.get(this.networkService.domain + '/api/board/likepost/' + bucketId + '?postId=' + postId + '&action=' + action, this.authService.httpAuthOptions)
            .toPromise();
        this.socket.emit('refresh board', boardId, {action: action, author: this.userData.user._id, bucketId: bucketId, postId: postId});
        return promise;
    }

    async deletePost(boardId, bucketId, postId){
        let promise = await this.http.delete(this.networkService.domain + '/api/board/deletepost/' + bucketId + '?postId=' + postId,this.authService.httpAuthOptions)
            .toPromise();
        this.events.publish('refreshCommunityBoardsPage');
        this.socket.emit('refresh board', boardId, {action: 'delete post', bucketId: bucketId, postId: postId});
        return promise;
    }

    async createComment(boardId, serverData, socketData){
        let promise = await this.http.post(this.networkService.domain + '/api/board/createcomment', JSON.stringify(serverData), this.authService.httpAuthOptions)
            .toPromise();
        this.socket.emit('refresh board', boardId, {action: 'create comment', comment: socketData});
        return promise;
    };

    async updateComment(boardId, data){
        let promise = await this.http.put(this.networkService.domain + '/api/board/updatecomment', JSON.stringify(data),this.authService.httpAuthOptions)
            .toPromise();
        this.socket.emit('refresh board', boardId, {action: 'update comment', data});
        return promise;
    }

    likeComment(bucketId, commentId, action){
        return this.http.get(this.networkService.domain + '/api/board/likecomment/' + bucketId + '?commentId=' + commentId + '&action=' + action, this.authService.httpAuthOptions)
            .toPromise();
    }

    deleteComment(bucketId, commentId){
        return this.http.delete(this.networkService.domain + '/api/board/deletecomment/' + bucketId + '?commentId=' + commentId,this.authService.httpAuthOptions)
            .toPromise();
    }

    async sharePost(data){
        if(data.conversations && data.conversations.length) {
            try {
                const promises = data.conversations.map(async (obj) => {
                    await this.chatService.sendReply(obj.conversation._id, {
                        post: data._id,
                        page: obj.conversation.type === 'connect' ? "MessagePage" : "GroupmessagePage",
                        groupId: obj.conversation.type === 'connect' ? null : obj.conversation.group._id,
                        groupName: obj.conversation.type === 'connect' ? null : obj.conversation.group.name
                    }, {
                        conversationId: obj.conversation._id,
                        post: data,
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
                });
                await Promise.all(promises);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async explainPostAbuse(event, hasAdminAccess) {
        event.stopPropagation();
        if (hasAdminAccess) {
            const alert = await this.alertCtrl.create({
                header: "Action Required", // this post has been reported
                message: "This post has been reported by a user. Please review its content and take the appropriate actions. If no action is taken, Restvo may remove this post and suspend its author.",
                buttons: [{text: 'OK'}],
                cssClass: 'level-15'
            });
            await alert.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: "Post is under Review", // this post has been reported
                message: "Someone has already submitted a report about this post. We will take the necessary actions which may lead to deleting of this post and the suspension of its author.",
                buttons: [{text: 'Close'}],
                cssClass: 'level-15'
            });
            await alert.present();
        }
    }
}


