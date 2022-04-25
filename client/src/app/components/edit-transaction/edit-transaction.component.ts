import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/Category';
import { Transaction } from 'src/app/interfaces/Transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  transactionForm: FormGroup = new FormGroup({
    transactionType: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    transactionDate: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required])
  });
  categories: Category[] = [];
  transactionId: string = '';
  transactions: Transaction[] = [];
  transaction: Transaction = {
    _id: '',
    user: '',
    account: '',
    title: '',
    transactionDate: '',
    transactionType: '',
    category: '',
    amount: 0,
    description: ''
  };
  errors:any = {};

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.transactionId = params['transactionId']
    });

    this.transactionService.transactions$.subscribe((transactions: Transaction[]) => (
      this.transactions = transactions
    ));

    this.transactionService.getTransaction(this.transactionId).subscribe((transaction: Transaction) => (
      this.transaction = transaction,
      this.transactionForm = new FormGroup({
        transactionType: new FormControl(this.transaction.transactionType, [Validators.required]),
        title: new FormControl(this.transaction.title, [Validators.required]),
        description: new FormControl(this.transaction.description, [Validators.required]),
        category: new FormControl(this.transaction.category, [Validators.required]),
        transactionDate: new FormControl(this.transaction.transactionDate, [Validators.required]),
        amount: new FormControl(this.transaction.amount, [Validators.required])
      })
    ));
  }

  updateTransaction() {
    this.transactionService.updateTransaction(this.transaction._id, this.transactionForm.value)
      .subscribe((transaction: Transaction) => {
        const updatedTransactions: Transaction[] = this.transactions.filter(
          (transactionItem: Transaction) => {
            if (transaction._id === transactionItem._id) {
              return {
                ...transactionItem,
                ...transaction
              }
            }
            return transactionItem;
          }
          );

          this.transactionService.transactions$.next(updatedTransactions);
          this.router.navigateByUrl('');
    }, 
    err => {
      this.errors = err.error;
    });
  }
}
