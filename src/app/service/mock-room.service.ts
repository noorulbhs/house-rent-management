import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_ROOMS, Room } from '../mock-data/mock-rooms';
import { MOCK_HOUSES } from '../mock-data/mock-houses';

@Injectable({ providedIn: 'root' })
export class MockRoomService {

  getRoomsByHouse(houseId: string): Observable<Room[]> {
    return of(MOCK_ROOMS.filter(r => r.houseId === houseId));
  }

  getAllRoomsByOwner(ownerId: number): Observable<Room[]> {
    // Find all house IDs for this owner
    const houseIds = MOCK_HOUSES.filter(h => h.ownerId === ownerId).map(h => h.id.toString());
    return of(MOCK_ROOMS.filter(r => houseIds.includes(r.houseId)));
  }

  getAllRooms(): Observable<Room[]> {
    return of(MOCK_ROOMS);
  }

  addRoom(room: Partial<Room>): Observable<Room> {
    const newId = 'r' + (MOCK_ROOMS.length + 1);
    const newRoom = { ...room, id: newId } as Room;
    MOCK_ROOMS.push(newRoom);
    return of(newRoom);
  }

  updateRoom(room: Room): Observable<Room> {
    const idx = MOCK_ROOMS.findIndex(r => r.id === room.id);
    if (idx > -1) {
      MOCK_ROOMS[idx] = { ...room };
    }
    return of(room);
  }

  deleteRoom(id: string): Observable<boolean> {
    const idx = MOCK_ROOMS.findIndex(r => r.id === id);
    if (idx > -1) {
      MOCK_ROOMS.splice(idx, 1);
      return of(true);
    }
    return of(false);
  }
}
