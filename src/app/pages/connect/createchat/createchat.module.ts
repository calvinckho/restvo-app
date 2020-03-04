import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatechatPage } from './createchat.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";

const routes: Routes = [
  {
    path: '',
    component: CreatechatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatechatPage]
})
export class CreatechatPageModule {}
