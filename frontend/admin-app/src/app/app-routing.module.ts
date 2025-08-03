import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'viajes', loadChildren: () => import('./viajes/viajes.module').then(m => m.ViajesModule) },
      { path: 'paquetes', loadChildren: () => import('./paquetes/paquetes.module').then(m => m.PaquetesModule) },
      // ...otras rutas
    ]
  },
  { path: 'tables', component: DashboardComponent }, // Temporal hasta crear TablesComponent
  { path: 'billing', component: DashboardComponent }, // Temporal hasta crear BillingComponent
  { path: 'virtual-reality', component: DashboardComponent }, // Temporal hasta crear VirtualRealityComponent
  { path: 'rtl', component: DashboardComponent }, // Temporal hasta crear RTLComponent
  { path: 'profile', component: ProfileComponent },
  { path: 'sign-in', component: DashboardComponent }, // Temporal hasta crear SignInComponent
  { path: 'sign-up', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
