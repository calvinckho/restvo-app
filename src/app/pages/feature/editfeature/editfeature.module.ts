import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditfeaturePage } from './editfeature.page';
import {AutosizeModule} from "ngx-autosize";
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import { PlyrModule } from 'ngx-plyr';
import {UploadmediaPageModule} from "../uploadmedia/uploadmedia.module";

const routes: Routes = [
  {
    path: '',
    component: EditfeaturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPipesModule,
    AutosizeModule,
    PlyrModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditfeaturePage]
})
export class EditfeaturePageModule {}
