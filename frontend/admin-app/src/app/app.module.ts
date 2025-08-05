import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainLayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Importa el módulo para realizar peticiones HTTP
    AppRoutingModule // Aquí se importa el módulo de rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
