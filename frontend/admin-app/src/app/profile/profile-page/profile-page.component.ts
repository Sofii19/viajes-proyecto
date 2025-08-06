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

  qrData: string = '';
  mostrarModalQr: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub || decoded.user_id || decoded.id;
      if (userId) {
        this.userId = userId;
        this.profileService.getUsuarioById(userId).subscribe((data) => {
          console.log('Usuario cargado:', data); // <-- Agrega esto
          this.usuario = data;
        });
      }
    }
  }

  onTwofaChange(event: any) {
    const checked = event.target.checked;
    if (this.userId) {
      if (checked) {
        // 1. Genera el QR y el secreto primero
        this.profileService.generarQrTwofa().subscribe((data) => {
          this.qrData = data.qr;
          this.mostrarModalQr = true;
          // Aquí puedes mostrar un botón "Confirmar" en el modal
          // Cuando el usuario confirme, ahí llamas a activarTwofa()
        });
      } else {
        this.profileService.desactivarTwofa(this.userId).subscribe(() => {
          this.usuario.twofa = false;
        });
      }
    }
  }

  // Y en el modal, cuando el usuario confirme:
  confirmarActivarTwofa() {
    if (this.userId) {
      this.profileService.activarTwofa(this.userId).subscribe(() => {
        this.usuario.twofa = true;
        this.mostrarModalQr = false;
      });
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
      this.profileService
        .actualizarPerfil(this.userId, this.nuevoEmail, this.nuevoPassword)
        .subscribe(() => {
          this.mostrarModalEditar = false;
        });
    }
  }
}
