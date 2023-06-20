import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignsystemPageRoutingModule } from './designsystem-routing.module';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DesignsystemPage } from './designsystem.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPipesModule,
    IonicModule,
    NgxSliderModule,
      SwiperModule,
    DesignsystemPageRoutingModule
  ],
  declarations: [DesignsystemPage]
})
export class DesignsystemPageModule {}
