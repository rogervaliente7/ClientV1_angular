import { Component } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
      private authGoogleService: AuthGoogleService,
      private router: Router
  ) {}

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

}
