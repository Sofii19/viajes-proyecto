import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotWidgetComponent } from './chatbot-widget/chatbot-widget.component';



@NgModule({
  declarations: [
    ChatbotWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ // <-- Agrega esto
    ChatbotWidgetComponent
  ]
})
export class ChatbotModule { }
