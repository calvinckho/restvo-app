import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowcommunityPage } from './showcommunity.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {EditcommunityPageModule} from "../editcommunity/editcommunity.module";
import {CommunityPopoverPageModule} from "../community-popover/community-popover.module";
import {AutosizeModule} from "ngx-autosize";

const routes: Routes = [
  {
    path: '',
    component: ShowcommunityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AutosizeModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      ShowcommunityPage,
  ]
})
export class ShowcommunityPageModule {}
