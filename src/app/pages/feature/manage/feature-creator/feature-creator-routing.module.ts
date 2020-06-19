import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureCreatorPage } from './feature-creator.page';

const routes: Routes = [
  {
    path: ':id',
    component: FeatureCreatorPage,
    children: [
      {
        path: 'overview/:id',
        loadChildren: () => import('../../editfeature/editfeature.module').then( m => m.EditfeaturePageModule),
      },
      {
        path: 'curriculum',
        loadChildren: () => import('../feature-curriculum/feature-curriculum.module').then( m => m.FeatureCurriculumPageModule),
      },
      {
        path: 'schedule',
        loadChildren: () => import('../feature-schedule/feature-schedule.module').then( m => m.FeatureSchedulePageModule),
      },
      {
        path: 'new-schedule',
        loadChildren: () => import('../feature-schedule/feature-schedule.module').then( m => m.FeatureSchedulePageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureCreatorPageRoutingModule {}
