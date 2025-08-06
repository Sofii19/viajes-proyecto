import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotWidgetComponent } from './chatbot-widget/chatbot-widget.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatbotWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ // <-- Agrega esto
    ChatbotWidgetComponent
  ]
})
export class ChatbotModule { }
