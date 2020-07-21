import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeatureSchedulePage } from './feature-schedule.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";
import {FeatureScheduleRoutingModule} from "./feature-schedule-routing.module";
import {AutosizeModule} from "ngx-autosize";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
      AutosizeModule,
    FeatureScheduleRoutingModule,
  ],
  declarations: [FeatureSchedulePage]
})
export class FeatureSchedulePageModule {}
