import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradoresComponent } from './administradores.component';

const routes: Routes = [{ path: '', component: AdministradoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradoresRoutingModule { }
