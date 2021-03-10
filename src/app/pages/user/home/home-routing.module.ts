import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
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
          redirectTo:  '/app/home/activity/5d5785b462489003817fee18',
          pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
