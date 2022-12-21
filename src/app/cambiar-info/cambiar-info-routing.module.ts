import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarInfoPage } from './cambiar-info.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarInfoPageRoutingModule {}
