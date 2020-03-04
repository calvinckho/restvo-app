import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ApplicationPipesModule} from '../../../pipes/application-pipes';
import {ProfilePage} from './profile.page';

const routes: Routes = [
    {
        path: '',
        component: ProfilePage,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ApplicationPipesModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ProfilePage,
    ],
})
export class ProfilePageModule {}
