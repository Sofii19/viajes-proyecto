import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  twofaRequired: boolean = false;
  usuarioIdTwofa: number | null = null;
  codigoTwofa: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit() {
    this.loginService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            window.location.href = '/explorar-paquetes';
          } else if (res.requiere2fa) {
            this.twofaRequired = true;
            this.usuarioIdTwofa = res.usuario_id;
          }
        },
        error: (err) => {
          this.error = err.error?.mensaje || 'Error al iniciar sesión';
        },
      });
  }

  verificarCodigoTwofa() {
    if (this.usuarioIdTwofa && this.codigoTwofa) {
      this.loginService
        .verificarTwofa({
          usuario_id: this.usuarioIdTwofa,
          codigo: this.codigoTwofa,
        })
        .subscribe({
          next: (res) => {
            if (res.token) {
              localStorage.setItem('token', res.token);
              window.location.href = '/explorar-paquetes';
            }
          },
          error: (err) => {
            this.error = err.error?.mensaje || 'Código 2FA incorrecto';
          },
        });
    }
  }

  loginWithProvider(provider: string) {
    window.location.href = this.loginService.getSocialAuthUrl(provider);
  }
}
