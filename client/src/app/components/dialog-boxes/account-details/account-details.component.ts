import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/accounts/account.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  accounts: Account[] = [];
  account: Account = {
    _id: '',
    user: '',
    title: '',
    description: '',
  };
  availableAmount: number = 0;
  currentAccountId: string = '';

  constructor(
    private accountService: AccountService,
    private dialogService: DialogService,
    private dialog: MatDialogRef<AccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) { }

  ngOnInit(): void {
    this.accountService.currentAccount$.subscribe((id: string) => {
      this.accountService.getAccount(id).subscribe((account: Account) => (
        this.account = account,
        this.currentAccountId = id
      ));
    });

    this.accountService.getAccounts().subscribe((accounts: Account[]) => (
      this.accounts = accounts
    ));

    this.accountService.getAvailableAmount(this.data.id).subscribe((availableAmount: number) => (
      this.availableAmount = availableAmount
    ));
  };

  deleteAccount(id: string) {
    this.dialogService.deleteAccountDialog().afterClosed().subscribe(res => {
      if (res) {
        this.accountService.deleteAccount(id).subscribe((res: string) => {
          const filteredAccounts: Account[] = this.accounts.filter((account: Account) => account._id !== id);
          this.accountService.accounts$.next(filteredAccounts);
          this.dialog.close();
        });
      }
    });
  }

  closeDialog() {
    this.dialog.close();
  }

  showEditAccountForm() {
    this.dialogService.showEditAccountForm();
  }
}
