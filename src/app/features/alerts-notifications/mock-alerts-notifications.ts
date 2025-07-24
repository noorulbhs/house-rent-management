import { Alert, Notification, Reminder } from './alerts-notifications.model';

export const MOCK_ALERTS: Alert[] = [
  { id: 1, type: 'Rent Not Paid', message: 'Student S123 has not paid rent.', timestamp: '2025-07-20T10:00:00', resolved: false },
  { id: 2, type: 'Bill Overdue', message: 'Electricity bill overdue for Room 101.', timestamp: '2025-07-18T09:00:00', resolved: false },
  { id: 3, type: 'Room Full', message: 'Room 102 is now full.', timestamp: '2025-07-15T08:00:00', resolved: true },
  { id: 4, type: 'Upcoming Rent Due', message: 'Rent due for Room 103 on 2025-08-01.', timestamp: '2025-07-22T11:00:00', resolved: false }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, title: 'Monthly Rent Reminder', body: 'Please pay your rent by the due date.', audience: 'All Students', deliveryType: ['App'], sentAt: '2025-07-01T12:00:00' }
];

export const MOCK_REMINDERS: Reminder[] = [
  { id: 1, title: 'Rent Due Reminder', target: 'Room 103', scheduleDate: '2025-07-30T09:00:00', type: 'Rent', status: 'Active' },
  { id: 2, title: 'Bill Payment Reminder', target: 'Room 101', scheduleDate: '2025-07-28T09:00:00', type: 'Bill', status: 'Sent' }
];
