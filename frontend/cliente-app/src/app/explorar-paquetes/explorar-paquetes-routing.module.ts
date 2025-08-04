import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorarPaquetesComponent } from './explorar-paquetes.component';

const routes: Routes = [{ path: '', component: ExplorarPaquetesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorarPaquetesRoutingModule { }
