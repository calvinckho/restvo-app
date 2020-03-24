import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompleteprofilePage } from './completeprofile.page';
import {ProgressBarModule} from "angular-progress-bar"

const routes: Routes = [
  {
    path: '',
    component: CompleteprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ProgressBarModule
  ],
  declarations: [CompleteprofilePage]
})
export class CompleteprofilePageModule {}
