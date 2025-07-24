import { Injectable } from '@angular/core';
import { Alert, Notification, Reminder } from './alerts-notifications.model';
import { MOCK_ALERTS, MOCK_NOTIFICATIONS, MOCK_REMINDERS } from './mock-alerts-notifications';

@Injectable({ providedIn: 'root' })
export class AlertsNotificationsService {
  private alerts: Alert[] = MOCK_ALERTS;
  private notifications: Notification[] = MOCK_NOTIFICATIONS;
  private reminders: Reminder[] = MOCK_REMINDERS;

  getAlerts(): Alert[] {
    return [...this.alerts];
  }
  getNotifications(): Notification[] {
    return [...this.notifications];
  }
  getReminders(): Reminder[] {
    return [...this.reminders];
  }

  sendNotification(notification: Notification) {
    notification.id = Date.now();
    notification.sentAt = new Date().toISOString();
    this.notifications.push(notification);
  }

  markAlertResolved(alertId: number) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) alert.resolved = true;
  }

  sendReminder(alertId: number) {
    // For demo, just mark as sent
    const reminder = this.reminders.find(r => r.id === alertId);
    if (reminder) reminder.status = 'Sent';
  }
}
