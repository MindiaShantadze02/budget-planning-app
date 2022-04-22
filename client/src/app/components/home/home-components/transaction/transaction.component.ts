import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() transaction!: any;

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  showTransactionDetailsComponent(id: string) {
    this.dialogService.showTransactionDetailsComponent(id)
  }
}
