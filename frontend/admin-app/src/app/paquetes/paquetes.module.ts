import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DescripcionLinebreakPipe } from './paquetes-list/descripcion-linebreak.pipe';

import { PaquetesRoutingModule } from './paquetes-routing.module';
import { PaquetesComponent } from './paquetes.component';
import { PaquetesListComponent } from '../paquetes/paquetes-list/paquetes-list.component';


@NgModule({
  declarations: [
    PaquetesComponent,
    PaquetesListComponent,
    DescripcionLinebreakPipe
  ],
  imports: [
    CommonModule,
    PaquetesRoutingModule,
    FormsModule
  ]
})
export class PaquetesModule { }
