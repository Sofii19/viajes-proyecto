import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaquetesService {
  private apiUrl = 'http://localhost:3002/api/paquetes';

  constructor(private http: HttpClient) {}

  getPaquetes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPaquete(paquete: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, paquete);
  }

  updatePaquete(id: number, paquete: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, paquete);
  }

  deletePaquete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPaquetePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
