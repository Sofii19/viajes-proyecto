import { Component, OnInit } from '@angular/core';
import {ReservaService  } from '../service/reserva.service';


@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservasService: ReservaService) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

   cargarReservas(): void {
    this.reservasService.getRerservas().subscribe(data => {
      console.log(data);
      this.reservas = data;
      console.log(this.reservas)
    });
  }

}
