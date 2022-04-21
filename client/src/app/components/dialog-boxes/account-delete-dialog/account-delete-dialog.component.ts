import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/accounts/account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account-delete-dialog',
  templateUrl: './account-delete-dialog.component.html',
  styleUrls: ['./account-delete-dialog.component.scss']
})
export class AccountDeleteDialogComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
