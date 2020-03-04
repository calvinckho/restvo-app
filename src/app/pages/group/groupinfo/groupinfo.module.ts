import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroupinfoPage } from './groupinfo.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";

const routes: Routes = [
  {
    path: '',
    component: GroupinfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ApplicationPipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupinfoPage]
})
export class GroupinfoPageModule {}
