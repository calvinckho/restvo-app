import { Component, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
    Platform,
} from '@ionic/angular';
import { UserData } from "../../../services/user.service";
import {Chat} from "../../../services/chat.service";
import {Router} from "@angular/router";
import {Auth} from "../../../services/auth.service";

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
                public authService: Auth,
                public chatService: Chat,
                public userData: UserData) { }

}
