export enum Language {
  Arabic = 'AR',
  English = 'EN',
  French = 'FR',
}

export interface SessionModel {
  id: number;
  courseId: number;
  location: string;
  staringDate: string;
  finishingDate: string;
  language: Language;
}
