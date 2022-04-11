import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() transactions!: any;
  @Input() currentAccount!: any;

  transactionForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    amount: new FormControl(0)
  });

  showTransactionForm: boolean = false;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  toggleTransactionForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  createTransaction() {
    this.transactionService.createTransaction('6253386ecf2e09468b87a45c', this.transactionForm.value)
    .subscribe((res: any) => (
      console.log(res),
      this.transactions = [this.transactionForm.value , ...this.transactions]
    ));
  }
}
