import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-widget',
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.css'],
})
export class ChatbotWidgetComponent implements OnInit {
  abierto = false;

  toggleChat() {
    this.abierto = !this.abierto;
  }
  
  constructor() {}

  ngOnInit(): void {}
}
