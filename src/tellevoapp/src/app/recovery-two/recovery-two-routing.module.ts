import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoveryTwoPage } from './recovery-two.page';

const routes: Routes = [
  {
    path: '',
    component: RecoveryTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryTwoPageRoutingModule {}
