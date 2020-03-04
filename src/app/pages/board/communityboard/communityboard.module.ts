import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommunityboardPage } from './communityboard.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import { PlyrModule } from 'ngx-plyr';

const routes: Routes = [
  {
    path: '',
    component: CommunityboardPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlyrModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CommunityboardPage]
})
export class CommunityboardPageModule {}
