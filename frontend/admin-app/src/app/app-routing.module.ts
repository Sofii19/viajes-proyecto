import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';

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
      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'administradores',
        loadChildren: () =>
          import('./administradores/administradores.module').then(
            (m) => m.AdministradoresModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
