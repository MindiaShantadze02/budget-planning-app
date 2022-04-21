import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  accounts: Account[] = [];
  account: Account = {
    _id: '',
    user: '',
    title: '',
    description: ''
  };
  editAccountForm: FormGroup = new FormGroup({
    title: new FormControl(this.account.title),
    description: new FormControl(this.account.description)
  });

  constructor(
    private accountService: AccountService,
    private dialog: MatDialogRef<EditAccountComponent>
  ) { }

  ngOnInit(): void {
    this.accountService.currentAccount$.subscribe((id: string) => {
      this.accountService.getAccount(id).subscribe((account: Account) => (
        this.account = account
      ));
    });

    this.accountService.accounts$.subscribe((accounts: Account[]) => (
      this.accounts = accounts
    ));

    this.accountService.getAccounts().subscribe((accounts: Account[]) => (
      this.accountService.accounts$.next(accounts)
    ));
  }

  updateAccount() {
    this.accountService.updateAccount(this.account._id, this.editAccountForm.value).subscribe((account: Account) => {
      const updatedAccounts = this.accounts.map((accountItem: Account) => {
        if (accountItem._id === account._id) {
          return {
            ...account,
            ...this.editAccountForm.value
          };
        }
        return accountItem;
      });
      this.account = account;
console.log(updatedAccounts);
      this.accountService.accounts$.next(updatedAccounts);
      this.dialog.close();
    },
    err => {
      console.log(err);
    });
  }
}
