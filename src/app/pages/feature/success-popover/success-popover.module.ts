import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessPopoverPageRoutingModule } from './success-popover-routing.module';

import { SuccessPopoverPage } from './success-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessPopoverPageRoutingModule
  ],
  declarations: [SuccessPopoverPage]
})
export class SuccessPopoverPageModule {}
