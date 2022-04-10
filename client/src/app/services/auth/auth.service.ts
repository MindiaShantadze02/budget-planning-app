import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageResponse } from '../../interfaces/MessageResponse';
import { tap } from 'rxjs';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8000';

  constructor(
    private http: HttpClient
    ) { }

  register(user: object) {
    return this.http.post<MessageResponse>(`${this.apiUrl}/users/register`, user, httpOptions);
  }

  login(user: object) {
    return this.http.post<any>(`${this.apiUrl}/users/login`, user, httpOptions)
    .pipe(
      tap(res => {
        if (res.token) {
          const expiresAt = moment().add(res.expiresIn, 'second');

          localStorage.setItem('token', res.token);
          localStorage.setItem('expiresIn', JSON.stringify(expiresAt.valueOf()));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }

  isLoggedIn() {
    const token: string = localStorage.getItem('token') || '';

    return token ? true : false;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
  
  isAdmin():boolean {
    const token: string = localStorage.getItem('token') || '';
    const user = JSON.parse(atob(token.split('.')[1]));

    return user.role.toLowerCase() === 'admin';
  }
}
