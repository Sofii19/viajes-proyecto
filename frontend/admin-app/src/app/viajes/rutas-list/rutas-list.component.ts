import { Component, OnInit } from '@angular/core';
import { RutasService } from '../rutas.service';

@Component({
  selector: 'app-rutas-list',
  templateUrl: './rutas-list.component.html',
  styleUrls: ['./rutas-list.component.css']
})
export class RutasListComponent implements OnInit {

  rutas: any[] = [];
 
   mostrarModalCrear = false;
   mostrarModalEditar = false;
   rutaEditar: any = null;
   nuevaRuta: any = {
    nombre_ruta: '',
    duracion: null,
    descripcion: ''
  };

   constructor(private rutasService: RutasService) { }

   ngOnInit(): void {
     this.cargarRutas();
   }

   cargarRutas(): void {
     this.rutasService.getRutas().subscribe(data => {
       this.rutas = data;
     });
   }

   eliminarRuta(id: number): void {
     this.rutasService.deleteRuta(id).subscribe(() => {
       this.cargarRutas();
     });
   }
 
   abrirModalCrear() {
     this.mostrarModalCrear = true;
     this.nuevaRuta = { nombre_ruta: '', duracion: null, descripcion: '' };
   }
 
   cerrarModalCrear() {
     this.mostrarModalCrear = false;
   }

   crearRuta() {
     this.rutasService.createRuta(this.nuevaRuta).subscribe(() => {
       this.cargarRutas();
       this.cerrarModalCrear();
     });
   }

   abrirModalEditar(ruta: any) {
     this.rutaEditar = { ...ruta };
     this.mostrarModalEditar = true;
   }
 
   cerrarModalEditar() {
     this.mostrarModalEditar = false;
     this.rutaEditar = null;
   }

   actualizarRuta() {
     this.rutasService.updateRuta(this.rutaEditar.id, this.rutaEditar).subscribe(() => {
       this.cargarRutas();
       this.cerrarModalEditar();
     });
   }

}
