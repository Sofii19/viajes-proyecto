import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component'; // <-- Agrega esta línea
import { AuthGuard } from './guards/auth.guard'; // <-- Asegúrate de tener un guardia de autenticación si es necesario

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then((m) => m.RegistroModule),
  },
  { path: 'auth/callback', component: AuthCallbackComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'explorar-paquetes',
        loadChildren: () =>
          import('./explorar-paquetes/explorar-paquetes.module').then(
            (m) => m.ExplorarPaquetesModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'mapa-equipaje',
        loadChildren: () =>
          import('./mapa-equipaje/mapa-equipaje.module').then(
            (m) => m.MapaEquipajeModule
          ),
      },
      {
        path: 'carrito',
        loadChildren: () =>
          import('./carrito/carrito.module').then((m) => m.CarritoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
