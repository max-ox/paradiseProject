import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient){}

  registration(user: User){
    return this.http.post('/api/registration',{user})
  }
}
