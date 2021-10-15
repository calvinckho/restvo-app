import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FocusPhotoPage } from './focus-photo.page';
//import { PinchZoomModule } from 'ngx-pinch-zoom';

const routes: Routes = [
  {
    path: '',
    component: FocusPhotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //PinchZoomModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FocusPhotoPage]
})
export class FocusPhotoPageModule {}
