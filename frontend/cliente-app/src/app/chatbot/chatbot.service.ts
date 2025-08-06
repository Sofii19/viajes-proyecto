import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:3004/api/chatbot/conversar'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {
      usuario_id: 2, // <-- Hardcodea el ID aquí por ahora
      mensaje,
    });
  }
}
