import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroupPopoverPage } from './group-popover.page';
import {ShowgroupPageModule} from '../showgroup/showgroup.module';
import {EditgroupPageModule} from '../editgroup/editgroup.module';

const routes: Routes = [
  {
    path: '',
    component: GroupPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditgroupPageModule,
    ShowgroupPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupPopoverPage]
})
export class GroupPopoverPageModule {}
