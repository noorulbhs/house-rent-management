
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_HOUSES, House } from '../mock-data/mock-houses';

@Injectable({ providedIn: 'root' })
export class MockHouseService {
  getHousesByOwner(ownerId: number): Observable<House[]> {
    return of(MOCK_HOUSES.filter(h => h.ownerId === ownerId));
  }

  addHouse(house: Partial<House>): Observable<House> {
    // Simulate auto-increment id
    const newId = Math.max(...MOCK_HOUSES.map(h => h.id), 0) + 1;
    const newHouse = { ...house, id: newId } as House;
    MOCK_HOUSES.push(newHouse);
    return of(newHouse);
  }

  updateHouse(house: House): Observable<House> {
    const idx = MOCK_HOUSES.findIndex(h => h.id === house.id);
    if (idx > -1) {
      MOCK_HOUSES[idx] = { ...house };
    }
    return of(house);
  }

  deleteHouse(id: number): Observable<boolean> {
    const idx = MOCK_HOUSES.findIndex(h => h.id === id);
    if (idx > -1) {
      MOCK_HOUSES.splice(idx, 1);
      return of(true);
    }
    return of(false);
  }
}
