interface CourseInstance {
  courseId: string;
  courseName: string;
  semesterId: string;
  semesterName: string;
  Course: any;
  Semester: any;
  AccountInCourseInstances: any;
  EventInCourseInstances: any;
  StudentLecturerAssignments: any;
  ProjectInCourseInstances: any;
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: string;
}

export enum CourseInstanceStatus {
  Scheduled,
  OnGoing,
  Completed,
  Cancelled,
  Postponed,
}

export type { CourseInstance };
