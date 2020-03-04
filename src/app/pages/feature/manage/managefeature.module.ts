import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagefeaturePage } from './managefeature.page';
import {ManagefeatureRoutingModule} from "./managefeature-routing.module";
import {FeatureInsightPageModule} from "./feature-insight/feature-insight.module";
import {FeatureChildActivitiesPageModule} from "./feature-childactivities/feature-childactivities.module";
import {FeatureSchedulePageModule} from "./feature-schedule/feature-schedule.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagefeatureRoutingModule,
    FeatureInsightPageModule,
    FeatureSchedulePageModule,
    FeatureChildActivitiesPageModule
  ],
  declarations: [ManagefeaturePage]
})
export class ManagefeaturePageModule {}
