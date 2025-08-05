import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {
  private apiUrl = 'http://localhost:3002/api/hoteles';

  constructor(private http: HttpClient) {}

  getHoteles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createHotel(hotel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, hotel);
  }

  updateHotel(id: number, hotel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, hotel);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
