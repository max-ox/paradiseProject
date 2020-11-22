import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faction } from '../models/faction.model';
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(private http: HttpClient){}

  updateUser(user): Observable<any>{
    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })
    return this.http.put('/api/user', { data: user }, {headers: headers})
  }

}
