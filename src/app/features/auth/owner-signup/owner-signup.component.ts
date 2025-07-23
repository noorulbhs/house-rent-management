import { MockAuthService } from '../../../service/mock-auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ToastrModule,
    RouterModule
  ],
  templateUrl: './owner-signup.component.html',
  styleUrl: './owner-signup.component.scss'
})
export class OwnerSignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  passwordStrength = 0;

  // Validator for confirmPassword to match password
  matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.signupForm) return null;
    const password = this.signupForm?.get('password')?.value;
    const confirm = control.value;
    if (!confirm) return null;
    return password === confirm ? null : { passwordMismatch: true };
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private mockAuthService: MockAuthService
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator.bind(this)]],
      businessName: [''],
      propertyName: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordsMatchValidator, updateOn: 'change' });
  }

  get fullName() { return this.signupForm.get('fullName'); }
  get email() { return this.signupForm.get('email'); }
  get phone() { return this.signupForm.get('phone'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get businessName() { return this.signupForm.get('businessName'); }
  get propertyName() { return this.signupForm.get('propertyName'); }
  get terms() { return this.signupForm.get('terms'); }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score >= 3 ? null : { weakPassword: true };
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (password === confirm) {
      return null;
    } else {
      return { passwordsMismatch: true };
    }
  }

  onPasswordInput() {
    const value = this.password?.value || '';
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    this.passwordStrength = score;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.', 'Signup Failed');
      this.signupForm.markAllAsTouched();
      return;
    }
    const { fullName, email, phone, password } = this.signupForm.value;
    this.mockAuthService.addUser({
      id: Date.now().toString(),
      name: fullName,
      email,
      phone,
      password,
      role: 'OWNER',
      status: 'ACTIVE'
    }).subscribe(() => {
      this.toastr.success('Account created successfully! Please login.', 'Success');
      this.router.navigate(['/login']);
    });
  }
}
