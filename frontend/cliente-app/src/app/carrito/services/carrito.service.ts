import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }

  // Método para decodificar el JWT y obtener el id del usuario
  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; // 'sub' es el id del usuario según tu backend
    } catch (e) {
      return null;
    }
  }

  // Obtener reservas del usuario actual
  getReservasUsuario(): Observable<any> {
    const userId = this.getUserIdFromToken();
    if (!userId) throw new Error('Usuario no autenticado');
    return this.http.get<any>(`http://localhost:3333/reservas/usuario/${userId}`);
  }
}
