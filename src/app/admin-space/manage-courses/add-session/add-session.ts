import { Component, input, output, signal } from '@angular/core';
import { Language, SessionModel } from '../../../models/session.model';
import { InstructorModel } from '../../../models/instructor.model';
import { SessionService } from '../../../course-details/details-card/session.service';
import { InstructorService } from '../../manage-instructors/instructor.service';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../home/courses-list/course.service';

@Component({
  selector: 'app-add-session',
  imports: [FormsModule],
  templateUrl: './add-session.html',
  styleUrl: './add-session.css',
})
export class AddSession {
  sessionData = signal<SessionModel>({
    id: 0,
    courseId: 0,
    instructors: [],
    location: '',
    startingDate: '',
    finishingDate: '',
    language: Language.Arabic,
    enrolledPlaces: 0,
  });
  instructorsList = signal<InstructorModel[]>([]);
  selectedCourseId = input<number>(0);

  instructors!: [];
  location!: string;
  startingDate!: string;
  finishingDate!: string;
  language!: string;

  constructor(
    private sessionService: SessionService,
    private instructorService: InstructorService,
  ) {
    this.instructorsList.set(instructorService.getInstructors());
  }

  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  onSubmit() {
    if (
      this.location !== undefined &&
      this.startingDate !== undefined &&
      this.finishingDate !== undefined &&
      this.language !== undefined &&
      this.instructors !== undefined
    ) {
      let session: SessionModel = {
        id: this.sessionService.getLastId() + 1,
        courseId: this.selectedCourseId(),
        instructors: this.sessionService.findInstructors(this.instructors),
        location: this.location.trim(),
        startingDate: this.startingDate.trim(),
        finishingDate: this.finishingDate.trim(),
        language:
          this.language === 'ar'
            ? Language.Arabic
            : this.language === 'fr'
              ? Language.French
              : Language.English,
        enrolledPlaces: 0,
      };
      this.sessionService.addNewSession(session);
      this.onHideDialog();
    }
  }
}
