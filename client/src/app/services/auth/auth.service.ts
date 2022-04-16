import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private router: Router
    ) { }

  register(user: object) {
    return this.http.post(`${this.apiUrl}/users/register`, user, httpOptions);
  }

  login(user: object):Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, user, httpOptions)
    .pipe(
      tap((token: string) => {
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.router.navigateByUrl('login');
  }

  isLoggedIn():boolean {
    const token: string = localStorage.getItem('token') || '';

    if (token) {
      return true;
    }

    return false;
  }

  getToken():string {
    return localStorage.getItem('token') || '';
  }
  
  public isAdmin():boolean {
    const token: string = localStorage.getItem('token') || '';
    const user = JSON.parse(atob(token.split('.')[1]));

    return user.role.toLowerCase() === 'admin';
  }
}
