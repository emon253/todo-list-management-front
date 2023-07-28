import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  constructor(private service: AuthService, private router: Router) {}

  logout() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.service.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.service.getUsername();
    }
  }
}
