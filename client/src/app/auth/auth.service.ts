import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
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
    public router: Router
  ) {
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
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('userId', res.userId)
        this.router.navigate(['/profile/' + res.userId]);
        // this.getUserProfile(res.userId).subscribe((res) => {
        //   console.log('res', res)
        //   if(res && res.user) {
        //     this.currentUser = res.user;
        //
        //   }
        // })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `/api/profile/${id}`;
    const header = this.headers.append('Authorization', `Bearer ${this.getToken()}`);

    return this.http.get(api, { headers: header }).pipe(
      map((res: Response) => {
        console.log('getUserProfile res, ', res)
        return res || {}
      }),
      catchError(this.handleError)
    )


    // return this.http.get(api, { headers: this.headers }).pipe(
    //   map((res: Response) => {
    //     return res || {}
    //   }),
    //   catchError(this.handleError)
    // )
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
    return throwError(msg);
  }
}
