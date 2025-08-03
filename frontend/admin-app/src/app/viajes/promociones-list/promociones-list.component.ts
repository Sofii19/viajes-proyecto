import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../promociones.service';

@Component({
  selector: 'app-promociones-list',
  templateUrl: './promociones-list.component.html',
  styleUrls: ['./promociones-list.component.css'],
})
export class PromocionesListComponent implements OnInit {
  promociones: any[] = [];

  mostrarModalCrear = false;
  mostrarModalEditar = false;
  promocionEditar: any = null;
  nuevaPromocion: any = {
    nombre: '',
    descripcion: '',
    descuento_porcentaje: null,
    fecha_inicio: '',
    fecha_fin: '',
  };

  constructor(private promocionesService: PromocionesService) {}

  ngOnInit(): void {
    this.cargarPromociones();
  }

  cargarPromociones(): void {
    this.promocionesService.getPromociones().subscribe((data) => {
      this.promociones = data;
    });
  }

  eliminarPromocion(id: number): void {
    this.promocionesService.deletePromocion(id).subscribe(() => {
      this.cargarPromociones();
    });
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
    this.nuevaPromocion = {
      nombre: '',
      descripcion: '',
      descuento_porcentaje: null,
      fecha_inicio: '',
      fecha_fin: '',
    };
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearPromocion() {
    this.promocionesService
      .createPromocion(this.nuevaPromocion)
      .subscribe(() => {
        this.cargarPromociones();
        this.cerrarModalCrear();
      });
  }

  abrirModalEditar(promocion: any) {
    this.promocionEditar = { ...promocion };
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.promocionEditar = null;
  }

  actualizarPromocion() {
    this.promocionesService
      .updatePromocion(this.promocionEditar.id, this.promocionEditar)
      .subscribe(() => {
        this.cargarPromociones();
        this.cerrarModalEditar();
      });
  }
}
