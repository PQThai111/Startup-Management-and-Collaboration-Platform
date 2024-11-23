import { Lecturer } from './lecturer.type';
import { Skill } from './skill.type';

export interface Student {
  id: string;
  accountId: string;
  email: string;
  studentName: string;
  studentCode: string;
  studentDepartment: string;
  campus: string;
  phoneNumber: string;
  skills: Skill[];
  studentLecturers: Lecturer[];
}
