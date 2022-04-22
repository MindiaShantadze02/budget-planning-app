import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AccountDeleteDialogComponent } from 'src/app/components/dialog-boxes/delete-dialog/account-delete-dialog.component';
import { AccountsDialogBoxComponent } from 'src/app/components/dialog-boxes/accounts-dialog-box/accounts-dialog-box.component';
import { AccountDetailsComponent } from 'src/app/components/dialog-boxes/account-details/account-details.component';
import { LogoutDialogComponent } from 'src/app/components/dialog-boxes/logout-dialog/logout-dialog.component';
import { EditAccountComponent } from 'src/app/components/dialog-boxes/edit-account/edit-account.component';
import { TransactionDetailsComponent } from 'src/app/components/dialog-boxes/transaction-details/transaction-details.component';
import { DeleteTransactionComponent } from 'src/app/components/dialog-boxes/delete-transaction/delete-transaction.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openAccountForm():void {
    this.dialog.open(AccountsDialogBoxComponent, {
      width: '400px',
    });
  }

  deleteAccountDialog() {
    return this.dialog.open(AccountDeleteDialogComponent, {
      width: '300px'
    });
  }

  showAccountDetailsComponent(id: string) {
    this.dialog.open(AccountDetailsComponent, {
      width: '500px',
      height: '100%',
      position: {
        top: '0',
        left: '0'
      },
      data: {
        id
      }
    });
  }

  showTransactionDetailsComponent(id: string) {
    this.dialog.open(TransactionDetailsComponent, {
      width: '500px',
      height: '100%',
      position: {
        right: '0',
        top: '0'
      },
      data: {
        id
      }
    });
  }

  showTransactionDeleteComponent() {
    return this.dialog.open(DeleteTransactionComponent, {
      width: '500px'
    });
  }

  showLogoutDialog() {
    return this.dialog.open(LogoutDialogComponent, {
      width: '500px'
    });
  }

  showEditAccountForm() {
    return this.dialog.open(EditAccountComponent, {
      width: '500px',
    });
  }
}
