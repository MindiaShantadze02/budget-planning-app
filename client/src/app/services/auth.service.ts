import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  apiUrl: string = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  register(user: object) {
    this.http.post<object>(`${this.apiUrl}/users/register`, user, httpOptions)
    .subscribe(res => this.router.navigateByUrl('/login'));
  }

  login(user: object) {
    this.http.post<object>(`${this.apiUrl}/users/login`, user, httpOptions)
    .subscribe(res => console.log(res));
  }
}
