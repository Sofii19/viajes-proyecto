import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:3333/auth/login';

  constructor(private http: HttpClient) {}

  login(datos: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos);
  }

  verificarTwofa(data: {
    usuario_id: number;
    codigo: string;
  }): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3333/auth/2fa/verificar-login',
      data
    );
  }
  
  getSocialAuthUrl(provider: string): string {
    return `http://localhost:3333/auth/${provider}`;
  }
}
