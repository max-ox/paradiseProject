import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){}

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
}
