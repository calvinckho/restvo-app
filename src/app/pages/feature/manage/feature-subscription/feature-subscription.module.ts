import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeatureSubscriptionPageRoutingModule } from './feature-subscription-routing.module';

import { FeatureSubscriptionPage } from './feature-subscription.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";
import {NgxStripeModule} from "ngx-stripe";
import {SwiperModule} from "swiper/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    SwiperModule,
    IonicModule,
    NgxStripeModule,
    FeatureSubscriptionPageRoutingModule
  ],
  declarations: [FeatureSubscriptionPage]
})
export class FeatureSubscriptionPageModule {}
