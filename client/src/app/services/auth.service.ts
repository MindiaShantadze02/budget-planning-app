import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageResponse } from '../interfaces/MessageResponse';

import { tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  register(user: object) {
    return this.http.post<MessageResponse>(`${this.apiUrl}/users/register`, user, httpOptions);
  }

  login(user: object) {
    return this.http.post<any>(`${this.apiUrl}/users/login`, user, httpOptions)
    .pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('expiresIn', res.expiresIn);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
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
