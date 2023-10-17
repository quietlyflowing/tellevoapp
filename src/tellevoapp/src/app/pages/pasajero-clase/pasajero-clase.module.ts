import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasajeroClasePageRoutingModule } from './pasajero-clase-routing.module';

import { PasajeroClasePage } from './pasajero-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasajeroClasePageRoutingModule
  ],
  declarations: [PasajeroClasePage]
})
export class PasajeroClasePageModule {}
