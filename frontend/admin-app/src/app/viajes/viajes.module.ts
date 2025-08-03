import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescripcionLinebreakPipe } from './hoteles-list/descripcion-linebreak.pipe';
import { FormsModule } from '@angular/forms';

import { ViajesRoutingModule } from './viajes-routing.module';
import { ViajesComponent } from './viajes.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';
import { RutasListComponent } from './rutas-list/rutas-list.component';
import { PromocionesListComponent } from './promociones-list/promociones-list.component';
import { HotelesListComponent } from './hoteles-list/hoteles-list.component';


@NgModule({
  declarations: [
    ViajesComponent,
    ViajesListComponent,
    VehiculosListComponent,
    RutasListComponent,
    PromocionesListComponent,
    HotelesListComponent,
    DescripcionLinebreakPipe
  ],
  imports: [
    CommonModule,
    ViajesRoutingModule,
    FormsModule
  ]
})
export class ViajesModule { }
