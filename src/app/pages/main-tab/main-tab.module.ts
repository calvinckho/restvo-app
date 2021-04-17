import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MainTabPage } from './main-tab.page';
import { MainTabPageRoutingModule } from './main-tab-routing.module';
import {GroupchatPageModule} from '../connect/groupchat/groupchat.module';
import {EditfeaturePageModule} from '../feature/editfeature/editfeature.module';
import {CreatechatPageModule} from '../connect/createchat/createchat.module';
import {EditboardpostPageModule} from '../board/editboardpost/editboardpost.module';
import {ShowboardpostPageModule} from '../board/showboardpost/showboardpost.module';
import {ShowcommunityPageModule} from '../manage/communities/showcommunity/showcommunity.module';
import {PreferencesPageModule} from '../user/about/preferences/preferences.module';
import {OnboardfeaturePageModule} from '../feature/onboardfeature/onboardfeature.module';
import {EditcommunityPageModule} from '../manage/communities/editcommunity/editcommunity.module';
import {CommunityPopoverPageModule} from '../manage/communities/community-popover/community-popover.module';
import {UploadmediaPageModule} from '../feature/uploadmedia/uploadmedia.module';
import {AboutPageModule} from '../user/about/about.module';
import {UserPageModule} from '../user/user.module';
import {CreatefeaturePageModule} from '../feature/createfeature/createfeature.module';
import {CustomreminderPopoverPageModule} from '../feature/customreminder-popover/customreminder-popover.module';
import {EditparticipantsPageModule} from '../feature/editparticipants/editparticipants.module';
import {ManagefeaturePageModule} from '../feature/manage/managefeature.module';
import {SuccessPopoverPageModule} from '../feature/success-popover/success-popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainTabPageRoutingModule,

      ManagefeaturePageModule,
      CreatefeaturePageModule,
      EditfeaturePageModule,
      EditparticipantsPageModule,

      GroupchatPageModule,
      CreatechatPageModule,

      ShowboardpostPageModule,
      EditboardpostPageModule,

      ShowcommunityPageModule,
      EditcommunityPageModule,
      CommunityPopoverPageModule,

      PreferencesPageModule,
      OnboardfeaturePageModule,
      UploadmediaPageModule,
      AboutPageModule,
      UserPageModule,

      CustomreminderPopoverPageModule,
      SuccessPopoverPageModule
  ],
  declarations: [
      MainTabPage,
  ],
})
export class MainTabPageModule {}
