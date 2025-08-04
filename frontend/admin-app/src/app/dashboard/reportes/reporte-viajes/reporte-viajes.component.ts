import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../../../paquetes/paquetes.service';
import { PromocionesService } from '../../../viajes/promociones.service';
import { RutasService } from '../../../viajes/rutas.service';
import { HotelesService } from '../../../viajes/hoteles.service';
import { VehiculosService } from '../../../viajes/vehiculos.service';

@Component({
  selector: 'app-reporte-viajes',
  templateUrl: './reporte-viajes.component.html',
  styleUrls: ['./reporte-viajes.component.css']
})
export class ReporteViajesComponent implements OnInit {
  paquetes: any[] = [];
  paquetesFiltrados: any[] = [];

  filtroNombre: string = '';
  filtroDescripcion: string = '';
  filtroPrecio: string = '';

  // Si tienes los arrays de estos datos, cárgalos aquí
  promociones: any[] = [];
  rutas: any[] = [];
  hoteles: any[] = [];
  vehiculos: any[] = [];

  constructor(
  private paquetesService: PaquetesService,
  private promocionesService: PromocionesService,
  private rutasService: RutasService,
  private hotelesService: HotelesService,
  private vehiculosService: VehiculosService
) {}

  ngOnInit() {
    this.paquetesService.getPaquetes().subscribe(data => {
      this.paquetes = data;
      this.paquetesFiltrados = [...this.paquetes];
    });

    // Aquí deberías cargar promociones, rutas, hoteles y vehículos si tienes sus servicios
    // Ejemplo:
    this.promocionesService.getPromociones().subscribe(data => this.promociones = data);
    this.rutasService.getRutas().subscribe(data => this.rutas = data);
    this.hotelesService.getHoteles().subscribe(data => this.hoteles = data);
    this.vehiculosService.getVehiculos().subscribe(data => this.vehiculos = data);
  }

  aplicarFiltros() {
    this.paquetesFiltrados = this.paquetes.filter(p => {
      const nombreOk = this.filtroNombre ? p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) : true;
      const descripcionOk = this.filtroDescripcion ? p.descripcion.toLowerCase().includes(this.filtroDescripcion.toLowerCase()) : true;
      const precioOk = this.filtroPrecio ? p.precio_total == +this.filtroPrecio : true;
      return nombreOk && descripcionOk && precioOk;
    });
  }

  getPromocionNombre(id: number): string {
    const promo = this.promociones.find(p => p.id === id);
    return promo ? promo.nombre : 'Sin promoción';
  }

  getRutaNombre(id: number): string {
    const ruta = this.rutas.find(r => r.id === id);
    return ruta ? ruta.nombre_ruta : '';
  }

  getHotelNombre(id: number): string {
    const hotel = this.hoteles.find(h => h.id === id);
    return hotel ? hotel.nombre : 'No hay';
  }

  getVehiculoNombre(id: number): string {
    const vehiculo = this.vehiculos.find(v => v.id === id);
    return vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : '';
  }
}
