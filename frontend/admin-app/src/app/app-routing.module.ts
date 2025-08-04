import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
      // ...otras rutas
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
