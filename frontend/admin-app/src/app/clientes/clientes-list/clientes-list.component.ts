import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: any[] = [];

  mostrarModalCrear = false;
  mostrarModalEditar = false;
  clienteEditar: any = null;
  nuevoCliente: any = {
    primer_nombre: '',
    segundo_nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    rol_id: 2 // Asume que 2 es el rol de cliente
  };

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe(data => {
      this.clientes = data.filter(u => u.rol_id === 2);
    });
  }

  eliminarCliente(id: number): void {
    this.clientesService.deleteCliente(id).subscribe(() => {
      this.cargarClientes();
    });
  }

  abrirModalCrear() {
    this.mostrarModalCrear = true;
    this.nuevoCliente = {
      primer_nombre: '',
      segundo_nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      email: '',
      telefono: '',
      rol_id: 2
    };
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  crearCliente() {
    this.clientesService.createCliente(this.nuevoCliente).subscribe(() => {
      this.cargarClientes();
      this.cerrarModalCrear();
    });
  }

  abrirModalEditar(cliente: any) {
    this.clienteEditar = { ...cliente };
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.clienteEditar = null;
  }

  actualizarCliente() {
    this.clientesService.updateCliente(this.clienteEditar.id, this.clienteEditar).subscribe(() => {
      this.cargarClientes();
      this.cerrarModalEditar();
    });
  }
}
