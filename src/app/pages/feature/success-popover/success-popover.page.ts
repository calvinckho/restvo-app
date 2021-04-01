import { Component } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-success-popover',
  templateUrl: './success-popover.page.html',
  styleUrls: ['./success-popover.page.scss'],
})
export class SuccessPopoverPage {

  constructor(
      private modalCtrl: ModalController
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }
}
