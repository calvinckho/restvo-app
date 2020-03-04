import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Auth } from '../../../services/auth.service';
import { Churches } from '../../../services/church.service';
import { UserData } from '../../../services/user.service';
import { ShowcommunityPage } from '../showcommunity/showcommunity.page';
import {SearchcommunityPage} from "../searchcommunity/searchcommunity.page";


@Component({
  selector: 'app-listmycommunities',
  templateUrl: './listmycommunities.page.html',
  styleUrls: ['./listmycommunities.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListmycommunitiesPage implements OnInit {

    mycommunities: any;
    name: any;
    loading: any;
    noChurchAdded: boolean = false;

    constructor(public navCtrl: NavController,
                public modalCtrl: ModalController,
                public authService: Auth,
                public churchService: Churches,
                public userData: UserData) {
    }

    ngOnInit() {
        this.loadMyChurches();
    }

    async loadMyChurches(){
        this.mycommunities = []; //reset the array
        try {
            this.mycommunities = await this.userData.loadMyChurches();
        } catch (err) {
            console.log("failed to get mycommunities data");
        }
    }

    async searchChurch(){
        let searchCommunityModal = await this.modalCtrl.create({component: SearchcommunityPage});
        await searchCommunityModal.present();
        const {data: refreshNeeded} = await searchCommunityModal.onDidDismiss();
        if (refreshNeeded) {
            this.loadMyChurches();
        }
    }

    async showChurchProfile(community){
        const showCommunityProfileModal = await this.modalCtrl.create({component: ShowcommunityPage, componentProps: {community: community, modalPage: true}});
        await showCommunityProfileModal.present();
        const {data: refreshNeeded} = await showCommunityProfileModal.onDidDismiss();
        if (refreshNeeded) {
            this.loadMyChurches();
        }
    }

    //get the latest user data from the server
    refresh(refresher) {
        this.loadMyChurches();
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
}
