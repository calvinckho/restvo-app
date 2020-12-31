import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditgroupPage } from './editgroup.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';

const routes: Routes = [
  {
    path: '',
    component: EditgroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditgroupPage]
})
export class EditgroupPageModule {}
