import {Component, OnInit, OnDestroy, ViewEncapsulation, Input} from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { CacheService } from 'ionic-cache';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { Storage } from '@ionic/storage';
import { Auth } from '../../../services/auth.service';
import { AlertController, LoadingController, Events, Platform, MenuController, ModalController } from '@ionic/angular';
import { UserData } from "../../../services/user.service";
import { Aws } from "../../../services/aws.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit, OnDestroy {

    @Input() modalPage: any;

    subscriptions: any = {};
    loading: any;
    appName = '';
    appVersionNumber = '';
    awaitUserInput = false;
    UIenabledPushNotification: boolean;
    UIimportContactList: any;
    UIAllowedDiscovered: any;
    UIShareContactInfo: any;

  constructor(private storage: Storage,
              private location: Location,
              private events: Events,
              private router: Router,
              private electronService: ElectronService,
              private appVersion: AppVersion,
              private cache: CacheService,
              private loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController,
              public platform: Platform,
              private badge: Badge,
              private authService: Auth,
              private awsService: Aws,
              public userData: UserData) { }

    async ngOnInit() {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
    }

    refreshUserStatusHandler = async (data) => {
        if (this.authService.token) {
            this.prepareUserSettings();
        }
        this.userData.splitPaneState = 'md';
    };

    async prepareUserSettings() {
        await this.userData.load();
        this.UIenabledPushNotification = this.userData.user.enablePushNotification;
        this.UIimportContactList = this.userData.user.importContactList;
        this.UIAllowedDiscovered = !this.userData.user.hideInDirectory;
        this.UIShareContactInfo = this.userData.user.shareContactInfo;
        setTimeout(() =>{
            this.awaitUserInput = true;
        }, 50);
        if (this.platform.is('cordova')) {
            this.appVersion.getAppName().then((appName) => {
                this.appName = appName;
            });
            this.appVersion.getVersionNumber().then((appVersionNumber) => {
                this.appVersionNumber = appVersionNumber;
            });
            console.log(this.appName);
        }
    }

    async toggleImportContactList() {
        this.UIimportContactList = await this.userData.toggleImportContactList(this.UIimportContactList);
    }

    async toggleAllowedDiscovered() {
        this.UIAllowedDiscovered = await this.userData.toggleAllowedDiscovered(this.UIAllowedDiscovered);
    }

    async toggleShareContactInfo() {
        this.UIShareContactInfo = await this.userData.toggleShareContactInfo(this.UIShareContactInfo);
    }

    async resetPassword(){
        this.modalCtrl.dismiss();
        this.menuCtrl.enable(false);
        this.router.navigate(['/register', {slide: '6', exitType: 'dashboard'}]);
    }

    async changePhone() {
        this.modalCtrl.dismiss();
        this.menuCtrl.enable(false);
        this.router.navigate(['/register', {slide: '3', exitType: 'dashboard'}]);
    }

    async permanentlyEraseUser() {
        const alert = await this.alertCtrl.create({
            header: 'Permanently Delete Your Account',
            subHeader: 'This action cannot be reversed. Are you sure you want to proceed?',
            cssClass: 'level-15',
            buttons: [{ text: 'Yes, delete my account.',
                handler: async () => {
                    alert.dismiss();
                    const loading = await this.loadingCtrl.create({
                        message: 'Loading...'
                    });
                    await loading.present();
                    if (this.modalPage) {
                        await this.modalCtrl.dismiss();
                    }
                    // erase avatar first when the user's auth is still in place
                    if (this.userData.user.avatar && this.userData.user.avatar.length){
                        await this.awsService.removeFile(this.userData.user.avatar);
                    }
                    this.userData.permanentlyEraseUser().subscribe(async () => {
                        this.storage.clear();
                        this.cache.clearAll();
                        if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                            this.badge.set(0);
                        }
                        if (this.electronService.isElectronApp) {
                            this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', 0);
                        }
                        setTimeout(() => {
                            loading.dismiss();
                            this.userData.resetUserData();
                            this.menuCtrl.enable(false);
                            this.router.navigate(['/activity/5d5785b462489003817fee18']);
                            //this.router.navigate(['/register', { slide : '0', exitType: 'slide' }]);
                        }, 500);
                    }, async (err) => {
                        loading.dismiss();
                        const networkAlert = await this.alertCtrl.create({
                            header: 'No Internet Connection',
                            subHeader: 'Please connect to the internet connection to complete the log out process.',
                            buttons: ['Dismiss'],
                            cssClass: 'level-15'
                        });
                        await networkAlert.present();
                    });
                }}, { text: 'No, I changed my mind.' }]
        });
        await alert.present();
    }

    async logout(event) {
        event.stopPropagation();
        await this.userData.logout();
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        }
    }

    async explainDiscover(){
        const alert = await this.alertCtrl.create({
            header: 'Allow to be Discovered',
            subHeader: "Allow others in your community to find you in the Discover Section by toggling it to 'on'. If toggled 'off', others in the community will not be able to find you.",
            buttons: [{ text: 'Ok'}],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    closeModal() {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        } else {
            this.location.back();
        }
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].subscribe(this.refreshUserStatusHandler);
    }
}
