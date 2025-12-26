import { Injectable, InputSignal, signal } from '@angular/core';
import { Level, type CourseModel } from './course.model';
import { InstructorService } from '../../admin-space/manage-instructors/instructor.service';
import { InstructorModel } from '../../admin-space/manage-instructors/instructor.model';
import { SessionService } from '../../course-details/details-card/session.service';
import { CategoryService } from '../../admin-space/manage-courses/category.service';
import { CategoryModel } from '../../admin-space/manage-courses/category.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private instructorList = signal<InstructorModel[]>([]);
  private categoriesList = signal<CategoryModel[]>([]);

  private coursesList = signal<CourseModel[]>([
    {
      id: 1,
      title: 'Introduction to Programming',
      description:
        'Learn the basics of programming, algorithmic thinking, and fundamental data structures.',
      duration: 25,
      program: '',
      level: Level.Beginner,
      keyWords: ['algorithms', 'variables', 'loops'],
      categories: [this.categoriesList()[0]],
      instructors: [this.instructorList()[0]],
      sessions: [],
    },
    {
      id: 2,
      title: 'Front-End Web Development',
      description: 'Build modern web interfaces using HTML, CSS, and JavaScript.',
      duration: 40,
      program: '',
      level: Level.Beginner,

      keyWords: ['html', 'css', 'javascript'],
      categories: [this.categoriesList()[0]],
      instructors: [this.instructorList()[1]],
      sessions: [],
    },
    {
      id: 3,
      title: 'Flutter & Dart Mobile Development',
      description:
        'Create high-performance mobile applications using Flutter and the Dart language.',
      duration: 60,
      program: '',
      level: Level.Intermediate,

      keyWords: ['flutter', 'dart', 'mobile'],
      categories: [this.categoriesList()[1], this.categoriesList()[2]],
      instructors: [this.instructorList()[2]],
      sessions: [],
    },
    {
      id: 4,
      title: 'SQL Databases Fundamentals',
      description: 'Understand relational databases and learn how to write SQL queries.',
      duration: 35,
      program: '',
      level: Level.Beginner,
      keyWords: ['sql', 'queries', 'mysql'],
      categories: [this.categoriesList()[3]],
      instructors: [this.instructorList()[0], this.instructorList()[1]],
      sessions: [],
    },
    {
      id: 5,
      title: 'Machine Learning Fundamentals',
      description: 'Explore core Machine Learning concepts and build predictive models.',
      duration: 55,
      program: '',
      level: Level.Intermediate,
      keyWords: ['machine learning', 'python', 'models'],
      categories: [this.categoriesList()[3], this.categoriesList()[2]],
      instructors: [this.instructorList()[1], this.instructorList()[2]],
      sessions: [],
    },
    {
      id: 6,
      title: 'Software Architecture & Clean Code',
      description:
        'Apply SOLID principles, clean code rules, and design patterns to build maintainable software.',
      duration: 45,
      program: '',
      level: Level.Advanced,
      keyWords: ['solid', 'clean code', 'design patterns'],
      categories: [this.categoriesList()[0], this.categoriesList()[1]],
      instructors: [this.instructorList()[0], this.instructorList()[1]],
      sessions: [],
    },
  ]);

  constructor(
    private instructorService: InstructorService,
    private categoryService: CategoryService,
  ) {
    const courses = localStorage.getItem('courses');
    if (courses) this.coursesList.set(JSON.parse(courses!));
    this.instructorList.set(instructorService.getInstructors());
    this.categoriesList.set(categoryService.getCategories());
  }

  getCourses() {
    return this.coursesList();
  }

  getCourseById(courseId: number): CourseModel | undefined {
    return this.coursesList().find((course) => course.id === courseId);
  }

  addNewCourse(course: CourseModel) {
    this.coursesList().push(course);
    this.saveSessions();
  }

  updateCourse(course: CourseModel) {
    let courseIndex = this.coursesList().findIndex((c) => c.id === course.id);
    this.coursesList()[courseIndex] = course;
    this.saveSessions();
  }

  removeCourse(courseId: number) {
    this.coursesList.set(this.coursesList().filter((course) => course.id !== courseId));
    this.saveSessions();
  }

  getLastId() {
    return this.coursesList().length !== 0
      ? this.coursesList()[this.coursesList().length - 1].id
      : 0;
  }

  getCourseByKeyWords(text: string) {
    return this.coursesList().filter(
      (course) =>
        course.title.toLowerCase().includes(text.toLowerCase()) ||
        course.description.toLowerCase().includes(text.toLowerCase()) ||
        course.keyWords.includes(text.toLowerCase()),
    );
  }

  filterCatgory(categoryId: number) {
    return this.coursesList().filter(
      (course) => course.categories.filter((category) => category.id === categoryId).length !== 0,
    );
  }

  findInstructors(instructors: number[]) {
    return this.instructorList().filter((instructor) =>
      instructors.find((id) => +id === instructor.id),
    );
  }

  saveSessions() {
    const courses = JSON.stringify(this.coursesList());
    localStorage.setItem('courses', courses);
  }
}
