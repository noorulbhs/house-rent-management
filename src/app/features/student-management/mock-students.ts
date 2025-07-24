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
  rentHistory?: Array<{
    month: string;
    amount: number;
    paidDate: string;
    status: 'PAID' | 'DUE' | 'OVERDUE';
  }>;
  miscCharges?: Array<{
    description: string;
    amount: number;
    status: 'PAID' | 'DUE';
  }>;
  documents?: Array<{
    name: string;
    url?: string;
  }>;
  timeline?: Array<{
    title: string;
    date: string;
    description: string;
  }>;
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
    rentHistory: [
      { month: 'June 2025', amount: 5000, paidDate: '2025-06-05', status: 'PAID' },
      { month: 'July 2025', amount: 5000, paidDate: '', status: 'DUE' },
    ],
    miscCharges: [
      { description: 'Late Fee', amount: 200, status: 'DUE' },
      { description: 'Key Replacement', amount: 150, status: 'PAID' }
    ],
    documents: [
      { name: 'Aadhaar Card', url: 'https://example.com/amit-aadhaar.pdf' },
      { name: 'College ID' }
    ],
    timeline: [
      { title: 'Room Assigned', date: '2024-06-01', description: 'Assigned to Room r1.' },
      { title: 'Rent Paid', date: '2025-06-05', description: 'Paid rent for June 2025.' },
      { title: 'Late Fee Incurred', date: '2025-07-10', description: 'Late fee applied for July.' }
    ]
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
