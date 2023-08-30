import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureTemplatePage } from './feature-template.page';

const routes: Routes = [
  {
    path: ':id',
    component: FeatureTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureTemplatePageRoutingModule {}
