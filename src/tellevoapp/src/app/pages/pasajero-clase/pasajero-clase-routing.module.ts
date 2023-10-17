import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasajeroClasePage } from './pasajero-clase.page';

const routes: Routes = [
  {
    path: '',
    component: PasajeroClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasajeroClasePageRoutingModule {}
