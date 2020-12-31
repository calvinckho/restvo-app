import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowcommunityPage } from './showcommunity.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';

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
