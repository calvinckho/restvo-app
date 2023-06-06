import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PickpeoplePopoverPage } from './pickpeople-popover.page';

const routes: Routes = [
  {
    path: '',
    component: PickpeoplePopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PickpeoplePopoverPage]
})
export class PickpeoplePopoverPageModule {}
