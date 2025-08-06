import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaquetesService {
  private apiUrl = 'http://localhost:3002/api/paquetes';

  constructor(private http: HttpClient) {}

  getPaquetes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getPaquetesConPromocion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/promocion`);
  }
}
