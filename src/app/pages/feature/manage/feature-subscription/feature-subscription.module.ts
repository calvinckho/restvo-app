import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeatureSubscriptionPageRoutingModule } from './feature-subscription-routing.module';

import { FeatureSubscriptionPage } from './feature-subscription.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    IonicModule,
    FeatureSubscriptionPageRoutingModule
  ],
  declarations: [FeatureSubscriptionPage]
})
export class FeatureSubscriptionPageModule {}
