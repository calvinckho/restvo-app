import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { Events } from '@ionic/angular';
import { NetworkService } from './network-service.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {

    constructor(private http: HttpClient,
                public events: Events,
                public authService: Auth,
                public networkService: NetworkService,
                public userData: UserData) {
    }

    loadCustomer(churchId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadcustomer/' + churchId, this.authService.httpAuthOptions).toPromise();
    }


    loadBillingInfo(churchId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadbilling/' + churchId, this.authService.httpAuthOptions).toPromise();
    }

    listInvoices(churchId, query) {
        return this.http.get(this.networkService.domain + '/api/payment/listinvoices/' + churchId + query, this.authService.httpAuthOptions).toPromise();
    }


    subscribe(churchId, plan, owner, source) {
        return this.http.post(this.networkService.domain + '/api/payment/subscribe/' + churchId, JSON.stringify({plan: plan, owner: owner, source: source}), this.authService.httpAuthOptions).toPromise();
    }

    updateBillingMethod(churchId, source) {
        return this.http.post(this.networkService.domain + '/api/payment/updatebilling/' + churchId, JSON.stringify({source: source}), this.authService.httpAuthOptions).toPromise();
    }
}
