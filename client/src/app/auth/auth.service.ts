import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { HelpersService } from '../_helpers/helpers.service';
import {Observable, BehaviorSubject, throwError, Subject} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    public router: Router,
    private userService: UserService,
    private helpersService: HelpersService
  ) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public currentUserValueSubscribe(): Observable<User> {
    return this.currentUserSubject;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `/api/registration`;
    return this.http.post(api, {user})
      .pipe(
        catchError(this.helpersService.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`/api/auth/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('saved', new Date().getTime().toString())
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        localStorage.setItem('access_token', res.access_token)
        this.router.navigate(['/profile/' + res.nickname]);
      })
  }

  signInVK() {
    window.open('/api/auth/vkontakte',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      if(message && message.data && message.data.user) {
        const user = message.data.user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        localStorage.setItem('access_token', user._id)
        // return user;

        this.router.navigate(['/profile/' + user.nickname]);
      }
    });
  }

  doLogout() {
    let api = `/api/auth/logout`;
    this.http.get(api)
      .subscribe(value =>{},
        error => {
          this.helpersService.handleError(error);
          // error - объект ошибки
        });
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['sign-in']);
    }
  }

  // User profile
  getUserProfile(nickname): any {
    let api = `/api/user/${nickname}`;
    const header = this.headers.append('Authorization', `Bearer ${this.helpersService.getToken()}`);

    return this.http.get(api, {headers: header})
      .pipe(
      map((res: Response) => {
        console.log('getUserProfile res, ', res)
        return res || {}
      }),
      catchError(this.helpersService.handleError)
    )
  }

}
