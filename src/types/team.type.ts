export interface Member {
  id: string;
  note: string;
  studentName: string;
  studentCode: string;
  memberRole: string;
  isLeader: boolean;
  status: number;
  isDeleted: boolean;
  studentId: string;
}

export interface StartupIdea {
  id: string;
  title: string;
  description: string;
  category: number;
  coverImage: null;
}

export interface Team {
  teamId: string;
  teamName: string;
  desiredMentorSessions: number;
  startupIdea: StartupIdea;
  members: Member[];
  status: 0;
  isDeleted: false;
}
