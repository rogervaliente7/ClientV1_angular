import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string = '';
  password: string = '';
  isLoading: boolean = false; 

  constructor(
    private authGoogleService: AuthGoogleService, 
    private apiService: ApiService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  login(): void {
    // console.log('Inicio de sesión con Google iniciado');
    // this.authGoogleService.login();
  
    // Escucha los cambios en el token
    // this.authGoogleService.getTokenObservable().subscribe({
    //   next: (googleToken) => {
    //     if (googleToken) {
    //       console.log('Token de Google obtenido:', googleToken);
  
    //       // Enviar el token al backend
    //       this.apiService.loginWithGoogle(googleToken).subscribe({
    //         next: (response) => {
    //           console.log('Respuesta del backend:', response); // Ver la respuesta cruda
          
    //           // Agrega un log para ver si response.valid existe y es true/false
    //           if (response) {
    //             console.log('¿La respuesta es válida?:', response.valid ? 'true' : 'false');
    //           }
          
    //           if (response && response.valid) {
    //             alert('Inicio de sesión exitoso');
    //             this.router.navigate(['/home']); // Redirige solo si la respuesta es válida
    //           } else {
    //             alert('Token no válido. Intente nuevamente.');
    //           }
    //         },
    //         error: (error) => {
    //           console.error('Error al enviar el token al backend:', error);
    //           alert('Error al iniciar sesión');
    //         },
    //       });
          
    //     } else {
    //       console.error('No se pudo obtener el token de Google');
    //     }
    //   },
    //   error: (err) => console.error('Error al observar el token de Google', err),
    // });
  }

  onSubmit(): void {
    this.isLoading = true;
    const loginData = { email: this.email, password: this.password };

    // Llamar al servicio para hacer la solicitud de login
    // Llamamos al servicio ApiService para hacer login con email y password
    this.apiService.loginWithEmailPassword(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Respuesta recibida:', response);

        if (response.token) {
          // Guardar el token y el usuario en el estado de navegación
          this.router.navigate(['/authenticating'], { state: { user: response.user, token: response.token } });
        } else {
          // Si no se recibe token, mostrar error
          this.notificationService.showError('Error al iniciar sesión. Intenta nuevamente.', 'Error');
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error en la autenticación', error);
        this.notificationService.showError('Error al iniciar sesión. Intenta nuevamente.', 'Error');
      }
    );
  }

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
