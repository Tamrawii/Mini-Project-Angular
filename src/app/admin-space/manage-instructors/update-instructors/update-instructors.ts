import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorModel } from '../instructor.model';
import { InstructorService } from '../instructor.service';
import { escapeLeadingUnderscores } from 'typescript';

@Component({
  selector: 'app-update-instructors',
  imports: [FormsModule],
  templateUrl: './update-instructors.html',
  styleUrl: './update-instructors.css',
})
export class UpdateInstructors {
  instructorData = input<InstructorModel>({
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

  constructor(private instructorService: InstructorService) {
    // console.log(this.instructorData());
  }

  ngOnInit(): void {
    this.fName = this.instructorData().firstName;
    this.lName = this.instructorData().lastName;
    this.email = this.instructorData().email;
    this.idNum = this.instructorData().CIN;
    this.phone = this.instructorData().phone;
    this.skills = this.instructorData().skills.join(',');
  }

  // Hide the sign-up form
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
      this.idNum !== undefined
    ) {
      let instructor: InstructorModel = {
        id: this.instructorData().id,
        firstName: this.fName.trim(),
        lastName: this.lName.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
        CIN: this.idNum.trim(),
        photo: '',
        CV: '',
        skills: this.skills.split(','),
      };

      this.instructorService.updateInstructor(instructor);
      this.onHideDialog();
    }
  }
}
