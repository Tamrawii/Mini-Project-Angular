import { Component, input, output, signal, OnInit } from '@angular/core';
import { CandidateService } from '../../../course-details/enroll-course/candidate.service';
import { CandidateModel } from '../../../course-details/enroll-course/candidate.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-learner',
  imports: [FormsModule],
  templateUrl: './update-learner.html',
  styleUrl: './update-learner.css',
})
export class UpdateLearner implements OnInit {
  learnerData = input<CandidateModel>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    CIN: '',
    photo: '',
    password: '',
  });
  fName!: string;
  lName!: string;
  email!: string;
  idNum!: string;

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.fName = this.learnerData().firstName;
    this.lName = this.learnerData().lastName;
    this.email = this.learnerData().email;
    this.idNum = this.learnerData().CIN;
  }

  // Hide the sign-up form
  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  // Inform the parent componenet with the selected session
  onSubmit() {
    if (
      this.fName !== undefined &&
      this.lName !== undefined &&
      this.email !== undefined &&
      this.idNum !== undefined
    ) {
      let candidate: CandidateModel = {
        id: this.learnerData().id,
        firstName: this.fName,
        lastName: this.lName,
        email: this.email,
        CIN: this.idNum,
        photo: '',
        password: this.learnerData().password,
      };

      this.candidateService.updateCandidate(candidate);
      this.onHideDialog();
    }
  }
}
