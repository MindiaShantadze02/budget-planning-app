import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    });

    return next.handle(token).pipe(
      catchError(err => {
        this.authService.logout();
        return throwError(err);
      })
    );
  }
}
