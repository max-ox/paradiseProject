import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient){

  }

  validateLogin(user: User){
    return this.http.post('/api/auth/login',{
      username : user.username,
      password : user.password
    })
  }

  getProfile(result){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${result.auth_token}`
    })
    return this.http.get('/api/profile', { headers: headers })
  }

}
