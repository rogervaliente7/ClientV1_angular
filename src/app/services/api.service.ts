import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5016/api/auth/google';

  constructor(private http: HttpClient) {}

  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(this.apiUrl, {}, { 
      headers: { Authorization: `Bearer ${token}` }
    });
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
