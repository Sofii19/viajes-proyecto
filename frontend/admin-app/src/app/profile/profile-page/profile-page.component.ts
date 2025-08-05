import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  usuario: any = null;
  mostrarPassword: boolean = false;

  userId: number | null = null;

  mostrarModalEditar: boolean = false;
  nuevoEmail: string = '';
  nuevoPassword: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub || decoded.user_id || decoded.id;
      if (userId) {
        this.profileService.getUsuarioById(userId).subscribe((data) => {
          this.usuario = data;
        });
      }
    }
  }

  onTwofaChange(event: any) {
    const checked = event.target.checked;
    if (this.userId) {
      if (checked) {
        this.profileService.activarTwofa(this.userId).subscribe(() => {
          this.usuario.twofa = true;
        });
      } else {
        this.profileService.desactivarTwofa(this.userId).subscribe(() => {
          this.usuario.twofa = false;
        });
      }
    }
  }

  logout() {
    if (confirm('¿Seguro quieres cerrar sesión?')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  eliminarCuenta() {
    if (
      confirm(
        '¿Seguro quieres eliminar esta cuenta? Esta acción no se puede deshacer.'
      )
    ) {
      if (this.userId) {
        this.profileService.eliminarUsuario(this.userId).subscribe(() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        });
      }
    }
  }

  abrirModalEditar() {
  this.nuevoEmail = this.usuario?.email || '';
  this.nuevoPassword = '';
  this.mostrarModalEditar = true;
}

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  actualizarPerfil() {
    if (this.userId) {
      this.profileService.actualizarPerfil(this.userId, this.nuevoEmail, this.nuevoPassword).subscribe(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
    }
  }
}
