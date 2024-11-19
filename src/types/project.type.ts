export interface Project {
  id: string;
  projectName: string;
  projectDetail: string;//mô tả về project
  projectProgress: number;
  projectStatus: number; // Trạng thái của project Pending-0 Approvaled-1 Started-2 Done-3
  category: string;
  type: PROJECT_TYPE; //exe101, exe201,
  coverImage?: string;
  semesterAndCourse: SemesterAndCourse
  mentorsAndLecturers: MentorsAndLecturers[]
  memberWanted: string;//mô tả yêu cầu tuyển thành viên
  memberWantedStatus: boolean // Status còn tuyển hay không ?
  team: Team;
  isDeleted: boolean;
}

type MentorsAndLecturers ={
  name: string
  roleType: string
  description: string
}

type SemesterAndCourse ={
  semester: string
  course: string
}

type Team = {
  teamId: string
  teamName: string
  desiredMentorSessions: number
  startUpIdea: StartUpIdea
  members: Member[]
}

type Member = {
  studentName: string
  studentcode: string
  memberRole: string
  isLeader: boolean
}

type StartUpIdea = {
  id: string
}

export interface ProjectList {
  data: Project[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export enum PROJECT_TYPE {
  exe1 = 0,
  exe2 = 1
}

export interface ProjectConfig {
  SearchTerm?: string
  PageNumber?: number | string
  PageSize?: number | string
}