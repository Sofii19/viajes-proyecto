import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  nuevoCliente: any = {
    primerNombre: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    rolId: 2 // 2 para cliente
  };

  constructor(private registroService: RegistroService) { }

  ngOnInit(): void {}

  registrarCliente() {
    this.registroService.registrar(this.nuevoCliente).subscribe({
      next: (res) => {
        alert('Registro exitoso, revisa tu correo para activar tu cuenta');
        // Puedes limpiar el formulario aquí si quieres
      },
      error: (err) => {
        alert('Error en el registro');
      }
    });
  }
}
