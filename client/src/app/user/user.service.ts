import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subject, Observable, throwError} from 'rxjs';
import {User} from './user.model';
import {HelpersService} from '../_helpers/helpers.service';
import {catchError, map} from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {
  private _currentUser = new Subject<User>();
  private _currentUserNickname: string;
  constructor(private http: HttpClient,
              private helpersService: HelpersService
  ){
    if(!this._currentUserNickname) {
      this.getUserProfile()
      //   .subscribe(res => {
      //   // return this._currentUser.asObservable();
      // })
    }
  };
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public updateUser(user) : any{

    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })
    let api = `/api/user`;
    return this.http.put(api, {user}, {headers})
  }

  // Error
  // handleError(error: HttpErrorResponse) {
  //   let msg = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     msg = error.error.message;
  //   } else {
  //     // server-side error
  //     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(msg);
  // }


  public getCurrentUser(): Observable<User> {
    console.log('this._currentUser', this._currentUser.asObservable());
    if(this._currentUserNickname || this._currentUserNickname != '') {
      return this._currentUser.asObservable();
    } else {
      this.getUserProfile().subscribe(res => {
        return this._currentUser.asObservable();
      })
    }
  }
  /*
   * @param {string} message : siblingMsg
   */
  public setCurrentUser(user: User): void {
    this._currentUserNickname = user.nickname;
    this._currentUser.next(user);
  }

  // User profile
  getUserProfile(): any {
    const userID = this.helpersService.getToken();
    let api = `/api/user`;
    if(!userID) {
      return;
    }
    const header = this.headers.append('Authorization', `Bearer ${userID}`);

    this.http.get(api, {headers: header, params: {
        _id: userID
      },})
      .pipe(
        map((res: Response) => {
          console.log('getUserProfile res, ', res)
          let user = new User(res);

          // user = res.user;
          this.setCurrentUser(user);
        }),
        catchError(this.helpersService.handleError)
      )
  }
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
