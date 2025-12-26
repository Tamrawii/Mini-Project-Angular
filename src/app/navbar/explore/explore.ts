import { Component, signal, OnInit } from '@angular/core';
import { CourseService } from '../../home/courses-list/course.service';
import { CourseModel, Level } from '../../home/courses-list/course.model';
import { Card } from '../../home/courses-list/card/card';
import { ActivatedRoute } from '@angular/router';
import { SignatureHelpTriggerCharacter } from 'typescript';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  imports: [Card],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore {
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
      instructors: [],
      sessions: [],
    },
  ]);
  categoryId = signal<number>(0);
  private subscription!: Subscription;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
  ) {
    this.coursesList.set(courseService.filterCatgory(this.categoryId()));
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.categoryId.set(this.route.snapshot.params['categoryId']);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
