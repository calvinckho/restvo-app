import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagefeaturePage} from "./managefeature.page";

const routes: Routes = [
    {
        path: ':id',
        component: ManagefeaturePage,
        children: [
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: '../../group/groupchat/groupchat.module#GroupchatPageModule',
                        outlet: 'sub'
                    }
                ]
            },
            {
                path: 'insight',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-insight/feature-insight.module#FeatureInsightPageModule'
                    },
                ]
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
                path: 'programs',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                        
                    },
                ]
            },
            {
                path: 'relationships',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                        
                    },
                ]
            },
            {
                path: 'groups',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                        
                    },
                ]
            },
            {
                path: 'journey/:id',
                loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                //outlet: 'main'
            },
            {
                path: 'mentoring',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                        
                    },
                ]
            },
            {
                path: 'plans',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                        
                    },
                ]
            },
            {
                path: 'contents',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule',
                        
                    },
                ]
            },
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule',
                        
                    },
                ]
            },
            {
                path: 'new-schedule',
                children: [
                    {
                        path: '',
                        loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule',
                        
                    },
                ]
            },
            {
                path: 'onboarding',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../discover/preferences/preferences.module#PreferencesPageModule',
                        
                    },
                ]
            },
            {
                path: 'subscription',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('./feature-subscription/feature-subscription.module')
                            .then( m => m.FeatureSubscriptionPageModule),
                        
                    },
                ]
            },
            {
                path: 'billing',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('./feature-billing/feature-billing.module')
                            .then( m => m.FeatureBillingPageModule),
                        

                    },
                ]
            },
        ]
    },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagefeatureRoutingModule { }
