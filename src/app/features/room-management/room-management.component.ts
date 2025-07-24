// ...existing code...
import { MockStudentService } from '../../features/student-management/mock-student.service';
import { Student } from '../../features/student-management/mock-students';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRoomService } from '../../service/mock-room.service';
import { Room } from '../../mock-data/mock-rooms';
import { MOCK_HOUSES } from '../../mock-data/mock-houses';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-room-management',
  standalone: true,
imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.scss'
})
export class RoomManagementComponent implements OnInit {
  getOccupiedCount(room: Room): number {
    return this.getStudentsForRoom(room.id).length;
  }

  isRoomFull(room: Room): boolean {
    return this.getOccupiedCount(room) >= room.capacity;
  }
isTableView: boolean = false; // Only one toggle property should exist
// ...existing code...
  openAddStudentModal() {
    // TODO: Implement add student modal or navigation
    alert('Add Student modal would open here.');
  }
  // Filter/search state
  searchText: string = '';
  selectedType: string = '';
  selectedStatus: string = '';
  filteredRooms: Room[] = [];

  // For expandable student list in room card
  showStudents: { [roomId: string]: boolean } = {};

  // Get students assigned to a room
  getStudentsForRoom(roomId: string): Student[] {
    if (!this.allStudents || this.allStudents.length === 0) return [];
    return this.allStudents.filter(s => s.roomId === roomId);
  }

  applyFilters() {
    this.filteredRooms = this.rooms.filter(room => {
      const matchesText = this.searchText === '' || (room.roomNumber + '').toLowerCase().includes(this.searchText.toLowerCase());
      const matchesType = this.selectedType === '' || room.roomType === this.selectedType;
      const matchesStatus = this.selectedStatus === '' || room.status === this.selectedStatus;
      return matchesText && matchesType && matchesStatus;
    });
  }

  houseNameMap: { [houseId: string]: string } = {};
  houseId: string | null = null;
  rooms: Room[] = [];
  allMode = false;

  showForm = false;
  isEditMode = false;
  formRoom: any = {};
  formError = '';

  // Assign student modal state
  showAssignModal = false;
  assignRoomId: string | null = null;
  selectedStudentId: string = '';
  assignError: string = '';
  assignSuccess: string = '';
  availableStudents: Student[] = [];
  allStudents: Student[] = [];
  isLoadingStudents = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: MockRoomService,
    private authService: AuthService,
    private studentService: MockStudentService
  ) {}
  openAssignStudent(roomId: string) {
    this.assignRoomId = roomId;
    this.selectedStudentId = '';
    this.assignError = '';
    this.showAssignModal = true;
    this.isLoadingStudents = true;
    this.studentService.getStudents().subscribe(students => {
      this.availableStudents = students.filter(s => !s.roomId || s.roomId === '');
      this.isLoadingStudents = false;
    });
  }

  cancelAssignStudent() {
    this.showAssignModal = false;
    this.assignRoomId = null;
    this.selectedStudentId = '';
    this.assignError = '';
    this.assignSuccess = '';
  }

  confirmAssignStudent() {
    if (!this.selectedStudentId || !this.assignRoomId) {
      this.assignError = 'Please select a student.';
      return;
    }
    this.studentService.getStudentById(this.selectedStudentId).subscribe(student => {
      if (student) {
        const updated = { ...student, roomId: this.assignRoomId ? this.assignRoomId.toString() : '' };
        this.studentService.updateStudent(updated).subscribe(() => {
          this.assignSuccess = 'Student assigned successfully!';
          setTimeout(() => {
            this.showAssignModal = false;
            this.assignRoomId = null;
            this.selectedStudentId = '';
            this.assignError = '';
            this.assignSuccess = '';
          }, 1200);
        });
      }
    });
  }
  goToRoomStudents(roomId: string) {
    console.log('[RoomManagement] Navigating to students for roomId:', roomId);
    this.router.navigate(['/students'], { queryParams: { roomId } });
  }

  // Load rooms for a specific house (when coming from House Management)
  loadRoomsByHouse() {
    if (!this.houseId) return;
    this.roomService.getRoomsByHouse(this.houseId).subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.applyFilters();
    });
  }

  // Load all rooms for the current owner (when not coming from a specific house)
  loadAllRooms() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.rooms = [];
      this.applyFilters();
      return;
    }
    this.roomService.getAllRoomsByOwner(Number(user.id)).subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.applyFilters();
    });
  }

  get availableHouses() {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    return MOCK_HOUSES.filter(h => h.ownerId === Number(user.id));
  }


  ngOnInit() {
    this.buildHouseNameMap();
    // Load all students for room card display
    this.studentService.getStudents().subscribe(students => {
      this.allStudents = students;
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

  buildHouseNameMap() {
    this.houseNameMap = {};
    MOCK_HOUSES.forEach(h => {
      this.houseNameMap[h.id.toString()] = h.name;
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
    // Always store houseId as string
    this.formRoom.houseId = this.formRoom.houseId?.toString();
    if (this.isEditMode) {
      this.roomService.updateRoom(this.formRoom).subscribe(() => {
        this.buildHouseNameMap();
        this.showForm = false;
        this.reloadRooms();
      });
    } else {
      this.roomService.addRoom(this.formRoom).subscribe(() => {
        this.buildHouseNameMap();
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
      houseId: ''
    };
    this.formError = '';
    this.showForm = true;
  }

  openEditRoom(room: Room) {
    this.isEditMode = true;
    // Ensure houseId is a string and matches the select options
    this.formRoom = { ...room, houseId: room.houseId ? room.houseId.toString() : '' };
    this.formError = '';
    this.showForm = true;
  }
  // Get the house name for the currently selected houseId in the form
  get selectedHouseName(): string {
    if (!this.formRoom || !this.formRoom.houseId) return '';
    return this.houseNameMap[this.formRoom.houseId] || '';
  }
}
