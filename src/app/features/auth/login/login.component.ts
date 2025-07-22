import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MockAuthService } from '../../../service/mock-auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToastrModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loginError: string | null = null;

  navigateToSignup() {
    this.router.navigate(['/owner-signup']);
  }

  constructor(
    private fb: FormBuilder,
    private mockAuthService: MockAuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.loginError = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.mockAuthService.getUserByEmail(email).subscribe(user => {
        if (user && user.password === password) {
          console.log('Login success, user object:', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/owner-dashboard']);
        } else {
          this.loginError = 'Invalid email or password';
          this.toastr.error('Invalid email or password', 'Login Failed');
          console.log('Login failed: Invalid email or password');
        }
      });
    }
  }
}
