import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConst } from 'src/app/constants/AppConst';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private service: AuthService, private router: Router) {}
  get getExpirationMessage(): string {
    return localStorage.getItem(AppConst.TOKEN_EXPIRATION_MSG_KEY) || '';
  }
  ngOnInit(): void {
    // if logged if the login page will not appear
    if (this.service.isLoggedIn()) {
      this.router.navigate(['']);
    }

    // ----------- binding login form---------------
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe((response) => {
        if (response.status) {
          this.service.setToken(response.jwtToken);
          this.router.navigateByUrl('');
        }
      });
    }
  }

  ngOnDestroy(){
    localStorage.removeItem(AppConst.TOKEN_EXPIRATION_MSG_KEY)
  }
}
