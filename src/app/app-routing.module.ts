import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app/discover/home/5d5785b462489003817fee18',
        pathMatch: 'full' },
    {
        path: 'recover',
        loadChildren: './pages/user/recover/recover.module#RecoverPageModule' },
    {
        path: 'register',
        loadChildren: './pages/user/register/register.module#RegisterPageModule' },
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
        path: '**',
        redirectTo:  '/app/discover/home/5d5785b462489003817fee18',
        pathMatch: 'prefix'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], //{ enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
