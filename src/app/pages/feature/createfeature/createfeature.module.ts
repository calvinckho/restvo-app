import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatefeaturePage } from './createfeature.page';
import {AutosizeModule} from 'ngx-autosize';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {PlyrModule} from 'ngx-plyr';

const routes: Routes = [
  {
    path: '',
    component: CreatefeaturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ApplicationPipesModule,
      AutosizeModule,
      PlyrModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatefeaturePage]
})
export class CreatefeaturePageModule {}
