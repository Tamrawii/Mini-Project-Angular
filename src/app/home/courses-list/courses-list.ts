import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Card } from './card/card';

@Component({
  selector: 'app-courses-list',
  imports: [Card],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.css',
})
export class CoursesList {
  constructor(private courseService: CourseService) {}

  get coursesList() {
    return this.courseService.getCourses();
  }
}
