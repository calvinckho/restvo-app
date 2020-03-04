import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BillingPage } from './billing.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";

const routes: Routes = [
  {
    path: '',
    component: BillingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BillingPage]
})
export class BillingPageModule {}
