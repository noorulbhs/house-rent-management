import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { OwnerSignupComponent } from './features/auth/owner-signup/owner-signup.component';
import { OwnerDashboardComponent } from './features/dashboard/owner-dashboard/owner-dashboard.component';

import { HouseManagementComponent } from './features/house-management/house-management.component';
import { RoomManagementComponent } from './features/room-management/room-management.component';
import { authGuard } from './core/auth.guard';

import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'owner-signup', component: OwnerSignupComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'owner-dashboard', component: OwnerDashboardComponent },
      { path: 'house-management', component: HouseManagementComponent },
      { path: 'rooms/:houseId', component: RoomManagementComponent },
      { path: 'rooms', component: RoomManagementComponent },
      { path: 'students', loadComponent: () => import('./features/student-management/student-management.component').then(m => m.StudentManagementComponent) },
      // ...other routes
    ]
  }
];
