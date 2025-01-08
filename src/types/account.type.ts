import { AccountStatus } from '../constant/account';

export interface Account {
  id: string;
  email: string;
  password: string;
  role: number;
  avatarUrl: any;
  lecturer?: Lecturers;
  student?: Student;
  mentor?: Mentor;
  appointments: any;
  accountInCourseInstances: any;
  documents: any;
  financialTransactions: any;
  refreshToken: string;
  refreshTokenExpires: string;
  status: AccountStatus;
  isDeleted: boolean;
  lastUpdateDate: string;
}

type Lecturers = {
  accountId: string;
  lecturerName: string;
  department: string;
  phoneNumber: string;
  expertise: string;
  yearsOfExperience: number;
  bio: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: Date;
  id: string;
};

export interface Mentor {
  name: string;
  businessName: string;
  businessEmail: string;
  contactPhone: string;
  expertise: string;
  accountId: string;
  account: any;
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: any;
}

export interface Student {
  studentName: string;
  studentCode: string;
  studentDepartment: string;
  campus: string;
  phoneNumber: string;
  accountId: string;
  account: any;
  skills: any;
  teamMembers: any;
  attendances: any;
  studentLecturerAssignments: any;
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: any;
}
export interface QueryAccount {
  roles: string;
}
