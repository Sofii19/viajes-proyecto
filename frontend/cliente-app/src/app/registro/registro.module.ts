import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { RegistroFormComponent } from './registro-form/registro-form.component';


@NgModule({
  declarations: [
    RegistroComponent,
    RegistroFormComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule
  ]
})
export class RegistroModule { }
