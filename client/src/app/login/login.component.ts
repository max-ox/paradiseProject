import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})
export class LoginComponent {
  public user: User;

  constructor(private loginService: LoginService) {
    this.user = new User();
  }

  validateLogin() {
    if(this.user.email && this.user.password) {
      this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        this.loginService.getProfile(result).subscribe(result => {
          console.log('result is ', result);
        }, error => {
          console.log('error is ', error);
        });
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('enter email and password');
    }
  }

}
