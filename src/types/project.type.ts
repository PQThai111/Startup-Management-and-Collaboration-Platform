import { ProjectStatus } from '../constant/project';
import { Milestone } from './milestone.type';
import { Team } from './team.type';

export interface Project {
  id: string;
  projectCode: string;
  projectName: string;
  projectDetail: string;
  projectProgress: number;
  projectStatus: ProjectStatus;
  category: string;
  coverImage?: string;
  semesterAndCourse: {
    semester: string;
    semesterId: string;
    course: string;
    courseId: string;
  };
  mentorsAndLecturers: {
    accountId: string;
    name: string;
    roleType: 'Mentor' | 'Lecturer';
    description: string;
  }[];
  memberWanted: string;
  memberWantedStatus: boolean;
  team: Team;
  milestones: Milestone[];
  isDeleted: boolean;
  lastUpdateDate: string;
  createdDate: string;
}

export interface ProjectList {
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export interface ProjectConfig {
  SearchTerm?: string;
  PageNumber?: number | string;
  PageSize?: number | string;
  semesterId?: string;
  courseId?: string;
}
