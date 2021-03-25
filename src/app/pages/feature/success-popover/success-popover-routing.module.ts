import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessPopoverPage } from './success-popover.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessPopoverPageRoutingModule {}
