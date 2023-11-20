import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryTwoPageRoutingModule } from './recovery-two-routing.module';

import { RecoveryTwoPage } from './recovery-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoveryTwoPageRoutingModule
  ],
  declarations: [RecoveryTwoPage]
})
export class RecoveryTwoPageModule {}
