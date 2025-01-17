import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticatingComponent } from './components/authenticating/authenticating.component';
import { AuthWithGoogleComponent } from './components/auth-with-google/auth-with-google.component';
import { ValidateSignupWithGoogleComponent } from './components/validate-signup-with-google/validate-signup-with-google.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'}, // Ruta raíz
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'home', component: HomeComponent},
    {path: 'authenticating', component: AuthenticatingComponent },
    {path: 'auth-with-google', component: AuthWithGoogleComponent},
    {path: 'register-password', component: ValidateSignupWithGoogleComponent}
];