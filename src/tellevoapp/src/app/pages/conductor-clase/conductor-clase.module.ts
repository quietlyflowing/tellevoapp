import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorClasePageRoutingModule } from './conductor-clase-routing.module';

import { ConductorClasePage } from './conductor-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorClasePageRoutingModule
  ],
  declarations: [ConductorClasePage]
})
export class ConductorClasePageModule {}
