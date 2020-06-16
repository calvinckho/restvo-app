import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagefeaturePage} from "./managefeature.page";

const routes: Routes = [
    {
        path: ':id',
        component: ManagefeaturePage,
        children: [
            {
                path: 'insight/:id',
                loadChildren: './feature-insight/feature-insight.module#FeatureInsightPageModule',
            },
            {
                path: 'profile/:id',
                loadChildren: '../showfeature/showfeature.module#ShowfeaturePageModule',
                },
            {
                path: 'people',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../editparticipants/editparticipants.module#EditparticipantsPageModule'
                    },
                ]
            },
            {
                path: 'programs/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'relationships/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'groups/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'journey/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'mentoring/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'plans/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'creator',
                loadChildren: () => import('./feature-creator/feature-creator.module').then( m => m.FeatureCreatorPageModule),
            },
            {
                path: 'newplan',
                loadChildren: () => import('../pickfeature-popover/pickfeature-popover.module').then( m => m.PickfeaturePopoverPageModule),
            },
            {
                path: 'contents/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
            },
            {
                path: 'schedule',
                loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule',
            },
            {
                path: 'new-schedule',
                loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule',
            },
            {
                path: 'onboarding/:id',
                loadChildren: '../../discover/preferences/preferences.module#PreferencesPageModule',
            },
            {
                path: 'subscription/:id',
                loadChildren: () => import('./feature-subscription/feature-subscription.module').then( m => m.FeatureSubscriptionPageModule),
            },
            {
                path: 'billing/:id',
                loadChildren: () => import('./feature-billing/feature-billing.module').then( m => m.FeatureBillingPageModule),
            },
        ]
    },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagefeatureRoutingModule { }
