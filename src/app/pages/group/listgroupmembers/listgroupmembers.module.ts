import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListgroupmembersPage } from './listgroupmembers.page';
import {ShowrecipientinfoModule} from '../../connect/showrecipientinfo/showrecipientinfo.module';

const routes: Routes = [
  {
    path: '',
    component: ListgroupmembersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowrecipientinfoModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListgroupmembersPage]
})
export class ListgroupmembersPageModule {}
