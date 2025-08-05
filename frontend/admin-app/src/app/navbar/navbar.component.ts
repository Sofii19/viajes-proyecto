import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rutaActual: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = this.router.url.split('/');
      this.rutaActual = url[url.length - 1] || 'dashboard';
    });
  }

  ngOnInit(): void {
  }

}
