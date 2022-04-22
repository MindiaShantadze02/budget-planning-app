import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/Category';
import { AccountService } from 'src/app/services/accounts/account.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { Transaction } from 'src/app/interfaces/Transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  transactionForm: FormGroup = new FormGroup({
    transactionType: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    transactionDate: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required])
  });
  categories: Category[] = [];
  accountId: string = '';
  transactions: Transaction[] = [];

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories: Category[]) => (
      this.categories = categories
    ));

    this.transactionService.transactions$.subscribe((transactions: Transaction[]) => (
      this.transactions = transactions
    ))

    this.accountService.currentAccount$.subscribe((id: string) => (
      this.accountId = id
    ));

    this.categoryService.getCategories().subscribe((categories: Category[]) => (
      this.categoryService.categories$.next(categories)
    ));
  }

  createTransaction():void {
    if (this.accountId) {
      const newTransaction: Transaction = {
        ...this.transactionForm.value,
        amount: this.transactionForm.value.amount
      }
      this.transactionService.createTransaction(
        this.accountId,
        newTransaction
      ).subscribe((transaction: Transaction) => (
        this.transactionService.transactions$.next([transaction , ...this.transactions]),
        console.log(transaction),
        this.router.navigateByUrl('')
      ), 
      err => {
        console.log(err);
      });
    }
  }
}
