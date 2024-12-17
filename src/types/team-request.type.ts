import { TeamRequestStatus, TeamRequestType } from '../constant/team-request';

export interface TeamRequest {
  type: TeamRequestType;
  teamId: string;
  team: null;
  senderId: string;
  senderEmail: string;
  senderName: string;
  receiverId: string;
  receiverEmail: string;
  receiverName: string;
  createdDate: string;
  comment: any;
  updatedBy: string;
  id: string;
  teamRequestId: string;
  status: TeamRequestStatus;
  isDeleted: boolean;
  lastUpdateDate: string;
}
