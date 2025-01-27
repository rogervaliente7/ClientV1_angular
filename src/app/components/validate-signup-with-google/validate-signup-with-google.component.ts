import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-signup-with-google',
  imports: [FormsModule, CommonModule],
  templateUrl: './validate-signup-with-google.component.html',
  styleUrls: ['./validate-signup-with-google.component.css']
})
export class ValidateSignupWithGoogleComponent implements OnInit {
  jwtToken: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Verificar si estamos en un entorno de navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      // Obtener el session token desde localStorage solo si estamos en el navegador
      this.jwtToken = localStorage.getItem('sessionToken') || '';
    } else {
      console.warn('localStorage no está disponible. Asegúrate de estar en el navegador.');
    }
  }

  onSubmit(): void {
    if (!this.password) {
      this.notificationService.showError('La contraseña es obligatoria.', 'Error');
      return;
    }

    this.isLoading = true;

    // Enviar solicitud al backend para validar el usuario y asignar la contraseña
    this.apiService.validateSignupWithGoogle(this.jwtToken, this.password).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Cuenta validada y contraseña asignada correctamente.', 'Éxito');

        // Guardar la información del usuario y el session token en localStorage
        localStorage.setItem('sessionToken', response.session_token);
        localStorage.setItem('expirationTime', response.expiration_time);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Redirigir al home
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al validar y asignar la contraseña:', error);
        this.notificationService.showError('Error al validar y asignar la contraseña. Intenta nuevamente.', 'Error');
      }
    );
  }
}

// Endpoint para login con email y password
  // loginWithEmailPassword(email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiRootUrl}/login`, { email, password }).pipe(
  //     tap(response => {
  //       console.log('Respuesta recibida en ApiService:', response);
  //     })
  //   );
  // }

  // signup(nombre: string, correo: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiRootUrl}/signup`, {nombre, correo, password }).pipe(
  //     tap(response => {
  //       console.log('Respuesta recibida en ApiService:', response);
  //     })
  //   );
  // }

  // validateSignup(jwtToken: string, optCode: string): Observable<any> {
  //   const payload = { jwtToken, optCode };
  //   return this.http.patch(`${this.apiRootUrl}/signup_validate`, payload).pipe(
  //     tap(response => {
  //       console.log('Respuesta recibida en ApiService:', response);
  //     })
  //   );
  // }
  
  // loginWithGoogle(token: string): Observable<any> {
  //   return this.http.post(this.apiUrl, {}, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   }).pipe(
  //     tap(response => {
  //       console.log('Logwithgoogle Respuesta recibida en ApiService:', response);
  //     })
  //   );
  // }
  
  // validateSignupWithGoogle(jwtToken: string, password: string): Observable<any> {
  //   return this.http.patch(`${this.apiRootUrl}/google/signup_validate`, { password }, {
  //     headers: { Authorization: `Bearer ${jwtToken}` },
  //   }).pipe(
  //     tap(response => {
  //       console.log('Respuesta al validar signup:', response);
  //     })
  //   );
  // }