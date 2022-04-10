import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient
  ) { }

  getAccounts() {
    return this.http.get(`${this.apiUrl}/accounts`);
  }

  createAccount(account: any) {
    return this.http.post(`${this.apiUrl}/accounts`, account, httpOptions);
  }

  getAvailableAmount(id: string):Observable<object> {
    return this.http.get(`${this.apiUrl}/accounts/${id}/available-amount`);
  }
}
