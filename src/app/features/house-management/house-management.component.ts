import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MockHouseService } from '../../service/mock-house.service';
import { House } from '../../mock-data/mock-houses';
import { MOCK_ROOMS, Room } from '../../mock-data/mock-rooms';
import { MOCK_STUDENTS, Student } from '../student-management/mock-students';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './house-management.component.html',
  styleUrl: './house-management.component.scss'
})
export class HouseManagementComponent implements OnInit {
  houses: House[] = [];
  filteredHouses: House[] = [];
  ownerId = 1;

  // Filter/search state
  searchText: string = '';
  selectedCity: string = '';
  availableCities: string[] = [];

  // View toggle state
  viewMode: 'grid' | 'table' = 'grid';

  setViewMode(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  // For add/edit form
  showForm = false;
  isEdit = false;
  formHouse: Partial<House> = { name: '', address: '', rooms: 1 };
  editIndex: number | null = null;

  constructor(private houseService: MockHouseService, private router: Router) {}

  goToRooms(house: House) {
    this.router.navigate(['/rooms', house.id]);
  }

  getHouseRooms(houseId: number): Room[] {
    return MOCK_ROOMS.filter(r => Number(r.houseId) === Number(houseId));
  }

  getOccupiedRooms(houseId: number): number {
    return this.getHouseRooms(houseId).filter(r => r.status === 'OCCUPIED').length;
  }

  getTotalRooms(house: House): number {
    return house.rooms;
  }

  getHouseRent(houseId: number): number {
    return this.getHouseRooms(houseId).reduce((sum, r) => sum + r.rentAmount, 0);
  }

  getNextRentDue(houseId: number): string {
    // Mock: always return 5th of next month
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 5);
    return nextMonth.toLocaleDateString();
  }

  getHouseStatus(houseId: number): string {
    const rooms = this.getHouseRooms(houseId) || [];
    if (rooms.length === 0) return 'No Rooms';
    const occupied = rooms.filter((r: any) => r.status === 'OCCUPIED').length;
    const available = rooms.filter((r: any) => r.status === 'AVAILABLE').length;
    const maintenance = rooms.filter((r: any) => r.status === 'MAINTENANCE').length;
    if (occupied === rooms.length) return 'Full';
    if (available === rooms.length) return 'Available';
    if (maintenance === rooms.length) return 'Maintenance';
    return 'Mixed';
  }

  ngOnInit() {
    this.loadHouses();
  }

  loadHouses() {
    this.houseService.getHousesByOwner(this.ownerId).subscribe(houses => {
      this.houses = houses;
      this.availableCities = Array.from(new Set(houses.map(h => this.extractCity(h.address))).values());
      this.applyFilters();
    });
  }

  extractCity(address: string): string {
    // Simple extraction: assumes city is last word before comma
    if (!address) return '';
    const parts = address.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : '';
  }

  applyFilters() {
    this.filteredHouses = this.houses.filter(house => {
      const matchesSearch = this.searchText.trim() === '' ||
        house.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        String(house.id).includes(this.searchText);
      const matchesCity = this.selectedCity === '' ||
        this.extractCity(house.address) === this.selectedCity;
      return matchesSearch && matchesCity;
    });
  }

  openAddForm() {
    this.showForm = true;
    this.isEdit = false;
    this.formHouse = { name: '', address: '', rooms: 1 };
    this.editIndex = null;
  }

  openEditForm(house: House, index: number) {
    this.showForm = true;
    this.isEdit = true;
    this.formHouse = { ...house };
    this.editIndex = index;
  }

  saveHouse() {
    if (this.isEdit && this.editIndex !== null) {
      // Edit
      const updated = { ...this.formHouse, ownerId: this.ownerId, id: this.houses[this.editIndex].id } as House;
      this.houseService.updateHouse(updated).subscribe(() => {
        this.loadHouses();
        this.showForm = false;
      });
    } else {
      // Add
      const newHouse = { ...this.formHouse, ownerId: this.ownerId } as House;
      this.houseService.addHouse(newHouse).subscribe(() => {
        this.loadHouses();
        this.showForm = false;
      });
    }
  }

  deleteHouse(house: House) {
    if (confirm('Delete this house?')) {
      this.houseService.deleteHouse(house.id).subscribe(() => {
        this.loadHouses();
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.formHouse = { name: '', address: '', rooms: 1 };
    this.editIndex = null;
  }


  duplicateHouse(house: House) {
    // Open add form pre-filled with house details (except id)
    this.showForm = true;
    this.isEdit = false;
    this.formHouse = {
      name: house.name + ' (Copy)',
      address: house.address,
      rooms: house.rooms
    };
    this.editIndex = null;
  }
}
