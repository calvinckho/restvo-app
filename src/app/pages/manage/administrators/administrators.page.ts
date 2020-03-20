import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Events, ModalController} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Churches} from "../../../services/church.service";
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";

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

    constructor(
        private events: Events,
        public modalCtrl: ModalController,
        public userData: UserData,
        public churchService: Churches,
    ) { }

    ngOnInit() {
        this.events.subscribe('loadCommunityReady', this.refreshHandler);
    }

    refreshHandler = () => {
        console.log("admins", this.churchService.currentManagedCommunity.admins);
    };

    async editAdmin(event, admin) {
        event.stopPropagation();
        const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: admin, modalPage: true}});
        await recipientModal.present();
        const {data: needsToRefresh} = await recipientModal.onDidDismiss();
        if (needsToRefresh) {
            console.log("refreshing...");
            this.userData.refreshUserStatus({type: 'change aux data'});
        }
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }
}
