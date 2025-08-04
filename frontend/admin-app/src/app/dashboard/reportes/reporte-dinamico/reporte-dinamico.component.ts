import { Component, OnInit } from '@angular/core';
import { PagosService } from '../../services/pagos.service';
import { PaquetesService } from 'src/app/paquetes/paquetes.service';

@Component({
  selector: 'app-reporte-dinamico',
  templateUrl: './reporte-dinamico.component.html',
  styleUrls: ['./reporte-dinamico.component.css']
})
export class ReporteDinamicoComponent implements OnInit {
  fechaInicio: string = '';
  fechaFin: string = '';
  ventasFiltradas: any[] = [];

  constructor(
    private pagosService: PagosService,
    private paquetesService: PaquetesService
  ) { }

  ngOnInit(): void { }

  filtrarVentas() {
    if (this.fechaInicio && this.fechaFin) {
      this.pagosService.getReportePagos(this.fechaInicio, this.fechaFin)
        .subscribe(data => {
          this.ventasFiltradas = data;
          // Para cada venta, obtener el nombre del paquete
          this.ventasFiltradas.forEach(venta => {
            this.paquetesService.getPaquetePorId(venta.paquete_id).subscribe(paquete => {
              venta.paquete_nombre = paquete.nombre;
            });
          });
        });
    }
  }
}
