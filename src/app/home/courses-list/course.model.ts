import { InstructorModel } from '../../admin-space/manage-instructors/instructor.model';
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
  categories: string[];
  instructors: InstructorModel[];
  sessions: SessionModel[];
}
