import { Injectable, signal, effect } from '@angular/core';
import { Level, type CourseModel } from '../models/course.model';
import { InstructorService } from './instructor.service';
import { InstructorModel } from '../models/instructor.model';
import { CategoryService } from './category.service';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private categoriesList = signal<CategoryModel[]>([]);
  private coursesList = signal<CourseModel[]>([]);

  constructor(private categoryService: CategoryService) {
    this.categoriesList.set(categoryService.getCategories());
    const categories = this.categoriesList();

    const coursesData: CourseModel[] = [
      {
        id: 1,
        title: 'Introduction to Programming',
        description:
          'Learn the basics of programming, algorithmic thinking, and fundamental data structures.',
        duration: 25,
        program: 'programs/program.pdf',
        level: Level.Beginner,
        keyWords: ['algorithms', 'variables', 'loops'],
        categories: [categories[0]],
        sessions: [],
      },
      {
        id: 2,
        title: 'Front-End Web Development',
        description: 'Build modern web interfaces using HTML, CSS, and JavaScript.',
        duration: 40,
        program: 'programs/program.pdf',
        level: Level.Beginner,
        keyWords: ['html', 'css', 'javascript'],
        categories: [categories[0]],
        sessions: [],
      },
      {
        id: 3,
        title: 'Flutter & Dart Mobile Development',
        description:
          'Create high-performance mobile applications using Flutter and the Dart language.',
        duration: 60,
        program: 'programs/program.pdf',
        level: Level.Intermediate,
        keyWords: ['flutter', 'dart', 'mobile'],
        categories: [categories[1], categories[2]],
        sessions: [],
      },
      {
        id: 4,
        title: 'SQL Databases Fundamentals',
        description: 'Understand relational databases and learn how to write SQL queries.',
        duration: 35,
        program: 'programs/program.pdf',
        level: Level.Beginner,
        keyWords: ['sql', 'queries', 'mysql'],
        categories: [categories[3]],
        sessions: [],
      },
      {
        id: 5,
        title: 'Machine Learning Fundamentals',
        description: 'Explore core Machine Learning concepts and build predictive models.',
        duration: 55,
        program: 'programs/program.pdf',
        level: Level.Intermediate,
        keyWords: ['machine learning', 'python', 'models'],
        categories: [categories[3], categories[2]],
        sessions: [],
      },
      {
        id: 6,
        title: 'Software Architecture & Clean Code',
        description:
          'Apply SOLID principles, clean code rules, and design patterns to build maintainable software.',
        duration: 45,
        program: 'programs/program.pdf',
        level: Level.Advanced,
        keyWords: ['solid', 'clean code', 'design patterns'],
        categories: [categories[0], categories[1]],
        sessions: [],
      },
    ];

    const courses = localStorage.getItem('courses');
    if (courses) {
      this.coursesList.set(JSON.parse(courses!));
    } else {
      this.coursesList.set(coursesData);
    }
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

  filterCategory(categoryId: number) {
    return this.coursesList().filter(
      (course) => course.categories.filter((category) => category.id === categoryId).length !== 0,
    );
  }

  saveSessions() {
    const courses = JSON.stringify(this.coursesList());
    localStorage.setItem('courses', courses);
  }
}
