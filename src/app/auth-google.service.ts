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

      // Escuchar eventos de inicio de sesión
      this.oauthService.events.subscribe((e) => {
        if (e.type === 'token_received') {
          const token = this.oauthService.getIdToken();
          this.tokenSubject.next(token);
        }
      });
    }
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '821895625993-2mu2qafr7k1u3c0meuv5ht4chs5nfj6l.apps.googleusercontent.com',
      redirectUri: typeof window !== 'undefined' ? window.location.origin + '/home' : '',
      scope: 'openid profile email',
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
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
