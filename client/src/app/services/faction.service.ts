import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faction } from '../models/faction.model';

@Injectable()
export class FactionService {

  constructor(private http: HttpClient){}

  getFactions(){
    const headers = new HttpHeaders({
      'Cache-Control' : 'no-cache, no-store, must-revalidate'
    })

    console.log('headers', headers)
    return this.http.get('/api/factions', { headers: headers })
  }

}
