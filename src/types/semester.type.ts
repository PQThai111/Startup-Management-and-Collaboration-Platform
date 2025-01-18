interface Semester {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  courseInstances: any;
  courseMilestoneInstances: any;
  id: string;
  status: SemesterStatus;
  isDeleted: boolean;
  lastUpdateDate?: string;
}

enum SemesterStatus {
  Inactive,
  Ongoing,
}

export type { Semester };
export { SemesterStatus };
