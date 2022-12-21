import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarInfoPageRoutingModule } from './cambiar-info-routing.module';

import { CambiarInfoPage } from './cambiar-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CambiarInfoPage]
})
export class CambiarInfoPageModule {}
