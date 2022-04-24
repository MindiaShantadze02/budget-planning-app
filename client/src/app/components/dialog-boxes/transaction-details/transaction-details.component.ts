import { Component, OnInit, Inject } from '@angular/core';
import { Transaction } from 'src/app/interfaces/Transaction';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction: Transaction = {
    _id: '',
    title: '',
    description: '',
    user: '',
    account: '',
    category: '',
    amount: '',
    transactionDate: ''
  }
  transactions: Transaction[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private transactionService: TransactionService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.transactionService.getTransaction(this.data.id).subscribe((transaction: Transaction) => (
      this.transaction = transaction
    ));

    this.transactionService.transactions$.subscribe((transactions: Transaction[]) => (
      this.transactions = transactions
    ));
  }

  deleteTransaction() {
    this.dialogService.showDeleteDialog("Are you sure you want to delete this transaction?").afterClosed().subscribe((res: boolean) => {
      if (res) {
          this.transactionService.deleteTransaction(this.transaction._id).subscribe((res) => {
            const filteredTransactions: Transaction[] = this.transactions.filter((transaction: Transaction) => 
              this.transaction._id !== transaction._id);
            this.transactionService.transactions$.next([...filteredTransactions]);
            console.log(res);
          });
        }
      });
  }
}
