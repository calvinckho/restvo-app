import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PlyrModule } from 'ngx-plyr';

import { IonicModule } from '@ionic/angular';

import { GroupboardPage } from './groupboard.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import {EditgroupmemberPageModule} from "../../group/editgroupmember/editgroupmember.module";
import {FocusPhotoPageModule} from "../../connect/focus-photo/focus-photo.module";
import {PickfeaturePopoverPageModule} from "../../feature/pickfeature-popover/pickfeature-popover.module";
import {ShowfeaturePageModule} from "../../feature/showfeature/showfeature.module";

const routes: Routes = [
  {
    path: '',
    component: GroupboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPipesModule,
    PlyrModule,
    PickfeaturePopoverPageModule,
    ShowfeaturePageModule,
    FocusPhotoPageModule,
    EditgroupmemberPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupboardPage]
})
export class GroupboardPageModule {}
