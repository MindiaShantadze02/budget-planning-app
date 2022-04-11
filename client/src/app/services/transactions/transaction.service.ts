import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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

  createTransaction(accountId: string, transaction: any) {
    return this.http.post(`${this.apiUrl}/${accountId}`, transaction, httpOptions);
  }

  getTransaction(accountId: string, transactionId: string) {
    return this.http.get(`${this.apiUrl}/${accountId}/${transactionId}`);
  }

  updateTransaction(accountId: string, transactionId: string, updatedTransaction: any) {
    return this.http.post(`${this.apiUrl}/${accountId}/${transactionId}`, updatedTransaction, httpOptions);
  }

  deleteTransaction(accountId: string, transactionId: string) {
    return this.http.delete(`${this.apiUrl}/${accountId}/${transactionId}`);
  }
}
