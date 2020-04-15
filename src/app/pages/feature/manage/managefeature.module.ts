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
      FeatureSubscriptionPageModule
  ],
  declarations: [ManagefeaturePage]
})
export class ManagefeaturePageModule {}
