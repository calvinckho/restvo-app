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
                        loadChildren: () => import('../analytics/analytics.module').then(m => m.AnalyticsPageModule)
                    }
                ]
            },
            {
                path: 'activities',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesPageModule)
                    }
                ] },
            {
                path: 'members',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../members/members.module').then(m => m.MembersPageModule)
                    }
                ] },
            { path: 'administrators',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../administrators/administrators.module').then(m => m.AdministratorsPageModule)
                    }
                ]
            },
            {
                path: 'platforms',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../communities/communities.module').then(m => m.CommunitiesPageModule)
                    }
                ]
            },
            {
                path: 'development',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../development/development.module').then(m => m.DevelopmentPageModule)
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
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
