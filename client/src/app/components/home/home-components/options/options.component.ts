import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { Transaction } from 'src/app/interfaces/Transaction';
import { AccountService } from 'src/app/services/accounts/account.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  accountId: string = '';
  transactions: Transaction[] = [];
  categories: Category[] = [];

  message: string = '';
  success: boolean = false;

  showTransactionForm: boolean = false;

  transactionForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    amount: new FormControl(0)
  });

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.accountService.currentAccount$.subscribe((accountId: string) => {
      this.accountId = accountId;
      this.transactionService.transactions$.subscribe((transactions: any) => (
        this.transactions = transactions
      ))     
    });

    this.categoryService.categories$.subscribe((categories: Category[]) => (
      this.categories = categories
    ));

    this.categoryService.getCategories().subscribe((categories: Category[]) => (
      this.categoryService.categories$.next(categories)
    ));
  }

  toggleTransactionForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  createTransaction():void {
    if (this.accountId) {
      this.transactionService.createTransaction(
        this.accountId,
        this.transactionForm.value
      ).subscribe((transaction: Transaction) => (
        this.transactionService.transactions$.next([transaction , ...this.transactions])
      ));
    } else {
      this.success = false;
      this.message = 'Please select an account';
    }
  }
}
