import {Component, Input, OnInit, OnDestroy, ViewEncapsulation, ViewChild} from '@angular/core';
import {CacheService} from 'ionic-cache';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Plyr } from "plyr";

import {
    AlertController,
    ActionSheetController,
    IonContent,
    IonInfiniteScroll,
    ModalController,
    Platform,
    IonSlides,
    PopoverController,
} from '@ionic/angular';
import {UserData} from "../../../services/user.service";
import {Board} from "../../../services/board.service";
import {Moment} from "../../../services/moment.service";
import {Resource} from "../../../services/resource.service";
import {Response} from "../../../services/response.service";
import {Chat} from "../../../services/chat.service";
import {Auth} from "../../../services/auth.service";
import {EditboardpostPage} from "../editboardpost/editboardpost.page";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {ShowboardpostPage} from "../showboardpost/showboardpost.page";
import {InvitetoconnectPage} from "../../connect/invitetoconnect/invitetoconnect.page";
import {EditgroupmemberPage} from "../../group/editgroupmember/editgroupmember.page";
import {Groups} from "../../../services/group.service";
import {GroupPopoverPage} from "../../group/group-popover/group-popover.page";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";

@Component({
  selector: 'app-groupboard',
  templateUrl: './groupboard.page.html',
  styleUrls: ['./groupboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GroupboardPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild('titles', {static: false}) title_slides: IonSlides;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    @Input() group: any;
    @Input() page: any;
    subscriptions: any = {};

    // board
    board: {};
    boardId: string;
    boardposts: any;
    noPost: boolean = false;
    boards: any = [];
    searchKeyword = '';
    pageNum: number = 0;
    reachedEnd = false;
    isGroupLeader = false;
    hasPlatformAdminAccess = false;
    mediaList: Array<{_id: string, player: Plyr}> = [];
    // group
    groupLoaded = false;

    // about
    joinGroupTag: boolean = true;

    // members
    members = [];
    leaderIds: any = [];
    editMemberTag = false;
    membersPageNum = 0;
    membersReachedEnd = false;

    constructor(
                private cache: CacheService,
                private router: Router,
                private callNumber: CallNumber,
                public platform: Platform,
                private popoverCtrl: PopoverController,
                private storage: Storage,
                private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                public modalCtrl: ModalController,
                private authService: Auth,
                public momentService: Moment,
                public resourceService: Resource,
                private responseService: Response,
                private boardService: Board,
                private chatService: Chat,
                private groupService: Groups,
                public userData: UserData) { }

  ngOnInit() {
      this.subscriptions['refreshBoards'] = this.userData.refreshBoards$.subscribe(this.refreshBoardHandler);
      this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
      this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);
  }

    async ionViewWillEnter() {
        if (this.group){
            await this.checkLoadGroup();
            if (this.page === 'board') {
                this.title_slides.slideTo(0);
            } else if (this.page === 'members') {
                this.title_slides.slideTo(1);
            }
        }
        this.switchPage();
    }

    async switchPage() {
        await this.checkLoadGroup();
        if (this.page === 'board') {
            this.content.scrollToTop(0);
            this.reloadBoard();
            this.setTag();
        } else if (this.page === 'members') {
            this.destroyPlayers(null);
            this.leaderIds = [];
            //check if the current user is a leader
            this.leaderIds = this.group.leaders.map((c) => {return c._id;});
            if(this.userData.user){
                this.editMemberTag = ((this.leaderIds.indexOf(this.userData.user._id) > -1) || this.hasPlatformAdminAccess);
            }
            this.reloadDirectory();
        }
    }

    async checkLoadGroup() {
        if (!this.groupLoaded){
            if (!this.group.public_group) {
                [this.group] = await this.groupService.loadGroupProfile(this.group._id);
            } else {
                [this.group] = await this.groupService.loadPublicGroup(this.group._id);
            }
            this.groupLoaded = true;
        }
    }

    refreshBoardHandler = async (res) => {
        if (res && res.type === 'refresh board' && res.boardId && res.data) {
            const boardId = res.boardId;
            const data = res.data;
            let reloadNeeded = false;
            if (boardId === this.group.board){
                if(data.action === 'create post') {
                    reloadNeeded = true; //reload board to get the post with bucket ID because bucket ID is not sent via socket.io
                } else if (data.action === 'delete post') {
                    let index = this.boardposts.map((c)=>{return c._id;}).indexOf(data.postId);
                    if (this.boardposts[index].media && this.boardposts[index].media.length) {
                        this.destroyPlayers(this.boardposts[index].media[0]._id);
                    }
                    this.boardposts.splice(index, 1);
                } else if (data.action === 'like' || data.action === 'cancel like') {
                    for (let boardpost of this.boardposts) {
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
                    for (let boardpost of this.boardposts) {
                        if (boardpost._id === data.post._id) {
                            boardpost.body = data.post.body;
                            boardpost.attachments = data.post.attachments;
                            if (boardpost.media && boardpost.media.length && data.post.media && !data.post.media.length) {
                                this.destroyPlayers(boardpost.media[0]._id);
                            }
                            boardpost.media = data.post.media;
                            if (data.post.moments && data.post.moments[0] && data.post.moments[0].resource.field == 'Poll') {
                                reloadNeeded = true; //reload is needed to create a new moment socket.io for the feature
                            } else {
                                boardpost.moments = data.post.moments;
                            }
                        }
                        if (boardpost.comments && boardpost.comments.length && boardpost.comments[0]){
                            reloadNeeded = true;
                        }
                    }
                } else if (data.action === 'create comment') {
                    for (let boardpost of this.boardposts) {
                        if (boardpost._id === data.comment.parentId) { //first level comment
                            boardpost.comments.unshift(data.comment)
                        }
                    }
                }
            }
            if (reloadNeeded) {
                this.reloadBoard();
            }
        }
    };

    refreshMomentHandler = async (res) => {
        if (res && res.momentId && res.data) {
            const data = res.data;
            for (let boardpost of this.boardposts) {
                if (boardpost.moments && boardpost.moments.length && (boardpost.moments[0]._id == data.moment._id) && boardpost.moments[0].resource.hasOwnProperty('en-US') && boardpost.moments[0].resource['en-US'].value[0] === 'Poll') {
                    let listOfResponseIds = boardpost.poll.responses.map((c) => c._id);
                    let index = listOfResponseIds.indexOf(data.response._id);
                    if(index < 0){ //if the response hasn't been added to the response list
                        boardpost.poll.responses.push(data.response);
                    }
                    else{ //if it has been added, replace with the incoming one
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
                            if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                            }
                            boardpost.poll.display[response.matrix_number[0][1]].count++;
                        }
                    }
                }
            }
        }

    };

    reloadBoard(){
        this.destroyPlayers(null);
        setTimeout(async () => {
            if (this.userData.user){
                this.boardService.socket.emit('join board', this.group.board);
            }
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.boardposts = [];
            this.pageNum = 0;
            if(this.userData.user && this.group.leaders){
                this.isGroupLeader = this.group.leaders.map((c) => c._id).indexOf(this.userData.user._id) > -1;
            }
            if (this.userData.user && this.group.churchId) {
                const result: any = await this.userData.checkAdminAccess(this.group.churchId);
                this.hasPlatformAdminAccess = result ? result.hasPlatformAdminAccess : false;
            }
            this.listcommunityboardposts({target: this.infiniteScroll});
        }, 50);
    }

    async listcommunityboardposts(event){
        this.pageNum++;
        if (!this.reachedEnd){
            let buckets = await this.boardService.loadBoardBuckets(this.group.board, this.searchKeyword, this.pageNum);
            event.target.complete();
            if(this.pageNum === 1 && !buckets.length) this.noPost = true;
            let returned_posts = [];
            for(let bucket of buckets){
                for(let post of bucket.posts){
                    post.bucketId = bucket._id;
                    returned_posts.push(post);
                }
            }

            if (!returned_posts.length){
                event.target.disabled = true;
            } else {
                this.noPost = false;
                let momentIds = [];
                for(let post of returned_posts){
                    if (post.moments && post.moments.length && post.moments[0].resource && post.moments[0].resource.field && post.moments[0].resource.field == 'Poll') {
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
                    this.boardposts.push(post);
                }
                if(momentIds.length){
                    momentIds.forEach((momentId) => {
                        this.momentService.socket.emit('join moment', momentId) ;
                    });
                    let responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
                    let responseResponse = this.cache.loadFromDelayedObservable('response-' + this.group.board, responseRequest, 'boards', 5, 'all');
                    responseResponse.subscribe(async (responses) => {
                        this.boardposts.forEach(async (boardpost: any) => {
                            if (boardpost.moments[0] && boardpost.moments[0].resource && boardpost.moments[0].resource.field && boardpost.moments[0].resource.field == 'Poll') {
                                for (let response of responses) {
                                    if (response.moment == boardpost.moments[0]._id) {
                                        let listOfResponseIds = boardpost.poll.responses.map((c) => {
                                            return c._id;
                                        });
                                        let index = listOfResponseIds.indexOf(response._id);
                                        if (index < 0) { //if the response hasn't been added to the response list
                                            boardpost.poll.responses.push(response);
                                        }
                                        else { //if it has been added, and if the incoming response is newer
                                            if (new Date(boardpost.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                boardpost.poll.responses.splice(index, 1, response);
                                            }
                                        }
                                    }
                                }
                                //now the latest response have been included, reset the display array
                                await boardpost.poll.display.forEach((displayitem)=>{
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
        } else {
            event.target.complete();
        }
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    async createNewPost() {
        let editPostPage = await this.modalCtrl.create({component: EditboardpostPage, componentProps: { boardId: this.group.board }});
        await editPostPage.present();
    }

    async openPost(post){
        let showBoardPage = await this.modalCtrl.create({component: ShowboardpostPage, componentProps: { boardId: this.group.board, post: post, isGroupLeader: this.isGroupLeader, hasPlatformAdminAccess: this.hasPlatformAdminAccess }});
        await showBoardPage.present();
    }

    async openRestvoFeature(event, moment) { //when tap on a Restvo feature
        event.stopPropagation();
        const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: {moment: moment, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
            this.reloadBoard();
        }
    }

    async likePost(event, post){
        event.stopPropagation();
        if (!this.userData.user) return;
        let action = (post.likes.indexOf(this.userData.user._id) > -1) ? "cancel like" : "like";
        await this.boardService.likePost(this.group.board, post.bucketId, post._id, action);
        //this.reloadBoard();
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

    async seeUserInfo(event, recipient) {
        event.stopPropagation();
        if (!this.userData.user) return;
        const modal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: recipient, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
        }
    }

    async titleSlideChange(event){
        event.stopPropagation();
        const title_slide = await this.title_slides.getActiveIndex();
        if (title_slide === 0) {
            this.page = 'board';
        } else if (title_slide === 1) {
            this.page = 'members';
        }
        this.switchPage();
    }

    //get the latest user data from the server
    refresh(refresher) {
        this.boardposts = [];
        this.reloadBoard();
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    async noNetworkConnection(){
        let networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            message: 'Please check your internet connection.',
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

    // about page

    setTag() {
        if(this.userData.user){
            this.joinGroupTag = !this.userData.user.groups.find((group) => group._id === this.group._id);
        }
    }

    async joinGroup() {
        if (!this.userData.user) {
            this.modalCtrl.dismiss();
            this.router.navigate(['/register', { slide : '0', message: 'To subscribe to this topic, please sign in or create an account.', exitType: 'slide' }]);
        } else {
            try {
                const data = await this.userData.joinGroup(this.group);
                if (data === "cancel") return;
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    message: 'You have subscribed to ' + this.group.name + '.',
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then(() => {
                                this.authService.refreshGroupStatus({conversationId: this.group.conversation, data: this.group})
                                this.userData.refreshBoards({ type: 'refresh community board page' });
                            });
                        }
                    }],
                    cssClass: 'level-15'
                });
                await alert.present();
            } catch (err) {
                this.noNetworkConnection();
                console.log("failed to add to My Community");
            }
        }
    }

    async presentPopover(event) {
        event.stopPropagation();
        const popover = await this.popoverCtrl.create({
            component: GroupPopoverPage,
            componentProps: {group: this.group},
            event: event,
            backdropDismiss: true,
            cssClass: 'level-15'});
        await popover.present();
        const {data: closeMessage} = await popover.onDidDismiss();
        if (closeMessage) {
            console.log("close modal");
            setTimeout(()=>{
                this.closeModal(true);
            }, 1000); // need to give one sec delay for modalCtrl to clear up the previous modal box
        }
    }

    // members
    async reloadDirectory(){
        setTimeout(() => {
            this.infiniteScroll.disabled = false;
            this.membersReachedEnd = false;
            this.members = [];
            this.membersPageNum = 0;
            this.listgroupmembers({target: this.infiniteScroll});
            this.loadLegacyGroupData();
        }, 100);
    }

    async listgroupmembers(event){
        this.membersPageNum++;
        if (!this.membersReachedEnd){
            const results = await this.groupService.loadGroupMembers(this.group._id, this.searchKeyword, this.membersPageNum);
            event.target.complete();
            if (!(results.members.length + results.pending_members.length)){
                this.membersReachedEnd = true;
                event.target.disabled = true;
            } else {
                results.members.forEach((member) => {
                    if (this.leaderIds.indexOf(member._id) > -1) { // a leader
                        member.role = 'Leader';
                        member.badge = true;
                        member.icons = ["phone-portrait"];
                    } else {
                        member.role = "Member";
                        member.icons = ["phone-portrait"];
                    }
                    member.name = member.first_name + ' ' + member.last_name;
                    this.members.push(member);
                });
                results.pending_members.forEach((pending_member) => {
                    if (pending_member.user){
                        pending_member.role = "Pending";
                        pending_member.badge = true;
                    } else {
                        pending_member.icons = [];
                        pending_member.role = "Contact";
                    }
                    // set up the display badge
                    if (pending_member.emails && pending_member.emails.length){
                        pending_member.icons.push("mail");
                    }
                    if (pending_member.mobile_phones && pending_member.mobile_phones.length){
                        pending_member.icons.push("text");
                    }
                    if (pending_member.home_phones && pending_member.home_phones.length){
                        pending_member.icons.push("call");
                    }
                    if (pending_member.work_phones && pending_member.work_phones.length){
                        pending_member.icons.push("call");
                    }
                    if (!this.editMemberTag){ //if not a leader, delete personal info
                        delete pending_member.emails;
                        delete pending_member.mobile_phones;
                        delete pending_member.home_phones;
                        delete pending_member.work_phones;
                    }
                    this.members.push(pending_member);
                });

            }
        } else {
            event.target.complete();
        }
    }

    loadLegacyGroupData(){
        let uniqueNames = this.members.map((c) => {return c.name;});
        //this is to take care of old wee pending members
        if (!this.group.pending_members) return;
        this.group.pending_members.forEach((pending_member) => {
            if (pending_member.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                pending_member.role = "Pending";
                pending_member.badge = true;
                let index = uniqueNames.indexOf(pending_member.name);
                if (index < 0 && pending_member.name) {
                    this.members.push(pending_member); //push the member into the members array
                } else {
                    //ignore if it is already represented in the Pending collection
                }
            }
        });
        if (!this.group.pending_email_members) return;
        this.group.pending_email_members.forEach((contact)=>{
            if (contact.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                contact.icons = [];
                contact.role = "Contact";
                if (contact.email) {
                    contact.emails = [contact.email];
                    contact.icons.push("mail");
                }
                if (contact.mobile_phone) {
                    contact.mobile_phones = [contact.mobile_phone];
                    if (contact.sms_opt_in) contact.icons.push('text');
                }
                if (contact.mobile_phone || contact.home_phone) {
                    contact.icons.push("call");
                }
                if (contact.home_phone) {
                    contact.home_phones = [contact.home_phone];
                }
                this.members.push(contact);
            }
        });

    }

    executeSearch(event){
        event.stopPropagation();
        this.reloadDirectory();
    }

    cancelSearch(event){
        event.stopPropagation();
        this.searchKeyword = '';
        this.reloadDirectory();
    }

    async editMember(event, member) {
        event.stopPropagation();
        const editgroupMemberModal = await this.modalCtrl.create({component: EditgroupmemberPage, componentProps: {member: member, group: this.group}});
        await editgroupMemberModal.present();
        const {data: refreshNeeded} = await editgroupMemberModal.onDidDismiss();
        if (refreshNeeded) {
            this.reloadDirectory();
        }
    }

    async addMemberActionSheet() {
        const buttons = [
            {
                text: 'Restvo Users',
                handler: () => {
                    this.invitePage('Restvo Users');
                }
            },
            {
                text: 'Email',
                handler: () => {
                    this.invitePage('Email');
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
            }];
        if (this.platform.is('cordova')) {
            buttons.splice(1, 0, {
                text: 'SMS Message',
                handler: () => {
                    this.invitePage('SMS Message');
                }
            });
        }
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Invite a Friend',
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    async invitePage(type) {
        const invitePage = await this.modalCtrl.create({component: InvitetoconnectPage, componentProps: {type: type, group: this.group}});
        await invitePage.present();
        const {data: refreshNeeded} = await invitePage.onDidDismiss();
        if (refreshNeeded){
            this.reloadDirectory();
        }
    }

    initializeCall(number) {
        this.callNumber.callNumber(number, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }
    
    destroyPlayers(mediaId) {
        try {
            console.log("destroy", mediaId);
            if (mediaId) {
                let media = this.mediaList.find((c) => {return c._id === mediaId});
                console.log("find", media);
                media.player.destroy();
            } else {
                for (const media of this.mediaList) {
                    media.player.destroy();
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    closeModal(refreshNeeded) {
        this.destroyPlayers(null);
        this.modalCtrl.dismiss(refreshNeeded);
    }

    refreshHandler = (res) => {
        if (res) {
            // about
            if (res.data._id === this.group._id) {
                this.group = res.data;
                this.setTag();
            } else if (res.conversationId === this.group.conversation) {
                this.setTag();
            }
            // members
            if (res.conversationId === this.group.conversation) {
                if (res.data.action === 'update leader status') {
                    this.leaderIds = res.data.leaders.map((c) => c._id);
                    this.editMemberTag = ((this.leaderIds.indexOf(this.userData.user._id) > -1) || this.hasPlatformAdminAccess);
                }
                this.reloadDirectory();
            } else if (res.data._id === this.group._id){
                this.reloadDirectory();
            }
        }

    };

    ionViewWillLeave() {
        //this.destroyPlayers(null);
    }

    ngOnDestroy(){
        this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
        this.subscriptions['refreshBoards'].unsubscribe(this.refreshBoardHandler);
    }
}
