import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPage} from './user.page';

const routes: Routes = [
    {
        path: '',
        component: UserPage,
        children: [
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: './profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: 'about',
                children: [
                    {
                        path: '',
                        loadChildren: './about/about.module#AboutPageModule'
                    }
                ]
            },
            {
                path: 'allpreferences',
                children: [
                    {
                        path: '',
                        loadChildren: '../discover/preferences/preferences.module#PreferencesPageModule'
                    }
                ]
            },
            {
                path: 'preferences',
                children: [
                    {
                        path: ':programId',
                        loadChildren: '../discover/preferences/preferences.module#PreferencesPageModule'
                    }
                ]
            },
            {
                path: 'programs',
                children: [
                    {
                        path: '',
                        loadChildren: './programs/programs.module#ProgramsPageModule'
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: './dashboard/dashboard.module#DashboardPageModule'
                    }
                ]
            },
            {
                path: 'privacy',
                children: [
                    {
                        path: '',
                        loadChildren: './settings/settings.module#SettingsPageModule'
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'notifications',
                children: [
                    {
                        path: '',
                        loadChildren: './notifications/notifications.module#NotificationsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/user/profile',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
