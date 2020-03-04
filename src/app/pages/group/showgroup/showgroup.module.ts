import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowgroupPage } from './showgroup.page';
import {ShowrecipientinfoModule} from '../../connect/showrecipientinfo/showrecipientinfo.module';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';

const routes: Routes = [
  {
    path: '',
    component: ShowgroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    ShowrecipientinfoModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowgroupPage]
})
export class ShowgroupPageModule {}
