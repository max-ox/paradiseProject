import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faction } from '../models/faction.model';
import {Observable} from "rxjs";

@Injectable()
export class FactionService {

  constructor(private http: HttpClient){}

  getFactions(): Observable<any>{
    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })
    return this.http.get('/api/faction', { headers: headers })
  }

}
