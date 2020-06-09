import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagecommunitiesPage } from './managecommunities.page';
import {AnalyticsPageModule} from "../analytics/analytics.module";
import {MembersPageModule} from "../members/members.module";
import {TopicsPageModule} from "../topics/topics.module";

import {AdministratorsPageModule} from "../administrators/administrators.module";
import {ManagecommunitiesRoutingModule} from "./managecommunities-routing.module";
import {CommunitiesPageModule} from "../communities/communities.module";
import {GroupsPageModule} from "../groups/groups.module";
import {ActivitiesPageModule} from "../activities/activities.module";
import {DevelopmentPageModule} from "../development/development.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagecommunitiesRoutingModule,
    AnalyticsPageModule,
    MembersPageModule,
    TopicsPageModule,
    GroupsPageModule,
    AdministratorsPageModule,
    CommunitiesPageModule,
    ActivitiesPageModule,
    DevelopmentPageModule
  ],
  declarations: [ManagecommunitiesPage]
})
export class ManagecommunitiesPageModule {}
