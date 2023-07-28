import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(next: ActivatedRouteSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
