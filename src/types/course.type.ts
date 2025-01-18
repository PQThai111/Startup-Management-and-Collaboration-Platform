export interface Course {
  name: string;
  description: string;
  courseInstances: null;
  courseMilestones: null;
  id: string;
  status: CourseStatus;
  isDeleted: false;
  lastUpdateDate: null;
}

export enum CourseStatus {
  Inactive,
  Active,
}
