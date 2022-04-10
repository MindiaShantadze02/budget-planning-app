import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8000/transactions';

  constructor(
    private http: HttpClient
  ) { }

  getTransactions(accountId: string) {
    return this.http.get(`${this.apiUrl}/${accountId}`);
  }
}
