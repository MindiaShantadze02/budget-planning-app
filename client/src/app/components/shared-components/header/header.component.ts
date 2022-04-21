import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: ''
  };
  showOptions: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe((user: User) => (
      this.user = user
    ))
  }

  showLogoutDialog():void {
    this.dialogService.showLogoutDialog().afterClosed().subscribe(res => {
      if (res) {
        this.authService.logout();
      }
    });
  }

  toggleOptions():void {
    this.showOptions = !this.showOptions;
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
