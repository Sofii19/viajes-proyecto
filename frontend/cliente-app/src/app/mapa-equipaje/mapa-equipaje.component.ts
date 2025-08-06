import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { WebsocketService } from '../service-websocket/websocket.service';

@Component({
  selector: 'app-mapa-equipaje',
  templateUrl: './mapa-equipaje.component.html',
  styleUrls: ['./mapa-equipaje.component.css']
})
export class MapaEquipajeComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private ws: WebsocketService) {}

  ngAfterViewInit(): void {
    this.initMap();

    this.ws.onMessage(data => {
      if (data.lat && data.lng) {
        const latlng: [number, number] = [data.lat, data.lng];
        if (!this.marker) {
          this.marker = L.marker(latlng).addTo(this.map);
        } else {
          this.marker.setLatLng(latlng);
        }
        this.map.panTo(latlng);
      }
    });
  }

  ngOnDestroy(): void {
    this.ws.close();
  }

  private initMap(): void {
    this.map = L.map('map').setView([4.6570, -74.0930], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
