import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockHouseService } from '../../service/mock-house.service';
import { House } from '../../mock-data/mock-houses';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './house-management.component.html',
  styleUrl: './house-management.component.scss'
})
export class HouseManagementComponent implements OnInit {
  houses: House[] = [];
  ownerId = 1;

  // For add/edit form
  showForm = false;
  isEdit = false;
  formHouse: Partial<House> = { name: '', address: '', rooms: 1 };
  editIndex: number | null = null;

  constructor(private houseService: MockHouseService, private router: Router) {}

  goToRooms(house: House) {
    this.router.navigate(['/rooms', house.id]);
  }

  ngOnInit() {
    this.loadHouses();
  }

  loadHouses() {
    this.houseService.getHousesByOwner(this.ownerId).subscribe(houses => {
      this.houses = houses;
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
}
