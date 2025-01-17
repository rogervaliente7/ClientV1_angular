import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticating',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authenticating.component.html',
  styleUrls: ['./authenticating.component.css']
})
export class AuthenticatingComponent implements OnInit {

  jwtToken: string = '';
  optCode: string = '';
  userName: string = ''; // Para mostrar el nombre del usuario
  isLoading: boolean = false;
  showOptCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
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
      this.router.navigate(['/signup']);
    }
  }  

  validateSignup(): void {
    this.isLoading = true;
  
    this.apiService.validateSignup(this.jwtToken, this.optCode).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Cuenta validada correctamente', 'Éxito');
  
        // Guardar el session token y el expiration time en localStorage
        localStorage.setItem('sessionToken', response.session_token);
        localStorage.setItem('expirationTime', response.expiration_time);
  
        // Actualizar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
  
        console.log()
        // Redirigir al home
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
  // ngOnInit(): void {
  //   // Recuperar los datos del estado de navegación
  //   const navigation = this.router.getCurrentNavigation();
  //   const state = navigation?.extras.state as { token: string; user: { name: string; opt_code: string } };
    
  //   console.log('state: ' + state);
  //   console.log('navigation: ' + navigation);

  //   if (state) {
  //     this.jwtToken = state.token;
  //     this.userName = state.user.name;
  //     this.optCode = state.user.opt_code; // Mostrar este código al usuario
  //   } else {
  //     // Si no hay datos, redirigir al registro
  //     console.log('no hay datos');
  //     this.router.navigate(['/signup']);
  //   }
  // }

  // validateSignup(): void {
  //   this.isLoading = true;

  //   // Enviar la solicitud de validación
  //   this.apiService.validateSignup(this.jwtToken, this.optCode).subscribe(
  //     (response: any) => {
  //       this.isLoading = false;
  //       this.notificationService.showSuccess('Cuenta validada correctamente', 'Éxito');
  //       this.router.navigate(['/home'], { state: { user: response.user } }); // Redirigir al home
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       console.error('Error en la validación:', error);
  //       this.notificationService.showError('Error al validar el código. Intenta nuevamente.', 'Error');
  //     }
  //   );
  // }

