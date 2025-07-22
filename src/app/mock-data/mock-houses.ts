// mock-houses.ts
// Mock data and interface for houses used by MockHouseService

export interface House {
  id: number;
  name: string;
  address: string;
  rooms: number;
  ownerId: number;
}

export const MOCK_HOUSES: House[] = [
  {
    id: 1,
    name: 'Sunrise Villa',
    address: '123 Main St, Cityville',
    rooms: 10,
    ownerId: 1
  },
  {
    id: 2,
    name: 'Green Acres',
    address: '456 Oak Ave, Townsville',
    rooms: 8,
    ownerId: 1
  },
  {
    id: 3,
    name: 'Blue Haven',
    address: '789 Pine Rd, Villagetown',
    rooms: 12,
    ownerId: 2
  }
];
