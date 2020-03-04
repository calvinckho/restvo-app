import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomreminderPopoverPage } from './customreminder-popover.page';

const routes: Routes = [
  {
    path: '',
    component: CustomreminderPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomreminderPopoverPage]
})
export class CustomreminderPopoverPageModule {}
