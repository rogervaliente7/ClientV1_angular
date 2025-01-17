import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  correo: string = '';
  password: string = '';
  nombre: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {}

  onSubmit(): void {
    this.isLoading = true;
  
    this.apiService.signup(this.nombre, this.correo, this.password).subscribe(
      (response: any) => {
        console.log('Respuesta recibida:', response);
  
        if (response.token) {
          // Guardar token y usuario en localStorage
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
  
          // Redirigir al componente de autenticación
          this.router.navigate(['/authenticating']);
        } else {
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

  // onSubmit(): void {
  //   this.isLoading = true;

  //   // Llamar al servicio para hacer la solicitud de login
  //   // Llamamos al servicio ApiService para hacer login con correo y password
  //   this.apiService.signup(this.nombre, this.correo, this.password).subscribe(
  //     (response: any) => {
  //       console.log('Respuesta recibida:', response);

  //       if (response.token) {
  //         // Guardar el token y el usuario en el estado de navegación
  //         // this.router.navigate(['/home'], { state: { message: response.message, user: response.user, token: response.token, } });
  //         this.router.navigate(['/authenticating'], { state: { token: response.token, user: response.user } });
  //       } else {
  //         // Si no se recibe token, mostrar error
  //         this.notificationService.showError('Error al iniciar sesión. Intenta nuevamente.', 'Error');
  //       }
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       console.error('Error en la autenticación', error);
  //       this.notificationService.showError('Error al iniciar sesión. Intenta nuevamente.', 'Error');
  //     }
  //   );
  // }
}
