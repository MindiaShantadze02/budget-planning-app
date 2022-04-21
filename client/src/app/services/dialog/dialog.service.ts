import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountDeleteDialogComponent } from 'src/app/components/dialog-boxes/account-delete-dialog/account-delete-dialog.component';
import { AccountsDialogBoxComponent } from 'src/app/components/dialog-boxes/accounts-dialog-box/accounts-dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openAccountForm():void {
    this.dialog.open(AccountsDialogBoxComponent, {
      width: '400px'
    });
  }

  deleteAccountDialog() {
    return this.dialog.open(AccountDeleteDialogComponent, {
      width: '300px'
    });
  }
}
