import {Component, Input, NgZone, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Plyr from "plyr";
import {IonContent, IonInfiniteScroll, IonSlides, ModalController, Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {CacheService} from "ionic-cache";
import {ActivatedRoute, Router} from "@angular/router";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {Resource} from "../../../services/resource.service";
import {Response} from "../../../services/response.service";
import {Moment} from "../../../services/moment.service";
import {UserData} from "../../../services/user.service";
import {Chat} from "../../../services/chat.service";
import {Location} from "@angular/common";
import {Auth} from "../../../services/auth.service";
import {FocusPhotoPage} from "../../connect/focus-photo/focus-photo.page";

@Component({
  selector: 'app-onboardfeature',
  templateUrl: './onboardfeature.page.html',
  styleUrls: ['./onboardfeature.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OnboardfeaturePage {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild(IonSlides, {static: false}) slides: IonSlides;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    @Input() modalPage: any;
    @Input() programId: any;
    @Input() type: number;
    @Input() token: string;

    slidesOpts = {
        updateOnWindowResize: true,
        autoHeight: true
    };
    nextButtonReady = true;
    resource: any;
    moment: any;
    categories: any;
    activityStartTime = 0;
    page = 1;
    images = [];
    activities = [];
    matchedPeople = [];
    planModules = [];
    mediaList: Array<{_id: string, player: Plyr}> = [];
    interactableDisplay: any = {};     // an object of arrays of options to be listOfDisplayed
    responses = []; // an object of arrays of responses
    responseObj = {
        matrix_string: [],
        matrix_number: [],
        moment: '',
        array_number: [],
        createdAt: new Date()
    };
    loadCompleted = false;
    totalVoteCount: any = {};
    pageNum = 0;
    reachedEnd = true;
    loadAPIBusy = false;
    timeoutHandle: any;
    loadActTimeoutHandle: any;
    completedDefaultOnboarding = false;
    ionSpinner = false;

    constructor(
        private zone: NgZone,
        private location: Location,
        private storage: Storage,
        private cache: CacheService,
        private route: ActivatedRoute,
        private router: Router,
        private geolocation: Geolocation,
        public platform: Platform,
        public resourceService: Resource,
        private authService: Auth,
        private momentService: Moment,
        private responseService: Response,
        private modalCtrl: ModalController,
        public userData: UserData,
        public chatService: Chat) {}

    async ionViewWillEnter() {
        const result: any = await this.resourceService.loadSystemResources();
        this.resource = result.find((c) => c.field === 'Activity Components v2'); // return the activity components resource object in the result array
        this.setup();
    }

    async setup() {
        if (this.authService.token) {
            this.programId = this.programId || this.route.snapshot.paramMap.get('id');
            this.type = this.type || parseInt(this.route.snapshot.paramMap.get('type'), 10);
            this.token = this.token || this.route.snapshot.paramMap.get('token');
        }
        console.log("programId", this.programId)
        if (this.programId === '5d5785b462489003817fee18') {
            this.completedDefaultOnboarding = true;
            this.programId = null;
        }
        await this.loadActivities();
    }

    async loadActivities() {
        this.loadCompleted = false;
        let onboardingProcesses: any;
        if (!this.completedDefaultOnboarding) {
            onboardingProcesses = await this.momentService.loadUserPreferences(1, '5d5785b462489003817fee18', this.type || 2);
        } else {
            onboardingProcesses = await this.momentService.loadUserPreferences(1, this.programId, this.type);
        }
        clearTimeout(this.loadActTimeoutHandle);
        this.authService.incompleteOnboardProcess = onboardingProcesses.find((process) => {
            // first, check if the designated onboarding has any section that either has no response yet or is partially completed
            const isIncomplete = !process.response || (process.response.matrix_number.filter((c) => c.length > 5).length < process.resource.matrix_number[0].filter((c) => (c === 40000 || c === 40020)).length) || (process.response.matrix_string.filter((c) => (c.length > 1) && (c[1].length > 0)).length < process.resource.matrix_number[0].filter((c) => (c === 40010)).length);
            // second, check if the process has a component that is newer than this app version
            let versionUpToDate = true;
            process.resource.matrix_number[0].forEach((componentId) => {
                if (this.userData.versions['List of Components'].indexOf(componentId) < 0) {
                    versionUpToDate = false;
                }
            });
            return (isIncomplete && versionUpToDate) ? process : null; // if it has incomplete question and the version is up to date, return the process for display
        });
        if (this.authService.incompleteOnboardProcess) {
            this.reachedEnd = false;
            await this.prepareMoment(this.authService.incompleteOnboardProcess);
            this.moment = this.authService.incompleteOnboardProcess;
            this.loadCompleted = true;
            this.ionSpinner = false;
            setTimeout(async () => {
                if (this.slides) {
                    await this.slides.update();
                    await this.slides.slideTo(0);
                    await this.slides.lockSwipes(true);
                }
            }, 50);
        } else {
            this.moment = null;
            if (!this.completedDefaultOnboarding) { // when finished all default processes, activate the non-default processes
                this.ionSpinner = true;
                await this.addUserToProgramUserList('5d5785b462489003817fee18', this.type || 2, this.token, false);
                this.completedDefaultOnboarding = true;
                this.loadActivities();
                // exit out the load animation after 8 secs. In case internet connection is lost
                this.loadActTimeoutHandle = setTimeout(() => {
                    if (!this.moment) {
                        this.ionSpinner = false;
                        this.reachedEnd = true;
                        this.loadCompleted = true;
                    }
                }, 15000);
            } else { // when all is finished, the last slide is shown and the finish button will trigger join program (programId with token) API
                this.authService.incompleteOnboardProcess = null;
                this.ionSpinner = false;
                this.reachedEnd = true;
                this.loadCompleted = true;
            }
        }
        console.log("moment", this.moment);
    }

    async prepareMoment(moment) {
        this.planModules[moment._id] = [];
        moment.array_moment.forEach((plan_moment) => {
            this.planModules.push(plan_moment);
        });

        // if there is any interactable
        if (moment.resource.matrix_number[0].find((c) => c >= 30000 && c <= 49999) > -1) {
            if (moment.response) {
                moment.response.user = { // manually populate the user - standardized in showFeature.ts, the populated user is returned by loadReponsesByMomentId
                    _id: this.userData.user._id,
                    first_name: this.userData.user.first_name,
                    last_name: this.userData.user.last_name,
                    avatar: this.userData.user.avatar
                };
                this.responses = [moment.response];
                this.responseObj.moment = moment._id;
                this.responseObj = moment.response; // load the response object with backend data, since it is user only response it should only have one response
            } else {
                this.responses = [];
                this.responseObj = { // load with default value
                    matrix_string: [],
                    matrix_number: [],
                    moment: moment._id,
                    array_number: [],
                    createdAt: new Date()
                };
            }
        }

        // if there is any interactable that requires socket.io support
        if (moment.resource.matrix_number[0].find((c) => c >= 30000 && c <= 39999) > -1) {
            if (this.momentService && this.momentService.socket) {
                this.momentService.socket.emit('join moment', moment._id) ;
            }
        }
        // set up to display interactables
        moment.resource.matrix_number[0].forEach((componentId, componentIndex) => {
            if (moment.resource.matrix_number[2]) {
                const interactableId = moment.resource.matrix_number[2][componentIndex]; // if interactable, grab the createdAt timestamp
                if (componentId === 30000) { // poll
                    this.interactableDisplay[interactableId] = [];
                    for (const option of moment.matrix_string[componentIndex]) { // set up the poll options
                        this.interactableDisplay[interactableId].push({option: option, count: 0, votedByUser: false});
                    }
                    this.totalVoteCount[interactableId] = 0;
                    this.setupPollDisplay(moment, interactableId, componentIndex);
                } else if (componentId === 40000) { // multiple choice
                    this.interactableDisplay[interactableId] = [];
                    for (const option of moment.matrix_string[componentIndex]) { // set up the interactable options
                        this.interactableDisplay[interactableId].push({option: option, selectedByUser: false});
                    }
                    this.setupInteractableDisplay(moment, interactableId, componentIndex);
                } else if (componentId === 40010) { // text answer
                    // setting the default values of the current interactableDisplay
                    if (!this.interactableDisplay[interactableId]) {
                        this.interactableDisplay[interactableId] = { editor: null, currentSaveState: '' };
                    }
                    for (const interactable of this.responseObj.matrix_string) { // process the text answer responses
                        if (interactableId.toString() === interactable[0]) { // interactableId is a Number
                            let content: any;
                            if (interactable.length > 2 && interactable[2]) {
                                content = JSON.parse(interactable[2]);
                            } else { // for backward compatibility before quill, need to build the content object from scratch
                                content = { ops: [{ insert: interactable[1] + '\n' }] };
                            }
                            this.interactableDisplay[interactableId].content = content; // insert the response data into the display matrix
                            // prep the user's own response Obj, in case response needs to be sent out without the user changing the text answer and it will still grab the latest response text answer
                            let updatedExistingResponse;
                            for (let responseInteractable of this.responseObj.matrix_string) {
                                if (responseInteractable[0] === interactableId.toString()) { // InteractableId is in Number
                                    responseInteractable = interactable;
                                    updatedExistingResponse = true;
                                }
                            }
                            if (!updatedExistingResponse) { // add a new entry to array
                                this.responseObj.matrix_number.push([interactableId]);
                                this.responseObj.matrix_string.push(interactable);
                            }
                        }
                    }
                } else if (componentId === 40020) { // tile choice
                    this.interactableDisplay[interactableId] = {};
                    moment.matrix_string[componentIndex].forEach((option, option_index) => { // set up the interactable options
                        if (option_index % 2 === 0) { // only even number, i.e. 0, 2, 4, 6
                            this.interactableDisplay[interactableId][moment.matrix_number[componentIndex][option_index + 5].toString()] = {createdAt: moment.matrix_number[componentIndex][option_index + 5], option: option, image: moment.matrix_string[componentIndex][option_index + 1], selectedByUser: false};
                        }
                    });
                    this.setupInteractableDisplay(moment, interactableId, componentIndex);
                }
            }
            if (this.moment.resource.matrix_number[0].find((c) => c === 50000)) {
                this.loadPeople();
            }
        });
        // add a blank slide at the end of each questionniare: provide a place to transition to the next questionnaire
        moment.resource.matrix_number[0].push(0);
    }

    async setupPollDisplay(moment, interactableId, componentIndex) {
        for (const response of this.responses) {
            for (const interactable of response.matrix_number) {
                if (interactableId === interactable[0]) {
                    this.totalVoteCount[interactableId]++; // set up the total vote count
                    if (interactable[1] > (moment.matrix_string[componentIndex].length - 1)) {
                        return; // if this response belongs to an option that has been deleted
                    }
                    if (response.user._id === this.userData.user._id) {
                        this.interactableDisplay[interactableId][interactable[1]].votedByUser = true;
                    }
                    this.interactableDisplay[interactableId][interactable[1]].count++;
                }
            }
        }
    }

    async voteOnPoll(event, componentIndex, pollOptionIndex) {
        event.stopPropagation();
        const interactableId = this.moment.resource.matrix_number[2][componentIndex];
        let updatedExistingVote = false;
        for (const interactable of this.responseObj.matrix_number) {
            if (interactable[0] === interactableId) {
                interactable[1] = pollOptionIndex; // update an existing vote
                updatedExistingVote = true;
            }
        }
        if (!updatedExistingVote) { // submit a new vote
            this.responseObj.matrix_number.push([interactableId, pollOptionIndex]);
        }
        //this.responseObj.moment = this.moment._id;
        this.responseObj.array_number = this.moment.resource.matrix_number[0];
        this.responseObj.createdAt = new Date();
        this.momentService.submitResponse(this.moment, this.responseObj, true);
    }


    async setupInteractableDisplay(moment, interactableId, componentIndex) {
        for (const response of this.responses) {
            for (const interactable of response.matrix_number) {
                if (interactableId === interactable[0]) {
                    if (interactable.length - 5 > moment.matrix_string[componentIndex].length) {
                        return; // if this response belongs to an option that has been deleted
                    }
                    if (response.user._id === this.userData.user._id) {
                        for (let i = 5; i < interactable.length; i++) {
                            if (moment.resource.matrix_number[0][componentIndex] === 40020) { // for tile choice, the response records the user's choice using the option's createdAt timestamp [200819285102, 201928523192, etc]
                                this.interactableDisplay[interactableId][interactable[i].toString()].selectedByUser = true;
                            } else { // for older interactables (e.g. multiple choice), response records the user's choice using the option index [1, 5, 4]
                                this.interactableDisplay[interactableId][interactable[i]].selectedByUser = true;
                            }
                        }
                    }
                }
            }
        }
    }

    async respondToInteractable(event, componentIndex, interactableOption) {
        event.stopPropagation();
        const interactableId = this.moment.resource.matrix_number[2][componentIndex];
        let updatedExistingResponse = false;
        for (let interactable of this.responseObj.matrix_number) {
            if (interactable[0] === interactableId) {
                for (let i = interactable.length - 1; i > 4; i--) {
                    if (interactable[i] === interactableOption) { // de-select an existing selection
                        interactable.splice(i, 1);
                        updatedExistingResponse = true;
                    }
                }
                if (!updatedExistingResponse) { // append a new selection
                    interactable.push(interactableOption);
                    updatedExistingResponse = true;
                    let maxNumOfSelections = 1; // default is 1 if multiple selection is off
                    if (this.moment.matrix_number[componentIndex][0]) { // if multiple selection is on
                        maxNumOfSelections = this.moment.matrix_number[componentIndex][1] || this.moment.matrix_string[componentIndex].length; // if max number of selections has not been set (null), use the number of available options
                    }
                    while ((interactable.length - 5) > maxNumOfSelections) { // splice the oldest selection until it satisfies the max num of selections
                        interactable.splice(5, 1);
                    }
                }
            }
        }
        if (!updatedExistingResponse) { // add a new entry to array
            this.responseObj.matrix_number.push([interactableId, null, null, null, null, interactableOption]);
        }
        // this.responseObj.moment = this.moment._id;
        this.responseObj.array_number = this.moment.resource.matrix_number[0];
        this.responseObj.createdAt = new Date();
        const response = await this.momentService.submitResponse(this.moment, this.responseObj, false);
        const index = this.responses.map((c) => c._id).indexOf(response._id);
        if (index < 0) { // if the response hasn't been added to the response list
            this.responses.push(response);
        } else { // if it has been added, replace with the incoming one
            this.responses.splice(index, 1, response);
        }
        // reset MC selection
        if (this.moment.resource.matrix_number[0][componentIndex] === 40020) {
            for (const key of Object.keys(this.interactableDisplay[interactableId])) {
                this.interactableDisplay[interactableId][key].selectedByUser = false;
            }
        } else {
            this.interactableDisplay[interactableId].forEach((interactableOption) => {
                interactableOption.selectedByUser = false;
            });
        }
        this.setupInteractableDisplay(this.moment, interactableId, componentIndex);
    }

    async respondToTextArea(event, componentIndex) {
        this.nextButtonReady = false;
        clearTimeout(this.timeoutHandle);
        let updatedExistingResponse = false;
        // interactableId is Number
        const interactableId = this.moment.resource.matrix_number[2][componentIndex];

        for (const interactable of this.responseObj.matrix_string) {
            if (interactable[0] === interactableId.toString()) { // InteractableId is in Number
                interactable[1] = event.text;
                interactable[2] = JSON.stringify(event.content);//JSON.stringify(event.content);
                interactable[3] = JSON.stringify(event.delta);
                updatedExistingResponse = true;
            }
        }

        if (!updatedExistingResponse) { // add a new entry to array
            this.responseObj.matrix_number.push([interactableId]);
            this.responseObj.matrix_string.push([interactableId.toString(), event.text, JSON.stringify(event.content), JSON.stringify(event.delta)]);
        }
        this.timeoutHandle = setTimeout(async () => {
            // server update only happens every 3 secs
            const response = await this.momentService.submitResponse(this.moment, this.responseObj, false);
            const index = this.responses.map((c) => c._id).indexOf(response._id);
            if (index < 0) { // if the response hasn't been added to the response list
                this.responses.push(response);
            } else { // if it has been added, replace with the incoming one
                this.responses.splice(index, 1, response);
            }
            if (this.moment.program) {
                this.userData.refreshUserStatus({});
            }
            this.nextButtonReady = true;
        }, 1500);
    }

    async slideChanges() {
        if (this.slides) {
            const currentSlideIndex = await this.slides.getActiveIndex();
            // if slide from the last slide
            //console.log("change", currentSlideIndex, this.moment.resource.matrix_number[0].slice(this.moment.resource.matrix_number[0].indexOf(20010) + 1).length - 1);
            if (currentSlideIndex >= this.moment.resource.matrix_number[0].slice(this.moment.resource.matrix_number[0].indexOf(20010) + 1).length - 1) {
                await this.loadActivities();
            }
        }
    }

    clickNextButton(direction) {
        if (!this.moment) return;
        this.slides.lockSwipes(false);
        if (direction === 'prev') {
            this.slides.slidePrev();
        } else {
            this.slides.slideNext();
        }
        this.slides.lockSwipes(true);
    }

    async seeUserInfo(event, user) {
        if (event) event.stopPropagation();
        user.name = user.first_name + ' ' + user.last_name;
        this.userData.refreshUserStatus({ type: 'show recipient', data: {recipient: user, modalPage: true}});
    }

    async createQuillEditor(event, interactableId) {
        this.interactableDisplay[interactableId].editor = event;
        this.interactableDisplay[interactableId].editor.setContents(this.interactableDisplay[interactableId].content, 'silent');
    }

    joinVideoConference(event, moment) {
        event.stopPropagation();
        if (moment.resource.matrix_number[0].find((c) => c === 10600)) {
            if (moment.conversation) {
                this.chatService.toggleVideoChat({
                    videoChatRoomId: moment.conversation,
                    channelLastN: '6', // only the last 6 active dominate speakers' stream will be sent
                    startWithAudioMuted: true,
                    startWithVideoMuted: false
                });
            } else {
                console.log("missing moment's conversation id");
            }
        }
    }

    initPlyr(event, mediaId) {
        let player: Plyr;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player});
    }

    destroyPlayers(mediaId) {
        if (mediaId) {
            const media = this.mediaList.find((c) => {return c._id === mediaId});
            media.player.destroy();
        } else {
            for (const media of this.mediaList) {
                media.player.destroy();
            }
        }
    }

    async loadPeople() {
        if (this.authService.token && this.infiniteScroll) { // infinite scroll for 50000 match users only shows for authenticated users
            this.infiniteScroll.disabled = false;
        }
        this.reachedEnd = false;
        this.matchedPeople = [];
        this.pageNum = 0;
        if (this.moment._id) {
            this.loadMorePeople({target: this.infiniteScroll});
        }
    }

    async loadMorePeople(event) {
        this.pageNum++;
        if (!this.reachedEnd && !this.loadAPIBusy) { // loadAPIBusy is used to safeguard against iOS calling the (ionInfiniteScroll) function from the DOM that races with the loadMorePeople function
            this.loadAPIBusy = true;
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.zone.run(() => {
                        this.loadAPIBusy = false;
                    });
                }, 10000);
            });
            const results: any = await this.momentService.loadMatchedPeople(this.moment._id || '', '', this.pageNum);
            console.log("matched", results);
            this.loadAPIBusy = false;
            this.ionSpinner = false;
            if (!results.length) {
                this.reachedEnd = true;
                if (event && event.target) event.target.disabled = true;
            } else {
                for (const result of results) {
                    this.matchedPeople.push(result);
                }
            }
        }
    }

    async focusPhoto(event, object) {
        event.stopPropagation();
        const modal = await this.modalCtrl.create({component: FocusPhotoPage, componentProps: {imageUri: object}});
        await modal.present();
    }

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    async addUserToProgramUserList(programId, type, token, refreshAppPages) {
        if (programId) {
            let user_list = '';
            switch (type) {
                case 2: // participants
                    user_list = 'user_list_1';
                    break;
                case 3: // organizers
                    user_list = 'user_list_2';
                    break;
                case 4: // leaders
                    user_list = 'user_list_3';
                    break;
                default:
                    user_list = 'user_list_1';
                    type = 2;
            }
            await this.momentService.addUserToProgramUserList({ _id: programId }, user_list, token, this.completedDefaultOnboarding, refreshAppPages);
            if (this.completedDefaultOnboarding) {
                if (this.modalPage) { // onboarding is a popover by default
                    this.router.navigate([this.authService.cachedRouteUrl]); // in response to finishing up a program onboarding (programId is provided), it should have cachedRouteUrl
                    this.modalCtrl.dismiss(true);
                    setTimeout( () => {
                        // only exclude ios mobile web, coz iOS browers hasn't allowed swPush yet
                        if (this.platform.is('ios') && !this.platform.is('mobileweb')) {
                            this.userData.checkPushNotification();
                        }
                    }, 10000);
                } else if (programId === '5d5785b462489003817fee18') { // if finishing the basic onboarding
                    const url = this.authService.cachedRouteUrl || '/app/discover/home/5d5785b462489003817fee18';
                    if (this.authService.cachedRouteParams) {
                        await this.router.navigate([url, this.authService.cachedRouteParams], { replaceUrl: true });
                    } else {
                        await this.router.navigate([url], { replaceUrl: true });
                    }
                    this.authService.cachedRouteUrl = null;
                } else { // in most situation, show feature was the origin and therefore make sense to route back to the show feature page
                    this.router.navigate(['/app/discover/home/' + programId], { replaceUrl: true } );
                }
            }
        } else { // if finishing up the onboarding in app, just dismiss the modal
            this.modalCtrl.dismiss(true);
        }
    }

    async back() {
        //const currentSlideIndex = await this.slides.getActiveIndex();
        if (this.modalPage) {
            this.modalCtrl.dismiss(false);
        } else {
            this.location.back();
        }
    }
}

