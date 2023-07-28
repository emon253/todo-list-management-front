import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { Observable } from 'rxjs';
import { UserAuthResponse } from '../models/UserAuthResponse';
import { AppConst } from '../constants/AppConst';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = AppConst.BASE_URL;

  constructor(private http: HttpClient) {}
  // ------------- this function is only for user authentication ----------------
  login(user: UserDTO): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(
      this.BASE_URL + '/api/auth/login',
      user
    );
  }
  // ---------------- it will just clear the localstorage data , i will not invalidate backend session
  logout() {
    localStorage.removeItem(AppConst.JWT_TOKEN_KEY);
  }
  // -------- setting token in local storage----------------------
  setToken(token: string) {
    localStorage.setItem(AppConst.JWT_TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(AppConst.JWT_TOKEN_KEY) || '';
  }

  isLoggedIn() {
    return this.getToken() != '';
  }
  // -------------- extracting toke to find the authenticated user name-----------------------------
  getUsername() {
    const tokenParts = this.getToken().split('.');
    const payload = JSON.parse(atob(tokenParts[1]));

    return payload.sub || '';
  }
  // --------- finding authenticated user role by extracting jwt token -------------------------------
  getUserRole() {
    return JSON.parse(window.atob(this.getToken().split('.')[1])).roles;
  }
  // ----------------- checking if token has expired ----------------------------------------
  isTokenExpired(token: string): boolean {
    const tokenParts = this.getToken().split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return currentTimeInSeconds >= payload.exp;
  }
}
