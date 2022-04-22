import { Component, OnInit, Inject } from '@angular/core';
import { Transaction } from 'src/app/interfaces/Transaction';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction: Transaction = {
    title: '',
    description: '',
    user: '',
    account: '',
    category: '',
    amount: '',
    transactionDate: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionService.getTransaction(this.data.id).subscribe((transaction: Transaction) => (
      this.transaction = transaction,
      console.log(transaction)
    ));
  }
}
