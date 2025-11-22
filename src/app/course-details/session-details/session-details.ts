import { Component, input, output } from '@angular/core';
import { SessionModel } from './session.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-session-details',
  imports: [DatePipe],
  templateUrl: './session-details.html',
  styleUrl: './session-details.css',
})
export class SessionDetails {
  sessionsList = input.required<SessionModel[]>();

  // Send an event to the parent componenet when the sign-up button is clicked
  signupEvent = output<[boolean, number]>();
  onSignup(sessionID: number) {
    this.signupEvent.emit([false, sessionID]);
  }
}
