import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private apiUrl = 'http://localhost:3002/api/rutas';

  constructor(private http: HttpClient) {}

  getRutas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRuta(ruta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ruta);
  }

  updateRuta(id: number, ruta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ruta);
  }

  deleteRuta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
