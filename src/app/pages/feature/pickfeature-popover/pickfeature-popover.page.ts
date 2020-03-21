import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, NavParams, ModalController} from '@ionic/angular';
import {Chat} from "../../../services/chat.service";
import { CalendarService } from '../../../services/calendar.service';
import {CacheService} from 'ionic-cache';
import {Resource} from "../../../services/resource.service";
import {Moment} from "../../../services/moment.service";
import {Router} from "@angular/router";
import {UserData} from "../../../services/user.service";

@Component({
  selector: 'app-pickfeature-popover',
  templateUrl: './pickfeature-popover.page.html',
  styleUrls: ['./pickfeature-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickfeaturePopoverPage implements OnInit {

    @Input() title: any;
    @Input() categoryId: any; //  Activity 'Categories' property in Moment. 'Relationship', 'Community' 'Program', 'Plan', 'Onboarding Process'
    // onboarding process parameters
    @Input() programId: string; // the program
    @Input() type: number; // for onboarding process only
    // child Activity parameter
    @Input() parent_programId: string; // the parent program

    @Input() conversationId: string; // necessary for momentService.share(moment). If provided, the Activity selected will be shared in this conversation chat room
    @Input() allowCreate = false;
    @Input() allowSwitchCategory = true;
    @Input() maxMomentCount = 10; // default max Moment count is 10
    conversation: any;
    searchKeyword = '';
    currentView = 'new';
    samples = [];
    ionSpinner = false;
    pageNum = 0;
    reachedEnd = false;
    selectedMoments = [];
    step = 1;

    subscriptions: any = {};

    constructor(
        public router: Router,
        private alertCtrl: AlertController,
        private cache: CacheService,
        public resourceService: Resource,
        private navParams: NavParams,
        public modalCtrl: ModalController,
        private momentService: Moment,
        private userData: UserData,
        private chatService: Chat,
        public calendarService: CalendarService
    ) {}

    async ngOnInit() {
        // if picker for Onboarding Processes or if it is pre-selected via Input, assign categoryId the proceed to step 2
        if (this.categoryId) { // if category is provided, skip to step 2
            this.step = 2;
            this.loadSamples();
        } else { // otherwise, assign Relationship as default
            this.categoryId = '5dfdbb547b00ea76b75e5a70'; // Relationship
        }
        if (this.conversationId) {
            const index = this.chatService.conversations.map((c) => c.conversation._id).indexOf(this.conversationId);
            if (index > -1) {
                this.conversation = this.chatService.conversations[index].conversation;
            }
        }
        this.subscriptions['refresh'] = this.userData.refreshUserStatus$.subscribe(this.refreshAfterCreateMomentHandler);
    }

    refreshAfterCreateMomentHandler = async () => {
        this.currentView = 'recent';
    };

    async loadSamples() {
        setTimeout(async () => {
            this.reachedEnd = false;
            this.samples = [{}];
            this.pageNum = 0;
            this.loadMoreSamples();
        }, 50);
    }

    async loadMoreSamples() {
        this.pageNum++;
        if (!this.reachedEnd) {
            const samples: any = await this.momentService.loadSampleActivities(this.categoryId);
            this.ionSpinner = false;
            // temp overide the paging function: i.e. only load page 1
            this.reachedEnd = true;
            if (!samples.length) {
                this.reachedEnd = true;
            } else {
                this.samples = samples;
            }
        } else {
            this.ionSpinner = false;
        }
    }

    async selectCategory() {
        await this.loadSamples();
        this.step = 2;
        this.allowCreate = (this.categoryId === '5c915324e172e4e64590e346'); // if Community, allow Create new
    }

    selectCalendarItem(calendarItem) {
        // restore moment as parent and calendar as child object
        const selectedCalendar = JSON.parse(JSON.stringify(calendarItem));
        const selectedMoment = JSON.parse(JSON.stringify(calendarItem.moment));
        selectedCalendar.moment = selectedMoment._id;
        selectedMoment.calendar = selectedCalendar;
        if (this.conversation) {
            selectedMoment.conversations = [this.conversation];
        }
        selectedMoment.type = 'recent';
        this.selectedMoments.push(selectedMoment);
        if (this.selectedMoments.length > this.maxMomentCount) {
            this.selectedMoments.splice(0, 1);
        }
    }

    selectSample(sample) {
        if (this.conversation) {
            sample.conversations = [this.conversation];
        }
        sample.type = 'new'; // type 'new' is used in parent component to indicate that a selected moment needs to be cloned
        this.selectedMoments.push(sample);
        if (this.selectedMoments.length > this.maxMomentCount) {
            this.selectedMoments.splice(0, 1);
        }
    }

    async openFeature(event, moment) {
        event.stopPropagation();
        this.momentService.openMoment( { moment: moment, modalPage: true});
    }

    async removeMoment(i) {
        this.selectedMoments.splice(i, 1);
    }

    async done() {
        this.modalCtrl.dismiss(this.selectedMoments);
    }

    async createMoment() {
        if (this.categoryId === '5c915324e172e4e64590e346') { // create a community
            this.close();
            this.router.navigate(['/app/create/community', { categoryId: this.categoryId }]);
        } else { // create other Activities
            this.close(); // close the Picker, then open up the create view.
            this.momentService.editMoment({categoryId: this.categoryId, programId: this.programId, parent_programId: this.parent_programId, conversationId: this.conversation ? this.conversation._id : null, modalPage: true });
        }
    }

    async changeView(event) {
        this.currentView = event.detail.value;
    }

    back() {
        if (this.step > 1 && this.allowSwitchCategory) {
            this.allowCreate = false;
            this.step--;
        } else {
            this.close();
        }
    }

    close() {
        this.modalCtrl.dismiss();
        this.subscriptions['refresh'].unsubscribe(this.refreshAfterCreateMomentHandler);
    }
}
