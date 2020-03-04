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
        path: '**',
        redirectTo:  '/app/discover/home/5d5785b462489003817fee18',
        pathMatch: 'prefix'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //{ enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
