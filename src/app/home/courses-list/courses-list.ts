import { Component, OnInit } from '@angular/core';
import { Card } from './card/card';
import { CourseService } from '../../services/course.service';

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
