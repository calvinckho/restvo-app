import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as Plyr from "plyr";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {Aws} from "../../../services/aws.service";
import {Resource} from "../../../services/resource.service";
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import {UserData} from "../../../services/user.service";

@Component({
  selector: 'app-uploadmedia',
  templateUrl: './uploadmedia.page.html',
  styleUrls: ['./uploadmedia.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadmediaPage implements OnInit {

  @Input() sessionId: string;
  mediaType = 'photo';
  urls = [];
  mediaList: Array<{_id: string, player: Plyr}> = [];
  planModules = [];

  constructor(
      public platform: Platform,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      public awsService: Aws,
      private userData: UserData,
      public resourceService: Resource,

  ) {}

  ngOnInit() {
    this.awsService.sessionAllowedCount = 9999; // allow up to 9999 files upload
    this.sessionId = this.sessionId || 'blank';
  }

  async selectStockPhoto(photo) {
    await this.awsService.selectStockPhoto(photo, this.sessionId);
    this.urls.push(this.awsService.sessionAssets[this.sessionId][this.awsService.sessionAssets[this.sessionId].length - 1]);
  }

  async selectFileFromDeviceAndUpload(event) {
    try {
      await this.awsService.uploadFile('users', this.userData.user._id, event.target.files[0], this.sessionId);
          this.urls.push(this.awsService.sessionAssets[this.sessionId][this.awsService.sessionAssets[this.sessionId].length - 1]);
    } catch (err) {
      console.log(err);
    }
  }

  async selectPhotoFromDeviceAndUpload(event) {
    try {
      if (this.platform.is('cordova')) {
        const { Camera } = Plugins;
        const image = await Camera.getPhoto({
          quality: 60,
          width: 1280,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
          correctOrientation: false
        });
        if (image) {
          await this.awsService.uploadImage('users', this.userData.user._id, image, this.sessionId);
        }
      } else {
        const compressed = await this.awsService.compressPhoto(event.target.files[0]);
        await this.awsService.uploadFile('users', this.userData.user._id, compressed, this.sessionId);
      }
          this.urls.push(this.awsService.sessionAssets[this.sessionId][this.awsService.sessionAssets[this.sessionId].length - 1]);
    } catch (err) {
      console.log(err);
    }
  }

  async removeMedia(i) {
    const index = this.awsService.sessionAssets[this.sessionId].indexOf(this.urls[i]);
    if (index > -1) {
      this.awsService.sessionAssets[this.sessionId].splice(index, 1);
    }
    this.urls.splice(i, 1);
  }

  async promptMediaUrl(provider) {
    const alert2 = await this.alertCtrl.create({
      header: provider === 'youtube' ? 'Input the Youtube link' : 'Input the Media Url',
      inputs: [{
        name: 'src',
        type: 'text',
        placeholder: provider === 'youtube' ? 'Youtube link' : 'Media Link'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel video upload');
            return;
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.urls.push(data.src);
            if ((['jpg', 'jpeg', 'gif', 'png']).includes(data.src.substring(data.src.lastIndexOf('.') + 1).toLowerCase())) { // only add to the the asset array if an image
              this.awsService.addToSessionAssets(this.sessionId, data.src);
            }
          }
        }
      ],
      cssClass: 'level-15'
    });
    await alert2.present();
  }

  initPlyr(event, mediaId) {
    let player: Plyr;
    player = event;
    this.mediaList.push({ _id: mediaId, player: player});
  }

  destroyPlayers(mediaId) {
    if (mediaId) {
      const media = this.mediaList.find((c) => c._id === mediaId );
      media.player.destroy();
    } else {
      for (const media of this.mediaList) {
        media.player.destroy();
      }
    }
  }

  async closeModal() {
    this.modalCtrl.dismiss(false);
  }

  finish() {
    this.modalCtrl.dismiss(this.urls);
  }
}
