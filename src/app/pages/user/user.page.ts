import {Component, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { UserData } from '../../services/user.service';
import {
    LoadingController,
    ModalController,
    Platform
} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import { ProfilePage } from './profile/profile.page';
import { Router} from '@angular/router';
import {SettingsPage} from "./settings/settings.page";
import {ProgramsPage} from "./programs/programs.page";
import {NotificationsPage} from "./notifications/notifications.page";
import {AboutPage} from "./about/about.page";
import {Chat} from "../../services/chat.service";
import {DashboardPage} from "./dashboard/dashboard.page";
import {PickfeaturePopoverPage} from "../feature/pickfeature-popover/pickfeature-popover.page";
import {Resource} from "../../services/resource.service";
import {Moment} from "../../services/moment.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPage {

    selectedProgram: any;
    selectedMenuOption = '';
    resource: any;
    loading: any;
    hasOrganizerAccess = false;

    menu = [
        {
            url: 'profile',
            label: 'Profile',
            component: ProfilePage,
        },
        {
            url: 'about',
            label: 'About',
            component: AboutPage,
        },
        {
            url: 'programs',
            label: 'Programs',
            component: ProgramsPage,
        },
        {
            url: 'calendar',
            label: 'Calendar',
            component: DashboardPage,
        },
        {
            url: 'privacy',
            label: 'Privacy and Security',
            component: SettingsPage,
        },
        {
            url: 'notifications',
            label: 'Notifications',
            component: NotificationsPage,
        },
    ];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private storage: Storage,
                private location: Location,
                public platform: Platform,
                private loadingCtrl: LoadingController,
                public chatService: Chat,
                private resourceService: Resource,
                private momentService: Moment,
                public modalCtrl: ModalController,
                public userData: UserData) {

    }

    ionViewWillEnter() {
        let currentSubPage: any;
        if (this.router.url === '/app/user') {
            this.selectedMenuOption = this.platform.width() >= 768 ? 'profile' : '';
        } else {
            currentSubPage = this.menu.find((c) => this.router.url.includes(c.url));
            if (currentSubPage) {
                this.selectedMenuOption = this.platform.width() >= 768 ? currentSubPage.url : '';
            }
        }
    }

    async clickManageMenu(menuOption) {
        const menuItem = this.menu.find((c) => c.url === menuOption);
        console.log(menuOption);
        let params = {};
        const componentProps = { view: null, modalPage: true };
        if (menuOption === 'calendar') {
            params = { view: 'calendar' };
            componentProps.view = 'calendar';
        }
        if (this.platform.width() >= 768) {
            this.selectedMenuOption = menuOption;
            this.router.navigate(['/app/user/' + menuOption, params], { replaceUrl: true });
        } else {
            this.selectedMenuOption = '';
            const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: componentProps });
            await manageModal.present();
        }
    }

    async selectProgram() {
        const pickProgramModal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Invite to Mentoring', maxMomentCount: 1}});
        await pickProgramModal.present();
        const {data: moments} = await pickProgramModal.onDidDismiss();
        if (moments && moments.length) {
            this.loading = await this.loadingCtrl.create({
                message: 'Processing...',
                duration: 5000
            });
            await this.loading.present();
            if (moments[0] && moments[0].type === 'new') { // cloning a sample. copy everything except calendar
                moments[0].calendar = { // reset the calendar
                    title: moments[0].matrix_string[0][0],
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
                const clonedMoments: any = await this.momentService.clone(moments, null);
                if (clonedMoments && clonedMoments.length) {
                    clonedMoments[0].type = 'new';
                    clonedMoments[0].resource = moments[0].resource; // clone the populated resource
                    this.selectedProgram = clonedMoments[0];
                }
            } else {
                this.selectedProgram = moments[0];
            }
            this.momentService.initiateParticipantsView(this.selectedProgram, this.loading);
        }
    }

    async addToCalendar(listOfConversations, listOfUsers) {
        try {
            const result: any = await this.momentService.updateMomentUserLists({
                operation: 'add to calendar',
                conversations: listOfConversations,
                users: listOfUsers,
                calendarId: this.selectedProgram.calendar._id
            }, null); // a valid token is not required, but provided in case of future change of specs
            return result;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async logout(event) {
        event.stopPropagation();
        await this.userData.logout();
    }

    back() {
        this.location.back();
    }

    ionViewWillLeave() {
        this.userData.splitPaneState = 'md';
    }
}
