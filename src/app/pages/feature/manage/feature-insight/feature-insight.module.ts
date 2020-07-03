import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeatureInsightPage } from './feature-insight.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";

const routes: Routes = [
  {
    path: '',
    component: FeatureInsightPage
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
  declarations: [FeatureInsightPage]
})
export class FeatureInsightPageModule {}
