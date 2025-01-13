import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authGoogleService: AuthGoogleService, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    console.log('Login process started');
    this.authGoogleService.login();

    // Suscribirse al Observable para obtener el token
    this.authGoogleService.getTokenObservable().subscribe({
      next: (googleToken) => {
        if (googleToken) {
          console.log('Token de Google obtenido:', googleToken);

          // Enviar el token al backend
          this.apiService.loginWithGoogle(googleToken).subscribe({
            next: (response) => {
              console.log('Respuesta del backend:', response);
              alert('Inicio de sesión exitoso');
            },
            error: (error) => {
              console.error('Error al iniciar sesión:', error);
              alert('Error al iniciar sesión');
            }
          });
        } else {
          console.error('No se pudo obtener el token de Google');
          alert('No se pudo obtener el token de Google');
        }
      },
      error: (err) => console.error('Error al obtener el token', err),
    });
  }
}
