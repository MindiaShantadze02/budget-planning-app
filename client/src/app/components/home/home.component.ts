import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accounts/account.service';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accounts: any = [];
  transactions: any = [];
  currentAccount: any = {};

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
    ) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((res: any) => {
      this.accounts = res.data;
      
      if (res.data.length === 0) return;

      this.currentAccount = res.data[0];

      this.transactionService.getTransactions(this.currentAccount._id).subscribe((res: any) => (
        this.transactions = res.data
      ));
    });
  }
}
