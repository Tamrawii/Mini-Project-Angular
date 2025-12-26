import { Component, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../home/courses-list/course.service';
import { CourseModel, Level } from '../home/courses-list/course.model';
import { DetailsCard } from './details-card/details-card';
import { SessionService } from './details-card/session.service';
import { Language, SessionModel } from './session-details/session.model';
import { SessionDetails } from './session-details/session-details';
import { EnrollCourse } from './enroll-course/enroll-course';

@Component({
  selector: 'app-course-details',
  imports: [DetailsCard, SessionDetails, EnrollCourse],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  courseId!: number;
  selectedSession!: number;
  isHidden: boolean = true;
  courseDetails = signal<CourseModel>({
    id: 0,
    title: '',
    description: '',
    duration: 0,
    program: '',
    level: Level.Beginner,
    keyWords: [],
    categories: [],
    sessions: [],
  });

  sessionsList = signal<SessionModel[]>([
    {
      id: 0,
      courseId: 0,
      instructors: [],
      location: 'string',
      startingDate: 'string',
      finishingDate: 'string',
      language: Language.Arabic,
      enrolledPlaces: 0,
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

  onSignupClick(recievedData: [boolean, number]) {
    this.isHidden = recievedData[0];
    this.selectedSession = recievedData[1];
  }

  onCloseDialog(status: boolean) {
    this.isHidden = status;
  }

  getTotalCourseLearners(): number {
    return this.sessionService.getTotalLearners(+this.courseId);
  }
}
