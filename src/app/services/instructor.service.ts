import { Injectable, signal } from '@angular/core';
import { InstructorModel } from '../models/instructor.model';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private instructorsList = signal<InstructorModel[]>([
    {
      id: 1,
      firstName: 'Karim',
      lastName: 'Bouaziz',
      email: 'karim.bouaziz@example.com',
      phone: '50111222',
      CIN: '09887766',
      photo: 'img/avatars/avatar2.png',
      CV: 'cv/cv.pdf',
      skills: ['Java', 'Spring Boot', 'Software Architecture'],
    },
    {
      id: 2,
      firstName: 'Sarra',
      lastName: 'Triki',
      email: 'sarra.triki@example.com',
      phone: '55443322',
      CIN: '12345678',
      photo: 'img/avatars/avatar1.png',
      CV: 'cv/cv.pdf',
      skills: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    },
    {
      id: 3,
      firstName: 'Walid',
      lastName: 'Ksibi',
      email: 'walid.ksibi@example.com',
      phone: '20998844',
      CIN: '33445566',
      photo: 'img/avatars/avatar4.png',
      CV: 'cv/cv.pdf',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
    },
    {
      id: 4,
      firstName: 'Amira',
      lastName: 'Hammami',
      email: 'amira.hammami@example.com',
      phone: '99887766',
      CIN: '22113355',
      photo: 'img/avatars/avatar3.png',
      CV: 'cv/cv.pdf',
      skills: ['MySQL', 'PostgreSQL', 'SQL Queries'],
    },
    {
      id: 5,
      firstName: 'Youssef',
      lastName: 'Mansour',
      email: 'youssef.mansour@example.com',
      phone: '50334455',
      CIN: '77889966',
      photo: 'img/avatars/avatar2.png',
      CV: 'cv/cv.pdf',
      skills: ['Clean Code', 'SOLID', 'Design Patterns'],
    },
  ]);

  constructor() {
    const instructor = localStorage.getItem('instructors');
    if (instructor) this.instructorsList.set(JSON.parse(instructor));
  }

  getInstructors() {
    return this.instructorsList();
  }

  getInstructor(instructorId: number) {
    return this.instructorsList().filter((instructor) => instructor['id'] === instructorId);
  }

  addNewInstructor(instructor: InstructorModel) {
    this.instructorsList().push(instructor);
    this.saveSessions();
  }

  updateInstructor(instructor: InstructorModel) {
    let instructorIndex = this.instructorsList().findIndex((i) => i.id === instructor.id);
    this.instructorsList()[instructorIndex] = instructor;
    this.saveSessions();
  }

  removeInstructor(instructorId: number) {
    this.instructorsList.set(
      this.instructorsList().filter((instructor) => instructor.id !== instructorId),
    );
    this.saveSessions();
  }

  getLastId() {
    return this.instructorsList().length !== 0
      ? this.instructorsList()[this.instructorsList().length - 1].id
      : 0;
  }

  saveSessions() {
    const instructor = JSON.stringify(this.instructorsList());
    localStorage.setItem('instructors', instructor);
  }
}
