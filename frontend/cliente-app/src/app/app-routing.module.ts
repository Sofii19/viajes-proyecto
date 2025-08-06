import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  // Rutas protegidas bajo el layout principal
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'explorar-paquetes',
        loadChildren: () =>
          import('./explorar-paquetes/explorar-paquetes.module').then(
            (m) => m.ExplorarPaquetesModule
          )},
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}