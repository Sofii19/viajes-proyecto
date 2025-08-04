import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../services/paquetes.service';

@Component({
  selector: 'app-cards-paquete',
  templateUrl: './cards-paquete.component.html',
  styleUrls: ['./cards-paquete.component.css'],
})
export class CardsPaqueteComponent implements OnInit {
  paquetes: any[] = [];

  constructor(private paquetesService: PaquetesService) {}

  ngOnInit(): void {
    this.paquetesService.getPaquetes().subscribe((data) => {
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
}
