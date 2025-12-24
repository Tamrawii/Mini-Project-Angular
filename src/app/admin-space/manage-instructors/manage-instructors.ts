import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorModel } from './instructor.model';
import { InstructorService } from './instructor.service';
import { UpdateInstructors } from './update-instructors/update-instructors';
import { AddInstructor } from './add-instructor/add-instructor';

@Component({
  selector: 'app-manage-instructors',
  imports: [FormsModule, UpdateInstructors, AddInstructor],
  templateUrl: './manage-instructors.html',
  styleUrl: './manage-instructors.css',
})
export class ManageInstructors {
  instructorsList = signal<InstructorModel[]>([]);
  toggleUpdateDialog = signal<boolean>(false);
  toggleAddDialog = signal<boolean>(false);
  selectedInstructor = signal<InstructorModel>({
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

  constructor(private instructorService: InstructorService) {
    this.instructorsList.set(instructorService.getInstructors());
  }

  removeInstructor(instructorId: number) {
    this.instructorService.removeInstructor(instructorId);
    this.instructorsList.set(this.instructorService.getInstructors());
  }

  onShowUpdateDialog(selectedInstructor: InstructorModel) {
    this.toggleUpdateDialog.set(true);
    this.selectedInstructor.set(selectedInstructor);
  }

  onShowAddDialog() {
    this.toggleAddDialog.set(true);
  }

  onHideUpdateDialog(status: boolean) {
    this.toggleUpdateDialog.set(status);
    this.instructorsList.set(this.instructorService.getInstructors());
  }

  onHideAddDialog(status: boolean) {
    this.toggleAddDialog.set(status);
  }
}
