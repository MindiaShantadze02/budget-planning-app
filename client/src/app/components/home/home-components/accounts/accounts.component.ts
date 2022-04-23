import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accounts/account.service';
import { Account } from 'src/app/interfaces/Account';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];

  constructor(
    private accountService: AccountService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.accounts$.subscribe((accounts: Account[]) => (
      this.accounts = accounts
    ));

    this.accountService.getAccounts().subscribe((accounts: Account[]) => (
      this.accountService.accounts$.next(accounts)
    ));
  }

  deleteAccount(id: string) {
    this.dialogService.deleteAccountDialog().afterClosed().subscribe(res => {
      if (res) {
        this.accountService.deleteAccount(id).subscribe((res: string) => {
          const filteredAccounts: Account[] = this.accounts.filter((account: Account) => account._id !== id);
          this.accountService.accounts$.next(filteredAccounts);
        });
      }
    });
  }

  showDialog() {
    this.dialogService.openAccountForm();
  }
}
