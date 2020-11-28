import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {
  constructor(
    private http: HttpClient,
  ){};

  public updateUser(user) : any{

    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })
    let api = `/api/user`;
    return this.http.put(api, {user}, {headers})
  }

}
