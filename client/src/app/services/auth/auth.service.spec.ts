import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token when user authenticates', () => {
    service.login({
      email: 'email@gmail.com',
      password: 'sup'
    }).subscribe(data => {
      expect(data).toEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic3VwIiwiaWF0IjoxNTE2MjM5MDIyfQ.nkZhz0Li2__du8RbZHsElFB4AIMvi3FN1wqI_83YG0I");
    });
  });

  it('should return message if user is registered successfully', () => {
    const newUser = {
      email: "john@gmail.com",
      firstName: "John",
      lastName: "Doe",
      password: "john",
      role: "User",
      gender: "Male",
      birthDate: "02/12/1999",
      country: "United States"
    };

    service.register(newUser).subscribe(message => {
      expect(message).toEqual('User created successfully');
    })
  });
});
