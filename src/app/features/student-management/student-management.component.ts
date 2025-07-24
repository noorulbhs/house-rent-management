import { MatDividerModule } from '@angular/material/divider';
// ...existing code...
import { Component, OnInit } from '@angular/core';
import { MockRoomService } from '../../service/mock-room.service';
import { Room } from '../../mock-data/mock-rooms';
import { MOCK_HOUSES } from '../../mock-data/mock-houses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MockStudentService } from './mock-student.service';
import { Student } from './mock-students';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatDividerModule
  ],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.scss'
})
export class StudentManagementComponent implements OnInit {
  hasOutstandingDues(student: Student | null): boolean {
    if (!student || !student.rentHistory) return false;
    return student.rentHistory.some(payment => payment && payment.status === 'DUE');
  }
  transferRoom(student: Student) {
    alert('Transfer Room feature coming soon!');
  }
  vacateStudent(student: Student) {
    alert('Vacate feature coming soon!');
  }
  generateReport(student: Student) {
    alert('Generate Report feature coming soon!');
  }
  rooms: Room[] = [];
  houseNameMap: { [houseId: string]: string } = {};
  students: Student[] = [];
  selectedStudent: Student | null = null;
  loading = false;
  roomId: string | null = null;

  showForm = false;
  isEditMode = false;
  formStudent: any = {};
  formError = '';

  reloadStudents() {
    this.loadStudents();
  }

  // Helper to get room and house name for a given roomId
  getRoomDisplay(roomId: string): string {
    const room = this.rooms.find((r: any) => r.id === roomId);
    if (!room) return roomId;
    const house = this.houseNameMap && room.houseId ? this.houseNameMap[room.houseId] : '';
    return `Room ${room.roomNumber} - ${house}`;
  }

  openAddStudent() {
    this.isEditMode = false;
    this.formStudent = {
      id: '',
      userId: '',
      roomId: this.roomId || '',
      joinDate: '',
      aadhaar: '',
      dob: '',
      gender: '',
      address: '',
      emergencyContact: '',
      status: 'ACTIVE',
    };
    this.formError = '';
    this.showForm = true;
    this.loadRooms();
  }

  openEditStudent(student: Student) {
    this.isEditMode = true;
    this.formStudent = { ...student };
    this.formError = '';
    this.showForm = true;
    this.loadRooms();
  }
  loadRooms() {
    // Load all rooms and build house name map
    this.roomService.getAllRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.houseNameMap = {};
      MOCK_HOUSES.forEach(h => {
        this.houseNameMap[h.id.toString()] = h.name;
      });
    });
  }

  cancelForm() {
    this.showForm = false;
    this.formStudent = {};
    this.formError = '';
  }

  saveStudent() {
    // Validate required fields
    const s = this.formStudent;
    if (!s.userId || !s.aadhaar || !s.dob || !s.gender || !s.address || !s.emergencyContact || !s.roomId || !s.status || !s.joinDate) {
      this.formError = 'All fields are required.';
      return;
    }
    // If adding, generate a new id
    if (!this.isEditMode) {
      s.id = 'student-' + Math.floor(Math.random() * 1000000);
      this.studentService.addStudent(s).subscribe(() => {
        this.showForm = false;
        this.reloadStudents();
      });
    } else {
      this.studentService.updateStudent(s).subscribe(() => {
        this.showForm = false;
        this.reloadStudents();
      });
    }
  }

  deleteStudent(student: Student) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(student.id).subscribe(() => {
        this.reloadStudents();
      });
    }
  }

  constructor(
    private studentService: MockStudentService,
    private route: ActivatedRoute,
    private roomService: MockRoomService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.roomId = params.get('roomId');
      console.log('[StudentManagement] Query param roomId:', this.roomId);
      this.loadStudents();
    });
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe(students => {
      console.log('[StudentManagement] All students:', students);
      if (this.roomId) {
        this.students = students.filter(s => s.roomId === this.roomId);
        console.log('[StudentManagement] Filtered students for roomId', this.roomId, this.students);
      } else {
        this.students = students;
        console.log('[StudentManagement] Showing all students');
      }
      this.loading = false;
    });
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
  }

  backToList() {
    this.selectedStudent = null;
  }
}
