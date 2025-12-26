import { Injectable, signal } from '@angular/core';
import { Language, SessionModel } from '../session-details/session.model';
import { forEachChild } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionsList = signal<SessionModel[]>([
    // Course 1
    {
      id: 1,
      courseId: 1,
      location: 'Tunis',
      startingDate: '2025-01-10',
      finishingDate: '2025-01-12',
      language: Language.French,
      enrolledPlaces: 15,
    },
    {
      id: 2,
      courseId: 1,
      location: 'Sousse',
      startingDate: '2025-02-05',
      finishingDate: '2025-02-07',
      language: Language.English,
      enrolledPlaces: 4,
    },

    // Course 2
    {
      id: 3,
      courseId: 2,
      location: 'Online',
      startingDate: '2025-03-01',
      finishingDate: '2025-03-03',
      language: Language.French,
      enrolledPlaces: 12,
    },
    {
      id: 4,
      courseId: 2,
      location: 'Tunis',
      startingDate: '2025-03-20',
      finishingDate: '2025-03-22',
      language: Language.French,
      enrolledPlaces: 7,
    },

    // Course 3
    {
      id: 5,
      courseId: 3,
      location: 'Sfax',
      startingDate: '2025-04-02',
      finishingDate: '2025-04-05',
      language: Language.English,
      enrolledPlaces: 5,
    },
    {
      id: 6,
      courseId: 3,
      location: 'Online',
      startingDate: '2025-04-15',
      finishingDate: '2025-04-17',
      language: Language.French,
      enrolledPlaces: 9,
    },

    // Course 4
    {
      id: 7,
      courseId: 4,
      location: 'Tunis',
      startingDate: '2025-05-10',
      finishingDate: '2025-05-12',
      language: Language.English,
      enrolledPlaces: 1,
    },
    {
      id: 8,
      courseId: 4,
      location: 'Sousse',
      startingDate: '2025-05-25',
      finishingDate: '2025-05-27',
      language: Language.French,
      enrolledPlaces: 4,
    },

    // Course 5
    {
      id: 9,
      courseId: 5,
      location: 'Online',
      startingDate: '2025-06-01',
      finishingDate: '2025-06-03',
      language: Language.English,
      enrolledPlaces: 3,
    },
    {
      id: 10,
      courseId: 5,
      location: 'Tunis',
      startingDate: '2025-06-15',
      finishingDate: '2025-06-17',
      language: Language.French,
      enrolledPlaces: 8,
    },

    // Course 6
    {
      id: 11,
      courseId: 6,
      location: 'Sfax',
      startingDate: '2025-07-05',
      finishingDate: '2025-07-07',
      language: Language.French,
      enrolledPlaces: 6,
    },
    {
      id: 12,
      courseId: 6,
      location: 'Online',
      startingDate: '2025-07-20',
      finishingDate: '2025-07-22',
      language: Language.English,
      enrolledPlaces: 2,
    },

    // Extra session (any course to reach 13)
    {
      id: 13,
      courseId: 3,
      location: 'Tunis',
      startingDate: '2025-08-01',
      finishingDate: '2025-08-03',
      language: Language.English,
      enrolledPlaces: 10,
    },
  ]);

  constructor() {
    const sessions = localStorage.getItem('sessions');
    if (sessions) this.sessionsList.set(JSON.parse(sessions));
  }

  getSession() {
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
    console.log(this.sessionsList()[selectedSession].enrolledPlaces);
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

  saveSessions() {
    const sessions = JSON.stringify(this.sessionsList());
    localStorage.setItem('sessions', sessions);
  }
}
