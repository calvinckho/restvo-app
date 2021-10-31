import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/discover',
        pathMatch: 'full' },
    {
        path: 'recover',
        loadChildren: () => import('./pages/user/recover/recover.module').then(m => m.RecoverPageModule) },
    {
        path: 'register',
        loadChildren: () => import('./pages/user/register/register.module').then(m => m.RegisterPageModule) },
    {
        path: 'discover',
        loadChildren: () => import('./pages/user/discover/discover.module').then(m => m.DiscoverPageModule) },
    {
        path: 'app',
        loadChildren: () => import('./pages/main-tab/main-tab.module').then(m => m.MainTabPageModule) },
    {
        // service in auth.service.ts that handles routing to activities
        path: 'activity/:id',
        loadChildren: () => import('./pages/feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule) },
    {
        // service in auth.service.ts that handles routing to connect
        path: 'connect/:id',
        loadChildren: () => import('./pages/manage/communities/showcommunity/showcommunity.module').then(m => m.ShowcommunityPageModule) },
    {
        path: 'video/:id',
        loadChildren: () => import('./pages/connect/videoconference/videoconference.module').then( m => m.VideoconferencePageModule)
    },
    {
        path: 'designsystem',
        loadChildren: () => import('./pages/manage/designsystem/designsystem.module').then( m => m.DesignsystemPageModule)
    },
    {
        path: 'chat',
        loadChildren: () => import('./pages/connect/groupchat/groupchat.module').then(m => m.GroupchatPageModule),
        outlet: 'sub'
    },
    {
        path: 'user/:id',
        loadChildren: () => import('./pages/connect/showrecipientinfo/showrecipientinfo.module').then( m => m.ShowrecipientinfoModule),
        outlet: 'sub'
    },
    {
        path: 'details/:id',
        loadChildren: () => import('./pages/feature/showfeature/showfeature.module').then( m => m.ShowfeaturePageModule),
        outlet: 'sub'
    },
    {
        path: 'create',
        loadChildren: () => import('./pages/feature/editfeature/editfeature.module').then( m => m.EditfeaturePageModule),
        outlet: 'sub'
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./pages/feature/editfeature/editfeature.module').then( m => m.EditfeaturePageModule),
        outlet: 'sub'
    },
    {
        path: 'pickfeature',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./pages/feature/pickfeature-popover/pickfeature-popover.module').then( m => m.PickfeaturePopoverPageModule),
        outlet: 'sub'
    },
    {
        path: '**',
        redirectTo:  '/app/discover',
        pathMatch: 'prefix'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })], // { enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
