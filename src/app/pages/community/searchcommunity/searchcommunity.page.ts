import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Churches } from '../../../services/church.service';
import {UserData} from "../../../services/user.service";
import {ShowcommunityPage} from "../showcommunity/showcommunity.page";
import {EditcommunityPage} from "../editcommunity/editcommunity.page";
import {Resource} from "../../../services/resource.service";

@Component({
  selector: 'app-searchcommunity',
  templateUrl: './searchcommunity.page.html',
  styleUrls: ['./searchcommunity.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchcommunityPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    reachedEnd: boolean = false;
    pageNum: number = 0;
    searchKeyword: string = '';
    communities: any;
    searchKeywords: any;
    searchPhrase: any;
    needToCreateChurchProfile: boolean = false;

    constructor(public modalCtrl: ModalController,
                private alertCtrl: AlertController,
                private resourceService: Resource,
                private cache: CacheService,
                private userData: UserData,
                public churchService: Churches) { }

    ngOnInit() {
        this.listAllMyCommunities();
    }

    executeSearch(event){
        event.stopPropagation();
        this.listAllMyCommunities();
    }

    listAllMyCommunities(){
        setTimeout(async () => {
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.communities = [];
            this.pageNum = 0;
            this.listcommunities({target: this.infiniteScroll});
        }, 100);
    }

    async listcommunities(event){
        this.pageNum++;
        let churchIdList = [];
        this.userData.user.churches.forEach((church: any) => {
            churchIdList.push(church._id); //create an array of user subscribed churches
        });
        if (!this.reachedEnd){
            const communities: any = await this.churchService.loadAllChurchProfiles(this.searchKeyword, this.pageNum);
            if(!communities.length){
                this.reachedEnd = true;
                event.target.disabled = true;
                this.needToCreateChurchProfile = true;
            }
            else{
                this.needToCreateChurchProfile = true;
                communities.forEach((community)=>{
                    community.alreadyJoined = churchIdList.indexOf(community._id) >= 0;
                    this.communities.push(community);
                });
            }
            event.target.complete();
        }
        else{
            event.target.complete();
        }
    }

    async showCommunityProfile(community) {
        let editCommunityModal = await this.modalCtrl.create({component: ShowcommunityPage,
            componentProps: {community: community, modalPage: true}});
        await editCommunityModal.present();
        const {data: refreshNeeded} = await editCommunityModal.onDidDismiss();
        if (refreshNeeded) {
            this.modalCtrl.dismiss(refreshNeeded);
        }
    }

    async createChurchProfile() {
        let industries = [];
        this.resourceService.load('en-US', "Industry").subscribe(async (fields: any) => {
            for(let i = 0; i < fields.length; i++){
                console.log("id", fields[i]._id);
                industries.push({_id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false});
            }
            let createCommunityModal = await this.modalCtrl.create({component: EditcommunityPage, componentProps: {industries: industries}});
            await createCommunityModal.present();
            const {data: refreshNeeded} = await createCommunityModal.onDidDismiss();
            if (refreshNeeded) {
                this.modalCtrl.dismiss(refreshNeeded);
            }
        }, async (err)=>{
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        });

    }

}
