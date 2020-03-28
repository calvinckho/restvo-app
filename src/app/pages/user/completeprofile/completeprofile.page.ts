import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController, Platform} from "@ionic/angular";
import {Location} from "@angular/common";
import {UserData} from "../../../services/user.service";
import {Auth} from "../../../services/auth.service";

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.page.html',
  styleUrls: ['./completeprofile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompleteprofilePage implements OnInit {

  @Input() modalPage: any;

  constructor(
      public location: Location,
      public platform: Platform,
      public modalCtrl: ModalController,
      public userData: UserData,
      public authService: Auth
  ) { }

  ngOnInit() {
  }
}
