import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagefeaturePage} from './managefeature.page';

const routes: Routes = [
    {
        path: ':id',
        component: ManagefeaturePage,
        children: [
            {
                path: 'insight/:id',
                loadChildren: () => import('./feature-insight/feature-insight.module').then(m => m.FeatureInsightPageModule),
            },
            {
                path: 'profile/:id',
                loadChildren: () => import('../showfeature/showfeature.module').then(m => m.ShowfeaturePageModule),
            },
            {
                path: 'people',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../editparticipants/editparticipants.module').then(m => m.EditparticipantsPageModule)
                    },
                ]
            },
            {
                path: 'programs/:id',
                loadChildren: () => import('./feature-childactivities/feature-childactivities.module').then(m => m.FeatureChildActivitiesPageModule),
            },
            {
                path: 'relationships/:id',
                loadChildren: () => import('./feature-childactivities/feature-childactivities.module').then(m => m.FeatureChildActivitiesPageModule),
            },
            {
                path: 'groups/:id',
                loadChildren: () => import('./feature-childactivities/feature-childactivities.module').then(m => m.FeatureChildActivitiesPageModule),
            },
            {
                path: 'journey/:id',
                loadChildren: () => import('./feature-childactivities/feature-childactivities.module').then(m => m.FeatureChildActivitiesPageModule),
            },
            {
                path: 'mentoring/:id',
                loadChildren: () => import('./feature-childactivities/feature-childactivities.module').then(m => m.FeatureChildActivitiesPageModule),
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
                loadChildren: () => import('./feature-childactivities/feature-childactivities.module').then(m => m.FeatureChildActivitiesPageModule),
            },
            {
                path: 'schedule',
                loadChildren: () => import('./feature-schedule/feature-schedule.module').then(m => m.FeatureSchedulePageModule),
            },
            {
                path: 'new-schedule',
                loadChildren: () => import('./feature-schedule/feature-schedule.module').then(m => m.FeatureSchedulePageModule),
            },
            {
                path: 'onboarding/:id',
                loadChildren: () => import('../../user/about/preferences/preferences.module').then(m => m.PreferencesPageModule),
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
    }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagefeatureRoutingModule { }
