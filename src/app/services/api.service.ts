import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5016/api/auth/google';
  private apiRootUrl = 'http://localhost:5016/api/auth';

  constructor(private http: HttpClient) {}

  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(this.apiUrl, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      tap(response => {
        console.log('Respuesta recibida en ApiService:', response);
      })
    );
  }

  // Endpoint para login con email y password
  loginWithEmailPassword(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiRootUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Respuesta recibida en ApiService:', response);
      })
    );
  }

  signup(nombre: string, correo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiRootUrl}/signup`, {nombre, correo, password }).pipe(
      tap(response => {
        console.log('Respuesta recibida en ApiService:', response);
      })
    );
  }

  validateSignup(jwtToken: string, optCode: string): Observable<any> {
    const payload = { jwtToken, optCode };
    return this.http.patch(`${this.apiRootUrl}/signup_validate`, payload).pipe(
      tap(response => {
        console.log('Respuesta recibida en ApiService:', response);
      })
    );
  }

  validateSignupWithGoogle(jwtToken: string, password: string): Observable<any> {
    const payload = {
      jwtToken, // Incluye el token JWT
      password  // Incluye la contraseña
    };
  
    return this.http.patch(`${this.apiRootUrl}/google/signup_validate`, payload).pipe(
      tap(response => {
        console.log('Respuesta al validar signup:', response);
      })
    );
  }
}


// api.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor(private http: HttpClient) {}

//   loginWithGoogle(token: string): Observable<any> {
//     // Crea el encabezado con el token
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     // Realiza la solicitud POST enviando el token en los encabezados
//     return this.http.post('http://localhost:5016/api/auth/google', {}, { headers });
//   }
// }
