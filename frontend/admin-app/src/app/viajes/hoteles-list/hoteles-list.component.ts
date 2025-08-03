import { Component, OnInit } from '@angular/core';
import { HotelesService } from '../hoteles.service';

@Component({
  selector: 'app-hoteles-list',
  templateUrl: './hoteles-list.component.html',
  styleUrls: ['./hoteles-list.component.css']
})
export class HotelesListComponent implements OnInit {
  hoteles: any[] = [];

  mostrarModalCrear = false;
  mostrarModalEditar = false;
  hotelEditar: any = null;
  nuevoHotel: any = {
    nombre: '',
    direccion: '',
    ciudad: '',
    estrellas: null,
    descripcion: ''
  };

  constructor(private hotelesService: HotelesService) { }

  ngOnInit(): void {
    this.cargarHoteles();
  }

  cargarHoteles(): void {
    this.hotelesService.getHoteles().subscribe(data => {
      this.hoteles = data;
    });
  }

  eliminarHotel(id: number): void {
    this.hotelesService.deleteHotel(id).subscribe(() => {
      this.cargarHoteles();
    });
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
    this.nuevoHotel = { nombre: '', direccion: '', ciudad: '', estrellas: null, descripcion: '' };
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearHotel() {
    this.hotelesService.createHotel(this.nuevoHotel).subscribe(() => {
      this.cargarHoteles();
      this.cerrarModalCrear();
    });
  }

  abrirModalEditar(hotel: any) {
    this.hotelEditar = { ...hotel };
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.hotelEditar = null;
  }

  actualizarHotel() {
    this.hotelesService.updateHotel(this.hotelEditar.id, this.hotelEditar).subscribe(() => {
      this.cargarHoteles();
      this.cerrarModalEditar();
    });
  }
}
