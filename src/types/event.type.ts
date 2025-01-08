import { Student } from './student.type';

export interface AttendEvent {
  id: string;
  note: string;
  attendanceType: number;
  status: number;
  student: Student;
}

export interface AttendEventList {
  data: AttendEvent[];
  pagination: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType; //seminar, workshop, meeting
  coverImage: string;
  startDate: string;
  endDate: string;
  location: string;
  tag: string;
  registrationLink: string;
  isMandatory: boolean;
}

export interface EventList {
  data: Event[];
  pagination: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export enum EventType {
  Seminar = 0,
  Workshop = 1,
  Meeting = 2,
}

export interface QueryConfig {
  SearchTerm?: string;
  PageNumber?: number | string;
  PageSize?: number | string;
  EventTypes?: string[];
  IsMandatory?: string;
  CourseId?: string;
  SemesterId?: string;
  HadTeam?: string;
}
