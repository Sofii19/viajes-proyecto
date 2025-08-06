import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:3001');
  }

  onMessage(callback: (data: any) => void) {
    this.socket.onmessage = event => {
      try {
        const d = JSON.parse(event.data);
        callback(d);
      } catch {
        // Ignorar mensajes no JSON
      }
    };
  }

  close() {
    this.socket.close();
  }
}
