import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Faction } from '../models/faction.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){}

  public updateUser(user) : any{

    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })
    let api = `/api/user`;
    return this.http.put(api, {user}, {headers})
      // .subscribe(
      //   (response) => {                           //Next callback
      //     console.log('response received', response)
      //     return response;
      //   },
      //   (error) => {                              //Error callback
      //     console.error('error caught in component', error)
      //     return error;
      //     // this.loading = false;
      //
      //     //throw error;   //You can also throw the error to a global error handler
      //   }
      // )
    // return result;
      // .pipe(
      // map((res: Response) => {
      //   console.log('updateUserProfile res, ', res)
      //   return res || {}
      // },
      //   (err: Response) => {
      //     console.log('updateUserProfile err, ', err)
      //     return err || {}
      //   }),

      // catchError(this.handleError)
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
