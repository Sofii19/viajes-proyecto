import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Redirección raíz
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login y registro fuera del layout principal
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },

  // Rutas protegidas bajo el layout principal
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'viajes',
        loadChildren: () =>
          import('./viajes/viajes.module').then((m) => m.ViajesModule),
      },
      {
        path: 'paquetes',
        loadChildren: () =>
          import('./paquetes/paquetes.module').then((m) => m.PaquetesModule),
      },
      // ...otras rutas protegidas
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
