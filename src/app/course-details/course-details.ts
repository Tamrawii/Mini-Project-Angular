import { Component, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../home/courses-list/course.service';
import { CourseModel, Level } from '../home/courses-list/course.model';
import { Signal } from '@angular/core';
import { DetailsCard } from './details-card/details-card';
import { SessionService } from './details-card/session.service';
import { Language, SessionModel } from './session-details/session.model';
import { DatePipe } from '@angular/common';
import { SessionDetails } from './session-details/session-details';

@Component({
  selector: 'app-course-details',
  imports: [DetailsCard, DatePipe, SessionDetails],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  courseId!: number;
  courseDetails = signal<CourseModel>({
    id: 0,
    title: '',
    description: '',
    duration: 0,
    program: '',
    level: Level.Beginner,
    keyWords: [],
    cotegories: [],
    instructors: [],
    sessions: [],
  });

  sessionsList = signal<SessionModel[]>([
    {
      id: 0,
      courseId: 0,
      location: 'string',
      staringDate: 'string',
      finishingDate: 'string',
      language: Language.Arabic,
    },
  ]);

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.courseDetails.set(this.courseService.getCourseById(+this.courseId)!);
    this.sessionsList.set(this.sessionService.getCourseSessions(+this.courseId));
  }
}
