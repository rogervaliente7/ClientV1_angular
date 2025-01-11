import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../auth-google.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor(private authGoogleService: AuthGoogleService){}

  ngOnInit(): void {
  }

  hideShowPass(){
  }

  login() {
    this.authGoogleService.login();
  }
}
