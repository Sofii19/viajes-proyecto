import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  usuario: any = null;
  mostrarPassword: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub || decoded.user_id || decoded.id;
      if (userId) {
        this.profileService.getUsuarioById(userId).subscribe(data => {
          this.usuario = data;
        });
      }
    }
  }
}
