import { TeamRequestStatus, TeamRequestType } from '../constant/team-request';

export interface TeamRequest {
  type: TeamRequestType;
  teamId: string;
  team: null;
  senderId: string;
  receiverId: string;
  createdDate: string;
  comment: any;
  updatedBy: string;
  id: string;
  status: TeamRequestStatus;
  isDeleted: boolean;
  lastUpdateDate: string;
}
