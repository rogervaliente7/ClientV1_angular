// redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si `window` está disponible (solo en el navegador)
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('sessionToken'); // O cualquier otro mecanismo que uses
      if (isLoggedIn) {
        this.router.navigate(['/home']); // Redirige al home si está logueado
        return false;  // Bloquea el acceso a la ruta actual (login/signup)
      }
    }
    return true; // Permite el acceso si no está logueado
  }
}

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class RedirectGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const isLoggedIn = localStorage.getItem('sessionToken'); // O cualquier otro mecanismo que uses
//     if (isLoggedIn) {
//       this.router.navigate(['/home']); // Redirige al home si ya está logueado
//       return false;
//     }
//     return true;
//   }
// }
