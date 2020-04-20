import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {CacheService} from 'ionic-cache';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { Plyr } from "plyr";

import {
    ActionSheetController,
    IonContent,
    IonInfiniteScroll,
    NavController,
    ModalController,
    AlertController,
    Platform,
    IonSlides
} from '@ionic/angular';

import {UserData} from "../../../services/user.service";
import {Board} from "../../../services/board.service";
import {Moment} from "../../../services/moment.service"
import {Groups} from "../../../services/group.service";
import {Response} from "../../../services/response.service";
import {Churches} from "../../../services/church.service";
import {Chat} from "../../../services/chat.service";
import {Auth} from "../../../services/auth.service";
import {EditboardpostPage} from "../editboardpost/editboardpost.page";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {ShowboardpostPage} from "../showboardpost/showboardpost.page";
import {ShowcommunityPage} from "../../community/showcommunity/showcommunity.page";
import {GroupboardPage} from "../groupboard/groupboard.page";
import {EditcommunityPage} from "../../community/editcommunity/editcommunity.page";
import {EditgroupPage} from "../../group/editgroup/editgroup.page";
import {Resource} from "../../../services/resource.service";
import {GroupchatPage} from "../../group/groupchat/groupchat.page";
import {ShowgroupPage} from "../../group/showgroup/showgroup.page";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";

