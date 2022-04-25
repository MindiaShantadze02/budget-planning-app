import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users: User[]) => (
      this.users = users
    ));
  }

  deleteUser(id: string) {
    this.dialogService.showDeleteDialog('Are you sure you want to delete this user?').afterClosed().subscribe(
      (res: boolean) => {
        if (res) {
          this.usersService.deleteUser(id).subscribe(() => (
            this.users = this.users.filter((user: User) => user._id !== id)
          ))
        }
      }
    )
  }
}
