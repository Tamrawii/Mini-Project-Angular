import { Component, signal } from '@angular/core';
import { CandidateModel } from '../../course-details/enroll-course/candidate.model';
import { CandidateService } from '../../course-details/enroll-course/candidate.service';
import { UpdateLearner } from './update-learner/update-learner';
@Component({
  selector: 'app-manage-learners',
  imports: [UpdateLearner],
  templateUrl: './manage-learners.html',
  styleUrl: './manage-learners.css',
})
export class ManageLearners {
  candidatesList = signal<CandidateModel[]>([]);
  toggleHidden = signal<boolean>(false);
  selectedLearner = signal<CandidateModel>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    CIN: '',
    photo: '',
    password: '',
  });

  constructor(private candidateService: CandidateService) {
    this.candidatesList.set(candidateService.getCandidates());
  }

  removeCandidate(candidateId: number) {
    this.candidateService.removeCandidate(candidateId);
    this.candidatesList.set(this.candidateService.getCandidates());
  }

  onShowDialog(selectedLearner: CandidateModel) {
    this.toggleHidden.set(true);
    this.selectedLearner.set(selectedLearner);
  }

  onHideDialog(status: boolean) {
    this.toggleHidden.set(status);
    this.candidatesList.set(this.candidateService.getCandidates());
  }
}
