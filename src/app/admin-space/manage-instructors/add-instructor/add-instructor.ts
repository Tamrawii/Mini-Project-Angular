import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorModel } from '../instructor.model';
import { InstructorService } from '../instructor.service';
import { escapeLeadingUnderscores } from 'typescript';

@Component({
  selector: 'app-add-instructor',
  imports: [FormsModule],
  templateUrl: './add-instructor.html',
  styleUrl: './add-instructor.css',
})
export class AddInstructor {
  instructorData = signal<InstructorModel>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    CIN: '',
    photo: '',
    CV: '',
    skills: [],
  });
  fName!: string;
  lName!: string;
  email!: string;
  phone!: string;
  idNum!: string;
  skills!: string;
  cv!: string;
  photo!: string;

  constructor(private instructorService: InstructorService) {}

  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  onSubmit() {
    if (
      this.fName !== undefined &&
      this.lName !== undefined &&
      this.email !== undefined &&
      this.phone !== undefined &&
      this.skills !== undefined &&
      this.idNum !== undefined &&
      this.cv !== undefined &&
      this.photo !== undefined
    ) {
      let instructor: InstructorModel = {
        id: this.instructorService.getLastId() + 1,
        firstName: this.fName.trim(),
        lastName: this.lName.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
        CIN: this.idNum.trim(),
        photo: this.photo.trim(),
        CV: this.cv.trim(),
        skills: this.skills.trim().split(','),
      };

      this.instructorService.addNewInstructor(instructor);
      this.onHideDialog();
    }
  }
}
