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
  startTime: string
  endTime: string
  creatorId: string
}