import { Component } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
      private authGoogleService: AuthGoogleService,
      private router: Router,
      private apiService: ApiService,
  ) {}

  menuItems = {
    dashboard: false,
    modules: false
  };

  toggleMenu(menu: string) {
    this.menuItems[menu as keyof typeof this.menuItems] = !this.menuItems[menu as keyof typeof this.menuItems];
  }

  obtainData() {
    const data = JSON.stringify(this.authGoogleService.getProfile())
    console.log(data);

    const token = this.authGoogleService.getGoogleToken();
    console.log('Google Token:', token); // Show id google token
  }

  logOut() {
    this.apiService.logout().subscribe({
      next: () => {
        // Limpia el localStorage
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('user');
        // Redirige al login
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        // Opcional: Manejar errores en el logout
      }
    });
  }

}
