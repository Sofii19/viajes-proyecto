import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../services/paquetes.service';
import { TitularService } from '../../service-titular/titular.service';
import { ReservaService } from '../../service-reserva/reserva.service';
// import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-cards-paquete',
  templateUrl: './cards-paquete.component.html',
  styleUrls: ['./cards-paquete.component.css'],
})
export class CardsPaqueteComponent implements OnInit {
  paquetes: any[] = [];
  soloPromocion: boolean = false;
  mostrarModalCrearTitular: boolean = false;
  mostrarModalCrearReserva: boolean = false;
  nuevaReserva: any = {
    titular_id: "",
    paquete_id: "",
    fecha_viaje: "",
    cantidad_personas: "",
    estado_id: 1,
  }
  
  nuevoTitular: any = {
    nombre: 'Juan',
    apellido: 'Clavijo',
    cedula: 2131233424,
    correo: 'juan.clavijo@gmail.com',
    telefono: 3044444860,
    usuario_id: 2
  };

  constructor(private paquetesService: PaquetesService, private titularService: TitularService, private reservaService: ReservaService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    // if (token) {
    //   const decoded: any = jwtDecode(token);
    //   const userId = decoded.sub || decoded.user_id || decoded.id;
    //   if (userId) {
    //     this.nuevoTitular.usuario_id = userId;
    //   }
    // }
    this.getPaquetes();

  }
  getPaquetesConPromocion(): void {
    if (!this.soloPromocion) {
      this.paquetesService.getPaquetesConPromocion().subscribe((data) => {
        console.log(data);
        this.paquetes = data.map((p, i) => ({
          ...p,
          imagenUrl: [
            'assets/img/eje_cafetero.png',
            'assets/img/kayak.png',
            'assets/img/sahara.png',
            'assets/img/playa.png',
            'assets/img/volcan.png',
          ][i % 20], // Ejemplo: asigna imágenes en orden
        }));
      });
      this.soloPromocion = true;
    } else {
      this.getPaquetes();
      this.soloPromocion = false;
    }
  }
  getPaquetes(): void {
    this.paquetesService.getPaquetes().subscribe((data) => {
      console.log(data)
      // Asigna una imagen por defecto o según el paquete
      this.paquetes = data.map((p, i) => ({
        ...p,
        imagenUrl: [
          'assets/img/eje_cafetero.png',
          'assets/img/kayak.png',
          'assets/img/sahara.png',
          'assets/img/playa.png',
          'assets/img/volcan.png',
        ][i % 20], // Ejemplo: asigna imágenes en orden
      }));
    });
  }
  crearTitularReserva(paqueteId: number): void {
    // Elimina campos nulos o 0
    console.log(this.nuevoTitular.usuario_id)
    if (this.nuevoTitular.usuario_id) {
      console.log(this.nuevoTitular.usuario_id)
      this.titularService.crearTitular(this.nuevoTitular).subscribe(({
        next: (respuesta) => {
          console.log('Titular creado con éxito:', respuesta);
          this.mostrarModalCrearTitular = false;
          this.mostrarModalCrearReserva = true;
          this.nuevaReserva.titular_id = respuesta.id; // Asigna el ID del titular creado
          this.nuevaReserva.paquete_id = paqueteId; // Asigna el ID del paquete
        },
        error: (err) => {
          console.error('Error al crear titular:', err);
        }
      }));
    }
    this.nuevoTitular = {
      nombre: '',
      apellido: '',
      cedula: null,
      correo: null,
      telefono: null,
      usuario_id: null
    };
  }
  crearReserva(): void {
    console.log('Reserva creada para el paquete ID:', this.nuevaReserva.paquete_id);
    console.log('Titular ID:', this.nuevaReserva);
    if (this.nuevaReserva.titular_id && this.nuevaReserva.paquete_id) {
      this.reservaService.crearReserva(this.nuevaReserva).subscribe({
        next: (respuesta) => {
          console.log('Reserva creada con éxito:', respuesta);
          this.mostrarModalCrearReserva = false;
          this.nuevaReserva = {
            titular_id: "",
            paquete_id: "",
            fecha_viaje: "",
            cantidad_personas: "",
          };
        },
        error: (err) => {
          console.error('Error al crear reserva:', err);
        }
      });
    }
  }
  mostrarModalCrearTitularReserva() {
    this.mostrarModalCrearTitular = true;
    console.log(this.mostrarModalCrearTitular);
  }
  cerrarModalCrearTitular() {
    this.mostrarModalCrearTitular = false;
    this.nuevoTitular = {
      nombre: '',
      apellido: '',
      cedula: null,
      correo: null,
      telefono: null,
      usuario_id: null
    };
  }
  cerrarModalCrearReserva() {
    this.mostrarModalCrearReserva = false;
    this.nuevaReserva = {
      titular_id: "",
      paquete_id: "",
      fecha_viaje: "",
      cantidad_personas: "",
    };
  }
}
