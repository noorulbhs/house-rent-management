// Mock data for students

export interface Student {
  id: string;
  userId: string;
  roomId: string;
  joinDate: string;
  aadhaar?: string;
  dob?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  status?: 'ACTIVE' | 'MOVED_OUT' | 'INACTIVE';
}

export const MOCK_STUDENTS: Student[] = [
  // Students for room r1
  {
    id: 'student-1',
    userId: 'user-1',
    roomId: 'r1',
    joinDate: '2024-06-01',
    aadhaar: '1234-5678-9012',
    dob: '2002-05-10',
    gender: 'Male',
    address: '123 Main St, City',
    emergencyContact: '9876543210',
    status: 'ACTIVE',
  },
  {
    id: 'student-2',
    userId: 'user-2',
    roomId: 'r1',
    joinDate: '2024-07-15',
    aadhaar: '2345-6789-0123',
    dob: '2001-11-22',
    gender: 'Female',
    address: '456 Park Ave, City',
    emergencyContact: '8765432109',
    status: 'ACTIVE',
  },
  // Students for room r2
  {
    id: 'student-3',
    userId: 'user-3',
    roomId: 'r2',
    joinDate: '2024-08-01',
    aadhaar: '3456-7890-1234',
    dob: '2003-03-15',
    gender: 'Male',
    address: '789 Elm St, City',
    emergencyContact: '7654321098',
    status: 'ACTIVE',
  },
  // Students for room r3
  {
    id: 'student-4',
    userId: 'user-4',
    roomId: 'r3',
    joinDate: '2024-09-10',
    aadhaar: '4567-8901-2345',
    dob: '2002-12-05',
    gender: 'Female',
    address: '321 Oak St, City',
    emergencyContact: '6543210987',
    status: 'ACTIVE',
  },
];
