import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureBillingPage } from './feature-billing.page';

const routes: Routes = [
  {
    path: '',
    component: FeatureBillingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureBillingPageRoutingModule {}
