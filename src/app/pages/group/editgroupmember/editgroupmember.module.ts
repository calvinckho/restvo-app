import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditgroupmemberPage } from './editgroupmember.page';

const routes: Routes = [
  {
    path: '',
    component: EditgroupmemberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditgroupmemberPage]
})
export class EditgroupmemberPageModule {}
