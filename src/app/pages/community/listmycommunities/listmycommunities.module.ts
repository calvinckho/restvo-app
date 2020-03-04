import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListmycommunitiesPage } from './listmycommunities.page';
import {SearchcommunityPageModule} from "../searchcommunity/searchcommunity.module";

const routes: Routes = [
  {
    path: '',
    component: ListmycommunitiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchcommunityPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListmycommunitiesPage]
})
export class ListmycommunitiesPageModule {}
