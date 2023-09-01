import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AlertController} from '@ionic/angular';
import { NetworkService } from './network-service.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import {Board} from "./board.service";
import {lastValueFrom} from "rxjs";

@Injectable({ providedIn: 'root' })
export class Churches {

    public currentManagedCommunity: any;
    public abuseReports: any;
    public numberOfActiveUsers: any;

    constructor(private http: HttpClient,
                private alertCtrl: AlertController,
                private authService: Auth,
                private boardService: Board,
                private networkService: NetworkService,
                private userData: UserData) {
    }

    findOnMap(userLocation, searchKeyword, searchRadius, searchType, pageNum, communityFilter) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/findonmap?lat=' + userLocation.lat + '&lng=' + userLocation.lng + '&keyword=' + searchKeyword + '&radius=' + searchRadius + '&type=' + searchType + '&page=' + pageNum + '&community=' + communityFilter, this.authService.httpOptions)
            );
    }

    loadListOfChurchProfiles(searchPhrase) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/search/' + searchPhrase, this.authService.httpAuthOptions)
            );
    }

    loadAllChurchProfiles(searchKeyword, pageNum) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum, this.authService.httpAuthOptions));
    }

    loadChurchProfile(id) {
        return lastValueFrom(this.http.get<[any]>(this.networkService.domain + '/api/church/load/' + id, this.authService.httpAuthOptions)
            );
    }

    async reportUserAbuse(reportedUser) {
        const alert = await this.alertCtrl.create({
            header: 'Report ' + reportedUser.first_name,
            message: 'You are about to report ' + reportedUser.name + ' for a violation of our terms of use. You can describe the violation below.',
            inputs: [{
                name: 'report',
                type: 'text',
                placeholder: '(Optional) Describe the violation'
            }],
            buttons: [{
                text: 'Submit Report',
                handler: data => {
                    this.reportUserAbuseHttp(reportedUser, data.report);
                }
            }, {text: 'Cancel'}],
            cssClass: 'level-15'
        });
        alert.present();
    }

    async reportUserAbuseHttp(reportedUser, report) {
        let data = {
            reportedUser: reportedUser,
            reportHistory: {
                reportedBy: this.userData.user._id,
                report: report,
                reportedAt: new Date()
            }
        };
        await lastValueFrom(this.http.post(this.networkService.domain + '/api/church/reportUserAbuse', JSON.stringify(data), this.authService.httpAuthOptions));
    }

    async checkAbuseReport(id) {
        this.abuseReports = await lastValueFrom(this.http.get(this.networkService.domain + '/api/church/checkabusereport/' + id, this.authService.httpAuthOptions));
    }

    async clearAbuseReport(churchId, recipient) {
        const promise = await lastValueFrom(this.http.put(this.networkService.domain + '/api/church/clearabusereport/' + churchId, JSON.stringify({reportedUser: recipient}), this.authService.httpAuthOptions)
            );
        this.userData.refreshUserStatus({ type: 'refresh manage page' }); //send to self to update managecommunities page
        this.userData.refreshUserStatus({ type: 'update member' });  //send to self to update manage-members page
        this.userData.socket.emit('refresh user status', this.userData.user._id, { type: 'update member' }); //send to other devices to update manage-members page
        return promise;
    }

    loadPlatformAppUsers(churchId, searchKeyword, pageNum) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/appusers/' + churchId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum.toString(), this.authService.httpAuthOptions)
            );
    }

    loadListOfChurchMembersProfiles(churchId, searchKeyword, pageNum) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/loadmembers/' + churchId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum.toString(), this.authService.httpAuthOptions)
            );
    }

    loadChurchGroupProfiles(id, published) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/loadgroups/' + id + '?published=' + published, this.authService.httpAuthOptions));
    }

    loadAllChurchGroupProfiles(churchId) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/loadallgroups/' + churchId, this.authService.httpAuthOptions));
    }

    loadAllCommunityActivities(churchId, searchKeyword, pageNum) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/activities/' + churchId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum + '&version=1', this.authService.httpAuthOptions));
    }

    async createChurchProfile(church) {
        let promise = await lastValueFrom(this.http.post(this.networkService.domain + '/api/church/create', JSON.stringify(church), this.authService.httpAuthOptions)
            );
        await this.userData.load();
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'update church participation'});
        return promise;
    }

    updateChurchProfile(profile) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/church/update', JSON.stringify(profile), this.authService.httpAuthOptions)
            );
    }

    addAdmin(churchId, admin) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/church/addadmin/' + churchId, JSON.stringify(admin), this.authService.httpAuthOptions));
    }

    removeAdmin(churchId, admin) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/church/removeadmin/' + churchId, JSON.stringify(admin), this.authService.httpAuthOptions))
    }

    async editCommunityBoard(data) {
        const promise = await lastValueFrom(this.http.put<string>(this.networkService.domain + '/api/church/editchurchboard', JSON.stringify(data), this.authService.httpAuthOptions)
            );
        await this.userData.load();
        this.userData.communitiesboards = await this.boardService.loadUserChurchBoards(); //in case of a board group
        this.userData.socket.emit('refresh user status', this.userData.user._id, {
            type: 'update group participation',
            conversationId: "all"
        });
        return promise;
    };

    inviteNewAppUsers(data) {
        return lastValueFrom(this.http.post(this.networkService.domain + '/api/church/inviteNewAppUsers', JSON.stringify(data), this.authService.httpAuthOptions)
            );
    }

    invitePendingMembers(data) {
        return lastValueFrom(this.http.post(this.networkService.domain + '/api/church/invitePendingMembers', JSON.stringify(data), this.authService.httpAuthOptions)
            );
    }

    approveCommunity(id) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/church/approve/' + id, {}, this.authService.httpAuthOptions));
    }

    unlistCommunity(id) {
        return lastValueFrom(this.http.put(this.networkService.domain + '/api/church/unlist/' + id, {}, this.authService.httpAuthOptions));
    }

    getAppUserUsage(id) {
        return lastValueFrom(this.http.get(this.networkService.domain + '/api/church/appusersusage/' + id, this.authService.httpAuthOptions));
    }
}


