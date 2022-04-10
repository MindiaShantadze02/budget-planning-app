import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  showAccountForm = false;
  accounts: any = [];
  accountForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((res: any) => {
      this.accounts = res.data;
    });
  }

  toggleAccountForm() {
    this.showAccountForm = !this.showAccountForm;
  }

  createAccount() {
    this.accountService.createAccount(this.accountForm.value).subscribe((res: any) => (
      this.accounts = [res.account, ...this.accounts],
      this.accountForm.reset()
    ));
  }
}
