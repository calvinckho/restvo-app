import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeatureCreatorPageRoutingModule } from './feature-creator-routing.module';

import { FeatureCreatorPage } from './feature-creator.page';
import {ApplicationPipesModule} from "../../../../pipes/application-pipes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    FeatureCreatorPageRoutingModule
  ],
  declarations: [FeatureCreatorPage]
})
export class FeatureCreatorPageModule {}
