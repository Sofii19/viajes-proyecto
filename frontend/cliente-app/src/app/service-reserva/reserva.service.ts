import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/reserva';

  constructor(private http: HttpClient) {}

  crearReserva(reserva: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reserva);
  }

}
