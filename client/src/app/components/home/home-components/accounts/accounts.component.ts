import { Component, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  // accounts array
  @Input() accounts: any = [];
  @Input() transactions: any = [];
  @Input() currentAccount!: any;

  // emitting account changing event
  @Output() accChange = new EventEmitter();

  // variable for toggling the account form
  showAccountForm = false;

  // for creating new account
  accountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required, Validators.minLength(3),
      Validators.maxLength(255)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255)])
  });


  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
  }

  toggleAccountForm() {
    this.showAccountForm = !this.showAccountForm;
  }

  setCurrentAccount(account: any) {
    this.accChange.emit(account)
    this.currentAccount = account;
    this.transactionService.getTransactions(account._id).subscribe((res: any) => (
      this.transactions = res.data,
      console.log(this.transactions)
    ));
  }

  createAccount() {
    this.accountService.createAccount(this.accountForm.value).subscribe((res: any) => (
      this.accounts = [res.account, ...this.accounts],
      this.currentAccount = res.account,
      this.accountForm.reset()
    ));
  }

  deleteAccount(id: string) {
    this.accountService.deleteAccount(id).subscribe(() => (
      this.accounts = this.accounts.filter((accountItem: any) => accountItem._id !== id),
      this.currentAccount = this.accounts[0]
    ));
  }
}
