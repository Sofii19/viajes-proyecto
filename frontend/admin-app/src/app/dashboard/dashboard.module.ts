import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { ReporteViajesComponent } from './reportes/reporte-viajes/reporte-viajes.component';
import { ReporteIngresosComponent } from './reportes/reporte-ingresos/reporte-ingresos.component';
import { ReporteDinamicoComponent } from './reportes/reporte-dinamico/reporte-dinamico.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardListComponent,
    ReporteViajesComponent,
    ReporteIngresosComponent,
    ReporteDinamicoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
