import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CourseDetails } from './course-details/course-details';
import { Search } from './search/search';
import { AdminSpace } from './admin-space/admin-space';
import { ManageLearners } from './admin-space/manage-learners/manage-learners';

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
    path: '**',
    redirectTo: '',
  },
];
