import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    RegistroRoutingModule,
    FormsModule
  ]
})
export class RegistroModule { }
