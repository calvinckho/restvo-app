import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploadmediaPage } from './uploadmedia.page';
import {PlyrModule} from "ngx-plyr";

const routes: Routes = [
  {
    path: '',
    component: UploadmediaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlyrModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadmediaPage]
})
export class UploadmediaPageModule {}
