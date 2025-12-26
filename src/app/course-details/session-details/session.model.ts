export enum Language {
  Arabic = 'AR',
  English = 'EN',
  French = 'FR',
}

export interface SessionModel {
  id: number;
  courseId: number;
  location: string;
  startingDate: string;
  finishingDate: string;
  language: Language;
  enrolledPlaces: number;
}
