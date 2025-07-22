// mock-rooms.ts
// Mock data and interface for rooms used by MockRoomService

export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
export type RoomType = 'SINGLE' | 'DOUBLE' | 'TRIPLE';

export interface Room {
  id: string;
  roomNumber: string;
  houseId: string;
  roomType: RoomType;
  capacity: number;
  rentAmount: number;
  status: RoomStatus;
}

export const MOCK_ROOMS: Room[] = [
  {
    id: 'r1',
    roomNumber: '101',
    houseId: '1',
    roomType: 'SINGLE',
    capacity: 1,
    rentAmount: 5000,
    status: 'AVAILABLE'
  },
  {
    id: 'r2',
    roomNumber: '102',
    houseId: '1',
    roomType: 'DOUBLE',
    capacity: 2,
    rentAmount: 8000,
    status: 'OCCUPIED'
  },
  {
    id: 'r3',
    roomNumber: '201',
    houseId: '2',
    roomType: 'TRIPLE',
    capacity: 3,
    rentAmount: 12000,
    status: 'MAINTENANCE'
  }
];
