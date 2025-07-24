import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() alerts: Array<{ message: string; type: string; resolved?: boolean }> = [];
  @Input() showAlerts = false;
  @Input() toggleAlerts!: () => void;
  @Input() closeAlerts!: () => void;

  get unresolvedAlertsCount(): number {
    return this.alerts ? this.alerts.filter(a => !a.resolved).length : 0;
  }
}
