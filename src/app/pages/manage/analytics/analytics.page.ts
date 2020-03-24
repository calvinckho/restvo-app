import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Churches} from "../../../services/church.service";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AnalyticsPage implements OnInit, OnDestroy {
    @Input() modalPage: any;
    refreshNeeded = false;
    subscriptions: any = {};

    constructor(
        public modalCtrl: ModalController,
        public userData: UserData,
        public churchService: Churches,
    ) { }

    ngOnInit() {
        this.load();
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    }

    refreshHandler = async (data) => {
        if (data && data.type === 'load community ready') {
            this.load();
        }
    };

    async load() {
        if (this.churchService.currentManagedCommunity) {
            this.churchService.numberOfActiveUsers = await this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id);
        }
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    }
}
