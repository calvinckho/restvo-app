import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PickfeaturePopoverPage } from './pickfeature-popover.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import {AutosizeModule} from "ngx-autosize";

const routes: Routes = [
  {
    path: '',
    component: PickfeaturePopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosizeModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PickfeaturePopoverPage]
})
export class PickfeaturePopoverPageModule {}
