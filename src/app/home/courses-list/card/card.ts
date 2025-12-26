import { Component, input, OnInit } from '@angular/core';
import { CourseModel } from '../course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  course = input.required<CourseModel>();
}
