import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth.service';

import { NetworkService } from './network-service.service';
import {lastValueFrom} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Response {

    constructor (public http: HttpClient, public authService: Auth, public networkService: NetworkService) {}

    findResponsesByMomentId(momentId, relationshipId, calendarId) {
        if (this.authService.token) {
            return lastValueFrom(this.http.get<any>(this.networkService.domain + '/api/moment/findresponsesbymomentid/' + momentId + '?relationshipId=' + (relationshipId || '') + '&calendarId=' + (calendarId || '') + '&version=1', this.authService.httpAuthOptions));
        } else {
            return [];
        }
    }

    findResponsesByMomentIds(momentIds) {
        return this.http.put<[any]>(this.networkService.domain + '/api/moment/findresponsesbymomentids', JSON.stringify({array: momentIds}), this.authService.httpAuthOptions);
    }

    submit(data) {
        return lastValueFrom(this.http.post<any>(this.networkService.domain + '/api/moment/submitresponse?version=1', JSON.stringify(data), this.authService.httpAuthOptions));
    };

    submitDependentResponse(data) {
        return lastValueFrom(this.http.post<any>(this.networkService.domain + '/api/moment/submitresponse?version=1', JSON.stringify(data), this.authService.httpAuthOptions));
    };

    deleteResponse(responseId) {
        return lastValueFrom(this.http.delete(this.networkService.domain + '/api/moment/response/' + responseId, this.authService.httpAuthOptions));
    }
}


