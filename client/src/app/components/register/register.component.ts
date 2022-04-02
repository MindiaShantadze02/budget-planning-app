import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const {
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      password
    } = this.registerForm.value;

    this.authService.register({
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      role: 'User',
      password
    })
  }
}
