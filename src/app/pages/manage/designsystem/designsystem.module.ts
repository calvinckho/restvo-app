import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignsystemPageRoutingModule } from './designsystem-routing.module';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DesignsystemPage } from './designsystem.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPipesModule,
    IonicModule,
    NgxSliderModule,
    DesignsystemPageRoutingModule
  ],
  declarations: [DesignsystemPage]
})
export class DesignsystemPageModule {}
