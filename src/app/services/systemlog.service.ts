import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { NetworkService } from './network-service.service';
import { AppVersion } from "@ionic-native/app-version/ngx";
import {Platform} from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class Systemlog {

    constructor(private http: HttpClient,
                private injector: Injector,
                private platform: Platform,
                private appVersion: AppVersion,
                public authService: Auth,
                public userData: UserData,
                public networkService: NetworkService) {
    }

    async logAppUsage(time) {
        const data: any = {topic: 'Mobile App Usage', numberField_1: time, appPlatforms: this.platform.platforms()};
        if (this.userData && this.userData.defaultProgram && this.userData.defaultProgram._id) {
            data.defaultProgram = this.userData.defaultProgram._id;
        }
        if (this.platform.is('cordova')) {
            data.appVersionNumber = await this.appVersion.getVersionNumber();
        }
        return this.http.post(this.networkService.domain + '/api/systemlog/appusage?version=1', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    }

    async logMessage(data) {
        data.appPlatforms = this.platform.platforms();
        if (this.platform.is('cordova')) {
            data.appVersionNumber = await this.appVersion.getVersionNumber();
        }
        return this.http.post(this.networkService.domain + '/api/systemlog/appusage?version=1', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    }

    async loadMetrics(activityId, durationValue) {
        // return this.http.get(this.networkService.domain + '/api/systemlog/loadmetrics?durationUnit=month&type=activity&durationValue=1&timeMeasurement=day&topic=Load Activity&activity=' + activityId, this.authService.httpAuthOptions).toPromise();
        return this.http.get(this.networkService.domain + `/api/systemlog/loadmetrics?durationUnit=day&type=activity&durationValue=${durationValue}&timeMeasurement=day&topic=Load Activity&activity=` + activityId, this.authService.httpAuthOptions).toPromise();
    }
}
