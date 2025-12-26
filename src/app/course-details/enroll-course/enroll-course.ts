import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../details-card/session.service';
import { CandidateService } from './candidate.service';
import { type CandidateModel } from '../../models/candidate.model';

@Component({
  selector: 'app-enroll-course',
  imports: [FormsModule],
  templateUrl: './enroll-course.html',
  styleUrl: './enroll-course.css',
})
export class EnrollCourse {
  sessionID = input.required<number>();
  courseID = input.required<number>();
  fName!: string;
  lName!: string;
  email!: string;
  idNum!: string;
  pd!: string;

  constructor(
    private sessionService: SessionService,
    private candidateService: CandidateService,
  ) {}

  // Hide the sign-up form
  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(true);
  }

  // Inform the parent componenet with the selected session
  onSubmit() {
    if (
      this.fName !== undefined &&
      this.lName !== undefined &&
      this.email !== undefined &&
      this.idNum !== undefined &&
      this.pd !== undefined
    ) {
      let candidate: CandidateModel = {
        id: this.candidateService.getLastId() + 1,
        firstName: this.fName,
        lastName: this.lName,
        email: this.email,
        CIN: this.idNum,
        photo: '',
        password: this.pd,
      };
      this.candidateService.addNewCandidate(candidate);
      this.sessionService.addNewLearner(this.courseID(), this.sessionID());
      this.onHideDialog();
      this.fName = '';
      this.lName = '';
      this.email = '';
      this.idNum = '';
      this.pd = '';
    }
  }
}
