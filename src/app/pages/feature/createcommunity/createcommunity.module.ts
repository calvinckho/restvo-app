import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatecommunityPage } from './createcommunity.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {PlyrModule} from 'ngx-plyr';

const routes: Routes = [
  {
    path: '',
    component: CreatecommunityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    PlyrModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatecommunityPage]
})
export class CreatecommunityPageModule {}
