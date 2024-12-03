export interface FreetimeRequest {
  times: Time[]
  note: string
  meetingAddress: string
}

export interface Time {
  startTime: string
  endTime: string
}

export interface GetSlots {
  startTime: string;
  endTime: string;
  creatorId?: string;
  teamId?: string;
}

export interface TimeSLot {
  date: string
  slot: Slot[]
}

export interface Slot {
  startTime: string
  endTime: string
  note: string
  meetingAddress: string
  teamId: any
  team: any
  creatorId: string
  creatorAccount: any
  studentAttendances: any
  id: string
  status: number
  isDeleted: boolean
  lastUpdateDate: any
}
