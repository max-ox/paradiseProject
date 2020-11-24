import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { User} from '../user/user.model';
import {Subscription, Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  currentUser: User;
  constructor(
    public router: Router,
    private userService: UserService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    // this.userService.getCurrentUser()
      // .subscribe(heroes => this.currentUser = heroes)
    this.subscription = this.userService.getCurrentUser().subscribe(msg => this.currentUser = msg);
    // console.log('header this.currentUser', this.currentUser)
  }

  goTo(url) {
    this.router.navigate([url]);
  }

}
