import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito-list',
  templateUrl: './carrito-list.component.html',
  styleUrls: ['./carrito-list.component.css']
})
export class CarritoListComponent implements OnInit {
  reservas: any[] = [];
  error: string | null = null;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.getReservasUsuario().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al cargar las reservas';
      }
    });
  }

  pagarReserva(reserva: any) {
  // Aquí va la lógica de pago
  alert('Funcionalidad de pago para reserva #' + reserva.id);
}
}
