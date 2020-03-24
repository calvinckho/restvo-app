import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Churches} from "../../../services/church.service";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {InvitetoconnectPage} from "../../connect/invitetoconnect/invitetoconnect.page";

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.page.html',
  styleUrls: ['./administrators.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdministratorsPage implements OnInit {
    @Input() modalPage: any;
    refreshNeeded = false;
    searchKeyword = '';
    subscriptions: any = {};

    constructor(
        public modalCtrl: ModalController,
        public userData: UserData,
        public churchService: Churches,
    ) { }

    ngOnInit() {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = (data) => {
        if (data && data.type === 'load community ready'){
            console.log("admins", this.churchService.currentManagedCommunity.admins);
        }
    };

    async editAdmin(event, admin) {
        event.stopPropagation();
        const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: admin, modalPage: true}});
        await recipientModal.present();
        const {data: needsToRefresh} = await recipientModal.onDidDismiss();
        if (needsToRefresh) {
            this.userData.refreshUserStatus({type: 'refresh manage pag'});
        }
    }

    async addAdmin() {
        const recipientModal = await this.modalCtrl.create({component: InvitetoconnectPage, componentProps: {church: this.churchService.currentManagedCommunity, type: 'Restvo Users', modalPage: true}});
        await recipientModal.present();
        const {data: needsToRefresh} = await recipientModal.onDidDismiss();
        if (needsToRefresh) {
            this.userData.refreshUserStatus({type: 'refresh manage pag'});
        }
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }
}
