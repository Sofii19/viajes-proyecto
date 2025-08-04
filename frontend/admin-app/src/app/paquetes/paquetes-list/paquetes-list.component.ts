import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes.service';
import { VehiculosService } from '../../viajes/vehiculos.service';
import { HotelesService } from '../../viajes/hoteles.service';
import { RutasService } from '../../viajes/rutas.service';
import { PromocionesService } from '../../viajes/promociones.service';

@Component({
  selector: 'app-paquetes-list',
  templateUrl: './paquetes-list.component.html',
  styleUrls: ['./paquetes-list.component.css'],
})
export class PaquetesListComponent implements OnInit {
  paquetes: any[] = [];
  vehiculos: any[] = [];
  hoteles: any[] = [];
  rutas: any[] = [];
  promociones: any[] = [];

  mostrarModalCrear = false;
  mostrarModalEditar = false;
  paqueteEditar: any = null;
  nuevoPaquete: any = {
    nombre: '',
    descripcion: '',
    precio_total: null,
    promocion_id: null,
    ruta_id: null,
    hotel_id: null,
    vehiculo_id: null,
  };

  constructor(
    private paquetesService: PaquetesService,
    private vehiculosService: VehiculosService,
    private hotelesService: HotelesService,
    private rutasService: RutasService,
    private promocionesService: PromocionesService
  ) {}

  ngOnInit(): void {
    this.cargarPaquetes();
    this.cargarVehiculos();
    this.cargarHoteles();
    this.cargarRutas();
    this.cargarPromociones();
  }

  cargarPaquetes(): void {
    this.paquetesService.getPaquetes().subscribe((data) => {
      this.paquetes = data;
    });
  }

  cargarVehiculos() {
    this.vehiculosService
      .getVehiculos()
      .subscribe((data) => (this.vehiculos = data));
  }
  cargarHoteles() {
    this.hotelesService.getHoteles().subscribe((data) => (this.hoteles = data));
  }
  cargarRutas() {
    this.rutasService.getRutas().subscribe((data) => (this.rutas = data));
  }
  cargarPromociones() {
    this.promocionesService
      .getPromociones()
      .subscribe((data) => (this.promociones = data));
  }

  eliminarPaquete(id: number): void {
    this.paquetesService.deletePaquete(id).subscribe(() => {
      this.cargarPaquetes();
    });
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
    this.nuevoPaquete = {
      nombre: '',
      descripcion: '',
      precio_total: null,
      promocion_id: null,
      ruta_id: null,
      hotel_id: null,
      vehiculo_id: null,
    };
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearPaquete() {
    // Elimina campos nulos o 0
    const paqueteAEnviar = { ...this.nuevoPaquete };
    Object.keys(paqueteAEnviar).forEach((key) => {
      if (paqueteAEnviar[key] === null || paqueteAEnviar[key] === 0) {
        delete paqueteAEnviar[key];
      }
    });

    this.paquetesService.createPaquete(paqueteAEnviar).subscribe(() => {
      this.cargarPaquetes();
      this.cerrarModalCrear();
    });
  }

  abrirModalEditar(id: number) {
    const paquete = this.paquetes.find((p) => p.id === id);
    if (paquete) {
      this.paqueteEditar = { ...paquete };
      this.mostrarModalEditar = true;
    }
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.paqueteEditar = null;
  }

  actualizarPaquete() {
    this.paquetesService
      .updatePaquete(this.paqueteEditar.id, this.paqueteEditar)
      .subscribe(() => {
        this.cargarPaquetes();
        this.cerrarModalEditar();
      });
  }

  getPromocionNombre(id: number): string {
    const promo = this.promociones.find((p) => p.id === id);
    return promo ? promo.nombre : 'Sin promoción';
  }

  getRutaNombre(id: number): string {
    const ruta = this.rutas.find((r) => r.id === id);
    return ruta ? ruta.nombre_ruta : '';
  }

  getVehiculoNombre(id: number): string {
    const vehiculo = this.vehiculos.find((v) => v.id === id);
    return vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : '';
  }

  getHotelNombre(id: number): string {
    const hotel = this.hoteles.find((h) => h.id === id);
    return hotel ? hotel.nombre : 'Sin hotel';
  }
}
