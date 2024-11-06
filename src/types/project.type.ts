export interface Project {
  id: string;
  projectName: string;
  projectDetails: string;//mô tả về project
  projectProgress: number;
  projectStatus: number; // Trạng thái của project Pending-0 Approvaled-1 Started-2 Done-3
  type: PROJECT_TYPE; //exe101, exe201,
  coverImage?: string;
  semester: string;
  mentorName: string;
  lecturerName: string;
  leaderName: string;
  memberWanted: string;//mô tả yêu cầu tuyển thành viên
  memberWantedStatus: boolean // Status còn tuyển hay không ?
  members?: Member[];
  team: Team;
  isDeleted: boolean;
  lastUpdateDate: Date
}

type Member = {
  memberName: string
  memberRole: string
}

type Team = {
  teamId: string
  teamName: string
  startUpIdea: string
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