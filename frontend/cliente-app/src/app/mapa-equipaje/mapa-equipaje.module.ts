import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaEquipajeRoutingModule } from './mapa-equipaje-routing.module';
import { MapaEquipajeComponent } from './mapa-equipaje.component';


@NgModule({
  declarations: [
    MapaEquipajeComponent
  ],
  imports: [
    CommonModule,
    MapaEquipajeRoutingModule
  ]
})
export class MapaEquipajeModule { }
