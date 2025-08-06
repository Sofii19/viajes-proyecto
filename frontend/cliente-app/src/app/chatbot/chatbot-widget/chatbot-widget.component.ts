import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot-widget',
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.css'],
})
export class ChatbotWidgetComponent implements OnInit {
  abierto = false;

  mensajes: { texto: string; emisor: 'usuario' | 'bot' }[] = [];
  mensajeUsuario: string = '';

  toggleChat() {
    this.abierto = !this.abierto;
  }

  constructor(private chatbotService: ChatbotService) {}

  enviar() {
    if (!this.mensajeUsuario.trim()) return;
    this.mensajes.push({ texto: this.mensajeUsuario, emisor: 'usuario' });
    this.chatbotService.enviarMensaje(this.mensajeUsuario).subscribe((res) => {
      this.mensajes.push({ texto: res.respuesta, emisor: 'bot' });
    });
    this.mensajeUsuario = '';
  }

  ngOnInit(): void {}
}
