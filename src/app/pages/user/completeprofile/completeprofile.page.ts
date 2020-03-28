import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController, Platform} from "@ionic/angular";
import {Location} from "@angular/common";
import {UserData} from "../../../services/user.service";
import {Auth} from "../../../services/auth.service";
import {Storage} from "@ionic/storage";
import {ProfilePage} from "../profile/profile.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.page.html',
  styleUrls: ['./completeprofile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompleteprofilePage implements OnInit {

  @Input() modalPage: any;

  constructor(
      private router: Router,
      private storage: Storage,
      public location: Location,
      public platform: Platform,
      public modalCtrl: ModalController,
      public userData: UserData,
      public authService: Auth
  ) { }

  ngOnInit() {
  }

  async openUserProfile() {
    /*if (this.platform.width() >= 768) {
      this.router.navigate(['/app/user/profile']);
    } else {
      const modal = await this.modalCtrl.create({component: ProfilePage, componentProps: { modalPage: true }} );
      await modal.present();
    }*/
    const modal = await this.modalCtrl.create({component: ProfilePage, componentProps: { modalPage: true }} );
    await modal.present();
  }

  async requestPushNotificationPermission(event) {
    event.stopPropagation();
    if (this.platform.is('cordova')) {
      const result = await this.userData.checkPushNotification(); // if success, will send an event to refresh the userData.user
      if (result) {
        this.dismissEnablePushNotification();
      }
    }
  }

  async pressImportContactList(event) {
    event.stopPropagation();
    if (this.platform.is('cordova')) {
      const result: any = await this.userData.toggleImportContactList(true);
      if (result) {
        this.dismissImportContactList();
      }
    }
  }

  async dismissEnablePushNotification() {
    this.userData.delayPushNotificationReminder = 100;
    await this.storage.set('delayPushNotificationReminder', 100);
  }

  async dismissImportContactList() {
    this.userData.delayImportContactListReminder = 100;
    await this.storage.set('delayImportContactListReminder', 100);
  }
}
