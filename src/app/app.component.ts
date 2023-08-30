import {AfterViewInit, Component, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {StripeService} from 'ngx-stripe';
import {
    ActionSheetController, IonSelect,
    MenuController,
    ModalController,
    Platform,
} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';
import { ShareExtension } from 'capacitor-share-extension';

import {Aws} from './services/aws.service';
import { NetworkService } from './services/network-service.service';
import { UserData } from './services/user.service';
import {Chat} from './services/chat.service';
import {ShowrecipientinfoPage} from './pages/connect/showrecipientinfo/showrecipientinfo.page';

import {ProgramsPage} from './pages/user/programs/programs.page';
import { App } from '@capacitor/app';
import {UploadmediaPage} from './pages/feature/uploadmedia/uploadmedia.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('restSelect') select: IonSelect;
    selectedProgram: any;
    loading: any;

    constructor(
        public router: Router,
        private storage: Storage,
        private zone: NgZone,
        private stripeService: StripeService,
        private actionSheetCtrl: ActionSheetController,
        private menuCtrl: MenuController,
        private modalCtrl: ModalController,
        public platform: Platform,
        public awsService: Aws,
        public networkService: NetworkService,
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
                console.log('App Plugin not available');
            }
            if (this.platform.is('cordova') && Capacitor.isPluginAvailable('ShareExtension')) {
                window.addEventListener('sendIntentReceived',  () => {
                    this.checkIntent();
                });
                this.checkIntent();
            }
        } catch (err) {
            console.log('error when activating Capacitor\'s App Plugin');
        }
    }

    async checkIntent() {
        try {
            const result: any = await ShareExtension.checkSendIntentReceived();
            if (result && result.payload && Array.isArray(result.payload) && result.payload.length) {
                const blobs = [];
                const promises = result.payload.map(async (payloadItem) => {
                    const response = await fetch(decodeURIComponent(payloadItem.webPath));
                    blobs.push(await response.blob());
                });
                await Promise.all(promises);
                const modal = await this.modalCtrl.create({component: UploadmediaPage, componentProps: { sessionId: 'preview-media', mediaType: 'photo', files: blobs, modalPage: true }});
                await modal.present();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async openUrl(dataUrl) {
        const routeUrl = decodeURIComponent(dataUrl);
        if (routeUrl && routeUrl.length && !routeUrl.includes('restvo://')) { // exclude web scheme
            const params: any = {};
            let urlComponents: any;
            urlComponents = routeUrl.split(';'); // to account for the matrix notation ";" in Android

            if (urlComponents.length > 1) {
                for (let i = 1; i < urlComponents.length; i++) {
                    params[urlComponents[i].split('=')[0]] = urlComponents[i].split('=')[1];
                }
            }
            let modal = await this.modalCtrl.getTop();
            if (modal) {
                modal.dismiss();
            }
            this.router.navigate([urlComponents[0].slice(22, urlComponents[0].length), params]);
        }
    }

    changeTab(tab) {
        this.menuCtrl.close();
        this.router.navigateByUrl('app/' + tab);
    }

    async settings() {
        this.router.navigateByUrl('/app/user/profile');
        this.menuCtrl.close();
    }

    async openSelectHomePage() {
        if (this.platform.width() >= 768) {
            this.router.navigate(['/app/user/programs']);
        } else {
            this.menuCtrl.close();
            const modal = await this.modalCtrl.create({ component: ProgramsPage, componentProps: { modalPage: true } });
            await modal.present();
        }
    }

    async clickRestToggle(event) {
        event.stopPropagation();
        event.preventDefault();
        this.select.open();
    }

    async saveToLocalStorage() {
        await this.storage.set('serverDomain', this.networkService.domain);
    }
}
