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

  constructor() { }

  ngOnInit(): void {
  }
}
