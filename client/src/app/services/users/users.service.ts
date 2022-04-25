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

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: string):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  getMe():Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }
}
