import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignsystemPage } from './designsystem.page';

const routes: Routes = [
  {
    path: '',
    component: DesignsystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignsystemPageRoutingModule {}
