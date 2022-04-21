import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, pipe, tap } from 'rxjs';
import { Account } from 'src/app/interfaces/Account';

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

  currentAccount$: BehaviorSubject<string> = new BehaviorSubject('');
  accounts$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) { }

  getAccounts():Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
  }

  createAccount(account: Account):Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/accounts`, account, httpOptions);
  }

  getAccount(accountId: string):Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/accounts/${accountId}`);
  }

  deleteAccount(accountId: string):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/accounts/${accountId}`);
  }

  updateAccount(accountId: string, updatedAccount: Account):Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/accounts/${accountId}`, updatedAccount, httpOptions);
  }

  getAvailableAmount(id: string):Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/accounts/${id}/available-amount`);
  }
}
