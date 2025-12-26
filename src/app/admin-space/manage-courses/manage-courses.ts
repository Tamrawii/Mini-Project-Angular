import { Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../home/courses-list/course.service';
import { CourseModel, Level } from '../../home/courses-list/course.model';
import { AddCourse } from './add-course/add-course';
import { SessionService } from '../../course-details/details-card/session.service';
import { UpdateCourse } from './update-course/update-course';
import { AddSession } from './add-session/add-session';

@Component({
  selector: 'app-manage-instructors',
  imports: [FormsModule, AddCourse, UpdateCourse, AddSession],
  templateUrl: './manage-courses.html',
  styleUrl: './manage-courses.css',
})
export class ManageCourses {
  coursesList = signal<CourseModel[]>([]);
  toggleUpdateDialog = signal<boolean>(false);
  toggleAddDialog = signal<boolean>(false);
  toggleAddSessionDialog = signal<boolean>(false);
  selectedCourse = signal<CourseModel>({
    id: 0,
    title: '',
    description: '',
    duration: 0,
    program: '',
    level: Level.Beginner,
    keyWords: [],
    categories: [],
    instructors: [],
    sessions: [],
  });

  constructor(
    private courseService: CourseService,
    private sessionService: SessionService,
  ) {
    this.coursesList.set(courseService.getCourses());
  }

  removeCourse(courseId: number) {
    this.courseService.removeCourse(courseId);
    this.coursesList.set(this.courseService.getCourses());
  }

  getTotalSessionsNumber(courseId: number) {
    return this.sessionService.getTotalCourseSessions(courseId);
  }

  onShowUpdateDialog(selectedCourse: CourseModel) {
    this.toggleUpdateDialog.set(true);
    this.selectedCourse.set(selectedCourse);
  }

  onShowAddDialog() {
    this.toggleAddDialog.set(true);
  }

  onShowAddSessionDialog(selectedCourse: CourseModel) {
    this.selectedCourse.set(selectedCourse);
    this.toggleAddSessionDialog.set(true);
  }

  onHideUpdateDialog(status: boolean) {
    this.toggleUpdateDialog.set(status);
    this.coursesList.set(this.courseService.getCourses());
  }

  onHideAddDialog(status: boolean) {
    this.toggleAddDialog.set(status);
    this.coursesList.set(this.courseService.getCourses());
  }
  onHideAddSessionDialog(status: boolean) {
    this.toggleAddSessionDialog.set(status);
    this.coursesList.set(this.courseService.getCourses());
  }
}
