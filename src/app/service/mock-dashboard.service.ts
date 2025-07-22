import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_DASHBOARDS, MockDashboardData } from '../mock-data/mock-dashboard';

@Injectable({ providedIn: 'root' })
export class MockDashboardService {
  private dashboards = [...MOCK_DASHBOARDS];

  getDashboardByUserId(userId: string): Observable<MockDashboardData | undefined> {
    return of(this.dashboards.find(d => d.userId === userId));
  }
}
