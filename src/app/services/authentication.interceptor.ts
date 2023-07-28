import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AppConst } from '../constants/AppConst';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private service: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.getToken();

    if (token && !this.service.isTokenExpired(token)) {
      // if token exists and has expiration, the request will forward
      const cloned = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned);
    } else {
      // session expired or not exists
      this.service.logout();

      this.router.navigate(['login']);

      localStorage.setItem(
        AppConst.TOKEN_EXPIRATION_MSG_KEY,
        'Login session has been expired, please login again'
      );
    }

    return next.handle(request);
  }
}
