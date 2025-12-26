import { Injectable, signal } from '@angular/core';
import { CandidateModel } from './candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidatesList = signal<CandidateModel[]>([
    {
      id: 1,
      firstName: 'Amine',
      lastName: 'Gharbi',
      email: 'amine.gharbi@example.com',
      CIN: '09876543',
      photo: 'assets/photos/amine.jpg',
      password: 'pass1234',
    },
    {
      id: 2,
      firstName: 'Sara',
      lastName: 'Mansouri',
      email: 'sara.mansouri@example.com',
      CIN: '11223344',
      photo: 'assets/photos/sara.jpg',
      password: 'saraPass!9',
    },
    {
      id: 3,
      firstName: 'Mohamed',
      lastName: 'Trabelsi',
      email: 'mohamed.trabelsi@example.com',
      CIN: '55667788',
      photo: 'assets/photos/mohamed.jpg',
      password: 'mhmd2025',
    },
    {
      id: 4,
      firstName: 'Yosra',
      lastName: 'Ben Ali',
      email: 'yosra.benali@example.com',
      CIN: '22334455',
      photo: 'assets/photos/yosra.jpg',
      password: 'yosraSecure1',
    },
    {
      id: 5,
      firstName: 'Khalil',
      lastName: 'Saidi',
      email: 'khalil.saidi@example.com',
      CIN: '66778899',
      photo: 'assets/photos/khalil.jpg',
      password: 'khalilDev!3',
    },
  ]);

  constructor() {
    const candidate = localStorage.getItem('candidates');
    if (candidate) this.candidatesList.set(JSON.parse(candidate));
  }

  getCandidates() {
    return this.candidatesList();
  }

  getCandidate(candidateId: number) {
    return this.candidatesList().filter((candidate) => candidate['id'] === candidateId);
  }

  addNewCandidate(candidate: CandidateModel) {
    this.candidatesList().push(candidate);
    this.saveSessions();
  }

  updateCandidate(candidate: CandidateModel) {
    let candidateIndex = this.candidatesList().findIndex((c) => c.id === candidate.id);
    this.candidatesList()[candidateIndex] = candidate;
    this.saveSessions();
  }

  removeCandidate(candidateId: number) {
    this.candidatesList.set(
      this.candidatesList().filter((candidate) => candidate.id !== candidateId),
    );
    this.saveSessions();
  }

  getLastId() {
    return this.candidatesList().length !== 0
      ? this.candidatesList()[this.candidatesList().length - 1].id
      : 0;
  }

  saveSessions() {
    const candidate = JSON.stringify(this.candidatesList());
    localStorage.setItem('candidates', candidate);
  }
}
