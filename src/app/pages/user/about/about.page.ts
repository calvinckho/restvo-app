import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {UserData} from '../../../services/user.service';
import {PreferencesPage} from './preferences/preferences.page';
import {Router} from '@angular/router';
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import {Aws} from '../../../services/aws.service';
import {Auth} from '../../../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AboutPage implements OnInit, OnDestroy {

  @Input() modalPage: any;

  subscriptions: any = {};
  programs: any;
  role: any;

  constructor(
      public platform: Platform,
      private router: Router,
      private awsService: Aws,
      public modalCtrl: ModalController,
      public userData: UserData,
      private authService: Auth
  ) { }

  ngOnInit() {
    this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
  }

  refreshUserStatusHandler = () => {
    if (this.authService.token && this.userData && this.userData.user) {
      this.loadAnswers();
    }
  }

  async loadAnswers() {
    const result: any = await this.userData.loadMyOnboardingAnswers();
    this.programs = result.programs;
    if (this.programs) {
      for (const program of this.programs) {
        for (const leader of program.leader) {
          if (leader.role) {
            this.role = leader.role;
          }
        }
      }
    }
  }

  async openOnbaordingProcess(programId) {
    if (this.platform.width() >= 768 && !this.modalPage) {
      if (!programId) {
        this.router.navigate(['/app/user/allpreferences', { showHeader: true }]);
      } else {
        this.router.navigate(['/app/user/preferences/' + programId, { showHeader: true }]);
      }
    } else {
      const modal = await this.modalCtrl.create({ component: PreferencesPage, componentProps: { programId: programId, modalPage: true } });
      await modal.present();
      const {data: refreshNeeded} = await modal.onDidDismiss();
      if (refreshNeeded) {
        this.loadAnswers();
      }
    }
  }

  async selectPhotoFromDeviceAndUpload(event, useCapacitor) {
    try {
      let result: any;
      if (useCapacitor) {
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
          result = await this.awsService.uploadImage('users', this.userData.user._id, image, this.userData.user._id);
        }
      } else {
        result = await this.awsService.compressPhoto(event.target.files[0]);
        await this.awsService.uploadFile('users', this.userData.user._id, result, this.userData.user._id, 0);
      }
      if (result) {
        if (this.userData.user.avatar) {
          await this.awsService.removeFile(this.userData.user.avatar); // remove the previous background from Digital Ocean
        }
        this.userData.user.avatar = this.awsService.url;
        await this.userData.update({ _id: this.userData.user._id, avatar: this.awsService.url });
      }
    } catch (err) {
      console.log(err);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
  }
}
