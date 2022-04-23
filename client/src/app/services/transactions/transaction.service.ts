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

  getTransactions(accountId: string, params?: any):Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}`, {
      params: {
        sort: params.sort
      }
    });
  }

  getAllTransactions():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  createTransaction(accountId: string, transaction: Transaction):Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${accountId}`, transaction, httpOptions);
  } 

  getTransaction(transactionId: string):Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/transaction/${transactionId}`);
  }

  updateTransaction(transactionId: string, updatedTransaction: Transaction):Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.apiUrl}/transaction/${transactionId}`,
      updatedTransaction,
      httpOptions
    );
  }

  deleteTransaction(transactionId: string):Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/transaction/${transactionId}`);
  }
}
