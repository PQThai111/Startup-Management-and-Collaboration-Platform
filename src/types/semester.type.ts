interface Semester {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  courseInstances: any;
  courseMilestoneInstances: any;
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate?: string;
}

export type { Semester };
