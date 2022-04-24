import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-accounts-dialog-box',
  templateUrl: './accounts-dialog-box.component.html',
  styleUrls: ['./accounts-dialog-box.component.scss']
})
export class AccountsDialogBoxComponent implements OnInit {
  accounts: Account[] = [];

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
  errors:any = {};

  constructor(
    private accountService: AccountService,
    private dialog: MatDialogRef<AccountsDialogBoxComponent>
  ) { }

  ngOnInit(): void {
    this.accountService.accounts$.subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    });
  }

  createAccount() {
    this.accountService.createAccount(this.accountForm.value).subscribe((account: Account) => (
      this.accountService.accounts$.next([account, ...this.accounts]),
      this.dialog.close(),
      this.accountForm.reset()
    ),
    err => {
      this.errors = err.error;
    });
  }
}
