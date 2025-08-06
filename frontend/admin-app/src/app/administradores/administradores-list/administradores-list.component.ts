import { Component, OnInit } from '@angular/core';
import { AdministradoresService } from '../services/administradores.service';
import { PassThrough } from 'stream';

@Component({
  selector: 'app-administradores-list',
  templateUrl: './administradores-list.component.html',
  styleUrls: ['./administradores-list.component.css']
})
export class AdministradoresListComponent implements OnInit {

  administradores: any[] = [];

    mostrarModalCrear = false;
    mostrarModalEditar = false;
    administradorEditar: any = null;
    nuevoAdministrador: any = {
      primer_nombre: '',
      segundo_nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      email: '',
      Password: '',
      rol_id: 1 // Asume que 1 es el rol de administrador
    };

    constructor(private administradoresService: AdministradoresService) { }

    ngOnInit(): void {
      this.cargarAdministradores();
    }

    cargarAdministradores(): void {
      this.administradoresService.getAdministradores().subscribe(data => {
        this.administradores = data.filter(u => u.rolId === 1);
      });
    }

    abrirModalCrear() {
      this.mostrarModalCrear = true;
      this.nuevoAdministrador = {
        primer_nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        telefono: '',
        rol_id: 1
      };
    }

    cerrarModalCrear() {
      this.mostrarModalCrear = false;
    }

    crearAdministrador() {
      this.administradoresService.createAdministrador(this.nuevoAdministrador).subscribe(() => {
        this.cargarAdministradores();
        this.cerrarModalCrear();
      });
    }
}
