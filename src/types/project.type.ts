import { ProjectStatus } from "../constant/project";
import { Milestone } from "./milestone.type";
import { Team } from "./team.type";

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

// type MentorsAndLecturers ={
//   accountId: string
//   name: string
//   roleType: string
//   description: string
// }

// type SemesterAndCourse ={
//   semesterId: string
//   semester: string
//   courseId:string
//   course: string
// }

// type Team = {
//   teamId: string
//   teamName: string
//   desiredMentorSessions: number
//   startUpIdea: StartUpIdea
//   members: Member[]
//   status: number
//   isDeleted: boolean
// }

// type Member = {
//   id: string
//   studentName: string
//   studentcode: string
//   memberRole: string
//   isLeader: boolean
//   status: number
//   note: string,
//   isDeleted: boolean
// }

// type StartUpIdea = {
//   id: string
//   title: string
//   description: string
//   category: number
//   coverImage: string
// }

export interface ProjectList {
  data: Project[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
// export enum PROJECT_TYPE {
//   exe1 = 0,
//   exe2 = 1
// }

export interface ProjectConfig {
  SearchTerm?: string
  PageNumber?: number | string
  PageSize?: number | string
}

// export interface Milestone {
//   name: string
//   description: string
//   startDate: string
//   endDate: string
//   id: string
//   status: number
//   isDeleted: boolean
// }