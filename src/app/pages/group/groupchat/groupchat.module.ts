import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlyrModule } from 'ngx-plyr';

import { GroupchatPage } from './groupchat.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {PickfeaturePopoverPageModule} from "../../feature/pickfeature-popover/pickfeature-popover.module";
import {FocusPhotoPageModule} from "../../connect/focus-photo/focus-photo.module";
import {EditgroupmemberPageModule} from "../editgroupmember/editgroupmember.module";
import {GroupchatPageRoutingModule} from "./groupchat-routing.module";
import {GroupPopoverPageModule} from "../group-popover/group-popover.module";
import {ProfilePageModule} from "../../user/profile/profile.module";
import {GroupinfoPageModule} from "../groupinfo/groupinfo.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlyrModule,
    ApplicationPipesModule,
    GroupchatPageRoutingModule,
    PickfeaturePopoverPageModule,
    FocusPhotoPageModule,
    EditgroupmemberPageModule,
    GroupPopoverPageModule,
    ProfilePageModule,
    GroupinfoPageModule
  ],
  declarations: [GroupchatPage]
})
export class GroupchatPageModule {}
