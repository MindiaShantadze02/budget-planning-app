import { HttpClient } from '@angular/common/http';
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
    availableAmount: 0,
    _id: '',
    user: '',
    title: '',
    description: '',
    currency: {
      country: ''
    }
  };
  editAccountForm: FormGroup = new FormGroup({
    title: new FormControl('',[
      Validators.required, Validators.minLength(3),
      Validators.maxLength(255)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255)])
  });
  currencies: any = [];
  errors: any = {};

  constructor(
    private accountService: AccountService,
    private dialog: MatDialogRef<EditAccountComponent>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get("https://restcountries.com/v3.1/all?fields=currencies,name").subscribe((res: any) => (
      this.currencies = res.map((currency: any) => {
        const currencyKey = Object.keys(currency.currencies)[0];
        const currencyCountry = currency.name.common;
        if (currencyKey) {
          const { name, symbol } = currency.currencies[currencyKey];
          return {
            name,
            code: currencyKey,
            symbol,
            currencyCountry
          }
        }

        return { currencyCountry };
      })
    ));

    this.accountService.currentAccount$.subscribe((id: string) => {
      this.accountService.getAccount(id).subscribe((account: Account) => (
        this.account = account,
        this.editAccountForm = new FormGroup({
          title: new FormControl(this.account.title,[
            Validators.required, Validators.minLength(3),
            Validators.maxLength(255)
          ]),
          description: new FormControl(this.account.description, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(255)])
        })
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
            ...this.editAccountForm.value,
            availableAmount: accountItem.availableAmount + Number(this.editAccountForm.value.amount)
          };
        }
        return accountItem;
      });
      this.account = account;
      this.accountService.accounts$.next(updatedAccounts);
      this.dialog.close();
    },
    err => {
      this.errors = err.error;
    });
  }
}
