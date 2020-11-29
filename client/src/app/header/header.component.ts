import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { User} from '../user/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
    this.subscription = this.authService.currentUserValueSubscribe().subscribe(msg => this.currentUser = msg);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  goTo(url) {
    console.log(url)
    this.router.navigate([url]);
  }

}
