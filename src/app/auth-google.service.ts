import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private oauthService: OAuthService) {
    if (typeof window !== 'undefined') {
      this.initLogin();

      this.oauthService.events.subscribe((e) => {
        if (e.type === 'token_received') {
          const token = this.oauthService.getIdToken();
          console.log('Token recibido del evento:', token);
          this.tokenSubject.next(token); // Emite el token cuando se reciba
        }
      });
    }
  }

  async initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '821895625993-2mu2qafr7k1u3c0meuv5ht4chs5nfj6l.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/auth-with-google',
      scope: 'openid profile email',
    };

    this.oauthService.configure(config);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    if (this.oauthService.hasValidIdToken()) {
      const token = this.oauthService.getIdToken();
      console.log('Token detectado al inicializar:', token);
      this.tokenSubject.next(token); // Emite el token si ya está disponible
    }
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.tokenSubject.next(null);
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  getGoogleToken(): string {
    return this.oauthService.getIdToken();
  }

  // Observable para obtener el token cuando esté listo
  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
