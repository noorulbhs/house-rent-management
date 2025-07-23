import { Component, ViewChild, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { MockDashboardService } from '../../../service/mock-dashboard.service';
import { MOCK_USERS } from '../../../mock-data/mock-users';
import { MOCK_HOUSES } from '../../../mock-data/mock-houses';
import { MOCK_ROOMS } from '../../../mock-data/mock-rooms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.scss'
})
export class OwnerDashboardComponent {
  // Helper to check if due date is overdue
  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    // Compare only date part
    return due.getTime() < today.setHours(0,0,0,0);
  }
  today: Date = new Date();
  ownerName = '';
  summary: Array<{ title: string; value: number | string; icon: string }> = [];
  alerts: Array<{ message: string; type: string }> = [];
  showAlerts = false;
  showUserDropdown = false;
  upcomingRentDues: any[] = [];
  users: any[] = MOCK_USERS;
  houses: any[] = MOCK_HOUSES;
  rooms: any[] = MOCK_ROOMS;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = false;

  constructor(
    private mockDashboardService: MockDashboardService,
    @Optional() private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.ownerName = user?.name || 'Owner';
    this.mockDashboardService.getDashboardByUserId(user?.id).subscribe(dashboard => {
      this.summary = dashboard?.summary || [];
      this.alerts = dashboard?.alerts || [];
    });
    // Static imports above ensure mock data is available for cross-ref
    // Fetch upcoming rent dues for this owner
    this.mockDashboardService.getUpcomingRentDuesByOwnerId(user?.id).subscribe(dues => {
      // Cross-ref each due with user, house, room
      this.upcomingRentDues = dues.map(due => {
        const student = this.users.find(u => String(u.id) === String(due.studentId));
        const house = this.houses.find(h => String(h.id) === String(due.houseId));
        const room = this.rooms.find(r => String(r.id) === String(due.roomId));
        return {
          ...due,
          studentName: student ? student.name : due.studentId,
          houseName: house ? house.name : due.houseId,
          roomNumber: room ? room.roomNumber : due.roomId
        };
      });
    });

    if (isPlatformBrowser(this.platformId) && this.breakpointObserver) {
      this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
        this.isMobile = result.matches;
        this.sidenavMode = this.isMobile ? 'over' : 'side';
        this.sidenavOpened = !this.isMobile ? true : false;
        if (this.sidenav) {
          if (this.isMobile) {
            this.sidenav.close();
          } else {
            this.sidenav.open();
          }
        }
      });
    }
  }
  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  toggleAlerts() {
    this.showAlerts = !this.showAlerts;
  }

  closeAlerts() {
    this.showAlerts = false;
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }
}
