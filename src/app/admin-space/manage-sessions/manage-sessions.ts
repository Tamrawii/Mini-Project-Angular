import { Component, signal } from '@angular/core';
import { Language, SessionModel } from '../../models/session.model';
import { UpdateSession } from './update-session/update-session';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-manage-sessions',
  imports: [UpdateSession],
  templateUrl: './manage-sessions.html',
  styleUrl: './manage-sessions.css',
})
export class ManageSessions {
  toggleUpdateDialog = signal<boolean>(false);
  sessionsList = signal<SessionModel[]>([
    {
      id: 0,
      courseId: 0,
      instructors: [],
      location: '',
      startingDate: '',
      finishingDate: '',
      language: Language.Arabic,
      enrolledPlaces: 0,
    },
  ]);

  SelectedSession = signal<SessionModel>({
    id: 0,
    courseId: 0,
    instructors: [],
    location: '',
    startingDate: '',
    finishingDate: '',
    language: Language.Arabic,
    enrolledPlaces: 0,
  });

  constructor(private sessionService: SessionService) {
    this.sessionsList.set(sessionService.getSessions());
  }

  removeSession(sessionId: number) {
    this.sessionService.removeSession(sessionId);
    this.sessionsList.set(this.sessionService.getSessions());
  }

  onShowUpdateDialog(selectedSession: SessionModel) {
    this.toggleUpdateDialog.set(true);
    this.SelectedSession.set(selectedSession);
  }

  onHideUpdateDialog(status: boolean) {
    this.toggleUpdateDialog.set(status);
    this.sessionsList.set(this.sessionService.getSessions());
  }
}
