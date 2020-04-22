import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Location} from "@angular/common";
import {CacheService} from 'ionic-cache';
import {ActivatedRoute, Router} from "@angular/router";

import {Chat} from "../../../services/chat.service";
import { CalendarService } from '../../../services/calendar.service';
import {Resource} from "../../../services/resource.service";
import {Moment} from "../../../services/moment.service";
import {UserData} from "../../../services/user.service";

@Component({
  selector: 'app-pickfeature-popover',
  templateUrl: './pickfeature-popover.page.html',
  styleUrls: ['./pickfeature-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickfeaturePopoverPage implements OnInit {

    @Input() title: any;
    @Input() modalPage: any;
    @Input() categoryId: any; //  Activity 'Categories' property in Moment. 'Journey', 'Relationship', 'Community' 'Program', 'Plan', 'Onboarding Process'
    // onboarding process parameters
    @Input() programId: string; // the program
    // child Activity parameter
    @Input() parent_programId: string; // the parent program

    // relationship: joinAs
    @Input() joinAs = 'user_list_1'; // join as user_list_1 (participant) or user_list_3 (leader)

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
        private route: ActivatedRoute,
        public router: Router,
        private location: Location,
        private alertCtrl: AlertController,
        private cache: CacheService,
        public resourceService: Resource,
        public modalCtrl: ModalController,
        private momentService: Moment,
        private userData: UserData,
        private chatService: Chat,
        public calendarService: CalendarService
    ) {}

    async ngOnInit() {
        this.title = this.title || this.route.snapshot.paramMap.get('title') || 'Getting Started'; // the title
        // if picker for Onboarding Processes or if it is pre-selected via Input, assign categoryId the proceed to step 2
        if (this.categoryId) { // if category is provided, skip to step 5
            this.step = 5;
            this.loadSamples();
        } else { // otherwise, assign Journey as default
            this.categoryId = '5e9f46e1c8bf1a622fec69d5';
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

    selectCalendarItem(calendarItem) {
        // restore moment as parent and calendar as child object
        const selectedCalendar = JSON.parse(JSON.stringify(calendarItem));
        const selectedMoment = JSON.parse(JSON.stringify(calendarItem.moment));
        selectedCalendar.moment = selectedMoment._id;
        selectedMoment.calendar = selectedCalendar;
        if (this.conversation) {
            selectedMoment.conversations = [this.conversation];
        }
        selectedMoment.cloned = false;
        selectedMoment.joinAs = this.joinAs;
        this.selectedMoments.push(selectedMoment);
        if (this.selectedMoments.length > this.maxMomentCount) {
            this.selectedMoments.splice(0, 1);
        }
    }

    selectSample(sample) {
        if (this.conversation) {
            sample.conversations = [this.conversation];
        }
        sample.cloned = 'new'; // type 'new' is used in parent component to indicate that a selected moment needs to be cloned
        sample.joinAs = this.joinAs;
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


    async next() {
        if (this.categoryId === '5e9f46e1c8bf1a622fec69d5') { // if choosing Journey
            if (this.step === 1 || this.step === 4) {
                await this.loadSamples();
                this.step = 5;
                this.title = 'Choose a Topic';
            } else {
                this.step = 4;
            }
        } else if (this.step === 4) {
            await this.loadSamples();
            this.step = 5;
            this.title = 'Choose a Template';
        } else {
            this.step++;
        }
        this.allowCreate = (this.categoryId === '5c915324e172e4e64590e346'); // if Community, allow Create new
    }

    back() {
        if (this.step > 1 && this.allowSwitchCategory) {
            this.allowCreate = false;
            if (this.categoryId !== '5e9f46e1c8bf1a622fec69d5') {
                this.step--;
            } else {
                this.step = 1;
            }
        } else {
            this.close();
        }
    }

    close() {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        } else {
            this.location.back();
        }
        this.subscriptions['refresh'].unsubscribe(this.refreshAfterCreateMomentHandler);
    }
}
