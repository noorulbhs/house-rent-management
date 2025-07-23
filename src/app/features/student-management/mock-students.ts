// Mock data for students

export interface Student {
  id: string;
  name?: string;
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
    name: 'Amit Sharma',
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
    name: 'Priya Singh',
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
    name: 'Rahul Verma',
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
    name: 'Sneha Patel',
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
  // Students with no room assigned (for testing assignment)
  {
    id: 'student-5',
    name: 'Vikram Joshi',
    userId: 'user-5',
    roomId: '',
    joinDate: '2025-01-10',
    aadhaar: '5678-9012-3456',
    dob: '2004-04-20',
    gender: 'Male',
    address: '555 Maple St, City',
    emergencyContact: '5432109876',
    status: 'ACTIVE',
  },
  {
    id: 'student-6',
    name: 'Anjali Mehra',
    userId: 'user-6',
    roomId: '',
    joinDate: '2025-02-15',
    aadhaar: '6789-0123-4567',
    dob: '2005-07-30',
    gender: 'Female',
    address: '777 Cedar Ave, City',
    emergencyContact: '4321098765',
    status: 'ACTIVE',
  },
];
