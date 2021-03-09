import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MainTabPage } from './main-tab.page';
import { MainTabPageRoutingModule } from './main-tab-routing.module';
import {GroupchatPageModule} from '../group/groupchat/groupchat.module';
import {EditfeaturePageModule} from '../feature/editfeature/editfeature.module';
import {CreatechatPageModule} from '../connect/createchat/createchat.module';
import {EditboardpostPageModule} from '../board/editboardpost/editboardpost.module';
import {ShowboardpostPageModule} from '../board/showboardpost/showboardpost.module';
import {ShowcommunityPageModule} from '../community/showcommunity/showcommunity.module';
import {GroupboardPageModule} from '../board/groupboard/groupboard.module';
import {ListmycommunitiesPageModule} from '../community/listmycommunities/listmycommunities.module';
import {EditgroupPageModule} from '../group/editgroup/editgroup.module';
import {PreferencesPageModule} from '../user/about/preferences/preferences.module';
import {OnboardfeaturePageModule} from '../feature/onboardfeature/onboardfeature.module';
import {EditcommunityPageModule} from '../community/editcommunity/editcommunity.module';
import {ShowgroupPageModule} from '../group/showgroup/showgroup.module';
import {CommunityPopoverPageModule} from '../community/community-popover/community-popover.module';
import {UploadmediaPageModule} from '../feature/uploadmedia/uploadmedia.module';
import {AboutPageModule} from '../user/about/about.module';
import {UserPageModule} from '../user/user.module';
import {CreatefeaturePageModule} from '../feature/createfeature/createfeature.module';
import {CustomreminderPopoverPageModule} from '../feature/customreminder-popover/customreminder-popover.module';
import {EditparticipantsPageModule} from '../feature/editparticipants/editparticipants.module';
import {ManagefeaturePageModule} from '../feature/manage/managefeature.module';

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
      GroupboardPageModule,

      ShowcommunityPageModule,
      EditcommunityPageModule,
      CommunityPopoverPageModule,

      ShowgroupPageModule,
      EditgroupPageModule,
      ListmycommunitiesPageModule,

      PreferencesPageModule,
      OnboardfeaturePageModule,
      UploadmediaPageModule,
      AboutPageModule,
      UserPageModule,

      CustomreminderPopoverPageModule,
  ],
  declarations: [
      MainTabPage,
  ],
})
export class MainTabPageModule {}
