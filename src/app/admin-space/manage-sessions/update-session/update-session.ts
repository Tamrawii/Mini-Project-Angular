import { Component, input, output, signal } from '@angular/core';
import { Language, SessionModel } from '../../../models/session.model';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-update-session',
  imports: [FormsModule],
  templateUrl: './update-session.html',
  styleUrl: './update-session.css',
})
export class UpdateSession {
  sessionData = input<SessionModel>({
    id: 0,
    courseId: 0,
    instructors: [],
    location: '',
    startingDate: '',
    finishingDate: '',
    language: Language.Arabic,
    enrolledPlaces: 0,
  });

  location!: string;
  startingDate!: string;
  finishingDate!: string;
  language!: string;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.location = this.sessionData().location;
    this.startingDate = this.sessionData().startingDate;
    this.finishingDate = this.sessionData().finishingDate;
    this.language =
      this.sessionData().language === Language.Arabic
        ? 'Arabic'
        : this.sessionData().language === Language.French
          ? 'French'
          : 'English';
  }

  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  onSubmit() {
    if (
      this.location !== undefined &&
      this.startingDate !== undefined &&
      this.finishingDate !== undefined
    ) {
      let course: SessionModel = {
        id: this.sessionData().id,
        courseId: this.sessionData().courseId,
        instructors: this.sessionData().instructors,
        location: this.location.trim(),
        startingDate: this.startingDate,
        finishingDate: this.finishingDate,
        language:
          this.language === 'ar'
            ? Language.Arabic
            : this.language === 'fr'
              ? Language.French
              : Language.English,
        enrolledPlaces: this.sessionData().enrolledPlaces,
      };

      this.sessionService.updateSession(course);
      this.onHideDialog();
    }
  }
}
