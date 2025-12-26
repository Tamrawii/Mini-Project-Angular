import { CategoryModel } from '../../admin-space/manage-courses/category.model';
import { SessionModel } from '../../course-details/session-details/session.model';

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface CourseModel {
  id: number;
  title: string;
  description: string;
  duration: number;
  program: string;
  level: Level;
  keyWords: string[];
  categories: CategoryModel[];
  sessions: SessionModel[];
}
