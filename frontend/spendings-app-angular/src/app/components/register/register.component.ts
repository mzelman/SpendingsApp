import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { Validator } from 'src/app/validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User('', '', '');

  registerFormGroup!: FormGroup;

  errorMessage: string | undefined;

  isChecked: boolean = false;

  constructor(private formBulider: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this.formBulider.group({
      user: this.formBulider.group({
        email: new FormControl('', [Validators.required, Validator.notOnlyWhitespace, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        username: new FormControl('', [Validators.required, Validators.minLength(3), Validator.notOnlyWhitespace]),
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validator.notOnlyWhitespace])
      })
    })
  }

  onSubmit() {
    if (!this.isChecked) {
      this.registerFormGroup.markAllAsTouched();
      this.errorMessage = "Please accept the Terms and Conditions and Privacy Policy to continue.";
      return
    }
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }
    this.user.username = this.registerFormGroup.get('user.username')?.value;
    this.user.password = this.registerFormGroup.get('user.password')?.value;
    this.user.email = this.registerFormGroup.get('user.email')?.value;
    this.userService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error => {
        console.error('Registration failed', error);
        this.errorMessage = error.message;
        this.router.navigate(['/register']);
      }
    );
  }

  agreeToTermsAndConditions(event: Event) {
    this.isChecked = (<HTMLInputElement>event.target).checked;
  }

  get username() {
    return this.registerFormGroup.get('user.username');
  }

  get password() {
    return this.registerFormGroup.get('user.password');
  }

  get email() {
    return this.registerFormGroup.get('user.email');
  }

}
