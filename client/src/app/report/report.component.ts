import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../user/user.model';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  subscription: Subscription;
  currentUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

}
