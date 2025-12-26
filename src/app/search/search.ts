import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../home/courses-list/course.service';
import { CourseModel, Level } from '../home/courses-list/course.model';
import { Language } from '../course-details/session-details/session.model';
import { Card } from '../home/courses-list/card/card';

@Component({
  selector: 'app-search',
  imports: [FormsModule, Card],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  enteredText!: string;
  searchFlag = signal<boolean>(false);
  coursesList = signal<CourseModel[]>([
    {
      id: -1,
      title: '',
      description: '',
      duration: 0,
      program: '',
      level: Level.Beginner,
      keyWords: [],
      categories: [],
      sessions: [],
    },
  ]);

  constructor(private courseService: CourseService) {}

  onSearch() {
    this.coursesList.set(this.courseService.getCourseByKeyWords(this.enteredText));
    this.searchFlag.set(true);
  }
}
