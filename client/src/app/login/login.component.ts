import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

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
    public router: Router
  ) {
    this.user = new User();
  }

  validateLogin() {
    if(this.user.email && this.user.password) {
      this.loginService.validateLogin(this.user).subscribe(res => {
        console.log('validateLogin res', res)
        // localStorage.setItem('access_token', res.access_token)
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['user-profile/' + res.msg._id]);
        // })
        this.loginService.getProfile(res).subscribe(res => {
          console.log('getProfile res', res)
          this.currentUser = res;
          // this.router.navigate(['user-profile/' + res._id]);
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
