import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() account!: Account;
  @Input() currentAccount!: Account;

  @Output() accDelete = new EventEmitter();
  @Output() currentAcc = new EventEmitter();

  availableAmount: number = 0;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAvailableAmount(this.account._id).subscribe((availableAmount: number) => (
      this.availableAmount = availableAmount
    ));
  }

  setCurrentAccount(account: any) {
    this.currentAcc.emit(account);
  }

  onDelete(id: string) {
    this.accDelete.emit(id);
  }
}
