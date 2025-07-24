import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsNotificationsService } from './alerts-notifications.service';
import { Alert, Notification, Reminder } from './alerts-notifications.model';

@Component({
  selector: 'app-alerts-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './alerts-notifications.component.html',
  styleUrls: ['./alerts-notifications.component.scss']
})
export class AlertsNotificationsComponent {
  notificationTemplates = [
    { title: 'Monthly Rent Reminder', body: 'Please pay your rent by the due date.', audience: 'All Students', deliveryType: ['App'] },
    { title: 'Bill Payment Reminder', body: 'Your bill is due soon. Please pay promptly.', audience: 'All Students', deliveryType: ['App'] },
    { title: 'Room Assignment Notice', body: 'You have been assigned a new room.', audience: 'Individual', deliveryType: ['App'] }
  ];

  applyTemplate(template: any) {
    this.notificationForm = { ...template, scheduleLater: false };
  }
  editingReminder: Reminder | null = null;

  startEditReminder(reminder: Reminder) {
    this.editingReminder = { ...reminder };
  }

  saveEditReminder() {
    if (this.editingReminder) {
      const idx = this.reminders.findIndex(r => r.id === this.editingReminder!.id);
      if (idx > -1) {
        this.reminders[idx] = { ...this.editingReminder };
        this.snackBar.open('Reminder updated!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
      }
      this.editingReminder = null;
    }
  }

  cancelEditReminder() {
    this.editingReminder = null;
  }

  deleteReminder(reminderId: number) {
    this.reminders = this.reminders.filter(r => r.id !== reminderId);
    this.snackBar.open('Reminder cancelled!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
  }
  get filteredAlerts(): Alert[] {
    if (!this.alertSearch.trim()) return this.alerts;
    const search = this.alertSearch.toLowerCase();
    return this.alerts.filter(a =>
      a.type.toLowerCase().includes(search) ||
      a.message.toLowerCase().includes(search) ||
      a.timestamp.toLowerCase().includes(search)
    );
  }
  alerts: Alert[] = [];
  notifications: Notification[] = [];
  reminders: Reminder[] = [];

  // Manual notification form
  notificationForm: Partial<Notification> & { scheduleLater?: boolean } = {};

  // Search input for alerts
  alertSearch: string = '';

  constructor(private service: AlertsNotificationsService, private snackBar: MatSnackBar) {
    this.loadAll();
  }

  loadAll() {
    this.alerts = this.service.getAlerts();
    this.notifications = this.service.getNotifications();
    this.reminders = this.service.getReminders();
  }

  sendNotification() {
    if (!this.notificationForm.title || !this.notificationForm.body || !this.notificationForm.audience || !this.notificationForm.deliveryType) {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
      return;
    }
    this.service.sendNotification(this.notificationForm as Notification);
    this.snackBar.open('Notification sent!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
    this.notificationForm = { scheduleLater: false };
    this.loadAll();
  }

  markAlertResolved(alertId: number) {
    this.service.markAlertResolved(alertId);
    this.snackBar.open('Alert marked as resolved.', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
    this.loadAll();
  }

  sendReminder(alertId: number) {
    this.service.sendReminder(alertId);
    this.snackBar.open('Reminder sent.', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
    this.loadAll();
  }
}
