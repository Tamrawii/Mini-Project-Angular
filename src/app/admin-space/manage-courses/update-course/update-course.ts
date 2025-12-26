import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseModel, Level } from '../../../home/courses-list/course.model';
import { CourseService } from '../../../home/courses-list/course.service';

@Component({
  selector: 'app-update-course',
  imports: [FormsModule],
  templateUrl: './update-course.html',
  styleUrl: './update-course.css',
})
export class UpdateCourse {
  courseData = input<CourseModel>({
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
  title!: string;
  description!: string;
  duration!: string;
  program!: string;
  level!: string;
  keyWords!: string;
  categories!: [];
  instructors!: [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.title = this.courseData().title;
    this.description = this.courseData().description;
    this.duration = this.courseData().duration.toString();
    this.program = this.courseData().program;
    this.level = this.courseData().level;
  }

  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  onSubmit() {
    if (this.title !== undefined && this.description !== undefined && this.duration !== undefined) {
      let course: CourseModel = {
        id: this.courseData().id,
        title: this.title.trim(),
        description: this.description.trim(),
        duration: +this.duration,
        program: this.courseData().program,
        level: this.courseData().level,
        keyWords: this.courseData().keyWords,
        categories: this.courseData().categories,
        instructors: this.courseData().instructors,
        sessions: this.courseData().sessions,
      };

      this.courseService.updateCourse(course);
      this.onHideDialog();
    }
  }
}
