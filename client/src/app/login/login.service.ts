import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient){}

  validateLogin(user: User){
    return this.http.post('/api/auth/login',{
      email : user.email,
      password : user.password
    })
  }

  getProfile(result){
    console.log('result.auth_token}', result.access_token)
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${result.access_token}`
    })

    console.log('headers', headers)
    return this.http.get('/api/profile', { headers: headers })
  }

}
