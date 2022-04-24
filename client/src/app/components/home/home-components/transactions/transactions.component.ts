import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/interfaces/Transaction';
import { AccountService } from 'src/app/services/accounts/account.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  accountId: string = '';
  sortBy = '-transactionDate';
  searchForm:FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required])
  });
  message = '';

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
    this.route.params.subscribe((params: Params) => {
      this.accountId = params['id'];
      
      this.accountService.currentAccount$.next(params['id']);
      
      if (this.accountId) {
        this.transactionService.getTransactions(this.accountId, {
          sort: this.sortBy,
          title: this.searchForm.value.title
        }).subscribe((transactions: Transaction[]) => {
          this.transactionService.transactions$.next(transactions);
        });
      } else {
        this.message = 'Please select an account';
      }
    });
  }

  filterTransactions() {
    const title: string = this.searchForm.value.title;

    if (this.accountId) {
      this.transactionService.getTransactions(this.accountId, {
        title,
        sort: this.sortBy
      }).subscribe((transactions: Transaction[]) => (
        this.transactionService.transactions$.next(transactions)
      ));
      this.searchForm.reset(this.searchForm.value);
    }
  }

  sortTransactions() {
    if (this.sortBy === '-transactionDate') {
      this.sortBy = 'transactionDate';
    } else {
      this.sortBy = '-transactionDate';
    }

    if (this.accountId) {
      this.transactionService.getTransactions(this.accountId, {
        sort: this.sortBy,
        title: this.searchForm.value.title
      }).subscribe((transactions: Transaction[]) => (
        this.transactions = transactions
      ));
    }
  }
}
