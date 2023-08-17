import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NetworkService } from './network-service.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import {AlertController} from "@ionic/angular";
import {lastValueFrom} from "rxjs";

@Injectable({ providedIn: 'root' })
export class PaymentService {

    constructor(private http: HttpClient,
                private alertCtrl: AlertController,
                public authService: Auth,
                public networkService: NetworkService,
                public userData: UserData) {
    }

    async checkSubscriptionAllowance(moment) {
        let orgId;
        if (moment && moment.parent_programs && moment.parent_programs.length) {
            // grandparent community, only if communities are populated
            if (moment.parent_programs[0].parent_programs && moment.parent_programs[0].parent_programs.length && moment.parent_programs[0].parent_programs[0]) {
                orgId = moment.parent_programs[0].parent_programs[0]._id;
            // parent community
            } else if (moment.parent_programs && moment.parent_programs.length && moment.parent_programs[0]) {
                // if communities are populated
                if ((typeof moment.parent_programs[0]) === 'object') {
                    orgId = moment.parent_programs[0]._id;
                } else { // when communities are not populated
                    orgId = moment.parent_programs[0];
                }
            }
            // current community
        } else {
            orgId = moment._id;
        }
        const promise: any = await lastValueFrom(this.http.get(this.networkService.domain + '/api/payment/checkallowance/' + orgId + '?momentId=' + moment._id, this.authService.httpAuthOptions));
        if (promise) {
            if (promise.status === 'success') {
                return true;
            } else {
                const alert = await this.alertCtrl.create({
                    header: promise.title || 'Upgrade Required',
                    message: promise.msg || 'Your community has exceeded the 10 users allowance under the Free Plan. Please upgrade your plan to add more users.',
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then( async () => {
                            });
                        }}],
                    cssClass: 'level-15'
                });
                alert.present();
                return false;
            }
        } else {
            return false;
        }
    }

    loadCommunityParticipants(orgId) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/payment/loadcommunityparticipants/' + orgId, this.authService.httpAuthOptions));
    }

    loadCustomer(orgId) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/payment/loadcustomer/' + orgId, this.authService.httpAuthOptions));
    }

    loadBillingInfo(orgId) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/payment/loadbilling/' + orgId, this.authService.httpAuthOptions));
    }

    listInvoices(orgId, query) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/payment/listinvoices/' + orgId + query, this.authService.httpAuthOptions));
    }


    subscribe(orgId, plan, owner, source) {
        return lastValueFrom(this.http.post(this.networkService.domain + '/api/payment/subscribe/' + orgId, JSON.stringify({plan: plan, owner: owner, source: source}), this.authService.httpAuthOptions));
    }

    updateBillingMethod(orgId, source) {
        return lastValueFrom(this.http.post(this.networkService.domain + '/api/payment/updatebilling/' + orgId, JSON.stringify({source: source}), this.authService.httpAuthOptions));
    }
}
