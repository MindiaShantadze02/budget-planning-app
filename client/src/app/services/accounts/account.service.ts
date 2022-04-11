import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';

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

  public accounts: any = [];
  public currentAccount: any = {};

  constructor(
    private http: HttpClient
  ) { }

  getAccounts() {
    return this.http.get(`${this.apiUrl}/accounts`).pipe(
      tap((res: any) => {
        this.accounts = res.data;
      })
    );
  }

  createAccount(account: any) {
    return this.http.post(`${this.apiUrl}/accounts`, account, httpOptions);
  }

  getAccount(accountId: string) {
    return this.http.get(`${this.apiUrl}/accounts/${accountId}`);
  }

  deleteAccount(accountId: string) {
    return this.http.delete(`${this.apiUrl}/accounts/${accountId}`);
  }

  updateAccount(accountId: string, updatedAccount: any) {
    return this.http.put(`${this.apiUrl}/accounts/${accountId}`, updatedAccount, httpOptions);
  }

  getAvailableAmount(id: string):Observable<object> {
    return this.http.get(`${this.apiUrl}/accounts/${id}/available-amount`);
  }
}
