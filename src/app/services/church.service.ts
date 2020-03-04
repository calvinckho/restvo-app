import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/timeout'; import 'rxjs/add/operator/toPromise';
import {AlertController, Events} from '@ionic/angular';
import { NetworkService } from './network-service.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import {Board} from "./board.service";

@Injectable({ providedIn: 'root' })
export class Churches {

    public currentManagedCommunity: any;
    public abuseReports: any;
    public numberOfActiveUsers: any;

    constructor(private http: HttpClient,
                private events: Events,
                private alertCtrl: AlertController,
                private authService: Auth,
                private boardService: Board,
                private networkService: NetworkService,
                private userData: UserData) {
    }

    findOnMap(userLocation, searchKeyword, searchRadius, searchType, pageNum, communityFilter) {
        return this.http.get(this.networkService.domain + '/api/church/findonmap?lat=' + userLocation.lat + '&lng=' + userLocation.lng + '&keyword=' + searchKeyword + '&radius=' + searchRadius + '&type=' + searchType + '&page=' + pageNum + '&community=' + communityFilter, this.authService.httpOptions)
            .toPromise();
    }

    loadListOfChurchProfiles(searchPhrase) {
        return this.http.get(this.networkService.domain + '/api/church/search/' + searchPhrase, this.authService.httpAuthOptions)
            .toPromise();
    }

    loadAllChurchProfiles(searchKeyword, pageNum) {
        return this.http.get(this.networkService.domain + '/api/church?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum, this.authService.httpAuthOptions).toPromise();
    }

    loadChurchProfile(id) {
        return this.http.get<[any]>(this.networkService.domain + '/api/church/load/' + id, this.authService.httpAuthOptions)
            .toPromise();
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
        await this.http.post(this.networkService.domain + '/api/church/reportUserAbuse', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    }

    async checkAbuseReport(id) {
        this.abuseReports = await this.http.get(this.networkService.domain + '/api/church/checkabusereport/' + id, this.authService.httpAuthOptions).toPromise();
    }

    async clearAbuseReport(churchId, recipient) {
        const promise = await this.http.put(this.networkService.domain + '/api/church/clearabusereport/' + churchId, JSON.stringify({reportedUser: recipient}), this.authService.httpAuthOptions)
            .toPromise();
        this.events.publish('refreshManagePage'); //send to self to update managecommunities page
        this.events.publish('refreshUserStatus', { type: 'update member' });  //send to self to update manage-members page
        this.userData.socket.emit('refresh user status', this.userData.user._id, { type: 'update member' }); //send to other devices to update manage-members page
        return promise;
    }

    loadChurchAppUsers(churchId, searchKeyword, pageNum) {
        return this.http.get(this.networkService.domain + '/api/church/appusers/' + churchId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum.toString(), this.authService.httpAuthOptions)
            .toPromise();
    }

    loadListOfChurchMembersProfiles(churchId, searchKeyword, pageNum) {
        return this.http.get(this.networkService.domain + '/api/church/loadmembers/' + churchId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum.toString(), this.authService.httpAuthOptions)
            .toPromise();
    }

    loadChurchGroupProfiles(id, published) {
        return this.http.get(this.networkService.domain + '/api/church/loadgroups/' + id + '?published=' + published, this.authService.httpAuthOptions).toPromise();
    }

    loadAllChurchGroupProfiles(churchId) {
        return this.http.get(this.networkService.domain + '/api/church/loadallgroups/' + churchId, this.authService.httpAuthOptions).toPromise();
    }

    loadAllCommunityActivities(churchId, searchKeyword, pageNum) {
        return this.http.get(this.networkService.domain + '/api/church/activities/' + churchId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum, this.authService.httpAuthOptions).toPromise();
    }

    async createChurchProfile(church) {
        let promise = await this.http.post(this.networkService.domain + '/api/church/create', JSON.stringify(church), this.authService.httpAuthOptions)
            .toPromise();
        await this.userData.load();
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'update church participation'});
        return promise;
    }

    updateChurchProfile(profile) {
        return this.http.put(this.networkService.domain + '/api/church/update', JSON.stringify(profile), this.authService.httpAuthOptions)
            .toPromise();
    }

    addAdmin(churchId, admin) {
        return this.http.put(this.networkService.domain + '/api/church/addadmin/' + churchId, JSON.stringify(admin), this.authService.httpAuthOptions).toPromise();
    }

    removeAdmin(churchId, admin) {
        return this.http.put(this.networkService.domain + '/api/church/removeadmin/' + churchId, JSON.stringify(admin), this.authService.httpAuthOptions).toPromise()
    }

    async editCommunityBoard(data) {
        const promise = await this.http.put<string>(this.networkService.domain + '/api/church/editchurchboard', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
        await this.userData.load();
        this.userData.communitiesboards = await this.boardService.loadUserChurchBoards(); //in case of a board group
        this.userData.socket.emit('refresh user status', this.userData.user._id, {
            type: 'update group participation',
            conversationId: "all"
        });
        return promise;
    };

    inviteNewAppUsers(data) {
        return this.http.post(this.networkService.domain + '/api/church/inviteNewAppUsers', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
    }

    invitePendingMembers(data) {
        return this.http.post(this.networkService.domain + '/api/church/invitePendingMembers', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
    }

    approveCommunity(id) {
        return this.http.put(this.networkService.domain + '/api/church/approve/' + id, {}, this.authService.httpAuthOptions).toPromise();
    }

    unlistCommunity(id) {
        return this.http.put(this.networkService.domain + '/api/church/unlist/' + id, {}, this.authService.httpAuthOptions).toPromise();
    }

    getAppUserUsage(id) {
        return this.http.get(this.networkService.domain + '/api/church/appusersusage/' + id, this.authService.httpAuthOptions).toPromise();
    }
}


