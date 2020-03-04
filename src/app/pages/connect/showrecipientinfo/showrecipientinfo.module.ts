import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {ShowrecipientinfoPage} from './showrecipientinfo.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";

const routes: Routes = [
    {
        path: '',
        component: ShowrecipientinfoPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ApplicationPipesModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ShowrecipientinfoPage,
    ]
})
export class ShowrecipientinfoModule {}
