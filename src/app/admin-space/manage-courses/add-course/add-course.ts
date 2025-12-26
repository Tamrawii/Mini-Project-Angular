import { Component, output, signal } from '@angular/core';
import { CourseModel, Level } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-add-course',
  imports: [FormsModule],
  templateUrl: './add-course.html',
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
    sessions: [],
  });
  categoriesList = signal<CategoryModel[]>([]);

  title!: string;
  description!: string;
  duration!: string;
  program!: string;
  level!: string;
  keyWords!: string;
  categories!: [];

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
  ) {
    this.categoriesList.set(categoryService.getCategories());
  }

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
      this.categories !== undefined
    ) {
      let course: CourseModel = {
        id: this.courseService.getLastId() + 1,
        title: this.title.trim(),
        description: this.description.trim(),
        duration: +this.duration,
        program: this.program.trim(),
        level:
          this.level === 'b'
            ? Level.Beginner
            : this.level === 'a'
              ? Level.Advanced
              : Level.Intermediate,
        keyWords: this.keyWords.trim().split(','),
        categories: this.categories,
        sessions: [],
      };

      this.courseService.addNewCourse(course);
      this.onHideDialog();
    }
  }
}
