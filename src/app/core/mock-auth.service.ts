import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './auth.service';
import { MOCK_USERS } from '../mock-data/mock-users';

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private users = [...MOCK_USERS];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return of(this.users.find(u => u.email === email));
  }

  addUser(user: User): Observable<void> {
    this.users.push(user);
    return of();
  }
}
