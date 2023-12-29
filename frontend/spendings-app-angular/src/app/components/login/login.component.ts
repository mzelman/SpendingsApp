import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { Validator } from 'src/app/validators/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User('', '', '');

  errorMessage: string | undefined;

  loginFormGroup!: FormGroup;

  message: string | undefined;

  constructor(private formBulider: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        this.message = 'User registered successfully! Now you can login.';
      }
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['loggedOut'] === 'true') {
        this.message = 'You have been logged out.';
      }
    });
    this.loginFormGroup = this.formBulider.group({
      user: this.formBulider.group({
        username: new FormControl('', [Validators.required, Validator.notOnlyWhitespace]),
        password: new FormControl('', Validators.required)
      })
    })
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      this.message = '';
      return;
    }
    this.user.username = this.loginFormGroup.get('user.username')?.value;
    this.user.password = this.loginFormGroup.get('user.password')?.value;
    this.userService.login(this.user).subscribe(
      (response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization');
        localStorage.setItem('token', token!);
        console.log('Login successful', response);
        this.router.navigate(['/categories']);
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = error.message;
        this.message = '';
      }
    );
  }

  get username() {
    return this.loginFormGroup.get('user.username');
  }

  get password() {
    return this.loginFormGroup.get('user.password');
  }

}
