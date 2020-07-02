import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})
export class LoginComponent {
  public user: User;
  public currentUser = {};

  constructor(
    private loginService: LoginService,
    public router: Router,
    public authService: AuthService,
  ) {
    this.user = new User();
  }

  validateLogin() {
    if(this.user.email && this.user.password) {
      this.authService.signIn(this.user);
    } else {
      alert('enter email and password');
    }
  }

  vkLogin() {
    this.authService.vkLogin();
  }

}
