import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { OwnerSignupComponent } from './features/auth/owner-signup/owner-signup.component';
import { OwnerDashboardComponent } from './features/dashboard/owner-dashboard/owner-dashboard.component';
import { StudentDashboardComponent } from './features/dashboard/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';

import { HouseManagementComponent } from './features/house-management/house-management.component';
import { RoomManagementComponent } from './features/room-management/room-management.component';
import { authGuard } from './core/auth.guard';

import { MainLayoutComponent } from './layout/main-layout.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'owner-signup', component: OwnerSignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'owner-dashboard', component: OwnerDashboardComponent, canActivate: [authGuard], data: { role: 'OWNER' } },
      { path: 'house-management', component: HouseManagementComponent, canActivate: [authGuard], data: { role: 'OWNER' } },
      { path: 'rooms/:houseId', component: RoomManagementComponent, canActivate: [authGuard], data: { role: 'OWNER' } },
      { path: 'rooms', component: RoomManagementComponent, canActivate: [authGuard], data: { role: 'OWNER' } },
      { path: 'students', loadComponent: () => import('./features/student-management/student-management.component').then(m => m.StudentManagementComponent), canActivate: [authGuard], data: { role: 'OWNER' } },
      { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [authGuard], data: { role: 'STUDENT' } },
      { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
      { path: 'payments', loadComponent: () => import('./features/payments/payment-summary/payment-summary.component').then(m => m.PaymentSummaryComponent), canActivate: [authGuard], data: { role: 'OWNER' } },
      { path: 'rent-settings-configuration', loadComponent: () => import('./features/rent-settings-configuration/rent-settings-configuration.component').then(m => m.RentSettingsConfigurationComponent), canActivate: [authGuard], data: { role: 'OWNER' } },
      // ...other routes
    ]
  }
];
