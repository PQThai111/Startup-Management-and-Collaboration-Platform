export interface Project {
  id: string;
  projectName: string;
  projectDetail: string;//mô tả về project
  projectProgress: number;
  projectStatus: number; // Trạng thái của project Pending-0 Approvaled-1 Started-2 Done-3
  category: string;
  // type: PROJECT_TYPE; //exe101, exe201,
  coverImage?: string;
  semesterAndCourse: SemesterAndCourse
  mentorsAndLecturers: MentorsAndLecturers[]
  memberWanted: string;//mô tả yêu cầu tuyển thành viên
  memberWantedStatus: boolean // Status còn tuyển hay không ?
  team: Team;
  milestones: Milestone;
  isDeleted: boolean;
}

type MentorsAndLecturers ={
  accountId: string
  name: string
  roleType: string
  description: string
}

type SemesterAndCourse ={
  semesterId: string
  semester: string
  courseId:string
  course: string
}

type Team = {
  teamId: string
  teamName: string
  desiredMentorSessions: number
  startUpIdea: StartUpIdea
  members: Member[]
  status: number
  isDeleted: boolean
}

type Member = {
  id: string
  studentName: string
  studentcode: string
  memberRole: string
  isLeader: boolean
  status: number
  note: string,
  isDeleted: boolean
}

type StartUpIdea = {
  id: string
  title: string
  description: string
  category: number
  coverImage: string
}

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

export interface Milestone {
  name: string
  description: string
  startDate: string
  endDate: string
  id: string
  status: number
  isDeleted: boolean
}