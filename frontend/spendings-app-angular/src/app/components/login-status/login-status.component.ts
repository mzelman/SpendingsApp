import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.userService.checkToken().subscribe(
      () => {
        console.log('Login status checked.');
      }
    )
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'], { queryParams: { loggedOut: 'true' } });
  }
}
