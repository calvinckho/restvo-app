import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import {SwiperModule} from "swiper/angular";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
      DashboardPage,
  ],
})
export class DashboardPageModule {}
