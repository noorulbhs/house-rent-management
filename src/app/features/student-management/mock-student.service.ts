import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student, MOCK_STUDENTS } from './mock-students';

@Injectable({ providedIn: 'root' })
export class MockStudentService {
  getStudents(): Observable<Student[]> {
    return of(MOCK_STUDENTS);
  }

  getStudentById(id: string): Observable<Student | undefined> {
    return of(MOCK_STUDENTS.find(s => s.id === id));
  }

  addStudent(student: Student): Observable<void> {
    MOCK_STUDENTS.push(student);
    return of();
  }

  updateStudent(student: Student): Observable<void> {
    const idx = MOCK_STUDENTS.findIndex(s => s.id === student.id);
    if (idx > -1) MOCK_STUDENTS[idx] = student;
    return of();
  }

  deleteStudent(id: string): Observable<void> {
    const idx = MOCK_STUDENTS.findIndex(s => s.id === id);
    if (idx > -1) MOCK_STUDENTS.splice(idx, 1);
    return of();
  }
}
