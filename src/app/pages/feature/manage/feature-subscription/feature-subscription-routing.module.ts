import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureSubscriptionPage } from './feature-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: FeatureSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureSubscriptionPageRoutingModule {}
