import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    LoadingController,
    ModalController,
    Platform
} from '@ionic/angular';
import {Location} from "@angular/common";
import {CacheService} from 'ionic-cache';
import {ActivatedRoute, Router} from "@angular/router";

import { CalendarService } from '../../../services/calendar.service';
import {Resource} from "../../../services/resource.service";
import {Moment} from "../../../services/moment.service";
import {Response} from "../../../services/response.service";
import {UserData} from "../../../services/user.service";

@Component({
  selector: 'app-pickfeature-popover',
  templateUrl: './pickfeature-popover.page.html',
  styleUrls: ['./pickfeature-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickfeaturePopoverPage implements OnInit, OnDestroy {
    @Input() title: any;
    @Input() modalPage: any;
    @Input() categoryId: any; //  Activity 'Categories' property in Moment. 'Journey', 'Relationship', 'Community' 'Program', 'Plan', 'Onboarding Process'
    // onboarding process parameters
    @Input() programId: string; // the program
    @Input() type: any; // the process type 2 (participant), 3 (organizer), 4 (leader)
    // child Activity parameter
    @Input() parent_programId: string; // the parent program
    // relationship: joinAs
    @Input() joinAs; // join createCalendaras user_list_1 (participant) or user_list_3 (leader)
    // create Content Calandar
    @Input() scheduleId: any; // schedule the Content Calendar belongs to
    @Input() goalId: string; // whether the newly created Content Calendar is under a Goal
    @Input() disableSelect: any;

    @Input() allowCreate = false;
    @Input() allowSwitchCategory;
    @Input() maxMomentCount = 1; // default max Moment count is 1

    subpanel: any;
    searchKeyword = '';
    currentView = 'new';
    samples = [];
    recentCalendarItems = [];
    ionSpinner = false;
    pageNum = 0;
    reachedEnd = false;
    selectedMoments = [];
    step = 0;
    loading: any;

    // Content Calendar creation
    responseTemplate = {
        matrix_string: [],
        matrix_number: [],
        moment: '',
        array_number: []
    };
    parentRelationshipResponseObj: any = this.responseTemplate; // a user can respond to the Content's Relationship


    subscriptions: any = {};

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public platform: Platform,
        private location: Location,
        private alertCtrl: AlertController,
        private actionSheetCtrl: ActionSheetController,
        private cache: CacheService,
        public resourceService: Resource,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private momentService: Moment,
        private userData: UserData,
        public calendarService: CalendarService,
        public responseService: Response
    ) {}

    async ngOnInit() {
        this.setup();
        this.subscriptions['refresh'] = this.userData.refreshUserStatus$.subscribe(this.refreshAfterCreateMomentHandler);
    }

    ionViewWillEnter() {
        // re-entering subpanel view
        this.setup();
    }

    setup() {
        this.subpanel = !!this.route.snapshot.paramMap.get('subpanel');
        this.title = this.title || this.route.snapshot.paramMap.get('title') || 'Invite'; // the title
        this.categoryId = this.categoryId || this.route.snapshot.paramMap.get('categoryId');
        this.programId = this.programId || this.route.snapshot.paramMap.get('programId');
        this.type = parseInt(this.type || this.route.snapshot.paramMap.get('type') || '0', 10);
        this.parent_programId = this.parent_programId || this.route.snapshot.paramMap.get('parent_programId');
        this.joinAs = this.joinAs || this.route.snapshot.paramMap.get('joinAs');
        this.scheduleId = this.scheduleId || this.route.snapshot.paramMap.get('scheduleId');
        this.goalId = this.goalId || this.route.snapshot.paramMap.get('goalId');

        this.disableSelect = this.disableSelect || this.route.snapshot.paramMap.get('disableSelect') === 'true';
        this.allowCreate = this.allowCreate || this.route.snapshot.paramMap.get('allowCreate') === 'true';
        this.allowSwitchCategory = this.allowSwitchCategory === undefined ? !this.categoryId : this.allowSwitchCategory;
        if (this.categoryId === 'all') { // if category is provided, skip to step 1
            this.step = 1;
            this.categoryId = null;
        } else if (this.categoryId) {
            this.step = 1;
        } else {
            this.categoryId = '5e9f46e1c8bf1a622fec69d5'; // default choice is a Journey
        }
    }

    refreshAfterCreateMomentHandler = async () => {
        if (this.userData.user) {
            this.loadSamples();
            this.renderRecentList();
        }
    };

    async loadSamples() {
        this.reachedEnd = false;
        this.samples = [];
        this.pageNum = 0;
        this.loadMoreSamples();
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
                samples.forEach((parent) => {
                    this.samples.push(...parent.sample_activities);
                });
            }
        } else {
            this.ionSpinner = false;
        }
    }

    async selectCalendarItem(event, calendarItem) {
        // restore moment as parent and calendar as child object
        const selectedCalendar = JSON.parse(JSON.stringify(calendarItem));
        const selectedMoment = JSON.parse(JSON.stringify(calendarItem.moment));
        selectedCalendar.moment = selectedMoment._id;
        selectedMoment.calendar = selectedCalendar;
        let actionSheet: any;
        let buttons = [];
        if (!this.disableSelect) {
            buttons = buttons.concat([
                {
                    text: 'Select',
                    handler: () => {
                        const navTransition = actionSheet.dismiss();
                        navTransition.then( async () => {
                            selectedMoment.cloned = false;
                            selectedMoment.joinAs = this.joinAs;
                            this.selectedMoments.push(selectedMoment);
                            if (this.selectedMoments.length > this.maxMomentCount) {
                                this.selectedMoments.splice(0, 1);
                            }
                        });
                    }
                },
            ]);
        }
        buttons = buttons.concat([
            {
                text: 'Clone', // View
                //role: 'destructive',
                //icon: 'trash',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        selectedMoment.cloned = 'new';
                        selectedMoment.joinAs = this.joinAs;
                        this.selectedMoments.push(selectedMoment);
                        if (this.selectedMoments.length > this.maxMomentCount) {
                            this.selectedMoments.splice(0, 1);
                        }
                    });
                }
            },
            {
                text: 'View', // View
                //role: 'destructive',
                //icon: 'trash',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        this.openFeature(event, selectedMoment);
                    });
                }
            },
            {
                text: 'Cancel', // Cancel
                //icon: 'close-circle',
                role: 'cancel',
            }]);
        actionSheet = await this.actionSheetCtrl.create({
            header: selectedMoment.matrix_string[0][0],
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    async selectSample(sample) {
        let actionSheet: any;
        let buttons = [];
        buttons = buttons.concat([
            {
                text: 'Clone', // Clone
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        sample.cloned = 'new'; // type 'new' is used in parent component to indicate that a selected moment needs to be cloned
                        sample.joinAs = this.joinAs;
                        this.selectedMoments.push(sample);
                        if (this.selectedMoments.length > this.maxMomentCount) {
                            this.selectedMoments.splice(0, 1);
                        }
                    });
                }
            },
            {
                text: 'View', // View
                //role: 'destructive',
                //icon: 'trash',
                handler: () => {
                    const navTransition = actionSheet.dismiss();
                    navTransition.then( async () => {
                        this.openFeature(event, sample);
                    });
                }
            },
            {
                text: 'Cancel', // Cancel
                //icon: 'close-circle',
                role: 'cancel',
            }]);
        actionSheet = await this.actionSheetCtrl.create({
            header: sample.matrix_string[0][0],
            buttons: buttons,
            cssClass: 'level-15'
        });
        await actionSheet.present();
    }

    async executeSearch(event) {
        event.stopPropagation();
        this.renderRecentList();
    }

    async cancelSearch(event) {
        event.stopPropagation();
        this.renderRecentList();
    }

    renderRecentList() {
        this.recentCalendarItems = [];
        const requested_categories = ['5c915475e172e4e64590e348', '5e9f46e1c8bf1a622fec69d5', '5dfdbb547b00ea76b75e5a70', '5e9fe35cc8bf1a622fec69d7', '5e9fe372c8bf1a622fec69d8'];
        this.calendarService.calendarItems.forEach((calendarItem) => {
            if (calendarItem.moment && calendarItem.moment.resource && calendarItem.moment.resource.field === 'User Defined Activity' && (calendarItem.moment.matrix_string[0][0].toLowerCase().includes(this.searchKeyword.toLowerCase()) || calendarItem.moment.resource['en-US'].value[0].toLowerCase().includes(this.searchKeyword.toLowerCase())) && (this.categoryId ? calendarItem.moment.categories.includes(this.categoryId) : requested_categories.find((c) => calendarItem.moment.categories.includes(c)))) {
                this.recentCalendarItems.push(calendarItem);
            }
        });
    }

    async openFeature(event, moment) {
        event.stopPropagation();
        if (!this.modalPage && this.platform.width() >= 992) {
            this.router.navigate([{ outlets: { sub: ['details', moment._id, { subpanel: true } ] }}]);
        } else if (!this.modalPage && this.platform.width() >= 768) {
            this.router.navigate(['/app/activity/' + moment._id]);
        } else {
            this.momentService.openMoment( { moment: moment, modalPage: true});
        }
    }

    async removeMoment(i) {
        this.selectedMoments.splice(i, 1);
    }

    async createMoment() {
        if (this.modalPage) {
            this.close();
        }
        const data: any = {};
        if (this.categoryId) {
            data.categoryId = this.categoryId;
        }
        if (this.programId) {
            data.programId = this.programId;
        }
        if (this.type) {
            data.type = this.type;
        }
        if (this.parent_programId) {
            data.parent_programId = this.parent_programId;
        }
        if (this.scheduleId) {
            data.scheduleId = this.scheduleId;
        }
        if (this.goalId) {
            data.goalId = this.goalId;
        }
        if (this.categoryId === '5c915324e172e4e64590e346') { // create a community
            this.router.navigate(['/app/create/community', { categoryId: this.categoryId }]);
        } else if (!this.modalPage && this.platform.width() >= 992) {
            data.subpanel = true;
            this.router.navigate([{ outlets: { sub: ['create', data] }}]);
        } else { // create other Activities
            data.modalPage = true;
            this.momentService.editMoment(data);
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
                this.loadSamples();
                this.renderRecentList();
            }
        } else if (this.step === 1) { // only allow post-processing (edit name, select role) if maxMomentCount === 1 and it is a cloned Activity)
            if (this.maxMomentCount === 1 && this.selectedMoments[0].cloned) {
                if (this.selectedMoments[0].categories.includes('5e9f46e1c8bf1a622fec69d5')) { // journey
                    this.categoryId = '5e9f46e1c8bf1a622fec69d5';
                } else if (this.selectedMoments[0].categories.includes('5e9fe372c8bf1a622fec69d8')) { // mentoring
                    this.categoryId = '5e9fe372c8bf1a622fec69d8';
                } else if (this.selectedMoments[0].categories.includes('5e9fe35cc8bf1a622fec69d7')) { // group
                    this.categoryId = '5e9fe35cc8bf1a622fec69d7';
                } else {
                    this.categoryId = this.selectedMoments[0].categories[0]; // for others, just use the first in the item (e.g. Program, Community)
                }
                this.step++;
            } else {
                this.done();
            }
        } else if (this.step >= 2) { // only allow post-processing (edit name, select role) if maxMomentCount === 1 and it is a cloned program, and not Program (and Community), Content, Onboarding Process
            if (this.maxMomentCount === 1 && this.selectedMoments[0].cloned && !['5c915475e172e4e64590e348', '5e1bbda67b00ea76b75e5a73', '5e17acd47b00ea76b75e5a71'].includes(this.categoryId)) {
                this.step++;
            } else {
                this.done();
            }
        }
    }

    async done() {
        let selectedProgram;
        if (this.modalPage) {
            this.modalCtrl.dismiss(this.selectedMoments); // if modalPage, exit back to parent page and hand off processing of selected moments
        } else {
            this.loading = await this.loadingCtrl.create({
                message: 'Processing...',
                duration: 20000
            });
            await this.loading.present();
            if (this.selectedMoments[0] && this.selectedMoments[0].cloned === 'new') { // cloning a sample.
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
                if (this.parent_programId) { // if parent program Id is provided, also update it
                    this.selectedMoments[0].parent_programs = [this.parent_programId];
                }
                if (this.programId) {
                    this.selectedMoments[0].program = [this.programId];
                }
                if (this.type && this.selectedMoments[0].array_boolean.length > this.type) {
                    this.selectedMoments[0].array_boolean[this.type] = true;
                }
                const clonedMoments: any = await this.momentService.clone(this.selectedMoments, null);
                if (clonedMoments && clonedMoments.length) {
                    clonedMoments[0].resource = this.selectedMoments[0].resource; // clone the populated resource
                    selectedProgram = clonedMoments[0];
                }
            } else {
                selectedProgram = this.selectedMoments[0];
            }
            // in invite flow, if joinAs is provided, add user accordingly
            if (this.selectedMoments[0].cloned && this.joinAs) { // if it is a cloned item, join the Activity using the joinAs list
                await this.momentService.addUserToProgramUserList(selectedProgram, this.joinAs, null, false);
            }

            // if scheduleId is provided by Admin - Schedule view, also create Content Calendar
            if (this.scheduleId && this.parent_programId) {
                const newCalendarItem: any = {
                    moment: selectedProgram._id,
                    title: selectedProgram.matrix_string[0][0],
                    schedule: this.scheduleId,
                    startDateObj: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()), // cache datetime info for computation only. backend datetime format is in ISOString
                    endDateObj: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()), // cache datetime info for computation only. backend datetime format is in ISOString
                    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(), // cache datetime info for computation only. backend datetime format is in ISOString
                    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()).toISOString(), // cache datetime info for computation only. backend datetime format is in ISOString
                    options: { // the details of the repeating schedule
                        firstReminderMinutes: 0, // reminder is defaulted to at the time of the task
                    }
                };
                //const result: any = await this.momentService.loadSchedule(this.scheduleId);
                //newCalendarItem.uniqueAnswersPerCalendar = (result && result.schedule && result.schedule.array_boolean && result.schedule.array_boolean.length > 1) ? result.schedule.array_boolean[1] : false;
                const data: any = { operation: 'create calendar item', calendaritem: newCalendarItem };
                if (this.goalId) {
                    data.goalId = this.goalId;
                }
                await this.momentService.touchContentCalendarItems(this.parent_programId, data);
            }
            // route user upon completing all operation
            // if Admin portal - New Plan, send the user to the category page
            let type: any;
            switch (this.categoryId) {
                case '5e9fe372c8bf1a622fec69d8':
                    type = 'mentoring';
                    break;
                case '5e9fe35cc8bf1a622fec69d7':
                    type = 'groups';
                    break;
                case '5e9f46e1c8bf1a622fec69d5':
                    type = 'journey';
                    break;
                case '5c915475e172e4e64590e348':
                    type = 'programs';
                    break;
                default:
                    type = 'journey';
            }
            if (this.router.url.includes('newplan') && this.parent_programId && type && this.categoryId) { // if admin mode -> new activity
                this.router.navigate(['/app/manage/activity/' + this.parent_programId + '/' + type + '/' + this.parent_programId, { categoryId: this.categoryId }]);
                await this.loading.dismiss();
            } else if (this.router.url.includes('invite') || this.router.url.includes('choose')) { // else, in invite flow,  send user to the addParticipant page if the user is an organizer, or to the
                let hasOrganizerAccess: any;
                // check hasOrganizerAccess
                if (selectedProgram.user_list_2 && selectedProgram.user_list_2.length && selectedProgram.user_list_2[0] && typeof selectedProgram.user_list_2[0] === 'object') { // if user_list is populated, i.e. array of objects
                    hasOrganizerAccess = selectedProgram.user_list_2.map((c) => c._id).includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
                } else if (selectedProgram.user_list_2 && selectedProgram.user_list_2.length && selectedProgram.user_list_2[0] && typeof selectedProgram.user_list_2[0] === 'string') { // if user_list is not populated, i.e. array of strings
                    hasOrganizerAccess = selectedProgram.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
                }

                if (hasOrganizerAccess) { // if hasOrganizerAccess
                    this.router.navigate(['/app/manage/activity/' + selectedProgram._id + '/people/' + selectedProgram._id]);
                    await this.loading.dismiss();
                } else { // if do not have organizer access
                    this.router.navigate(['/app/activity/' + selectedProgram._id]);
                    setTimeout(async () => {
                        await this.loading.dismiss();
                        await this.resourceService.loadSystemResources(); // this is required to ensure resource has already been loaded
                        this.momentService.addParticipants(selectedProgram, this.resourceService.resource, 'both', ['user_list_1'], this.resourceService.resource['en-US'].value[32] + ' to ' + selectedProgram.matrix_string[0][0], this.resourceService.resource['en-US'].value[32]);
                    }, 2000);
                }
            } else { // in Admin - Schedule view
                this.router.navigate([{ outlets: { sub: null }}]);
                await this.loading.dismiss();
            }
            this.cleanup();
        }
    }

    async deleteContent(content) {
        const alert = await this.alertCtrl.create({
            header: 'Delete ' + content.resource['en-US'].value[0],
            message: 'Are you sure you want to permanently delete ' + content.matrix_string[0][0] + '? All calendar items that uses this content will also be removed from the timeline.',
            buttons: [{ text: 'Ok',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        // Remove the Content
                        await this.momentService.delete(content);
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        alert.present();
    }

    back() {
        if (this.step === 0 || (!this.allowSwitchCategory && this.step === 1)) {
            this.close();
        } else {
            this.step--;
        }
    }

    close() {
        if (this.subpanel) {
            this.router.navigate([{ outlets: { sub: null }}]);
        } else if (this.modalPage) {
            this.modalCtrl.dismiss();
        } else {
            this.location.back();
        }
        this.cleanup();
    }

    cleanup() {
        this.searchKeyword = '';
        this.currentView = 'new';
        this.samples = [];
        this.ionSpinner = false;
        this.pageNum = 0;
        this.reachedEnd = false;
        this.selectedMoments = [];
        this.setup(); // reset the page to the entry state
    }

    ngOnDestroy(): void {
        this.subscriptions['refresh'].unsubscribe(this.refreshAfterCreateMomentHandler);
    }
}
