import {
    Component,
    ElementRef,
    OnInit,
    Input,
    Renderer2,
    ViewChild,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    ModalController,
    Platform,
    ToastController,
    IonInfiniteScroll,
} from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import * as Plyr from "plyr";

import { Moment } from "../../../services/moment.service";
import { Board } from "../../../services/board.service";
import { Resource } from "../../../services/resource.service";
import { UserData } from "../../../services/user.service";

import { Aws } from '../../../services/aws.service';
import {ShowrecipientinfoPage} from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {PickfeaturePopoverPage} from "../../feature/pickfeature-popover/pickfeature-popover.page";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";

@Component({
  selector: 'app-editboardpost',
  templateUrl: './editboardpost.page.html',
  styleUrls: ['./editboardpost.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditboardpostPage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    @ViewChild('textArea', {static: false}) textArea: ElementRef;
    @ViewChild('pixaBay', {static: false}) pixaBay: ElementRef;

    @Input() boardId: any;
    @Input() post: any;

    churchId = '';
    searchKeyword = '';
    resource = {};

    loadCompleted = false;
    player: Plyr;

    subscriptions: any = {};

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private geolocation: Geolocation,
        private cache: CacheService,
        public platform: Platform,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        public resourceService: Resource,
        public momentService: Moment,
        private boardService: Board,
        public userData: UserData,
        public awsService: Aws,
    ) {
        this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
        this.resource = { "en-US": { matrix_string: [[''], [''], [''], ['']] }};
    }

  ngOnInit() {
      if (!this.post){
          this.post = {
              body: '',
              attachments: [],
              media: [],
              moments: [],
              groups: [],
              users: [],
              status: "published"
          };
      } else {
          this.post = JSON.parse(JSON.stringify(this.post)); //clone the object
          this.awsService.sessionAssets[this.boardId] = this.post.attachments; // store all asset urls associated with this moment in the awsAssets
      }
      const loadResource = this.resourceService.load('en-US', "Board");
      const resource = this.cache.loadFromDelayedObservable('loadResource: Board', loadResource, 'resource', 3600, 'none');
      resource.subscribe(result => {
          this.resource = result[0];
      }, async (err) => {
          let networkAlert = await this.alertCtrl.create({
              header: 'No Internet Connection',
              message: 'Please check your internet connection.',
              buttons: ['Dismiss'],
              cssClass: 'level-15'
          });
          await networkAlert.present();
      });
      this.loadCompleted = true;
      this.subscriptions['refreshBoards'] = this.userData.refreshBoards$.subscribe(this.refreshBoardHandler);
  }


    refreshBoardHandler = async (res) => {
        if (res && res.type === 'refresh board' && res.boardId === this.boardId) {
            const data = res.data;
            if (data.action === 'update post' && data.post.author._id !== this.userData.user._id) {
                if (this.post.bucketId === data.post.bucketId && this.post._id === data.post._id) {
                    //just update the body and attachments
                    const alert = await this.alertCtrl.create({
                        header: "Post changed", //delete post
                        message: "Another administrator has updated this post.", //are you sure you want to delete this post
                        buttons: [{ text: 'Accept external changes',
                            handler: () => {
                                let navTransition = alert.dismiss();
                                navTransition.then(async () => {
                                    this.post.body = data.post.body;
                                    this.post.attachments = data.post.attachments;
                                    this.awsService.sessionAssets[this.boardId] = this.post.attachments;
                                    if (this.post.media && this.post.media.length && data.post.media && !data.post.media.length) {
                                        if (this.player) this.player.destroy();
                                    }
                                    this.post.moments = data.post.moments;
                                });
                            }},
                            { text: 'Cancel' }],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            } else if (data.action === 'delete post') {
                if (this.post.bucketId === data.bucketId && this.post._id === data.postId) {
                    //just update the body and attachments
                    if (this.player) this.player.destroy();
                    this.closeModal(false);
                }
            }
        }
    };

    async pickFeatureModalPage(event, typeOfMoment){
        try {
            const modal = await this.modalCtrl.create({component: PickfeaturePopoverPage, componentProps: {title: 'Choose from Library', modalPage: true}});
            await modal.present();
            const {data: moments} = await modal.onDidDismiss();
            if (moments && moments.length) {
                this.post.moments = moments;
            }
        } catch (err) {
            console.log(err);
            const networkAlert = await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }
    }

    async takePhotoAndUpload() {
        const image = await Camera.getPhoto({
            quality: 60,
            width: 1280,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            correctOrientation: false
        });
        if (image) {
            await this.awsService.uploadImage('communities', this.churchId, image, this.boardId);
        }
    }

    async promptVideoUpload() {
        const alert = await this.alertCtrl.create({
            header: 'Embed Video',
            inputs: [{
                    name: 'youtube',
                    type: 'radio',
                    label: 'Youtube',
                    value: 'youtube',
                    checked: true
                }/*,
                {
                    name: 'oauth2',
                    type: 'radio',
                    label: 'Login to Youtube',
                    value: 'oauth2'
                },
                {
                    name: 'digital ocean',
                    type: 'radio',
                    label: 'Digital Ocean',
                    value: 'do'
                }*/],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel video upload');
                        return
                    }
                }, {
                    text: 'Ok',
                    handler: provider => {
                        if (provider === 'oauth2') {
                            //this.oauthLogin();
                        } else if (provider === 'do') {
                            let source = {
                                type: 'video',
                                sources: [{
                                    src: 'https://d2z4pehxidbzz4.cloudfront.net/app/test.mp4',
                                    type: 'video/mp4'
                                }],
                                author: this.userData.user._id
                            };
                            this.post.media.push(source);
                        } else {
                            this.promptVideoUrl(provider);
                        }
                    }
                }
            ],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async promptVideoUrl(provider) {
        const alert2 = await this.alertCtrl.create({
            header: 'Input the Youtube link',
            inputs: [{
                name: 'src',
                type: 'text',
                placeholder: 'Youtube link'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel video upload');
                        return
                    }
                }, {
                    text: 'Ok',
                    handler: data => {
                        let source = {
                            type: 'video',
                            sources: [{
                                src: data.src,
                                provider: provider
                            }],
                            author: this.userData.user._id
                        };
                        this.post.media = [];
                        this.post.media.push(source);
                    }
                }
            ],
            cssClass: 'level-15'
        });
        await alert2.present();
    }

    async selectPhotoFromDeviceAndUpload(event) {
        try {
            if (this.platform.is('cordova')) {
                const image = await Camera.getPhoto({
                    quality: 60,
                    width: 1280,
                    allowEditing: false,
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Photos,
                    correctOrientation: false
                });
                await this.awsService.uploadImage('communities', this.churchId, image, this.boardId);
            } else {
                const compressed = await this.awsService.compressPhoto(event.target.files[0]);
                await this.awsService.uploadFile('boards', this.userData.user._id, compressed, this.boardId);
            }
        } catch (err) {
            console.log(err);
        }

    }

    async selectFileFromDeviceAndUpload(event) {
        try {
            await this.awsService.uploadFile('communities', this.churchId, event.target.files[0], this.boardId);
        } catch (err) {
            console.log(err);
        }
    }

    async removePhoto(i){
        const index = this.awsService.sessionAssets[this.boardId].indexOf(this.post.attachments[i]);
        if (index > -1) {
            this.awsService.sessionAssets[this.boardId].splice(index, 1);
        }
        this.post.attachments.splice(i, 1);
    }

    async removeVideo() {
        if (this.player) this.player.destroy();
        this.post.media = [];
    }

    shareLocation() { //Shares current location with others in chat

        console.log("load current location...");
        //Find the device's location
        this.geolocation.getCurrentPosition().then((position) => {

            console.log("geolocation returning results...");
            let yourPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Geolocation Latitude is: " + yourPosition.lat + "Longitude is: " + yourPosition.lng);
            //this.updateMap(yourPosition);

            this.post.body += (this.post.body.length ? " " : '') + "https://www.google.com/maps/search/?api=1&query=" + yourPosition.lat + "+%2C" + yourPosition.lng;

        }).catch((err)=>{
            console.log('Error getting location', err);
        });
    }

    async removeMoment(){
        this.post.moments.splice(0, 1);
    }

    async seeUserInfo(event, user) {
        event.stopPropagation();
        user.name = user.first_name + " " + user.last_name;
        if(user._id) {
            event.stopPropagation();
            const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: user, modalPage: true}} );
            await recipientModal.present();
        }
    }

    async openRestvoFeature(event, moment) { // when tap on a Restvo feature
        event.stopPropagation();
        const modal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: {moment: moment, modalPage: true}});
        await modal.present();
        const {data: refreshNeeded} = await modal.onDidDismiss();
        if (refreshNeeded) {
            this.reloadMoment(moment._id);
        }
    }

    async reloadMoment(momentId){
        let moment = await this.momentService.load(momentId);
        this.post.moments.splice(0, moment);
    }

    async deletePost() {
        const alert = await this.alertCtrl.create({
            header: this.resource['en-US'].matrix_string[0][10] + ' ' + this.resource['en-US'].matrix_string[0][2],
            message: this.resource['en-US'].matrix_string[0][11],
            buttons: [{ text: 'Ok',
                handler: () => {
                    let navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        //Remove group from user-data and group collections
                        if (this.post.attachments && this.post.attachments.length){
                            for (const attachment of this.post.attachments) {
                                if (attachment.length) {
                                    await this.awsService.removeFile(attachment);
                                }
                            }
                        }
                        await this.boardService.deletePost(this.boardId, this.post.bucketId, this.post._id);
                        if (this.player) this.player.destroy();
                        this.closeModal(true);
                    });
                }},
                { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top',
            color: 'darkgrey'
        });
        toast.present();
    }

    async savePost() {
        if(!this.post.body.length){
            this.presentToast("Please say something .");
            return;
        }
        // process the photos upload and clean up
        this.awsService.cleanUp(this.boardId, this.post.attachments);
        this.post.attachments = this.awsService.sessionAssets[this.boardId];

        console.log("The post looks like this: " + JSON.stringify(this.post));
        if (this.post._id){
            try {
                await this.boardService.updatePost(this.boardId, this.post); //this.post.bucketId will also be sent
                this.closeModal(true);
            } catch (err) {
                this.closeModal(false);
            }
        } else { //creating a new event
            await this.boardService.createPost(this.boardId, {boardId: this.boardId, post: this.post});
            this.closeModal(true);
        }
    }

    closeModal(refreshNeeded) {
        //erase uploaded but abandoned files
        this.awsService.cleanUp(this.boardId, true);
        if (this.player) this.player.destroy();
        this.modalCtrl.dismiss(refreshNeeded);
    }

    ngOnDestroy() {
        this.subscriptions['refreshBoards'].unsubscribe(this.refreshBoardHandler);
    }
}
