import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faction } from '../models/faction.model';

@Injectable()
export class FactionService {

  constructor(private http: HttpClient){}

  getFactions(){
    return this.http.get('/factions')
  }

}
