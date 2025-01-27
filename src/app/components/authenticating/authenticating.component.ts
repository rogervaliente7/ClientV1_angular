import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-authenticating',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOtpInputModule],
  templateUrl: './authenticating.component.html',
  styleUrls: ['./authenticating.component.css']
})
export class AuthenticatingComponent implements OnInit {

  jwtToken: string = '';
  optCode: string = '';
  userName: string = ''; // Para mostrar el nombre del usuario
  isLoading: boolean = false;
  showOptCode: string = '';
  otpArray: string[] = ['','','','','',''];
  optCodeTouched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Recuperar los datos del localStorage
      const token = localStorage.getItem('jwtToken');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.jwtToken = token;
        const userObj = JSON.parse(user);
        this.userName = userObj.name;
        this.showOptCode = userObj.opt_code; // Mostrar el código OTP al usuario
      } else {
        // Si no hay datos, redirigir al registro
        console.log('No hay datos en localStorage');
        //this.router.navigate(['/signup']);
      }
    } else {
      console.warn('localStorage no está disponible. Asegúrate de estar en el navegador.');
    }
    
  }
  
  onOtpInputChange(event: any): void {
    this.optCodeTouched = true; // Marcar como tocado cuando se cambie el código
  }

  validateSignup(): void {
    if (this.optCode.length === 6) {
      this.isLoading = true;
      this.apiService.validateSignup(this.jwtToken, this.optCode).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.notificationService.showSuccess('Cuenta validada correctamente', 'Éxito');
          localStorage.setItem('sessionToken', response.session_token);
          localStorage.setItem('expirationTime', response.expiration_time);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isLoading = false;
          console.error('Error en la validación:', error);
          this.notificationService.showError('Error al validar el código. Intenta nuevamente.', error);
        }
      );
    }
  }
   
}
