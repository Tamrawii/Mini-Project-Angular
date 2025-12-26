import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseModel, Level } from '../models/course.model';
import { Language } from '../models/session.model';
import { Card } from '../home/courses-list/card/card';
import { CourseService } from '../services/course.service';

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
    console.log(this.coursesList());
    this.searchFlag.set(true);
  }
}
