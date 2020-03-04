import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeatureSchedulePage } from './feature-schedule.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";
import {FeatureScheduleRoutingModule} from "./feature-schedule-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    FeatureScheduleRoutingModule,
  ],
  declarations: [FeatureSchedulePage]
})
export class FeatureSchedulePageModule {}
