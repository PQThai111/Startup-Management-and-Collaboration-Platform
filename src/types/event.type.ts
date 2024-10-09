export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType; //seminar, workshop, meeting
  coverImage: string;
  startDate: Date;
  endDate: Date;
  location: string;
  tag: string;
  registrationLink: string;
}

export enum EventType {
  Seminar = 0,
  Workshop = 1,
  Meeting = 2
}