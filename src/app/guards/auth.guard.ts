import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
        const isLoggedIn = localStorage.getItem('sessionToken'); // O cualquier otro mecanismo que uses
        if (!isLoggedIn) {
        this.router.navigate(['/login']); // Redirige al login si no está logueado
        return false;
        }
        return true;
    }
    return false;
  }
}
