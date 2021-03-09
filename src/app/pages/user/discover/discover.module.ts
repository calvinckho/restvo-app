import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPage } from './discover.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {DiscoverRoutingModule} from "./discover-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    DiscoverRoutingModule
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
