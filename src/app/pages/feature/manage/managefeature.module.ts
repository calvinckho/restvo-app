import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagefeaturePage } from './managefeature.page';
import {ManagefeatureRoutingModule} from "./managefeature-routing.module";
import {FeatureInsightPageModule} from "./feature-insight/feature-insight.module";
import {FeatureChildActivitiesPageModule} from "./feature-childactivities/feature-childactivities.module";
import {FeatureSchedulePageModule} from "./feature-schedule/feature-schedule.module";
import {FeatureBillingPageModule} from "./feature-billing/feature-billing.module";
import {FeatureSubscriptionPageModule} from "./feature-subscription/feature-subscription.module";
import {FeatureCreatorPageModule} from "./feature-creator/feature-creator.module";
import {FeatureCurriculumPageModule} from "./feature-curriculum/feature-curriculum.module";
import {FeaturePlansPageModule} from "./feature-plans/feature-plans.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagefeatureRoutingModule,
    FeatureInsightPageModule,
    FeatureSchedulePageModule,
    FeatureChildActivitiesPageModule,
      FeatureBillingPageModule,
      FeatureSubscriptionPageModule,
      FeatureCreatorPageModule,
    FeatureCurriculumPageModule,
      FeaturePlansPageModule
  ],
  declarations: [ManagefeaturePage]
})
export class ManagefeaturePageModule {}
