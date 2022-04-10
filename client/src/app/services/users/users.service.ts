import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = 'http://localhost:8000/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  getMe() {
    return this.http.get(`${this.apiUrl}/me`);
  }
}
