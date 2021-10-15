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
                        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
                    }
                ]
            },
            {
                path: 'about',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
                    }
                ]
            },
            {
                path: 'allpreferences',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./about/preferences/preferences.module').then(m => m.PreferencesPageModule)
                    }
                ]
            },
            {
                path: 'preferences',
                children: [
                    {
                        path: ':programId',
                        loadChildren: () => import('./about/preferences/preferences.module').then(m => m.PreferencesPageModule)
                    }
                ]
            },
            {
                path: 'programs',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsPageModule)
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
                    }
                ]
            },
            {
                path: 'privacy',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
                    }
                ]
            },
            {
                path: 'notifications',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/user/profile',
                pathMatch: 'full'
            }
        ]
    },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
