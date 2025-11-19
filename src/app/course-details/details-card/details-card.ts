import { Component, input } from '@angular/core';
import { CourseModel } from '../../home/courses-list/course.model';

@Component({
  selector: 'app-details-card',
  imports: [],
  templateUrl: './details-card.html',
  styleUrl: './details-card.css',
})
export class DetailsCard {
  courseDetails = input.required<CourseModel>();
}
