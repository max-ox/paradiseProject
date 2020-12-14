import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: String;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.authService.checkServerSession()
      .subscribe(
        res => {
          console.log('ers', res);
          this.authService.currentUser.subscribe(x => this.currentUser = x);
        }
      )
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }

}


