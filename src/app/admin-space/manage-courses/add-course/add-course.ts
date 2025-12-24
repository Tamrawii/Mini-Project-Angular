import { Component, output, signal } from '@angular/core';
import { CourseModel, Level } from '../../../home/courses-list/course.model';
import { CourseService } from '../../../home/courses-list/course.service';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../../manage-instructors/instructor.service';

@Component({
  selector: 'app-add-course',
  imports: [FormsModule],
  templateUrl: './add-course.html',
  template: '',
  styleUrl: './add-course.css',
})
export class AddCourse {
  courseData = signal<CourseModel>({
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
  categories!: string;
  instructors!: string;

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
  ) {}

  hideDialogEvenet = output<boolean>();
  onHideDialog() {
    this.hideDialogEvenet.emit(false);
  }

  onSubmit() {
    if (
      this.title !== undefined &&
      this.description !== undefined &&
      this.duration !== undefined &&
      this.program !== undefined &&
      this.level !== undefined &&
      this.keyWords !== undefined &&
      this.categories !== undefined &&
      this.instructors !== undefined
    ) {
      let course: CourseModel = {
        id: this.courseService.getLastId() + 1,
        title: this.title,
        description: this.description,
        duration: +this.duration,
        program: this.program,
        level:
          this.level === 'b'
            ? Level.Beginner
            : this.level === 'a'
              ? Level.Advanced
              : Level.Intermediate,
        keyWords: this.keyWords.split(','),
        categories: this.categories.split(','),
        instructors: this.courseService.findInstructors(),
        sessions: [],
      };

      this.courseService.addNewCourse(course);
      this.onHideDialog();
    }
  }
}
