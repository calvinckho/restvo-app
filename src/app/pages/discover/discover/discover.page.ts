import { Component, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
    ModalController,
    Platform,
} from '@ionic/angular';
import { UserData } from "../../../services/user.service";
import {Chat} from "../../../services/chat.service";
import {Router} from "@angular/router";
import {Auth} from "../../../services/auth.service";
import {ProgramsPage} from "../../user/programs/programs.page";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverPage  {

    constructor(
                public router: Router,
                private storage: Storage,
                private platform: Platform,
                private modalCtrl: ModalController,
                public authService: Auth,
                public chatService: Chat,
                public userData: UserData) { }

    async openSelectHomePage() {
        if (this.platform.width() >= 768) {
            this.router.navigate(['/app/user/programs']);
        } else {
            const manageModal = await this.modalCtrl.create({ component: ProgramsPage, componentProps: { modalPage: true } });
            await manageModal.present();
        }
    }
}
