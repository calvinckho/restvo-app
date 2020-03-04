import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { NetworkService } from './network-service.service';

@Injectable({ providedIn: 'root' })
export class Systemlog {

    constructor(private http: HttpClient,
                public authService: Auth,
                public userData: UserData,
                public networkService: NetworkService) {
    }

    logAppUsage(time) {
        let churches = [];
        if (this.userData && this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
            churches = this.userData.user.churches.map((c) => c._id);
        }
        return this.http.post(this.networkService.domain + '/api/systemlog/appusage', JSON.stringify({time: time, churches: churches}), this.authService.httpAuthOptions).toPromise();
    }
}


