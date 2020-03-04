import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {InvitetoconnectPage} from "./invitetoconnect.page";

const routes: Routes = [
    {
        path: '',
        component: InvitetoconnectPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [InvitetoconnectPage]
})
export class InvitetoconnectModule {}
