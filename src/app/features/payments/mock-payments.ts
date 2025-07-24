// Mock data for rent bills, payments, and utility charges

export type PaymentStatus = 'PAID' | 'UNPAID' | 'PARTIAL' | 'OVERDUE';

export interface PaymentSummary {
  id: string;
  studentId: string;
  studentName: string;
  room: string;
  month: string;
  rent: number;
  miscCharges: number;
  totalDue: number;
  totalPaid: number;
  status: PaymentStatus;
  receiptUrl?: string;
}

export const MOCK_PAYMENTS: PaymentSummary[] = [
  {
    id: 'pmt-1',
    studentId: 'student-1',
    studentName: 'Amit Sharma',
    room: '101',
    month: 'July 2025',
    rent: 5000,
    miscCharges: 200,
    totalDue: 5200,
    totalPaid: 5000,
    status: 'PARTIAL',
    receiptUrl: 'https://example.com/receipt-amit-july.pdf'
  },
  {
    id: 'pmt-2',
    studentId: 'student-2',
    studentName: 'Priya Singh',
    room: '102',
    month: 'July 2025',
    rent: 5000,
    miscCharges: 0,
    totalDue: 5000,
    totalPaid: 5000,
    status: 'PAID',
    receiptUrl: 'https://example.com/receipt-priya-july.pdf'
  },
  {
    id: 'pmt-3',
    studentId: 'student-3',
    studentName: 'Rahul Verma',
    room: '103',
    month: 'July 2025',
    rent: 5000,
    miscCharges: 100,
    totalDue: 5100,
    totalPaid: 0,
    status: 'UNPAID',
    receiptUrl: ''
  },
  {
    id: 'pmt-4',
    studentId: 'student-4',
    studentName: 'Sara Khan',
    room: '104',
    month: 'July 2025',
    rent: 5000,
    miscCharges: 0,
    totalDue: 5000,
    totalPaid: 0,
    status: 'OVERDUE',
    receiptUrl: ''
  }
];
