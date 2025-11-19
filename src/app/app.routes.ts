import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CourseDetails } from './course-details/course-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'details/:id',
    component: CourseDetails,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
