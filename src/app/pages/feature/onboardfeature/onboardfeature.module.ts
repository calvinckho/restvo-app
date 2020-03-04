import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnboardfeaturePage } from './onboardfeature.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import {PlyrModule} from "ngx-plyr";

const routes: Routes = [
  {
    path: '',
    component: OnboardfeaturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ApplicationPipesModule,
      PlyrModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnboardfeaturePage]
})
export class OnboardfeaturePageModule {}
