import {AfterViewInit, Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {StripeService} from "ngx-stripe";

//import {registerWebPlugin} from "@capacitor/core";
//import {OAuth2Client} from '@byteowls/capacitor-oauth2';

import {
    ActionSheetController, LoadingController,
    MenuController,
    ModalController,
    Platform,
} from '@ionic/angular';
import { NetworkService } from './services/network-service.service';
import { UserData } from './services/user.service';
import {Chat} from "./services/chat.service";
import {ShowrecipientinfoPage} from "./pages/connect/showrecipientinfo/showrecipientinfo.page";
import {Capacitor, Plugins} from "@capacitor/core";
import {PickfeaturePopoverPage} from "./pages/feature/pickfeature-popover/pickfeature-popover.page";
import {Moment} from "./services/moment.service";
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

    selectedProgram: any;
    loading: any;

    constructor(
        private router: Router,
        private storage: Storage,
        private zone: NgZone,
        private stripeService: StripeService,
        private actionSheetCtrl: ActionSheetController,
        private menuCtrl: MenuController,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        public platform: Platform,
        public networkService: NetworkService,
        private momentService: Moment,
        public userData: UserData,
        public chatService: Chat
  ) {}

    async ngOnInit() {
        this.menuCtrl.enable(false);
        this.userData.refreshUserStatus$.subscribe(async (res) => {
            if (res && res.type === 'show recipient') {
                const modalPage = await this.modalCtrl.create({
                    component: ShowrecipientinfoPage,
                    componentProps: res.data
                });
                await modalPage.present();
            }
        });
    }

    async ngAfterViewInit() {
        await this.platform.ready();
        try {
            if (Capacitor.isPluginAvailable('App')) {
                const data = await App.getLaunchUrl();
                if (data && data.url) {
                    this.openUrl(data.url);
                }
                App.addListener('appUrlOpen', async (app_data) => {
                    if (app_data && app_data.url) {
                        this.zone.run(() => {
                            this.openUrl(app_data.url);
                        });
                    }
                });
            } else {
                console.log("App Plugin not available");
            }
        } catch (err) {
            console.log("error when activating Capacitor's App Plugin");
        }
    }

    async openUrl(dataUrl) {
        const routeUrl = dataUrl.slice(22, dataUrl.length);
        if (routeUrl && routeUrl.length) {
            const params = {};
            let urlComponents: any;
            if (this.platform.is('ios')) {
                urlComponents = routeUrl.split('%3B'); // to account for the matrix notation ";" in iOS, which encodes as %3B
            } else {
                urlComponents = routeUrl.split(';'); // to account for the matrix notation ";" in Android
            }
            if (urlComponents.length > 1) {
                for (let i = 1; i < urlComponents.length; i++) {
                    params[urlComponents[i].split('=')[0]] = urlComponents[i].split('=')[1];
                }
            }
            console.log("launch app!", routeUrl, urlComponents[0], params);
            const modal = await this.modalCtrl.getTop();
            if (modal) {
                modal.dismiss();
            }
            this.router.navigate([urlComponents[0], params]);
        }
    }

    changeTab(tab) {
        this.menuCtrl.close();
        this.router.navigateByUrl('app/' + tab);
    }

    async invite() {
        const pickProgramModal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Invite Others to Grow with You', maxMomentCount: 1, modalPage: true}});
        await pickProgramModal.present();
        const {data: moments} = await pickProgramModal.onDidDismiss();
        if (moments && moments.length) {
            this.loading = await this.loadingCtrl.create({
                message: 'Processing...',
                duration: 5000
            });
            await this.loading.present();
            if (moments[0] && moments[0].cloned === 'new') { // cloning a sample. copy everything except calendar
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
                    clonedMoments[0].resource = moments[0].resource; // clone the populated resource
                    this.selectedProgram = clonedMoments[0];
                }
            } else {
                this.selectedProgram = moments[0];
            }
            if (this.selectedProgram.joinAs) { // join the Activity using the joinAs list
                await this.momentService.addUserToProgramUserList(this.selectedProgram, this.selectedProgram.joinAs, null, false);
            }
            this.momentService.initiateParticipantsView(this.selectedProgram, this.loading);
        }
    }

    async settings() {
        this.router.navigateByUrl('/app/user/profile');
        this.menuCtrl.close();
    }

    async saveToLocalStorage() {
        await this.storage.set('serverDomain', this.networkService.domain);
        if (this.networkService.domain === 'https://server.restvo.com') {
            this.stripeService.setKey('pk_live_yJ6A4nw34iPEMTvJnAzTZPLl');
        } else {
            this.stripeService.setKey('pk_test_x6u9uWj1QBPuhpD1MtOTTriS');
        }
    }
}
