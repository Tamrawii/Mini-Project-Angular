import { CategoryModel } from './category.model';
import { SessionModel } from './session.model';

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
