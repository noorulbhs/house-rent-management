import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();
  const requiredRole = route.data['role'];

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to correct dashboard for user role
    if (user.role === 'OWNER') {
      router.navigate(['/owner-dashboard']);
    } else if (user.role === 'STUDENT') {
      router.navigate(['/student-dashboard']);
    } else if (user.role === 'ADMIN') {
      router.navigate(['/admin-dashboard']);
    } else {
      router.navigate(['/login']);
    }
    return false;
  }

  return true;
};
