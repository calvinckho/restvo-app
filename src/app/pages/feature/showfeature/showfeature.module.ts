import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowfeaturePage } from './showfeature.page';
import { PlyrModule } from 'ngx-plyr';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import { QuillModule } from 'ngx-quill';
import {ProgressBarModule} from 'angular-progress-bar';

const routes: Routes = [
  {
    path: '',
    component: ShowfeaturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    PlyrModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes),
    ProgressBarModule
  ],
  declarations: [ShowfeaturePage]
})
export class ShowfeaturePageModule {}
