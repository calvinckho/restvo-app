import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlyrModule } from 'ngx-plyr';

import { GroupchatPage } from './groupchat.page';
import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {PickfeaturePopoverPageModule} from '../../feature/pickfeature-popover/pickfeature-popover.module';
import {FocusPhotoPageModule} from '../focus-photo/focus-photo.module';
import {GroupchatPageRoutingModule} from './groupchat-routing.module';
import {ProfilePageModule} from '../../user/profile/profile.module';

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
    ProfilePageModule
  ],
  declarations: [GroupchatPage]
})
export class GroupchatPageModule {}
