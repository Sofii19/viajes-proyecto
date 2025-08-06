import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './reserva.component';
import { ReservasListComponent } from './reservas-list/reservas-list.component';


@NgModule({
  declarations: [
    ReservaComponent,
    ReservasListComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule
  ]
})
export class ReservaModule { }
