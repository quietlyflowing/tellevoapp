import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDataPage } from './registro-data.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDataPageRoutingModule {}
