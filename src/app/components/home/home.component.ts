import { Component } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
      private authGoogleService: AuthGoogleService,
      private router: Router
  ) {}

  activeModule: number | null = null;

  obtainData() {
    const data = JSON.stringify(this.authGoogleService.getProfile())
    console.log(data);

    const token = this.authGoogleService.getGoogleToken();
    console.log('Google Token:', token); // Show id google token
  }

  logOut() {
    this.authGoogleService.logout();
    this.router.navigate(['login']);
  }

  toggleModule(moduleIndex: number): void {
    // Si el módulo ya está activo, ciérralo; si no, ábrelo
    this.activeModule = this.activeModule === moduleIndex ? null : moduleIndex;
  }
}
