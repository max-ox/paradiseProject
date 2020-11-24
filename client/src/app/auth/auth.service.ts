import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private userService: UserService,
  ) {
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `/api/registration`;
    return this.http.post(api, {user})
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`/api/auth/login`, user)
      .subscribe((res: any) => {
        this.userService.setCurrentUser(res);
        localStorage.setItem('saved', new Date().getTime().toString())
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('userId', res.userId)
        this.router.navigate(['/profile/' + res.userId]);
      })
  }

  signInVK() {
    window.open('/api/auth/vkontakte',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      if(message && message.data && message.data.user) {
        const user = message.data.user;
        this.userService.setCurrentUser(user);
        localStorage.setItem('access_token', user._id)
        localStorage.setItem('userId', user.userId)
        this.router.navigate(['/profile/' + user.nickname]);
      }
    });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let api = `/api/auth/logout`;
    this.http.get(api)
      .subscribe(value =>{},
        error => {
          this.handleError(error);
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
    const header = this.headers.append('Authorization', `Bearer ${this.getToken()}`);

    return this.http.get(api, {headers: header})
      .pipe(
      map((res: Response) => {
        console.log('getUserProfile res, ', res)
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // this.doLogout();
    return throwError(msg);
  }
}
