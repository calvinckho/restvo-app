import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SwUpdate} from "@angular/service-worker";
import { ElectronService } from 'ngx-electron';
import {
    AlertController,
    Platform,
} from "@ionic/angular";
import { Auth } from './auth.service';
import { NetworkService } from './network-service.service';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/timeout'; import 'rxjs/add/operator/toPromise';
import { Storage } from "@ionic/storage";
import { CacheService } from "ionic-cache";
import {UserData} from "./user.service";

@Injectable({ providedIn: 'root' })
export class Resource {

    fields: any = [];
    controls = [
        'play-large', // The large play button in the center
        //'restart', // Restart playback
        'play', // Play/pause playback
        //'rewind', // Rewind by the seek time (default 10 seconds)
        //'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        //'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        //'volume', // Volume control
        'captions', // Toggle captions
        //'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        'airplay', // Airplay (currently Safari only)
        'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
        'fullscreen', // Toggle fullscreen
    ];
    plyrOptions = { 'controls': this.controls,
        'ratio': '16:9',
        'blankVideo': 'https://wee.nyc3.digitaloceanspaces.com/app/blank.mp4',
        'youtube': { origin: 'https://app.restvo.com' } };

    // System resource objects
    resource: any; // Activity Components Resource Object
    categories: any; // Activity Categories

    // refresh max timeout is mainly to curtain dev app from refreshing too many times. For production app upgrades, it should refresh at most 3 times before the cache is updated
    refreshRetryMaxCount = 3; // try 5 times
    refreshRetryInterval = 10000; // 10 sec
    refreshRetryCount = 0;

    //stock photo
    searchKeyword = '';
    showPixabay = -1; // -1 to hide search Pixabay, 0 and higher are to turn it on
    stockPhotoResults: any;
    pageNum = 1;

    constructor(private http: HttpClient,
                private electronService: ElectronService,
                private swUpdate: SwUpdate,
                private cache: CacheService,
                private alertCtrl: AlertController,
                private platform: Platform,
                public authService: Auth,
                private userData: UserData,
                public networkService: NetworkService) {
    }

    // create a load system resource cache system for storing and refreshing system resources
    async loadSystemResources() {
        return new Promise(async (resolve, reject) => {
            try {
                const request = this.load('en-US', 'Activity Components v2,Activity Category');
                // delaytype: this indicates that it should send a new request to the server every time, you can also set it to 'none' which indicates that it should only send a new request when it's expired
                // ttl is in seconds. set to 1 week: 60 * 60 * 24 * 7 = 604800 sec
                // to update cache for dev app, just increment userData.versions['Activity Components'] to > this.resource.matrix_number[2][0] in Mongodb and it will refresh the cache
                this.cache.loadFromDelayedObservable('SystemResources', request, 'ResourceService', 604800, 'none').subscribe(async (result: any) => {
                    this.resource = result.find((c) => c.field === 'Activity Components v2'); // return the activity components resource object in the result array
                    this.categories = result.filter((c) => c.field === 'Activity Category'); // return the Activity Category array by filtering the result array
                    console.log('current Resource version in cache:', this.resource.matrix_number[2][0]);

                    // in th event a user has upgraded the app which requires the latest version of the resources, do a silent refresh of system resources
                    if (this.userData.versions['Activity Components'] > this.resource.matrix_number[2][0]) {
                        await this.cache.clearGroup('ResourceService');
                        console.log('refreshing System Resources from source...');
                        if (this.refreshRetryCount > 0) {
                            if (this.refreshRetryCount <= this.refreshRetryMaxCount) {
                                this.refreshRetryCount++;
                                setTimeout(() => {
                                    this.loadSystemResources(); // get a fresh copy from backend
                                }, this.refreshRetryInterval);
                            }
                        } else {
                            this.refreshRetryCount++;
                            this.loadSystemResources(); // get a fresh copy from backend
                        }
                    }
                    // every 1 week, the cache will refresh. It will sometimes detect that the current app uses a older version, in which case it will prompt the user to upgrade the app.
                    // this will take care of warning about general label upgrade but not new component upgrade.
                    // in the event that the data includes a newly created component, it will not break the app since it is not displayed by the *ngIf="item === XXXXX" condition, so showfeature and editfeature should ignore it. In onboarding, a check has been implemented to skip that onboarding flow so it won't get tripped up
                    if (!this.electronService.isElectronApp && this.userData.versions['Activity Components'] < this.resource.matrix_number[2][0]) {
                        if (this.platform.is('cordova')) {
                            const versionAlert = await this.alertCtrl.create({
                                header: 'Upgrade Recommended',
                                message: 'To utilize the latest features in Restvo, please upgrade your app to the latest version.',
                                buttons: ['OK'],
                                cssClass: 'level-15'
                            });
                            await versionAlert.present();
                        } else {
                            const versionAlert = await this.alertCtrl.create({
                                header: 'A New Version Detected',
                                message: 'Your web app is downloading a new version in the background and will momentarily reload to apply the update.',
                                buttons: [{
                                    text: 'OK',
                                    handler: () => {
                                        this.swUpdate.activateUpdate();
                                    }
                                }],
                                cssClass: 'level-15'
                            });
                            await versionAlert.present();
                        }
                    }
                    console.log("resource", this.resource);

                    if (result && result.length) {
                        console.log("cached res", result);
                        resolve(result);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    load(language, field) {
        return this.http.get(this.networkService.domain + '/api/resource/load/' + language + '?field=' + field, this.authService.httpOptions);
    }

    loadUserResource(id) {
        return this.http.get(this.networkService.domain + '/api/resource/userresource/' + id.toString(), this.authService.httpAuthOptions).toPromise();
    }

    loadUserResources(language, field, pageNum) {
        return this.http.get(this.networkService.domain + '/api/resource/userresources/' + language + '?field=' + field + '&pageNum=' + pageNum, this.authService.httpAuthOptions).toPromise();
    }

    create(resource) {
        return this.http.post(this.networkService.domain + '/api/resource/create', JSON.stringify(resource), this.authService.httpAuthOptions).toPromise();
    }

    update(resource) {
        return this.http.put(this.networkService.domain + '/api/resource/update', JSON.stringify(resource), this.authService.httpAuthOptions).toPromise();
    }

    clickVideo(event, sources) {
        event.stopPropagation();
        if (this.electronService.isElectronApp && sources[0].provider && sources[0].provider === 'youtube' ) {
            // electron doesn't play youtube video natively so needs to load the youtube link in a new tab
            window.open(((sources[0].src.indexOf('/') < 0) ? 'https://www.youtube.com/watch?v=' : '' ) + sources[0].src, '_blank');
        }
    }

    assignVideoEndpoint(videoChatRoomId) {
        return this.http.get(this.networkService.domain + '/api/resource/videoendpoint' + '?videoChatRoomId=' + videoChatRoomId, this.authService.httpOptions).toPromise();
    }

    forwardGeocode(address) {
        return this.http.get('https://us1.locationiq.com/v1/search.php?key=pk.e5797fe100f9aa5732d5346f742b243f&q=' + encodeURI(address) + '&format=json').toPromise();
    }

    async searchPixabay() {
        this.stockPhotoResults = {};
        this.pageNum = 1;
        this.stockPhotoResults = await this.pixabaySearch(this.searchKeyword, this.pageNum);
    }

    pixabaySearch(searchKeyword, pageNum) {
        return this.http.get('https://pixabay.com/api/?key=11622064-8698a5beb77de4a9e9677e4c3&q=' + encodeURI(searchKeyword) + '&per_page=200&image_type=photo&pretty=true&page=' + pageNum.toString() ).toPromise();
    }
}


