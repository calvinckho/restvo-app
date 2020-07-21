import {Component, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { UserData } from '../../services/user.service';
import { ModalController, Platform } from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import { ProfilePage } from './profile/profile.page';
import { Router} from '@angular/router';
import {SettingsPage} from "./settings/settings.page";
import {ProgramsPage} from "./programs/programs.page";
import {NotificationsPage} from "./notifications/notifications.page";
import {AboutPage} from "./about/about.page";
import {Chat} from "../../services/chat.service";
import {DashboardPage} from "./dashboard/dashboard.page";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPage {
    resource: any;
    hasOrganizerAccess = false;

    menu: any = [
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
                public chatService: Chat,
                public modalCtrl: ModalController,
                public userData: UserData) {

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
            this.router.navigate(['/app/user/' + menuOption, params], { replaceUrl: true });
        } else {
            const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: componentProps });
            await manageModal.present();
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
