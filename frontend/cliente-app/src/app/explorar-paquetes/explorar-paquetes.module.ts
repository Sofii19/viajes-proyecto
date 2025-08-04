import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorarPaquetesRoutingModule } from './explorar-paquetes-routing.module';
import { ExplorarPaquetesComponent } from './explorar-paquetes.component';
import { CardsPaqueteComponent } from './cards-paquete/cards-paquete.component';


@NgModule({
  declarations: [
    ExplorarPaquetesComponent,
    CardsPaqueteComponent
  ],
  imports: [
    CommonModule,
    ExplorarPaquetesRoutingModule
  ]
})
export class ExplorarPaquetesModule { }
