import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-auth-with-google',
  templateUrl: './auth-with-google.component.html',
  styleUrls: ['./auth-with-google.component.css']
})
export class AuthWithGoogleComponent implements OnInit {
  isLoading = true;

  constructor(
    private authGoogleService: AuthGoogleService,
    private apiService: ApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authGoogleService.getTokenObservable()
      .pipe(
        filter((token): token is string => token !== null), // Ignorar valores null
        take(1) // Solo tomar la primera emisión válida
      )
      .subscribe(
        (token) => {
          console.log('Token obtenido (único):', token);
          this.performLogin(token);
        },
        (error) => {
          console.error('Error en la suscripción al token:', error);
          this.notificationService.showError('Error al obtener el token.', 'Error');
        }
      );
  }

  private performLogin(token: string): void {
    this.apiService.loginWithGoogle(token).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Respuesta recibida en el backend:', response);

        // Guardar datos en localStorage
        localStorage.setItem('sessionToken', response.token);
        localStorage.setItem('expirationTime', response.expiration_time);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Redirigir
        this.router.navigate(['/register-password']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al autenticar con Google:', error);
        this.notificationService.showError('Error al autenticar con Google. Intenta nuevamente.', error);
      }
    );
  }

  getData() {
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


// import { Component, OnInit } from '@angular/core';
// import { AuthGoogleService } from '../../auth-google.service';
// import { ApiService } from '../../services/api.service';
// import { Router } from '@angular/router';
// import { NotificationService } from '../../services/notification.service';

// @Component({
//   selector: 'app-auth-with-google',
//   templateUrl: './auth-with-google.component.html',
//   styleUrls: ['./auth-with-google.component.css']
// })
// export class AuthWithGoogleComponent implements OnInit {
//   isLoading = true;

//   constructor(
//     private authGoogleService: AuthGoogleService,
//     private apiService: ApiService,
//     private router: Router,
//     private notificationService: NotificationService
//   ) {}

//   ngOnInit(): void {
//     const token = this.authGoogleService.getGoogleToken();

//     if (token) {
//       this.apiService.loginWithGoogle(token).subscribe(
//         (response: any) => {
//           this.isLoading = false;
//           console.log('Respuesta recibida en el backend:', response);

//           // Guardar el token recibido del backend en localStorage
//           localStorage.setItem('sessionToken', response.token);
//           localStorage.setItem('expirationTime', response.expiration_time);
//           localStorage.setItem('user', JSON.stringify(response.user));

//           // Redirigir al componente de validación de contraseña
//           this.router.navigate(['/validate-signup-with-google']);
//         },
//         (error) => {
//           this.isLoading = false;
//           console.error('Error al autenticar con Google:', error);
//           this.notificationService.showError('Error al autenticar con Google. Intenta nuevamente.', error);
//         }
//       );
//     } else {
//       this.isLoading = false;
//       this.notificationService.showError('No se pudo obtener el token de Google.', 'Error');
//     }
//   }
// }
