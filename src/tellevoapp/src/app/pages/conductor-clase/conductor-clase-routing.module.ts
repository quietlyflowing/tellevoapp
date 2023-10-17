import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorClasePage } from './conductor-clase.page';

const routes: Routes = [
  {
    path: '',
    component: ConductorClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorClasePageRoutingModule {}
