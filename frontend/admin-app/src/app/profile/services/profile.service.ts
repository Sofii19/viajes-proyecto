import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3333/admin/usuario';
  private apiUrl2FA = 'http://localhost:3333/auth/2fa';

  constructor(private http: HttpClient) {}

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  eliminarUsuario(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  actualizarPerfil(
    userId: number,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, {
      email,
      password,
    });
  }

  activarTwofa(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2FA}/activar`, { userId });
  }

  desactivarTwofa(userId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl2FA}/desactivar`, { userId });
  }
}
