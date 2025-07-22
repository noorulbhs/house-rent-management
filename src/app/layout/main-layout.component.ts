import { Component, ViewChild, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { NotificationComponent } from './notification.component';
import { UserIconComponent } from './user-icon.component';
import { MockDashboardService } from '../service/mock-dashboard.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    HeaderComponent,
    NotificationComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = false;
  showAlerts = false;
  showUserDropdown = false;
  ownerName = '';
  alerts: Array<{ message: string; type: string }> = [];

  constructor(
    @Optional() private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(MockDashboardService) private mockDashboardService: MockDashboardService
  ) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.ownerName = user?.name || 'Owner';
    if (user?.id) {
      this.mockDashboardService.getDashboardByUserId(user.id).subscribe((dashboard: any) => {
        this.alerts = dashboard?.alerts || [];
      });
    }
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
