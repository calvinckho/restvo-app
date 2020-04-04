import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoconferencePage } from './videoconference.page';

const routes: Routes = [
  {
    path: '',
    component: VideoconferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoconferencePageRoutingModule {}
