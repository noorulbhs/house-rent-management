// mock-rent-dues.ts
// Mock data and interface for upcoming rent dues

export interface RentDue {
  id: string;
  houseId: string;
  roomId: string;
  studentId: string;
  dueDate: string; // ISO date
  amount: number;
  status: 'DUE' | 'PAID' | 'PARTIAL';
}

export const MOCK_RENT_DUES: RentDue[] = [
  {
    id: 'rd1',
    houseId: '1', // Sunrise Villa
    roomId: 'r1', // Room 101
    studentId: '2', // Jane Student
    dueDate: '2025-07-31',
    amount: 5000,
    status: 'DUE'
  },
  {
    id: 'rd2',
    houseId: '1', // Sunrise Villa
    roomId: 'r2', // Room 102
    studentId: '3', // Alice Admin (for demo)
    dueDate: '2025-07-31',
    amount: 8000,
    status: 'PARTIAL'
  },
  {
    id: 'rd3',
    houseId: '2', // Green Acres
    roomId: 'r3', // Room 201
    studentId: '4', // (Add a mock student with id '4' in MOCK_USERS for full cross-ref)
    dueDate: '2025-07-22',
    amount: 12000,
    status: 'DUE'
  },
  {
    id: 'rd4',
    houseId: '2', // Green Acres
    roomId: 'r3', // Room 201
    studentId: '2', // Jane Student
    dueDate: '2025-08-31',
    amount: 12000,
    status: 'DUE'
  }
];
