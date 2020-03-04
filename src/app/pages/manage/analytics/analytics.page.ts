import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Events, ModalController} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Churches} from "../../../services/church.service";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AnalyticsPage implements OnInit {
    @Input() modalPage: any;
    refreshNeeded = false;

    constructor(
        private events: Events,
        public modalCtrl: ModalController,
        public userData: UserData,
        public churchService: Churches,
    ) { }

    ngOnInit() {
    }

    refreshHandler = async () => {
        this.load();
    };

    ionViewWillEnter() {
        this.load();
        this.events.subscribe('loadCommunityReady', this.refreshHandler);
    }

    async load() {
        if (this.churchService.currentManagedCommunity) {
            this.churchService.numberOfActiveUsers = await this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id);
        }
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    ionViewWillLeave() {
        this.events.unsubscribe('loadCommunityReady', this.refreshHandler);
    }
}
