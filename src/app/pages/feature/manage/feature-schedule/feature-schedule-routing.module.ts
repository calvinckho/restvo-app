import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureSchedulePage} from "./feature-schedule.page";

const routes: Routes = [
    {
        path: ':id',
        component: FeatureSchedulePage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureScheduleRoutingModule { }
