import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagecommunitiesPage } from './managecommunities.page';

const routes: Routes = [
    {
        path: '',
        component: ManagecommunitiesPage,
        children: [
            {
                path: 'insight',
                children: [
                    {
                        path: '',
                        loadChildren: '../analytics/analytics.module#AnalyticsPageModule'
                    }
                ]
            },
            {
                path: 'activities',
                children: [
                    {
                        path: '',
                        loadChildren: '../activities/activities.module#ActivitiesPageModule'
                    }
                ] },
            {
                path: 'members',
                children: [
                    {
                        path: '',
                        loadChildren: '../members/members.module#MembersPageModule'
                    }
                ] },
            {
                path: 'topics',
                children: [
                    {
                        path: '',
                        loadChildren: '../topics/topics.module#TopicsPageModule'
                    }
                ]
            },
            {
                path: 'groups',
                children: [
                    {
                        path: '',
                        loadChildren: '../groups/groups.module#GroupsPageModule'
                    }
                ]
            },
            { path: 'administrators',
                children: [
                    {
                        path: '',
                        loadChildren: '../administrators/administrators.module#AdministratorsPageModule'
                    }
                ]
            },
            { path: 'plan',
                children: [
                    {
                        path: '',
                        loadChildren: '../plan/plan.module#PlanPageModule'
                    }
                ]
             },
            { path: 'billing',
                children: [
                    {
                        path: '',
                        loadChildren: '../billing/billing.module#BillingPageModule'
                    }
                ]
             },
            {
                path: 'platforms',
                children: [
                    {
                        path: '',
                        loadChildren: '../communities/communities.module#CommunitiesPageModule'
                    }
                ]
            },
            {
                path: 'development',
                children: [
                    {
                        path: '',
                        loadChildren: '../development/development.module#DevelopmentPageModule'
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/manage/insight',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagecommunitiesRoutingModule { }
