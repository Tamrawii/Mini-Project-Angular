import { Component, input } from '@angular/core';
import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'app-details-card',
  imports: [],
  templateUrl: './details-card.html',
  styleUrl: './details-card.css',
})
export class DetailsCard {
  courseDetails = input.required<CourseModel>();
  totalLearners = input.required<number>();
}
