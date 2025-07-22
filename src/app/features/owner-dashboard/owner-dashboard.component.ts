import { Component } from '@angular/core';
import { MOCK_DASHBOARD, MOCK_USERS } from '../../mock-data/mock-users';
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
  ownerName = '';
  summary = MOCK_DASHBOARD.summary;
  alerts = MOCK_DASHBOARD.alerts;

  constructor() {
    // Get current user from localStorage (mock login)
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.ownerName = user?.name || 'Owner';
  }
}
