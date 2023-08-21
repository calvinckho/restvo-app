import {Component, ViewEncapsulation, OnDestroy, OnInit, Input} from '@angular/core';
import { Storage } from '@ionic/storage';
import {
    ModalController,
    Platform,
} from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import {Chat} from '../../../services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Auth} from '../../../services/auth.service';
import {Moment} from '../../../services/moment.service';
import {ShowfeaturePage} from '../../feature/showfeature/showfeature.page';
import {RegisterPage} from '../register/register.page';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverPage implements OnInit {
    @Input() filterOption: any; // optional: when initialing a modal page

    subscriptions: any = {};

    searchKeyword = '';
    samples = [];
    ionSpinner = false;
    pageNum = 0;
    reachedEnd = false;
    selectedMoments = [];
    selectedCategoryId = '5e9f46e1c8bf1a622fec69d5';
    loading: any;
    mobileSearchBarVisible = false;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private storage: Storage,
        public platform: Platform,
        private modalCtrl: ModalController,
        public authService: Auth,
        public chatService: Chat,
        private momentService: Moment,
        public userData: UserData) { }

    async ngOnInit() {
        this.filterOption = this.filterOption || this.route.snapshot.paramMap.get('filterOption') || 'all';
        this.loadSamples();
        //this.subscriptions['refresh'] = this.userData.refreshUserStatus$.subscribe(this.refreshAfterCreateMomentHandler);
    }

    ionViewWillEnter() {
        if (this.userData && this.userData.user) {
            this.storage.set('lastVisitedTab', 'discover');
            this.loadSamples();
        }
    }

    /*refreshAfterCreateMomentHandler = async () => {
        this.loadSamples();
    }*/

    async changeFilterOption(newFilterOption) {
        this.filterOption = newFilterOption;
        this.loadSamples();
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
            this.ionSpinner = true;
            const samples: any = await this.momentService.loadSampleActivities(this.selectedCategoryId);
            this.ionSpinner = false;
            // temp override the paging function: i.e. only load page 1
            this.reachedEnd = true;
            if (!samples.length) {
                this.reachedEnd = true;
            } else {
                this.samples = [];
                samples.forEach((parent) => {
                    if (this.filterOption === 'all') {
                      parent.sample_activities.forEach((activity) => {
                          const cached_parent = JSON.parse(JSON.stringify(parent));
                          delete cached_parent.sample_activities;
                          activity.parent_programs = [cached_parent];
                      });
                      this.samples.push(...parent.sample_activities);
                    } else {
                      // CHECK CATEGORY
                      const category = parent.sample_activities[0].categories.includes('5e9fe35cc8bf1a622fec69d7') ? 'group' : 'individual';
                      if (category === this.filterOption) {
                        parent.sample_activities.forEach((activity) => {
                            const cached_parent = JSON.parse(JSON.stringify(parent));
                            delete cached_parent.sample_activities;
                            activity.parent_programs = [cached_parent];
                        });
                        this.samples.push(...parent.sample_activities);
                      }
                    }
                });
            }
        } else {
            this.ionSpinner = false;
        }
    }

    async selectSample(moment) {
        if (this.platform.width() >= 992) {
            this.router.navigate([{ outlets: { sub: ['details', moment._id, { subpanel: true } ] }}]);
        } else if (this.platform.width() >= 768) {
            this.router.navigate(['/app/activity/' + moment._id], { replaceUrl: false });
        } else {
            const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: { moment: { _id: moment._id }, modalPage: true}} );
            await modal.present();
        }
    }

    async openRegister(slide, loginStatus) {
        const modalObject: any = {component: RegisterPage, componentProps: { slide: slide, loginStatus: loginStatus, modalPage: true } };
        if (this.platform.width() >= 768) {
            modalObject.cssClass = 'fullScreen';
        }
        const registerModal = await this.modalCtrl.create(modalObject);
        await registerModal.present();
    }

    /*async ngOnDestroy() {
        this.subscriptions['refresh'].unsubscribe();
    }*/
}
