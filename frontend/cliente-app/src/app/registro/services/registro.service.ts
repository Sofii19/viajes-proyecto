import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3333/auth/register/cliente';

  constructor(private http: HttpClient) { }

  registrar(usuario: {
    primerNombre: string;
    segundoNombre?: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    email: string;
    password: string;
    rolId: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}
