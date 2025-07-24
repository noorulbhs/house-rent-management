// ...existing code...
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
import { AlertsNotificationsService } from '../features/alerts-notifications/alerts-notifications.service';
import { MOCK_MENU_ITEMS, MOCK_QUICK_ACTIONS, MenuItem } from '../mock-data/mock-menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
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
  alerts: import('../features/alerts-notifications/alerts-notifications.model').Alert[] = [];
  menuItems: MenuItem[] = [
    ...MOCK_MENU_ITEMS,
    { id: 'alerts', label: 'Alerts & Notifications', icon: 'notifications', route: '/alerts-notifications' }
  ];
  quickActions: MenuItem[] = MOCK_QUICK_ACTIONS;

  constructor(
    @Optional() private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object,
    private alertsNotificationsService: AlertsNotificationsService,
    private dialog: MatDialog
  ) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.ownerName = user?.name || 'Owner';
    // Fetch alerts from AlertsNotificationsService
    this.alerts = this.alertsNotificationsService.getAlerts();
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

  onQuickAction(action: MenuItem) {
    const dialogRef = this.dialog.open(ConfirmActionDialog, {
      data: { label: action.label }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Implement action logic here (e.g., open modal, navigate, etc.)
        // TODO: Replace with actual logic
        alert(`Confirmed: ${action.label}`);
      }
    });
  }

}

// ...existing code...
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component as NgComponent } from '@angular/core';

@NgComponent({
  selector: 'confirm-action-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  template: `
    <div class="confirm-modal-root">
      <h2 mat-dialog-title class="confirm-title">
        <mat-icon color="warn" class="confirm-icon">help_outline</mat-icon>
        Confirm Action
      </h2>
      <mat-dialog-content class="confirm-content">
        <div class="confirm-message">
          Are you sure you want to <b>{{ data.label }}</b>?
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end" class="confirm-actions">
        <button mat-stroked-button color="basic" (click)="onNo()">Cancel</button>
        <button mat-flat-button color="primary" (click)="onYes()">Confirm</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-modal-root {
      padding: 1.5rem 1.2rem 1.2rem 1.2rem;
      min-width: 320px;
      max-width: 95vw;
      border-radius: 14px;
      background: #fff;
      box-shadow: 0 4px 24px rgba(63,81,181,0.10);
    }
    .confirm-title {
      display: flex;
      align-items: center;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.7rem;
      color: #3f51b5;
    }
    .confirm-icon {
      font-size: 2rem;
      margin-right: 0.7rem;
      color: #b71c1c;
    }
    .confirm-content {
      font-size: 1.08rem;
      margin-bottom: 1.2rem;
      color: #444;
    }
    .confirm-message {
      margin: 0.5rem 0 1.2rem 0;
      font-size: 1.08rem;
      color: #444;
    }
    .confirm-actions {
      display: flex;
      gap: 1.1rem;
      justify-content: flex-end;
      margin-top: 1.2rem;
    }
    .confirm-actions button {
      min-width: 110px;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 8px;
    }
  `]
})
export class ConfirmActionDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { label: string }
  ) {}
  onNo() { this.dialogRef.close(false); }
  onYes() { this.dialogRef.close(true); }
}
