import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required])
  });
  success: boolean = false;
  message: string = '';
  countries: any[] = [];
  
  errors: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient
    ) { }
    
    ngOnInit(): void {
      this.httpClient.get("https://restcountries.com/v2/all?fields=name").subscribe(
        (res: any) => (
          this.countries = res.map((country: any) => country.name)
        )
      )
  }

  onSubmit() {
    const {
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      password,
      password2
    } = this.registerForm.value;

    this.authService.register({
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      role: 'User',
      password,
      password2
    }).subscribe({
      next: res => {
      this.success = true;
      this.message = 'Account Created Successfully';

      if (this.success) {
        setTimeout(() => {
          this.message = '';
          this.router.navigateByUrl('login');
          }, 2000);
        }
      },
      error: err => {
        this.errors = err.error;
      }
  });
  }
}
