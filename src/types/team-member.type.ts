import { Student } from './student.type';

export interface TeamMember {
  studentCode: string;
  student: Student;
  teamId: string;
  memberRole: 'BE' | 'FE';
  isLeader: boolean;
  leftDate: string;
  note: string;
  tasks: any;
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: string;
}
