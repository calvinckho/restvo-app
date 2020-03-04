import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureSchedulePage} from "./feature-schedule.page";

const routes: Routes = [
    {
        path: ':id',
        component: FeatureSchedulePage,
        /*children: [
            {
                path: 'contents',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPage'
                    },
                ]
            }
        ]*/
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureScheduleRoutingModule { }
