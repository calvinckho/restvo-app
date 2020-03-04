import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import {SettingsPage} from "./settings.page";

const routes: Routes = [
    {
        path: '',
        component: SettingsPage,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ApplicationPipesModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        SettingsPage,
    ],
})
export class SettingsPageModule {}
