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
                //outlet: 'main'
            },
            {
                path: 'profile/:id',
                loadChildren: '../showfeature/showfeature.module#ShowfeaturePageModule',
                //outlet: 'main'
            },
            {
                path: 'people/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'programs/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'relationships/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'groups/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'journey/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
<<<<<<< HEAD
                path: 'journey/:id',
=======
                path: 'mentoring/:id',
>>>>>>> improving calix's code
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'plans/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'contents/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'schedule',
                loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule',
                //outlet: 'main'
            },
            {
                path: 'new-schedule',
                loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule',
                //outlet: 'main'
            },
            {
                path: 'onboarding',
                loadChildren: '../../discover/preferences/preferences.module#PreferencesPageModule',
                //outlet: 'main'
            },
            {
                path: 'subscription/:id',
                loadChildren: () => import('./feature-subscription/feature-subscription.module')
                    .then( m => m.FeatureSubscriptionPageModule),
                //outlet: 'main'
            },
            {
                path: 'billing/:id',
                loadChildren: () => import('./feature-billing/feature-billing.module')
                    .then( m => m.FeatureBillingPageModule),
                //outlet: 'main'
            },
        ]
    },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagefeatureRoutingModule { }
