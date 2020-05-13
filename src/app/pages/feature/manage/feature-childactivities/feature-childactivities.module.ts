import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeatureChildActivitiesPage } from './feature-childactivities.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";

const routes: Routes = [
  {
    path: '',
    component: FeatureChildActivitiesPage,
    children: [
      {
        path: 'chat',
        loadChildren: '../../group/groupchat/groupchat.module#GroupchatPageModule',
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeatureChildActivitiesPage]
})
export class FeatureChildActivitiesPageModule {}
