import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MyconversationsPage } from './myconversations.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {MyconversationsRoutingModule} from "./myconversations-routing.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      MyconversationsRoutingModule,
      ApplicationPipesModule,
  ],
  declarations: [
      MyconversationsPage,
  ]
})
export class MyconversationsPageModule {}
