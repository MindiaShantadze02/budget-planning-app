import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() transactions!: any;
  @Input() currentAccount!: any;

  constructor() { }

  ngOnInit(): void {
  }
}