@Component({
  selector: 'app-communityboard',
  templateUrl: './communityboard.page.html',
  styleUrls: ['./communityboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityboardPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild(IonSlides, {static: false}) slides: IonSlides;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    communitiesboards: any;
    searchKeyword: string = '';
    communityNum: number = 0;
    reachedEnd: boolean = false;
    ionSpinner: boolean = false;
    isGroupLeader: boolean = false;
    newsfeedMoreOptions = false;
    mediaList: Array<{_id: string, player: Plyr}> = [];

    subscriptions: any = {};

    constructor(public platform: Platform,
                private cache: CacheService,
                private router: Router,
                private storage: Storage,
                private actionSheetCtrl: ActionSheetController,
                private navCtrl: NavController,
                private authService: Auth,
                public momentService: Moment,
                private resourceService: Resource,
                private responseService: Response,
                private boardService: Board,
                private chatService: Chat,
                public userData: UserData,
                private churchService: Churches,
                private groupService: Groups,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController) { }

  async ngOnInit() {
      // PWA fast load is executed after an event sent from app.component.ts's checkAuthenticationWithToken()
      this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshPage);
      this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
  }

    async ionViewWillEnter() {
        // boardService is ready in regular page entry, but not ready in PWA fast load and needs to listen to refresh event from maintab.ts
        if (this.userData.user){
            await this.boardService.loadUserChurchBoards();
            this.reloadBoardPosts();
            this.content.scrollToTop(0);
        }
    }

    refreshPage = async (res) => {
        if (res && res.type === 'refresh community board page') {
            this.newsfeedMoreOptions = false;
            await this.boardService.loadUserChurchBoards();
            this.reloadBoardPosts();
        }
        if (res && res.type === 'refresh board') {
            const boardId = res.boardId;
            const data = res.data;
            for (let community of this.communitiesboards) {
                for (let board of community.boards) {
                    if (board._id === boardId) { // the incoming board is displayed
                        board.updatedAt = new Date().toISOString();
                        if (data.action === 'create post') {
                            this.reloadBoardPosts();
                        } else if(data.action === 'delete post') {
                            let index = board.posts.map((c) => {return c._id;}).indexOf(data.postId);
                            if (board.posts[index].media && board.posts[index].media.length) {
                                this.destroyPlayers(board.posts[index].media._id);
                            }
                            board.posts.splice(index, 1);
                            this.reorderCommunitiesBoards();
                        } else if (data.action === 'like' || data.action === 'cancel like') {
                            for (let boardpost of board.posts) {
                                if (boardpost.bucketId === data.bucketId && boardpost._id === data.postId) {
                                    if (data.action === 'like') {
                                        boardpost.likes.push(data.author);
                                    } else if (data.action === 'cancel like') {
                                        let index = boardpost.likes.indexOf(data.author);
                                        boardpost.likes.splice(index, 1);
                                    }
                                }
                            }
                        } else if (data.action === 'update post') {
                            for (let boardpost of board.posts) {
                                if (boardpost._id === data.post._id) {
                                    boardpost.body = data.post.body;
                                    boardpost.attachments = data.post.attachments;
                                    if (boardpost.media && boardpost.media.length && data.post.media && !data.post.media.length) {
                                        this.destroyPlayers(boardpost.media[0]._id);
                                    }
                                    boardpost.media = data.post.media;
                                    this.reorderCommunitiesBoards();
                                    if (data.post.moments && data.post.moments.length && data.post.moments[0] && data.post.moments[0].resource.hasOwnProperty('en-US') && data.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                                        this.reloadBoardPosts(); //reload is needed to create a new moment socket.io for the feature
                                    } else {
                                        boardpost.moments = data.post.moments;
                                    }
                                }
                                if (boardpost.comments && boardpost.comments.length && boardpost.comments[0]){
                                    this.reloadBoardPosts();
                                }
                            }
                        } else if (data.action === 'create comment') {
                            console.log("create comment", data);
                            for (let boardpost of board.posts) {
                                if (boardpost._id === data.comment.parentId) { //first level comment
                                    boardpost.comments.unshift(data.comment)
                                }
                            }
                            //this.reorderCommunitiesBoards();
                        } else { // data.action === 'refresh board'. Need to refresh all users' feeds
                            await this.boardService.loadUserChurchBoards();
                            this.reloadBoardPosts();
                        }
                    }
                }
            }
        }
    };

    async reloadBoardPosts(){
        setTimeout(async () => {
            this.destroyPlayers(null);
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.communitiesboards = [];
            this.communityNum = -1;
            this.listcommunityboardposts({target: this.infiniteScroll});
        }, 100);
    }

    async listcommunityboardposts(event) {
        this.communityNum++;
        let currentCommunityId = '';
        if (this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
            currentCommunityId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
        } else {
            currentCommunityId = '5ab62be8f83e2c1a8d41f894';
        }
        let selectedCurrentCommunity = (currentCommunityId === this.userData.communitiesboards[this.communityNum]._id); // if matches current community which can only be Restvo
        let selectedRestvo = (currentCommunityId === '5ab62be8f83e2c1a8d41f894');
        if (!this.reachedEnd && (selectedCurrentCommunity)) { // || selectedRestvo)) { // only showing Restvo
            let buckets: any;
            this.communitiesboards.push(this.userData.communitiesboards[this.communityNum]);
            this.communitiesboards[this.communitiesboards.length - 1].postCount = 0;
            for (let board of this.communitiesboards[this.communitiesboards.length - 1].boards) {
                board.posts = [];
                board.preview_posts = [];
                board.postCount = 0;
                buckets = await this.boardService.loadBoardBuckets(board._id, this.searchKeyword, 1); // load the first page of each feed
                this.ionSpinner = false;
                for (const bucket of buckets){
                    bucket.posts.forEach((post, i) => {
                        this.communitiesboards[this.communitiesboards.length - 1].postCount++;
                        board.postCount++;
                        post.bucketId = bucket._id;
                        board.posts.push(post);
                        if (((new Date().getTime() - new Date(post.updatedAt).getTime()) < 7 * 24 * 60 * 60 * 1000) || i < 2) {
                            board.preview_posts.push(post);
                        }
                    });
                }
                let momentIds = [];
                for (let post of board.posts) {
                    if (post.moments && post.moments.length && post.moments[0].resource && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] === 'Poll') {
                        momentIds.push(post.moments[0]._id);
                        post.poll = {
                            display: [],
                            responses: [],   //list of all of the responses that users give.
                            winner: [],      //list of the highest vote count indexes
                            totalVoteCount: 0
                        };
                        for (let option of post.moments[0].matrix_string[1]) {
                            post.poll.display.push({option: option, votedByUser: false, count: 0});
                        }
                    }
                    //this.communitiesboards.push(post);
                }
                if (momentIds.length){
                    momentIds.forEach((momentId) => {
                        if (this.momentService.socket) {
                            this.momentService.socket.emit('join moment', momentId) ;
                        }
                    });
                    let responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
                    let responseResponse = this.cache.loadFromDelayedObservable('response-' + board._id, responseRequest, 'boards', 5, 'all');
                    responseResponse.subscribe(async (responses) => {
                        board.posts.forEach(async (boardpost: any) => {
                            if (boardpost.moments[0] && boardpost.moments[0].resource && boardpost.moments[0].resource.field && boardpost.moments[0].resource.hasOwnProperty('en-US') && boardpost.moments[0].resource['en-US'].value[0] === 'Poll') {
                                for (let response of responses) {
                                    if (response.moment == boardpost.moments[0]._id) {
                                        const index = boardpost.poll.responses.map((c) => c._id).indexOf(response._id);
                                        if (index < 0) { //if the response hasn't been added to the response list
                                            boardpost.poll.responses.push(response);
                                        } else { //if it has been added, and if the incoming response is newer
                                            if (new Date(boardpost.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                boardpost.poll.responses.splice(index, 1, response);
                                            }
                                        }
                                    }
                                }
                                //now the latest response have been included, reset the display array
                                await boardpost.poll.display.forEach((displayitem) => {
                                    displayitem.count = 0;
                                    displayitem.votedByUser = false;
                                });
                                //reconstruct the display array
                                boardpost.poll.totalVoteCount = boardpost.poll.responses.length;
                                for (let response of boardpost.poll.responses) {
                                    if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                        if (response.matrix_number[0][1] > (boardpost.poll.display.length - 1)) {
                                            return; // if this response belongs to an option that has been deleted
                                        }
                                        if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                            boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                        }
                                        boardpost.poll.display[response.matrix_number[0][1]].count++;
                                    }
                                }
                            }
                        });
                    });
                }
            }
            if (this.newsfeedMoreOptions) {
                this.loadCommunityGroups(this.communitiesboards[this.communitiesboards.length - 1]);
            }
            event.target.complete();
            if (this.communitiesboards[this.communitiesboards.length - 1].postCount < 4 && this.communityNum < (this.userData.communitiesboards.length - 1)) {
                await this.listcommunityboardposts({target: this.infiniteScroll});
            }
            if ((selectedCurrentCommunity/* && !selectedRestvo*/) || this.communityNum === (this.userData.communitiesboards.length - 1)) {
                this.reachedEnd = true;
                event.target.disabled = true;
            }
        } else {
            this.ionSpinner = false;
            if (this.communityNum < this.userData.communitiesboards.length - 1) {
                await this.listcommunityboardposts({target: this.infiniteScroll});
            }
            if (this.communityNum === this.userData.communitiesboards.length - 1){
                this.reachedEnd = true;
                event.target.disabled = true;
            }
            event.target.complete();
        }
        console.log("check", this.communitiesboards)
    }

    loadMorePosts(board) {
        board.preview_posts = board.posts;
    }

    async openBoard(event, board, community){
        event.stopPropagation();
        if (board.group && board._id){
            /*let selectedBoard = JSON.parse(JSON.stringify(board));
            let selectedGroup = JSON.parse(JSON.stringify(board.group));
            delete selectedBoard.group;
            selectedGroup.board = board._id;
            selectedGroup.name = board.name;
            const boardPage = await this.modalCtrl.create({component: GroupboardPage, componentProps: {
                    group: selectedGroup,
                    page: 'board'
                }});
            await boardPage.present();*/
            this.createNewPost(board);
        } else {
            const result: any = await this.userData.checkAdminAccess(community._id);
            if (result && result.hasRestvoAdminAccess) {
                this.createNewPost(board);
            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Community Topic',
                    subHeader: 'You do not have access to post in ' + community.name + ' - ' + board.name + '. Submitting post to a community topic will be available in a future release.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                return await alert.present();
            }
        }
    }

    async createNewBoard(community) {
        let hasPlatformAdminAccess = false;
        if (this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894') {
            const result: any = await this.userData.checkAdminAccess(community._id);
            hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
        } else {
            hasPlatformAdminAccess = this.userData.hasPlatformAdminAccess;
        }
        this.promptBoardName(hasPlatformAdminAccess, community._id);

    }

    async promptBoardName(access, communityId) {
        const alert = await this.alertCtrl.create({
            header: 'Enter a Name for the new Topic:',
            inputs: [{
                name: 'name',
                type: 'text',
                placeholder: 'Name for the new Topic'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel topic creation');
                        return
                    }
                }, {
                    text: 'Ok',
                    handler: data => {
                        if (access){
                            this.promptBoardType(data.name, communityId);
                        } else {
                            this.createPersonalBoard(data.name, communityId);
                        }
                    }
                }
            ],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async promptBoardType(name, communityId) {
        const alert = await this.alertCtrl.create({
            header: 'Make ' + name + ' a default News Feed for all community members?',
            inputs: [{
                    name: 'community',
                    type: 'radio',
                    label: 'Yes, set as default.',
                    value: 'default',
                    checked: true
                },
                {
                    name: 'personal',
                    type: 'radio',
                    label: 'No, leave it as optional.',
                    value: 'optional'
                }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel topic creation');
                        return
                    }
                }, {
                    text: 'Ok',
                    handler: data => {
                        console.log("result", data);
                        if (data === 'default'){
                            this.createCommunityBoard(name, communityId);
                        } else {
                            this.createPersonalBoard(name, communityId);
                        }
                    }
                }
            ],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async createCommunityBoard(name, communityId) {
        this.ionSpinner = true;
        let boardId = await this.churchService.editCommunityBoard({action: "create", board: {name: name, church: communityId}});
        //refresh the boards slide array
        this.boardService.socket.emit('join board', boardId);
        this.reloadBoardPosts();
    }

    async createPersonalBoard(name, communityId) {
        this.ionSpinner = true;
        const [church] = await this.churchService.loadChurchProfile(communityId);
        const group = {name: name, details: '', emailDisabled: false, smsDisabled: false, churchId: communityId, board: '', meeting_day: '', meeting_frequency: '', beginAt: new Date().toISOString(), endAt: new Date().toISOString(), meeting_location: {location: '', street: church.meeting_location.street, city: church.meeting_location.city, state: church.meeting_location.state, country: church.meeting_location.country}, published: false, public_group: true, flagged: false, publishedAt: null, expiredAt: null};
        const createdGroup: any = await this.groupService.createGroupProfile(group); //will also update userData's groups and userData's communityboards list
        //refresh the boards slide array
        this.boardService.socket.emit('join board', createdGroup.board);
        this.reloadBoardPosts();
    }

    async createNewPost(board) {
        const editPostPage = await this.modalCtrl.create({component: EditboardpostPage, componentProps: { boardId: board._id }});
        await editPostPage.present();
        const {data: refreshNeeded} = await editPostPage.onDidDismiss();
        if(refreshNeeded){
            //this.reloadBoardPosts();
        }
    }

    async openPost(event, board, post) {
        event.stopPropagation();
        let isGroupLeader = false;
        let hasPlatformAdminAccess = false;
        if (board.group && board.group.leaders){
            isGroupLeader = board.group.leaders.map((c) => c._id).indexOf(this.userData.user._id) > -1;
        }
        if (board.group && board.group.churchId) {
            const result: any = await this.userData.checkAdminAccess(board.group.churchId);
            hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
        }
        const showBoardPage = await this.modalCtrl.create({component: ShowboardpostPage, componentProps: { boardId: board._id, post: post, isGroupLeader: isGroupLeader, hasPlatformAdminAccess: hasPlatformAdminAccess }});
        await showBoardPage.present();
        const {data: refreshNeeded} = await showBoardPage.onDidDismiss();
        if(refreshNeeded){
            //this.reloadBoardPosts();
        }
    }

    async openRestvoFeature(event, moment) { //when tap on a Restvo feature
        event.stopPropagation();
        const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: {moment: moment, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
            this.reloadBoardPosts();
        }
    }

    async likePost(event, board, post){
        event.stopPropagation();
        let action = (post.likes.indexOf(this.userData.user._id) > -1) ? "cancel like" : "like";
        await this.boardService.likePost(board._id, post.bucketId, post._id, action);
        //this.reloadBoardPosts();
    }

    async showCommunityProfile(community) {
        const modal = await this.modalCtrl.create({component: ShowcommunityPage,
            componentProps: {community: community, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
        }

    }

    async seeUserInfo(event, recipient) {
        event.stopPropagation();
        const modal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: recipient, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
        }
    }

    async presentPickPeoplePopover(event) {
        event.stopPropagation();
        const alert = await this.alertCtrl.create({
            header: 'Sharing is Coming Soon',
            subHeader: 'This feature will be available in a future release.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        return await alert.present();
    }

    //get the latest user data from the server
    refresh(event) {
        this.ionSpinner = true;
        this.communitiesboards = [];
        this.reloadBoardPosts();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    async noNetworkConnection(){
        const networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            subHeader: 'Please check your internet connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }

    displayTimeElapsed(dateTime) {
        let minElapsed = Math.round((new Date().getTime() - new Date(dateTime).getTime())/(1000 * 60));
        if(minElapsed < 60){
            return minElapsed.toString() + 'm ago';
        }
        else if(minElapsed >= 60 && minElapsed < (60 * 24)){
            return Math.round(minElapsed/60).toString() + 'h ago';
        }
        else if(minElapsed >= (60 * 24) && minElapsed < (60 * 24 * 6)){
            return Math.round(minElapsed/(60*24)).toString() + 'd ago';
        }
        else if(minElapsed >= (60 * 24 * 6) && minElapsed < (60 * 24 * 30)){
            return Math.round(minElapsed/(60*24*7)).toString() + 'wk ago';
        }
        else{
            return Math.round(minElapsed/(60*24*30)).toString() + 'mo ago';
        }
    }

    refreshMomentHandler = async (res) => {
        if (res && res.momentId && res.data) {
            const data = res.data;
            for (let community of this.communitiesboards) {
                for (let board of community.boards) {
                    for (let boardpost of board.posts) {
                        if (boardpost.moments && boardpost.moments.length && data.moment && (boardpost.moments[0]._id === data.moment._id) && boardpost.moments[0].resource.hasOwnProperty('en-US') && boardpost.moments[0].resource['en-US'].value[0] === 'Poll') {
                            const index = boardpost.poll.responses.map((c) => c._id).indexOf(data.response._id);
                            if (index < 0) { //if the response hasn't been added to the response list
                                boardpost.poll.responses.push(data.response);
                            } else { //if it has been added, replace with the incoming one
                                boardpost.poll.responses.splice(index, 1, data.response);
                            }
                            //now the latest response have been included, reset the display array
                            await boardpost.poll.display.forEach((displayitem) => {
                                displayitem.count = 0;
                                displayitem.votedByUser = false;
                            });
                            //reconstruct the display array
                            boardpost.poll.totalVoteCount = boardpost.poll.responses.length;
                            for (const response of boardpost.poll.responses) {
                                if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                    if (response.matrix_number[0][1] > (boardpost.poll.display.length - 1)) {
                                        return; // if this response belongs to an option that has been deleted
                                    }
                                    if (this.userData.user && response.user._id === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                        boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                    }
                                    boardpost.poll.display[response.matrix_number[0][1]].count++;
                                }
                            }
                        }
                    }

                }
            }
        }
    };

    reorderCommunitiesBoards() {
        for (const community of this.communitiesboards) { // sort each community's feeds' order
            community.boards.sort((a, b) => {
                const c: any = new Date(a.updatedAt);
                const d: any = new Date(b.updatedAt);
                return (d - c);
            });
        }
        this.communitiesboards.sort((a, b) => { // sort community by its most up-to-date feed
            const e: any = new Date(a.boards[0].updatedAt);
            const f: any = new Date(b.boards[0].updatedAt);
            return (f - e);
        });
    }

    async createNewCommunity() {
        let industries = [];
        this.resourceService.load('en-US', "Industry").subscribe(async (fields: any) => {
            for(let i = 0; i < fields.length; i++){
                console.log("id", fields[i]._id);
                industries.push({_id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false});
            }
            const editCommunity = await this.modalCtrl.create({component: EditcommunityPage, componentProps: {industries: industries}} );
            await editCommunity.present();
            const {data: refreshNeeded} = await editCommunity.onDidDismiss();
            if (refreshNeeded) {
                //this.loadMap();
            }
        }, async (err) => {
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        });
    }

    async createNewGroup() {
        const editGroupPage = await this.modalCtrl.create({component: EditgroupPage, componentProps: {personalGroup: false, publishGroup: false}});
        await editGroupPage.present();
        const {data: refreshNeeded} = await editGroupPage.onDidDismiss();
        if (refreshNeeded){
            this.router.navigateByUrl('/app/myconversations/chat');
        }
    }

    async setupLoadGroups() {
        this.newsfeedMoreOptions = !this.newsfeedMoreOptions;
        if (this.newsfeedMoreOptions) {
            try {
                for (let community of this.communitiesboards) {
                    this.loadCommunityGroups(community);
                }
            } catch (err) {
                this.ionSpinner = false;
            }
        }
    }

    async loadCommunityGroups(community) {
        const groups: any = await this.churchService.loadChurchGroupProfiles(community._id, 'all'); // show both published and unpublished
        this.ionSpinner = false;
        community.topics = []; // reset the array
        community.groups = [];
        let listOfCurrentCommunityBoardIds = community.boards.map((c) => {return c._id});
        let listOfUserGroupIds = this.userData.user.groups.map((c) => {return c._id;});
        groups.forEach((group: any) => {
            group.joined = listOfUserGroupIds.indexOf(group._id) > -1;
            if (group.board) {
                if (listOfCurrentCommunityBoardIds.indexOf(group.board) < 0) {
                    community.topics.push(group);
                }
            } else if (group.conversation) {
                community.groups.push(group);
            }
        });
    }

    async showGroupProfile(group){
        let groupIds = this.userData.user.groups.map((c) => {return c._id;});
        if (groupIds.indexOf(group._id) > -1 || this.userData.hasPlatformAdminAccess){ //if user is admin or has already joined this group
            if (group.conversation) {
                this.chatService.currentChatProps.push({
                    conversationId: group.conversation,
                    name: group.name,
                    group: group,
                    badge: true,
                    page: 'chat',
                    modalPage: true
                });
                const groupPage = await this.modalCtrl.create({
                    component: GroupchatPage,
                    componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                });
                await groupPage.present();
                const {data: refreshNeeded} = await groupPage.onDidDismiss();
                if (refreshNeeded) {
                    this.setupLoadGroups();
                }
            } else {
                const groupPage = await this.modalCtrl.create({component: GroupboardPage, componentProps: {
                        group: group,
                        page: 'board'
                    }});
                await groupPage.present();
                const {data: refreshNeeded} = await groupPage.onDidDismiss();
                if (refreshNeeded) {
                    this.setupLoadGroups();
                }
            }
        } else {
            if (group.conversation){
                const aboutPage = await this.modalCtrl.create({component: ShowgroupPage, componentProps: {
                        group: group
                    }});
                await aboutPage.present();
            } else if (group.board) {
                const groupPage = await this.modalCtrl.create({component: GroupboardPage, componentProps: {
                        group: group,
                        page: 'board'
                    }});
                await groupPage.present();
            }
        }
    }

    executeSearch(event){
        event.stopPropagation();
        //this.ionSpinner = true;
        this.setupLoadGroups();
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    destroyPlayers(mediaId) {
        if (mediaId) {
            const media = this.mediaList.find((c) => c._id === mediaId);
            media.player.destroy();
        } else {
            for (const media of this.mediaList) {
                media.player.destroy();
            }
        }
    }

    ngOnDestroy(){
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshPage);
    }
}
