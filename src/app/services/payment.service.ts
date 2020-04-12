import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { NetworkService } from './network-service.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {

    constructor(private http: HttpClient,
                public authService: Auth,
                public networkService: NetworkService,
                public userData: UserData) {
    }

    loadCommunityParticipants(orgId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadcommunityparticipants/' + orgId, this.authService.httpAuthOptions).toPromise();
    }

    loadCustomer(orgId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadcustomer/' + orgId, this.authService.httpAuthOptions).toPromise();
    }


    loadBillingInfo(orgId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadbilling/' + orgId, this.authService.httpAuthOptions).toPromise();
    }

    listInvoices(orgId, query) {
        return this.http.get(this.networkService.domain + '/api/payment/listinvoices/' + orgId + query, this.authService.httpAuthOptions).toPromise();
    }


    subscribe(orgId, plan, owner, source) {
        return this.http.post(this.networkService.domain + '/api/payment/subscribe/' + orgId, JSON.stringify({plan: plan, owner: owner, source: source}), this.authService.httpAuthOptions).toPromise();
    }

    updateBillingMethod(orgId, source) {
        return this.http.post(this.networkService.domain + '/api/payment/updatebilling/' + orgId, JSON.stringify({source: source}), this.authService.httpAuthOptions).toPromise();
    }
}
