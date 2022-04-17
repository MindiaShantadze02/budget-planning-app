import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AccountService } from 'src/app/services/accounts/account.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  accountId: string = '';

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe((transactions: any) => {
      this.transactions = transactions;
    })
    this.route.params.subscribe((params: Params) => {
      this.accountId = params['id'];
      
      this.accountService.currentAccount$.next(params['id']);

      if (this.accountId) {
        this.transactionService.getTransactions(this.accountId).subscribe((transactions: any) => {
          this.transactionService.transactions$.next(transactions);
        });
      } else {
        this.transactionService.getAllTransactions().subscribe((transactions: any) => {
          this.transactionService.transactions$.next(transactions);
        });
      }
    });
  }
}
