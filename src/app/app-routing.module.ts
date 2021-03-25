import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/discover',
        pathMatch: 'full' },
    {
        path: 'recover',
        loadChildren: './pages/user/recover/recover.module#RecoverPageModule' },
    {
        path: 'register',
        loadChildren: './pages/user/register/register.module#RegisterPageModule' },
    {
        path: 'discover',
        loadChildren: './pages/user/discover/discover.module#DiscoverPageModule' },
    {
        path: 'app',
        loadChildren: './pages/main-tab/main-tab.module#MainTabPageModule' },
    {
        // service in auth.service.ts that handles routing to activities
        path: 'activity/:id',
        loadChildren: './pages/feature/showfeature/showfeature.module#ShowfeaturePageModule' },
    {
        // service in auth.service.ts that handles routing to connect
        path: 'connect/:id',
        loadChildren: './pages/community/showcommunity/showcommunity.module#ShowcommunityPageModule' },
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
        loadChildren: () => import('./pages/group/groupchat/groupchat.module').then( m => m.GroupchatPageModule),
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
  imports: [RouterModule.forRoot(routes)], // { enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
