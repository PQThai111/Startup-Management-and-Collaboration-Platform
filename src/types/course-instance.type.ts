interface CourseInstance {
  CourseId: string;
  SemesterId: string;
  Course: any;
  Semester: any;
  AccountInCourseInstances: any;
  EventInCourseInstances: any;
  StudentLecturerAssignments: any;
  ProjectInCourseInstances: any;
  Id: string;
  Status: number;
  IsDeleted: boolean;
  LastUpdateDate: string;
}

export type { CourseInstance };
