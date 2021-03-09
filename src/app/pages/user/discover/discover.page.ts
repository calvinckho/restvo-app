import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
    ModalController,
    Platform,
} from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import {Chat} from '../../../services/chat.service';
import {Router} from '@angular/router';
import {Auth} from '../../../services/auth.service';
import {ProgramsPage} from '../programs/programs.page';
import {Moment} from '../../../services/moment.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverPage implements OnInit {

    subscriptions: any = {};

    searchKeyword = '';
    samples = [];
    ionSpinner = false;
    pageNum = 0;
    reachedEnd = false;
    selectedMoments = [];
    selectedCategoryId = '5e9f46e1c8bf1a622fec69d5';
    loading: any;

    constructor(
                public router: Router,
                private storage: Storage,
                public platform: Platform,
                private modalCtrl: ModalController,
                public authService: Auth,
                public chatService: Chat,
                private momentService: Moment,
                public userData: UserData) { }

    async ngOnInit() {
        this.subscriptions['refresh'] = this.userData.refreshUserStatus$.subscribe(this.refreshAfterCreateMomentHandler);
    }

    refreshAfterCreateMomentHandler = async () => {
        if (this.userData.user) {
            this.loadSamples();
        }
    }

    async loadSamples() {
        this.reachedEnd = false;
        this.samples = [];
        this.pageNum = 0;
        this.loadMoreSamples();
    }

    async loadMoreSamples() {
        this.pageNum++;
        if (!this.reachedEnd) {
            const samples: any = await this.momentService.loadSampleActivities(this.selectedCategoryId);
            this.ionSpinner = false;
            // temp overide the paging function: i.e. only load page 1
            this.reachedEnd = true;
            if (!samples.length) {
                this.reachedEnd = true;
            } else {
                this.samples = [];
                samples.forEach((parent) => {
                    this.samples.push(...parent.sample_activities);
                });
            }
        } else {
            this.ionSpinner = false;
        }
    }

    async selectSample(sample) {
    }
}
