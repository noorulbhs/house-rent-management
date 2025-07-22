// Dashboard mock data, now linked to a user by userId
export interface MockDashboardData {
  userId: string;
  summary: Array<{ title: string; value: number | string; icon: string }>;
  alerts: Array<{ message: string; type: string }>;
}

export const MOCK_DASHBOARDS: MockDashboardData[] = [
  {
    userId: '1', // John Doe (owner@example.com)
    summary: [
      { title: 'Total Houses', value: 3, icon: 'home' },
      { title: 'Total Rooms', value: 24, icon: 'meeting_room' },
      { title: 'Total Students', value: 18, icon: 'people' },
      { title: 'Rent Collection', value: '₹ 1,20,000', icon: 'payments' }
    ],
    alerts: [
      { message: 'Room 101 rent overdue', type: 'warning' },
      { message: 'New student registered', type: 'info' }
    ]
  }
];
