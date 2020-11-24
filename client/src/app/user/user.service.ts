import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subject, Observable, throwError} from 'rxjs';
import {User} from './user.model';
// import {AuthService} from '../auth/auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {
  // private siblingMsg = new Subject<string>();

  private _currentUser = new Subject<User>();
  constructor(private http: HttpClient,
              // private authService: AuthService
  ){};
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public updateUser(user) : any{

    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })
    let api = `/api/user`;
    return this.http.put(api, {user}, {headers})
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


  public getCurrentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public setCurrentUser(user: User): void {
    this._currentUser.next(user);
  }

  // getCurrentUser(): User {
  //   if(!this._currentUser.nickname) {
  //
  //   }
  //   return this._currentUser;
  // }

  // setCurrentUser(user) {
  //   this._currentUser = user;
  // }


  // User profile
  // getUserProfile(): any {
  //   const userID = this.authService.getToken();
  //   let api = `/api/user/${userID}`;
  //   const header = this.headers.append('Authorization', `Bearer ${userID}`);
  //
  //   return this.http.get(api, {headers: header, })
  //     .pipe(
  //       map((res: Response) => {
  //         console.log('getUserProfile res, ', res)
  //         return res || {}
  //       }),
  //       catchError(this.handleError)
  //     )
  // }
}


// import { Injectable } from '@angular/core';
// import { Subject, Observable } from 'rxjs';
// @Injectable()
// export class MessageService {
//   private siblingMsg = new Subject<string>();
//   constructor() { }
//   /*
//    * @return {Observable<string>} : siblingMsg
//    */
//   public getMessage(): Observable<string> {
//     return this.siblingMsg.asObservable();
//   }
//   /*
//    * @param {string} message : siblingMsg
//    */
//   public updateMessage(message: string): void {
//     this.siblingMsg.next(message);
//   }
// }
