import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit() {
    this.loginService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          window.location.href = '/dashboard';
        }
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al iniciar sesión';
      }
    });
  }
}
