import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private apiUrl = 'http://localhost:3000/api/pagos/reporte';

  constructor(private http: HttpClient) { }

  getReportePagos(fechaInicio: string, fechaFin: string) {
    return this.http.get<any[]>(`${this.apiUrl}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
}
