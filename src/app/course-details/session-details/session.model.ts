import { InstructorModel } from '../../admin-space/manage-instructors/instructor.model';

export enum Language {
  Arabic = 'AR',
  English = 'EN',
  French = 'FR',
}

export interface SessionModel {
  id: number;
  courseId: number;
  instructors: InstructorModel[];
  location: string;
  startingDate: string;
  finishingDate: string;
  language: Language;
  enrolledPlaces: number;
}
