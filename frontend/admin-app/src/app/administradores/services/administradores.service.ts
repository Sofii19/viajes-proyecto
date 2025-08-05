import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  private apiUrl = 'http://localhost:3333/admin/usuario';
  private apiUrlCreate = 'http://localhost:3333/auth/register/administrador';

  constructor(private http: HttpClient) {}

  getAdministradores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAdministrador(administrador: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCreate, administrador);
  }
}
