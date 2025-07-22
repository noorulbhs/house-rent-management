import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS } from '../mock-data/mock-users';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'ADMIN' | 'OWNER' | 'STUDENT';
  status: 'ACTIVE' | 'INACTIVE';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users = MOCK_USERS;

  login(email: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return of(user ?? null);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  signup(newUser: User): Observable<{ success: boolean; error?: string }> {
    const exists = this.users.some(u => u.email === newUser.email || u.phone === newUser.phone);
    if (exists) {
      return of({ success: false, error: 'Email or phone already exists.' });
    }
    this.users.push(newUser);
    return of({ success: true });
  }
}
