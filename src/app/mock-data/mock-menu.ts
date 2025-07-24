// mock-menu.ts
// Mock data and interface for sidebar/top bar menu items and quick actions

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: string;
}

export const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/owner-dashboard' },
  { id: 'houses', label: 'Houses', icon: 'home', route: '/house-management' },
  { id: 'rooms', label: 'Rooms', icon: 'meeting_room', route: '/rooms' },
  { id: 'students', label: 'Students', icon: 'people', route: '/students' },
  { id: 'payments', label: 'Payments', icon: 'payments', route: '/payments' },
  { id: 'reports', label: 'Reports', icon: 'bar_chart', route: '/reports' }
];

export const MOCK_QUICK_ACTIONS: MenuItem[] = [
  { id: 'add-house', label: 'Add House', icon: 'add_home', action: 'addHouse' },
  { id: 'add-room', label: 'Add Room', icon: 'add_box', action: 'addRoom' },
  { id: 'add-student', label: 'Add Student', icon: 'person_add', action: 'addStudent' },
  { id: 'create-bill', label: 'Create Bill', icon: 'receipt_long', action: 'createBill' }
];

export interface Alert {
  message: string;
  type: 'warning' | 'info';
}

export const MOCK_ALERTS: Alert[] = [
  { message: 'Room 101 rent overdue', type: 'warning' },
  { message: 'New student registered', type: 'info' }
];
