import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import {ApplicationPipesModule} from "../../pipes/application-pipes";
import {UserPage} from "./user.page";
import {UserRoutingModule} from "./user-routing.module";
import {ProfilePageModule} from "./profile/profile.module";
import {AboutPageModule} from "./about/about.module";
import {SettingsPageModule} from "./settings/settings.module";
import {PreferencesPageModule} from "../discover/preferences/preferences.module";
import {ProgramsPageModule} from "./programs/programs.module";
import {NotificationsPageModule} from "./notifications/notifications.module";
import {InvitetoconnectModule} from "../connect/invitetoconnect/invitetoconnect.module";
import {DashboardPageModule} from "./dashboard/dashboard.module";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        UserRoutingModule,
        ProfilePageModule,
        AboutPageModule,
        PreferencesPageModule,
        SettingsPageModule,
        ProgramsPageModule,
        InvitetoconnectModule,
        NotificationsPageModule,
        ApplicationPipesModule,
        DashboardPageModule
    ],
    declarations: [
        UserPage
    ],
})
export class UserPageModule {}
