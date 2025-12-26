import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CourseDetails } from './course-details/course-details';
import { Search } from './search/search';
import { AdminSpace } from './admin-space/admin-space';
import { ManageLearners } from './admin-space/manage-learners/manage-learners';
import { ManageInstructors } from './admin-space/manage-instructors/manage-instructors';
import { ManageCourses } from './admin-space/manage-courses/manage-courses';
import { Explore } from './navbar/explore/explore';
import { PageNotFound } from './page-not-found/page-not-found';

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
    path: 'search',
    component: Search,
  },
  {
    path: 'admin-space',
    component: AdminSpace,
  },
  {
    path: 'manage-learners',
    component: ManageLearners,
  },
  {
    path: 'manage-instructors',
    component: ManageInstructors,
  },
  {
    path: 'manage-courses',
    component: ManageCourses,
  },
  {
    path: 'explore/:categoryId',
    component: Explore,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
