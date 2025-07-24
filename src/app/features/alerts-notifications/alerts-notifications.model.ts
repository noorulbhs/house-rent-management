export interface Alert {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface Notification {
  id: number;
  title: string;
  body: string;
  audience: string;
  deliveryType: string[];
  sentAt?: string;
  scheduledFor?: string;
}

export interface Reminder {
  id: number;
  title: string;
  target: string;
  scheduleDate: string;
  type: string;
  status: 'Active' | 'Expired' | 'Sent';
}
