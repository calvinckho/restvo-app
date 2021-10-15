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
            loadChildren: () => import('../../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
          }
        ]
      },
      {
        path: 'insight',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../feature/manage/feature-insight/feature-insight.module').then(m => m.FeatureInsightPageModule)
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
