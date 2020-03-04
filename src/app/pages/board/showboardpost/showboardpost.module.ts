import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowboardpostPage } from './showboardpost.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {EditboardpostPageModule} from "../editboardpost/editboardpost.module";
import {AutosizeModule} from "ngx-autosize";
import { PlyrModule } from 'ngx-plyr';

const routes: Routes = [
  {
    path: '',
    component: ShowboardpostPage
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
    EditboardpostPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowboardpostPage]
})
export class ShowboardpostPageModule {}
