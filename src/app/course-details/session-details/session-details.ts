import { Component, input } from '@angular/core';
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
}
