import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroFinalPage } from './registro-final.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroFinalPageRoutingModule {}
