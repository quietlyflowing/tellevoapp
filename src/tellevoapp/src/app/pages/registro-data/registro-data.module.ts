import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroDataPageRoutingModule } from './registro-data-routing.module';
import { RegistroDataPage } from './registro-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroDataPageRoutingModule
  ],
  declarations: [RegistroDataPage]
})
export class RegistroDataPageModule {}
