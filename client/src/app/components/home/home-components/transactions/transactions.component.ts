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

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions: any) => {
      this.transactions = transactions;
    });
    this.route.params.subscribe((params: Params) => {
      this.accountId = params['id'];
      
      this.accountService.currentAccount$.next(params['id']);
      
      if (this.accountId) {
        this.transactionService.getTransactions(this.accountId, this.sortBy).subscribe((transactions: Transaction[]) => {
          this.transactionService.transactions$.next(transactions);
        });
      } else {
        this.transactionService.getAllTransactions().subscribe((transactions: Transaction[]) => {
          this.transactionService.transactions$.next(transactions);
        });
      }
    });
  }

  filterTransactions() {
    const title: string = this.searchForm.value.title;

    if (title) {
      this.transactions = this.transactions.filter((transactionItem: Transaction) => 
        transactionItem.title.toLocaleLowerCase().trim() === title.toLocaleLowerCase().trim()
      );
    }
    this.searchForm.reset();
  }

  sortTransactions() {
    if (this.sortBy === '-transactionDate') {
      this.sortBy = 'transactionDate';
    } else {
      this.sortBy = '-transactionDate';
    }

    this.transactionService.getTransactions(this.accountId, {
      sort: this.sortBy
    }).subscribe((transactions: Transaction[]) => (
      this.transactions = transactions
    ));
  }
}
