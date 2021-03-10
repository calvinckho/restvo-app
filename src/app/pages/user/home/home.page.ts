import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ModalController, Platform} from '@ionic/angular';
import {Auth} from '../../../services/auth.service';
import {Chat} from '../../../services/chat.service';
import {UserData} from '../../../services/user.service';
import {ProgramsPage} from '../programs/programs.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {

  constructor(
      public router: Router,
      private storage: Storage,
      public platform: Platform,
      private modalCtrl: ModalController,
      public authService: Auth,
      public chatService: Chat,
      public userData: UserData) { }

  async openSelectHomePage() {
    if (this.platform.width() >= 768) {
      this.router.navigate(['/app/user/programs']);
    } else {
      const modal = await this.modalCtrl.create({ component: ProgramsPage, componentProps: { modalPage: true } });
      await modal.present();
    }
  }

}
