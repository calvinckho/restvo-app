import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Location} from "@angular/common";
import {CacheService} from 'ionic-cache';
import {ActivatedRoute, Router} from "@angular/router";

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
    @Input() joinAs; // join as user_list_1 (participant) or user_list_3 (leader)

    @Input() allowCreate = false;
    @Input() allowSwitchCategory;
    @Input() maxMomentCount = 1; // default max Moment count is 1

    searchKeyword = '';
    currentView = 'new';
    samples = [];
    ionSpinner = false;
    pageNum = 0;
    reachedEnd = false;
    selectedMoments = [];
    step = 0;
    loading: any;

    subscriptions: any = {};

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private location: Location,
        private alertCtrl: AlertController,
        private cache: CacheService,
        public resourceService: Resource,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private momentService: Moment,
        private userData: UserData,
        public calendarService: CalendarService
    ) {}

    async ngOnInit() {
        this.title = this.title || this.route.snapshot.paramMap.get('title') || 'Invite'; // the title
        this.categoryId = this.categoryId || this.route.snapshot.paramMap.get('id');
        this.joinAs = this.joinAs || this.route.snapshot.paramMap.get('joinAs');
        this.allowSwitchCategory = this.allowSwitchCategory === undefined ? !this.categoryId : this.allowSwitchCategory;
        if (this.categoryId) { // if category is provided, skip to step 1
            this.step = 1;
        } else {
            this.categoryId = '5e9f46e1c8bf1a622fec69d5'; // default choice is a Journey
        }
        // if picker for Onboarding Processes or if it is pre-selected via Input, assign categoryId the proceed to step 2
        this.subscriptions['refresh'] = this.userData.refreshUserStatus$.subscribe(this.refreshAfterCreateMomentHandler);
    }

    refreshAfterCreateMomentHandler = async () => {
        if (this.userData.user) {
            this.loadSamples();
        }
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
        selectedMoment.cloned = false;
        selectedMoment.joinAs = this.joinAs;
        this.selectedMoments.push(selectedMoment);
        if (this.selectedMoments.length > this.maxMomentCount) {
            this.selectedMoments.splice(0, 1);
        }
    }

    selectSample(sample) {
        sample.cloned = 'new'; // type 'new' is used in parent component to indicate that a selected moment needs to be cloned
        sample.joinAs = this.joinAs;
        this.selectedMoments.push(sample);
        if (this.selectedMoments.length > this.maxMomentCount) {
            this.selectedMoments.splice(0, 1);
        }
    }

    async openFeature(event, moment) {
        event.stopPropagation();
        if (this.modalPage) {
            this.momentService.openMoment( { moment: moment, modalPage: true});
        } else {
            this.router.navigate(['/app/activity/' + moment._id]);
        }
    }

    async removeMoment(i) {
        this.selectedMoments.splice(i, 1);
    }

    async done() {
        let selectedProgram;
        if (this.modalPage) {
            this.modalCtrl.dismiss(this.selectedMoments);
        } else {
            this.loading = await this.loadingCtrl.create({
                message: 'Processing...',
                duration: 20000
            });
            await this.loading.present();
            if (this.selectedMoments[0] && this.selectedMoments[0].cloned === 'new') { // cloning a sample. copy everything except calendar
                this.selectedMoments[0].calendar = { // reset the calendar
                    title: this.selectedMoments[0].matrix_string[0][0],
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
                const clonedMoments: any = await this.momentService.clone(this.selectedMoments, null);
                if (clonedMoments && clonedMoments.length) {
                    clonedMoments[0].resource = this.selectedMoments[0].resource; // clone the populated resource
                    selectedProgram = clonedMoments[0];
                }
            } else {
                selectedProgram = this.selectedMoments[0];
            }
            if (this.selectedMoments[0].cloned && this.joinAs) { // if it is a cloned item, join the Activity using the joinAs list
                await this.momentService.addUserToProgramUserList(selectedProgram, this.joinAs, null, false);
            }
            let hasOrganizerAccess: any;
            if (selectedProgram.user_list_2 && selectedProgram.user_list_2.length && selectedProgram.user_list_2[0] && typeof selectedProgram.user_list_2[0] === 'object') { // if user_list is populated, i.e. array of objects
                hasOrganizerAccess = selectedProgram.user_list_2.map((c) => c._id).includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
            } else if (selectedProgram.user_list_2 && selectedProgram.user_list_2.length && selectedProgram.user_list_2[0] && typeof selectedProgram.user_list_2[0] === 'string') { // if user_list is not populated, i.e. array of strings
                hasOrganizerAccess = selectedProgram.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
            }
            if (hasOrganizerAccess) {
                this.router.navigate(['/app/manage/activity/' + selectedProgram._id + '/people/' + selectedProgram._id]);
                await this.loading.dismiss();
            } else {
                this.router.navigate(['/app/activity/' + selectedProgram._id]);
                setTimeout(async () => {
                    await this.loading.dismiss();
                    await this.resourceService.loadSystemResources(); // this is required to ensure resource has already been loaded
                    this.momentService.addParticipants(selectedProgram, this.resourceService.resource, 'both', ['user_list_1'], this.resourceService.resource['en-US'].value[32] + ' to ' + selectedProgram.matrix_string[0][0], this.resourceService.resource['en-US'].value[32]);
                }, 1000);
            }
        }
    }

    async createMoment() {
        if (this.categoryId === '5c915324e172e4e64590e346') { // create a community
            this.close();
            this.router.navigate(['/app/create/community', { categoryId: this.categoryId }]);
        } else { // create other Activities
            this.close(); // close the Picker, then open up the create view.
            this.momentService.editMoment({categoryId: this.categoryId, programId: this.programId, parent_programId: this.parent_programId, modalPage: true });
        }
    }

    async changeView(event) {
        this.currentView = event.detail.value;
    }


    async next() {
        if (this.step < 0) {
            this.step++;
        } else if (this.step === 0) {
            this.step++;
            this.allowCreate = (this.categoryId === '5c915324e172e4e64590e346'); // if Community, allow Create new
            if (this.step === 1) {
                await this.loadSamples();
            }
        } else if (this.step >= 1) { // only allow post-processing (edit name, select role) if maxMomentCount === 1 and it is a cloned program
            if (this.maxMomentCount === 1 && this.selectedMoments[0].cloned) {
                this.step++;
            } else {
                this.done();
            }
        }
    }

    back() {
        console.log("allow", this.allowSwitchCategory);
        if (this.step === -2 || this.step === 0 || (!this.allowSwitchCategory && this.step === 1)) {
            this.close();
        } else {
            this.step--;
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
