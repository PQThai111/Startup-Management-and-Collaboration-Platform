import { ProjectTaskStatus } from '../constant/project_task.enum';

export interface ProjectTask {
  id: string;
  name: string;
  description: string;
  priority: number;
  startTime: string;
  endTime: string;
  reminder: number;
  comments: Comment[];
  members: Member[] | [];
  documents: Document[];
  teamId: string;
  status: ProjectTaskStatus;
  isDeleted: boolean;
}

export interface Member {
  userId: string;
  teamMemberId: string;
  name: string;
  avatarUrl: string;
  role: string;
}

export interface Comment {
  commentId: string;
  content: string;
  createdBy: {
    userId: string;
    userName: string;
    avatarUrl: string;
  };
  timestamp: string;
  isDeleted: boolean;
}

export interface Document {
  id: string;
  fileName: string;
  filePath: string;
  description: string;
}

export interface ProjectTaskByWeek {
  weekNumber: number;
  tasks: ProjectTask[];
}
