import { Injectable } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;
import { SwUpdate } from '@angular/service-worker';
import {ElectronService} from 'ngx-electron';

@Injectable({ providedIn: 'root' })
export class NetworkService {

    //  prod endpoint
    domain = 'https://server.restvo.com';
    //  dev endpoint
    //domain = 'https://server.dev.restvo.com';
    webapp_domain = 'https://app.restvo.com';
    assets = 'https://wee.nyc3.digitaloceanspaces.com/';
    networkSuccess = false;

    onDevice: boolean;

    constructor(
                public platform: Platform,
                private electronService: ElectronService,
                private swUpdate: SwUpdate,
                private toastCtrl: ToastController) {
        this.onDevice = this.platform.is('cordova');
        if (!this.electronService.isElectronApp && this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(evt => {
                window.location.reload();
            });
            setInterval(() => {
                this.swUpdate.available.subscribe(evt => {
                    window.location.reload();
                });
            }, 3600000); // check for update every hour
        }
    }

    //  check if the device is online
    async hasNetwork() {
        if (this.onDevice) { // if running on device and has a connection type
            const status = await Network.getStatus();
            this.networkSuccess = status.connected;
            return status.connected;
        } else {
            return navigator.onLine;
        }
    }

    // check if the device is offline
    async isOffline() {
        if (this.onDevice) {
            const status = await Network.getStatus();
            return status.connected;
        } else {
            return !navigator.onLine;
        }
    }

    // show an alert that the device is connected
    async showHasNetworkAlert() {
        /*await Toast.show({
            text: 'You are now connected to the internet.',
            duration: "short"
        });*/
        const toast = await this.toastCtrl.create({
            message: 'You are now connected to the internet.',
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // show an alert that the device is not connected
    async showNoNetworkAlert() {
        /*await Toast.show({
            text: 'Cannot connect to the internet. Please Check your network connection.',
            duration: "short"
        });*/
        const toast = await this.toastCtrl.create({
            message: 'Cannot connect to the internet. Please Check your network connection.',
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

}
