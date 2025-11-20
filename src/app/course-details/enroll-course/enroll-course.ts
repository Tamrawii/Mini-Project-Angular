import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enroll-course',
  imports: [FormsModule],
  templateUrl: './enroll-course.html',
  styleUrl: './enroll-course.css',
})
export class EnrollCourse {
  fName!: string;
  lName!: string;
  email!: string;
  idNum!: string;
  pd!: string;
  // Hide the sign-up form
  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(true);
  }
}
