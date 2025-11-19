import { Component } from '@angular/core';
import { CoursesList } from './courses-list/courses-list';

@Component({
  selector: 'app-home',
  imports: [CoursesList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
