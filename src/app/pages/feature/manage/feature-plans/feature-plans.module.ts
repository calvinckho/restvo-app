import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturePlansPageRoutingModule } from './feature-plans-routing.module';

import { FeaturePlansPage } from './feature-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturePlansPageRoutingModule
  ],
  declarations: [FeaturePlansPage]
})
export class FeaturePlansPageModule {}
