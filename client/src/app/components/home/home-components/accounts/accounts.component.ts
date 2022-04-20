import { Component, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { EventEmitter } from '@angular/core';
import { Account } from 'src/app/interfaces/Account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];

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
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((accounts: any) => (
      this.accounts = accounts
    ));
  }

  toggleAccountForm() {
    this.showAccountForm = !this.showAccountForm;
  }

  createAccount() {
    this.accountService.createAccount(this.accountForm.value).subscribe((account: Account) => (
      this.accounts = [account, ...this.accounts],
      this.accountForm.reset()
    ));
  }

  deleteAccount(id: string) {
    this.accountService.deleteAccount(id).subscribe(() => (
      this.accounts = this.accounts.filter((accountItem: any) => accountItem._id !== id)
    ));
  }
}
