import { Injectable, InputSignal, signal } from '@angular/core';
import { Level, type CourseModel } from './course.model';
import { InstructorService } from '../../admin-space/manage-instructors/instructor.service';
import { InstructorModel } from '../../admin-space/manage-instructors/instructor.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private instructorList = signal<InstructorModel[]>([]);
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
      categories: ['Computer Science', 'Development'],
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
      categories: ['Web Development'],
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
      categories: ['Mobile', 'Development'],
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
      categories: ['Data'],
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
      categories: ['Artificial Intelligence'],
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
      categories: ['Development'],
      instructors: [this.instructorList()[0], this.instructorList()[1]],
      sessions: [],
    },
  ]);

  constructor(private instructorService: InstructorService) {
    const courses = localStorage.getItem('courses');
    if (courses) this.coursesList.set(JSON.parse(courses!));
    this.instructorList.set(instructorService.getInstructors());
  }

  getCourses() {
    return this.coursesList();
  }

  getCourseById(courseId: number): CourseModel | undefined {
    return this.coursesList().find((course) => course.id === courseId);
  }

  addNewCourse(course: CourseModel) {
    this.coursesList().push(course);
    this.saveCourses();
  }

  removeCourse(courseId: number) {
    this.coursesList.set(this.coursesList().filter((course) => course.id !== courseId));
  }

  getLastId() {
    return this.coursesList()[this.coursesList.length]['id'];
  }

  getCourseByKeyWords(text: string) {
    return this.coursesList().filter(
      (course) =>
        course.title.toLowerCase().includes(text.toLowerCase()) ||
        course.description.toLowerCase().includes(text.toLowerCase()) ||
        course.keyWords.includes(text.toLowerCase()),
    );
  }

  findInstructors() {
    return [this.instructorList()[0], this.instructorList()[1]];
  }

  saveCourses() {
    const courses = JSON.stringify(this.coursesList());
    localStorage.setItem('courses', courses);
  }
}
