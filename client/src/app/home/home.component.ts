import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { User } from '../user/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentUser: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.subscription = this.authService.currentUserValueSubscribe().subscribe(msg => this.currentUser = msg);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }

}
