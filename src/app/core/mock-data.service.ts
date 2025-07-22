import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './auth.service';
import { MOCK_USERS } from '../mock-data/mock-users';
import { MOCK_DASHBOARDS, MockDashboardData } from '../mock-data/mock-dashboard';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private users = [...MOCK_USERS];
  private dashboards = [...MOCK_DASHBOARDS];

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

  getDashboardByUserId(userId: string): Observable<MockDashboardData | undefined> {
    return of(this.dashboards.find(d => d.userId === userId));
  }
}
