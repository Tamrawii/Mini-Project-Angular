import { Injectable, InputSignal, signal } from '@angular/core';
import { Level, type CourseModel } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
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
      cotegories: ['Computer Science', 'Development'],
      instructors: ['Dr. Karim B.'],
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
      cotegories: ['Web Development'],
      instructors: ['Sarra T.'],
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
      cotegories: ['Mobile', 'Development'],
      instructors: ['Mohamed C.'],
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
      cotegories: ['Data'],
      instructors: ['Amira H.'],
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
      cotegories: ['Artificial Intelligence'],
      instructors: ['Dr. Walid K.'],
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
      cotegories: ['Development'],
      instructors: ['Youssef M.'],
      sessions: [],
    },
  ]);

  getCourses() {
    return this.coursesList();
  }

  getCourseById(courseId: number): CourseModel | undefined {
    return this.coursesList().find((course) => course.id === courseId);
  }
}
