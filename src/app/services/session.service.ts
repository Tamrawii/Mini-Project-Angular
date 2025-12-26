import { Injectable, signal } from '@angular/core';
import { Language, SessionModel } from '../models/session.model';
import { InstructorService } from './instructor.service';
import { InstructorModel } from '../models/instructor.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private instructorList = signal<InstructorModel[]>([]);

  private sessionsList = signal<SessionModel[]>([]);

  constructor(private instructorService: InstructorService) {
    this.instructorList.set(instructorService.getInstructors());
    this.sessionsList.set([
      {
        id: 1,
        courseId: 1,
        instructors: [this.instructorList()[0], this.instructorList()[1]],
        location: 'Tunis',
        startingDate: '2025-01-10',
        finishingDate: '2025-01-12',
        language: Language.French,
        enrolledPlaces: 15,
      },
      {
        id: 2,
        courseId: 1,
        instructors: [this.instructorList()[2], this.instructorList()[3]],
        location: 'Sousse',
        startingDate: '2025-02-05',
        finishingDate: '2025-02-07',
        language: Language.English,
        enrolledPlaces: 4,
      },

      {
        id: 3,
        courseId: 2,
        instructors: [this.instructorList()[0], this.instructorList()[3]],
        location: 'Online',
        startingDate: '2025-03-01',
        finishingDate: '2025-03-03',
        language: Language.French,
        enrolledPlaces: 12,
      },
      {
        id: 4,
        courseId: 2,
        instructors: [this.instructorList()[2], this.instructorList()[4]],
        location: 'Tunis',
        startingDate: '2025-03-20',
        finishingDate: '2025-03-22',
        language: Language.French,
        enrolledPlaces: 7,
      },

      {
        id: 5,
        courseId: 3,
        instructors: [this.instructorList()[4], this.instructorList()[1]],
        location: 'Sfax',
        startingDate: '2025-04-02',
        finishingDate: '2025-04-05',
        language: Language.English,
        enrolledPlaces: 5,
      },
      {
        id: 6,
        courseId: 3,
        instructors: [this.instructorList()[3], this.instructorList()[4]],
        location: 'Online',
        startingDate: '2025-04-15',
        finishingDate: '2025-04-17',
        language: Language.French,
        enrolledPlaces: 9,
      },

      {
        id: 7,
        courseId: 4,
        instructors: [this.instructorList()[2], this.instructorList()[4]],
        location: 'Tunis',
        startingDate: '2025-05-10',
        finishingDate: '2025-05-12',
        language: Language.English,
        enrolledPlaces: 1,
      },
      {
        id: 8,
        courseId: 4,
        instructors: [this.instructorList()[3], this.instructorList()[2]],
        location: 'Sousse',
        startingDate: '2025-05-25',
        finishingDate: '2025-05-27',
        language: Language.French,
        enrolledPlaces: 4,
      },

      {
        id: 9,
        courseId: 5,
        instructors: [this.instructorList()[0], this.instructorList()[3]],
        location: 'Online',
        startingDate: '2025-06-01',
        finishingDate: '2025-06-03',
        language: Language.English,
        enrolledPlaces: 3,
      },
      {
        id: 10,
        courseId: 5,
        instructors: [this.instructorList()[3], this.instructorList()[1]],
        location: 'Tunis',
        startingDate: '2025-06-15',
        finishingDate: '2025-06-17',
        language: Language.French,
        enrolledPlaces: 8,
      },

      {
        id: 11,
        courseId: 6,
        instructors: [this.instructorList()[0], this.instructorList()[1]],
        location: 'Sfax',
        startingDate: '2025-07-05',
        finishingDate: '2025-07-07',
        language: Language.French,
        enrolledPlaces: 6,
      },
      {
        id: 12,
        courseId: 6,
        instructors: [this.instructorList()[0], this.instructorList()[1]],
        location: 'Online',
        startingDate: '2025-07-20',
        finishingDate: '2025-07-22',
        language: Language.English,
        enrolledPlaces: 2,
      },

      {
        id: 13,
        courseId: 3,
        instructors: [this.instructorList()[0], this.instructorList()[1]],
        location: 'Tunis',
        startingDate: '2025-08-01',
        finishingDate: '2025-08-03',
        language: Language.English,
        enrolledPlaces: 10,
      },
    ]);
    const sessions = localStorage.getItem('sessions');
    if (sessions) this.sessionsList.set(JSON.parse(sessions));
  }

  getSessions() {
    return this.sessionsList();
  }

  getCourseSessions(courseId: number) {
    return this.sessionsList().filter((session) => session['courseId'] === courseId);
  }

  getTotalLearners(courseId: number) {
    let total: number = 0;

    [...this.sessionsList().filter((session) => session.courseId === courseId)].forEach(
      (session) => (total += session.enrolledPlaces),
    );

    return total;
  }

  addNewSession(session: SessionModel) {
    this.sessionsList().push(session);
    this.saveSessions();
  }

  addNewLearner(courseID: number, sessionID: number) {
    let selectedSession = this.sessionsList().findIndex(
      (session) => session.courseId === +courseID && session.id === sessionID,
    );
    this.sessionsList()[selectedSession].enrolledPlaces++;
    this.saveSessions();
  }

  updateSession(session: SessionModel) {
    let sessionIndex = this.sessionsList().findIndex((s) => s.id === session.id);
    this.sessionsList()[sessionIndex] = session;
    this.saveSessions();
  }

  getTotalCourseSessions(courseId: number) {
    let total = 0;
    this.sessionsList().forEach((session) => (session.courseId === courseId ? total++ : 0));
    return total;
  }

  getLastId() {
    return this.sessionsList()[this.sessionsList().length - 1].id;
  }

  findInstructors(instructors: number[]) {
    return this.instructorList().filter((instructor) =>
      instructors.find((id) => +id === instructor.id),
    );
  }

  removeSession(sessionId: number) {
    this.sessionsList.set(this.sessionsList().filter((session) => session.id !== sessionId));
    this.saveSessions();
  }

  saveSessions() {
    const sessions = JSON.stringify(this.sessionsList());
    localStorage.setItem('sessions', sessions);
  }
}
