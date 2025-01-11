import { Team } from './team.type';

export interface FreetimeRequest {
  times: Time[];
  note: string;
  meetingAddress: string;
}

export interface Time {
  startTime: string;
  endTime: string;
}

export interface GetSlots {
  startTime: string;
  endTime: string;
  creatorId?: string;
  teamId?: string;
}

export interface TimeSLot {
  date: string;
  slot: Slot[];
}

export interface Slot {
  startTime: string;
  endTime: string;
  note: string;
  meetingAddress: string;
  teamId: any;
  team: Team | null;
  creatorId: string;
  creatorAccount: any;
  studentAttendances: Attendence[];
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: any;
}

export interface Attendence {
  id: string;
  studentId: string;
  student: any;
  slotId: string;
  appointmentSlot: any;
  eventId: any;
  event: any;
  attendanceType: number;
  note: any;
  updateBy: any;
  deviceId: any;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: any;
}
