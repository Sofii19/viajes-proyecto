import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdministradoresRoutingModule } from './administradores-routing.module';
import { AdministradoresComponent } from './administradores.component';
import { AdministradoresListComponent } from './administradores-list/administradores-list.component';


@NgModule({
  declarations: [
    AdministradoresComponent,
    AdministradoresListComponent
  ],
  imports: [
    CommonModule,
    AdministradoresRoutingModule,
    FormsModule
  ]
})
export class AdministradoresModule { }
