import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-focus-photo',
  templateUrl: './focus-photo.page.html',
  styleUrls: ['./focus-photo.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FocusPhotoPage implements OnInit {

  @Input() imageUri: any;
  filename: string;

  constructor(
      public modalCtrl: ModalController
  ) { }

  ngOnInit() {
      this.filename = this.imageUri.substring(this.imageUri.lastIndexOf('/') + 1).toLowerCase();
  }

}
