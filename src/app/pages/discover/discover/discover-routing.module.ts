import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiscoverPage} from './discover.page';

const routes: Routes = [
    {
        path: '',
        component: DiscoverPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'insight',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/manage/feature-insight/feature-insight.module#FeatureInsightPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo:  '/app/discover/home/5d5785b462489003817fee18',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiscoverRoutingModule { }
