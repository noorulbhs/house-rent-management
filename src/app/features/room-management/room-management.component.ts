import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MockRoomService } from '../../service/mock-room.service';
import { Room } from '../../mock-data/mock-rooms';
import { MOCK_HOUSES } from '../../mock-data/mock-houses';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.scss'
})
export class RoomManagementComponent implements OnInit {
  houseNameMap: { [houseId: string]: string } = {};
  houseId: string | null = null;
  rooms: Room[] = [];
  allMode = false;

  showForm = false;
  isEditMode = false;
  formRoom: any = {};
  formError = '';

  constructor(
    private route: ActivatedRoute,
    private roomService: MockRoomService,
    private authService: AuthService
  ) {}

  // Load rooms for a specific house (when coming from House Management)
  loadRoomsByHouse() {
    if (!this.houseId) return;
    this.roomService.getRoomsByHouse(this.houseId).subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }

  // Load all rooms for the current owner (when not coming from a specific house)
  loadAllRooms() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.rooms = [];
      return;
    }
    this.roomService.getAllRoomsByOwner(Number(user.id)).subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }

  get availableHouses() {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    return MOCK_HOUSES.filter(h => h.ownerId === Number(user.id));
  }


  ngOnInit() {
    // Build a map of houseId to house name for quick lookup
    MOCK_HOUSES.forEach(h => {
      this.houseNameMap[h.id.toString()] = h.name;
    });
    this.route.paramMap.subscribe(params => {
      this.houseId = params.get('houseId');
      this.allMode = !this.houseId;
      if (this.houseId) {
        this.loadRoomsByHouse();
      } else {
        this.loadAllRooms();
      }
    });
  }

  cancelForm() {
    this.showForm = false;
    this.formRoom = {};
    this.formError = '';
  }

  saveRoom() {
    if (!this.formRoom.roomNumber || !this.formRoom.capacity || !this.formRoom.rentAmount || !this.formRoom.status || !this.formRoom.roomType || !this.formRoom.houseId) {
      this.formError = 'All fields are required.';
      return;
    }
    if (this.isEditMode) {
      this.roomService.updateRoom(this.formRoom).subscribe(() => {
        this.showForm = false;
        this.reloadRooms();
      });
    } else {
      this.roomService.addRoom(this.formRoom).subscribe(() => {
        this.showForm = false;
        this.reloadRooms();
      });
    }
  }

  deleteRoom(room: Room) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(room.id).subscribe(() => {
        this.reloadRooms();
      });
    }
  }

  reloadRooms() {
    if (this.houseId) {
      this.loadRoomsByHouse();
    } else {
      this.loadAllRooms();
    }
  }

  openAddRoom() {
    this.isEditMode = false;
    this.formRoom = {
      roomNumber: '',
      roomType: 'SINGLE',
      capacity: 1,
      rentAmount: 0,
      status: 'AVAILABLE',
      houseId: this.houseId || (this.availableHouses.length > 0 ? this.availableHouses[0].id : '')
    };
    this.formError = '';
    this.showForm = true;
  }

  openEditRoom(room: Room) {
    this.isEditMode = true;
    this.formRoom = { ...room };
    this.formError = '';
    this.showForm = true;
  }
}
