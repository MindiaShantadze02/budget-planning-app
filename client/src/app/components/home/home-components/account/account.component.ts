import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() account!: any;
  availableAmount: number = 0;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAvailableAmount(this.account['_id']).subscribe((res: any) => (
      this.availableAmount = res.data
    ));
  }
}
