import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../details-card/session.service';

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

  constructor(private sessionService: SessionService) {}

  // Hide the sign-up form
  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    console.log(this.fName);
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
      console.log(this.fName);
      this.sessionService.addNewLearner(this.courseID(), this.sessionID());
      this.onHideDialog();
    }
  }
}
