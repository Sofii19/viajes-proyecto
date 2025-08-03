import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../vehiculos.service';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css'],
})
export class VehiculosListComponent implements OnInit {
  vehiculos: any[] = [];

  mostrarModalCrear = false;
  mostrarModalEditar = false;
  vehiculoEditar: any = null;
  nuevoVehiculo: any = {
    marca: '',
    modelo: '',
    capacidad: null,
    placa: '',
  };

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculosService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
    });
  }

  eliminarVehiculo(id: number): void {
    this.vehiculosService.deleteVehiculo(id).subscribe(() => {
      this.cargarVehiculos();
    });
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
    this.nuevoVehiculo = {
      marca: '',
      modelo: '',
      capacidad: null,
      placa: ''
    };
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearVehiculo() {
    this.vehiculosService
      .createVehiculo(this.nuevoVehiculo)
      .subscribe(() => {
        this.cargarVehiculos();
        this.cerrarModalCrear();
      });
  }

  abrirModalEditar(vehiculo: any) {
    this.vehiculoEditar = { ...vehiculo };
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.vehiculoEditar = null;
  }

  actualizarVehiculo() {
    this.vehiculosService
      .updateVehiculo(this.vehiculoEditar.id, this.vehiculoEditar)
      .subscribe(() => {
        this.cargarVehiculos();
        this.cerrarModalEditar();
      });
  }
}
