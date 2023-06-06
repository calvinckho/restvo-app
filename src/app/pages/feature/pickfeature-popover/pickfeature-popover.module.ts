import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PickfeaturePopoverPage } from './pickfeature-popover.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";

const routes: Routes = [
  {
    path: '',
    component: PickfeaturePopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PickfeaturePopoverPage]
})
export class PickfeaturePopoverPageModule {}
