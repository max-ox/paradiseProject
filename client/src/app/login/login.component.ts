import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [  ]
})
export class LoginComponent {
  public user: User;
  public currentUser = {};

  constructor(
    public router: Router,
    public authService: AuthService,
  ) {
    this.user = new User();
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  validateLogin() {
    if(this.user.email && this.user.password) {
      this.authService.signIn(this.user);
    } else {
      alert('enter email and password');
    }
  }

  loginVK() {
    this.authService.signInVK()
  }

}
