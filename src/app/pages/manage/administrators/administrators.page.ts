import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserData} from '../../../services/user.service';
import {Churches} from '../../../services/church.service';
import {ShowrecipientinfoPage} from '../../connect/showrecipientinfo/showrecipientinfo.page';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.page.html',
  styleUrls: ['./administrators.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdministratorsPage {
    @Input() modalPage: any;
    refreshNeeded = false;
    searchKeyword = '';
    subscriptions: any = {};

    constructor(
        public modalCtrl: ModalController,
        public userData: UserData,
        public churchService: Churches,
    ) { }

    async editAdmin(event, admin) {
        event.stopPropagation();
        const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: admin, modalPage: true}});
        await recipientModal.present();
        const {data: needsToRefresh} = await recipientModal.onDidDismiss();
        if (needsToRefresh) {
            this.userData.refreshUserStatus({type: 'refresh manage page'});
        }
    }

    closeModal() {
        this.modalCtrl.dismiss(this.refreshNeeded);
    }
}
