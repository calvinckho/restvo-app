import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/timeout'; import 'rxjs/add/operator/toPromise';
import { NetworkService } from './network-service.service';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { Chat } from './chat.service';
import { Group } from '../interfaces/group';
import {Board} from "./board.service";

@Injectable({ providedIn: 'root' })
export class Groups {

    constructor(private http: HttpClient,
                private authService: Auth,
                private networkService: NetworkService,
                private boardService: Board,
                private chatService: Chat,
                private userData: UserData) {
    }

    loadListOfGroupProfiles(searchPhrase){
        return this.http.get(this.networkService.domain + '/api/group/search/' + searchPhrase, this.authService.httpAuthOptions).toPromise();
    }

    loadAllGroupProfiles(){
        return this.http.get(this.networkService.domain + '/api/group', this.authService.httpAuthOptions).toPromise();
    }

    loadGroupProfile(id){
        return this.http.get<[Group]>(this.networkService.domain + '/api/group/loadgroup/' + id, this.authService.httpAuthOptions).toPromise();
    }

    loadPublicGroup(id){
        return this.http.get<[Group]>(this.networkService.domain + '/api/group/public/' + id, this.authService.httpOptions).toPromise();
    }

    loadGroupMembers(groupId, searchKeyword, pageNum){
        return this.http.get<{members: [any], pending_members: [any]}>(this.networkService.domain + '/api/group/loadmembers/' + groupId + '?searchKeyword=' + searchKeyword + '&pageNum=' + pageNum.toString() , this.authService.httpAuthOptions)
            .toPromise();
    }

    async updateGroupProfile(group){
        let promise = this.http.put(this.networkService.domain + '/api/group/update', JSON.stringify(group), this.authService.httpAuthOptions)
            .toPromise();
        await this.userData.load();
        return promise;
    }

    flagGroup(profile){
        const promise = this.http.put(this.networkService.domain + '/api/group/flag', JSON.stringify(profile), this.authService.httpAuthOptions).toPromise();
        this.userData.refreshUserStatus({ type: 'refresh manage page' });
        return promise;
    }

    async createGroupProfile(group) {
        const createdGroup: any = await this.createGroupHTTP(group);
        await this.userData.load();
        if (createdGroup.board){
            this.userData.communitiesboards = await this.boardService.loadUserChurchBoards(); //in case of a board group
        }
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'update group participation', conversationId: "all"});
        return createdGroup;
    }

    createGroupHTTP(group) {
        return this.http.post(this.networkService.domain + '/api/group/create', JSON.stringify(group), this.authService.httpAuthOptions)
            .toPromise();
    }

    async deleteGroupProfile(group) {
        let promise = await this.http.put(this.networkService.domain + '/api/group/delete', JSON.stringify(group), this.authService.httpAuthOptions)
            .toPromise();
        await this.userData.load();
        this.userData.refreshUserStatus({ type: 'close group view', data: { _id: group._id } });
        if (group.conversation) {
            this.authService.refreshGroupStatus({conversationId: group.conversation, data: group});
            this.authService.chatSocketMessage({topic: 'chat socket emit', conversationId: group.conversation, data: {action: 'leave group', groupId: group._id}});

        }
        if (group.board) {
            this.userData.communitiesboards = await this.boardService.loadUserChurchBoards();
            this.userData.refreshUserStatus({ type: 'refresh community board page' });
        }
        this.userData.refreshUserStatus({type: 'leave group', groupId: group._id});
        this.userData.socket.emit('refresh user status', this.userData.user._id, {type: 'leave group', groupId: group._id});
        return promise;
    }

    inviteNewGroupMember(data){
       return this.http.put(this.networkService.domain + '/api/group/invite', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    }

    addEmailToGroup(data){
       return this.http.post(this.networkService.domain + '/api/group/addemail', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    }

    inviteNewAppUsers(data){
        return this.http.post(this.networkService.domain + '/api/group/inviteNewAppUsers', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
    }

    addNewAppUsers(data){
        return this.http.post(this.networkService.domain + '/api/group/addNewAppUsers', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
    }

    invitePendingMembers(data){
        return this.http.post(this.networkService.domain + '/api/group/invitePendingMembers', JSON.stringify(data), this.authService.httpAuthOptions)
            .toPromise();
    }

    removeUserFromGroup(data) {
        return this.http.put(this.networkService.domain + '/api/group/removeuser', JSON.stringify(data), this.authService.httpAuthOptions).toPromise();
    }
}
