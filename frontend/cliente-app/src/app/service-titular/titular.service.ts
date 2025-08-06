import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitularService {
  private apiUrl = 'http://localhost:3000/api/titular';

  constructor(private http: HttpClient) {}

  crearTitular(titular: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, titular);
  }

}
