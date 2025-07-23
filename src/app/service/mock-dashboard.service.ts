import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_DASHBOARDS, MockDashboardData } from '../mock-data/mock-dashboard';
import { MOCK_RENT_DUES, RentDue } from '../mock-data/mock-rent-dues';
import { MOCK_HOUSES } from '../mock-data/mock-houses';

@Injectable({ providedIn: 'root' })
export class MockDashboardService {
  private dashboards = [...MOCK_DASHBOARDS];

  getDashboardByUserId(userId: string): Observable<MockDashboardData | undefined> {
    return of(this.dashboards.find(d => d.userId === userId));
  }

  // Get upcoming rent dues for all houses owned by the given ownerId
  getUpcomingRentDuesByOwnerId(ownerId: string | number): Observable<RentDue[]> {
    // Find house IDs for this owner
    const houseIds = MOCK_HOUSES.filter(h => String(h.ownerId) === String(ownerId)).map(h => String(h.id));
    // Filter rent dues for these houses and status DUE or PARTIAL
    const dues = MOCK_RENT_DUES.filter(due => houseIds.includes(due.houseId) && (due.status === 'DUE' || due.status === 'PARTIAL'));
    return of(dues);
  }
}
