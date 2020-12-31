import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditcommunityPage } from './editcommunity.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';

const routes: Routes = [
  {
    path: '',
    component: EditcommunityPage
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
  declarations: [EditcommunityPage]
})
export class EditcommunityPageModule {}
