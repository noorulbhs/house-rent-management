import { User } from '../core/auth.service';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'abc@abc.com',
    phone: '9999999999',
    password: '123',
    role: 'OWNER',
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Jane Student',
    email: 'student@example.com',
    phone: '8888888888',
    password: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE'
  },
  {
    id: '3',
    name: 'Alice Admin',
    email: 'admin@example.com',
    phone: '7777777777',
    password: 'admin123',
    role: 'ADMIN',
    status: 'ACTIVE'
  }
];
