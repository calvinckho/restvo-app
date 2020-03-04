import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth.service';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/timeout'; import 'rxjs/add/operator/toPromise';
import { NetworkService } from './network-service.service';

@Injectable({
    providedIn: 'root'
})
export class Response {

    constructor (public http: HttpClient, public authService: Auth, public networkService: NetworkService) {}

    findResponsesByMomentId(momentId, relationshipId, calendarId) {
        if (this.authService.token) {
            return this.http.get<any>(this.networkService.domain + '/api/moment/findresponsesbymomentid/' + momentId + '?relationshipId=' + (relationshipId || '') + '&calendarId=' + (calendarId || '') + '&version=1', this.authService.httpAuthOptions).toPromise();
        } else {
            return [];
        }
    }

    findResponsesByMomentIds(momentIds) {
        return this.http.put<[any]>(this.networkService.domain + '/api/moment/findresponsesbymomentids', JSON.stringify({array: momentIds}), this.authService.httpAuthOptions);
    }

    submit(data) {
        return this.http.post<any>(this.networkService.domain + '/api/moment/submitresponse', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    };

    submitDependentResponse(data) {
        return this.http.post<any>(this.networkService.domain + '/api/moment/submitresponse', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    };

    deleteResponse(responseId) {
        return this.http.delete(this.networkService.domain + '/api/moment/response/' + responseId, this.authService.httpAuthOptions).toPromise();
    }
}


