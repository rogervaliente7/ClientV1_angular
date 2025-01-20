import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
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
    console.log('Inicio de sesión con Google iniciado');
    this.authGoogleService.login();
  }

  onSubmit(): void {
    this.isLoading = true;
    const loginData = { email: this.email, password: this.password };

    // Llamar al servicio para hacer la solicitud de login
    // Llamamos al servicio ApiService para hacer login con email y password
    this.apiService.loginWithEmailPassword(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Respuesta recibida');

        if (response.session_token) {
          // Guardar el token en localStorage para mantener la sesión activa
          localStorage.setItem('sessionToken', response.session_token);

          // Guardar también el usuario si es necesario
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/home'], { state: { user: response.user, token: response.session_token } });
        } else {
          // Si no se recibe token, mostrar error
          console.log(response);
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
