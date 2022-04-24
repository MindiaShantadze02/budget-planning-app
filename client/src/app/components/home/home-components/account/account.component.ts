import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountDetailsComponent } from 'src/app/components/dialog-boxes/account-details/account-details.component';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/accounts/account.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() account!: Account;
  @Input() currentAccount!: Account;

  availableAmount: number = 0;

  constructor(
    private accountService: AccountService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.accountService.getAvailableAmount(this.account._id).subscribe((availableAmount: number) => (
      this.availableAmount = availableAmount
    ));
  }

  showDetails(id: string) {
    this.dialogService.showAccountDetailsComponent(id);
  }
}
