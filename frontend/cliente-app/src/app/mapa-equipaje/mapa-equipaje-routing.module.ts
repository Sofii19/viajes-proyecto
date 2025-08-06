import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaEquipajeComponent } from './mapa-equipaje.component';

const routes: Routes = [{ path: '', component: MapaEquipajeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaEquipajeRoutingModule { }
