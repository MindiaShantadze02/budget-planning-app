import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/interfaces/Transaction';

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

  transactions$ = new BehaviorSubject<Transaction[]>([]);

  getTransactions(accountId: string):Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}`);
  }

  getAllTransactions():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  createTransaction(accountId: string, transaction: Transaction):Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${accountId}`, transaction, httpOptions);
  } 

  getTransaction(accountId: string, transactionId: string):Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${accountId}/${transactionId}`);
  }

  updateTransaction(accountId: string, transactionId: string, updatedTransaction: Transaction):Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/${accountId}/${transactionId}`,
      updatedTransaction,
      httpOptions
    );
  }

  deleteTransaction(accountId: string, transactionId: string):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${accountId}/${transactionId}`);
  }
}
