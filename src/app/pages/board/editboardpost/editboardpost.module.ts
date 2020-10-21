import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditboardpostPage } from './editboardpost.page';
import {AutosizeModule} from "ngx-autosize";
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import { PlyrModule } from 'ngx-plyr';

const routes: Routes = [
  {
    path: '',
    component: EditboardpostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosizeModule,
    PlyrModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditboardpostPage]
})
export class EditboardpostPageModule {}
