import { TeamRequestStatus, TeamRequestType } from '../constant/team-request';
import { TeamRequest } from '../types/team-request.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';
import { convertObjectToParam } from '../util/util';

interface FindTeamRequestProps {
  PageSize: number;
  PageNumber: number;
  Type?: TeamRequestType;
  Status?: TeamRequestStatus;
  TeamId?: string;
  SenderId?: string;
  ReceiverId?: string;
}

interface FindTeamRequestResponse {
  data: (TeamRequest & {
    teamLeaderName: string;
    projectName: string;
    projectId: string;
    teamRequestId: string;
  })[];
  pagination: {
    number: number;
    limit: number;
    pageSize: number;
  };
}

const URL = 'TeamRequest';
const teamRequestApis = {
  inviteMemberToTeam({
    teamId,
    receiverId,
    type,
  }: {
    teamId: string;
    receiverId: string;
    type: TeamRequestType;
  }) {
    return http.post(`${URL}`, {
      teamId,
      receiverId,
      type,
    });
  },

  findTeamRequest(data: FindTeamRequestProps) {
    return http.get<SuccessResponse<FindTeamRequestResponse>>(
      `${URL}/search?${new URLSearchParams(convertObjectToParam(data))}`,
    );
  },

  updateTeamRequest(data: {
    id: string;
    comment?: string;
    status?: TeamRequestStatus;
  }) {
    return http.put(`${URL}/${data.id}`, data);
  },

  rejectTeamRequest({
    id,
    reason,
    notifyByEmail = true,
  }: {
    id: string;
    reason: string;
    notifyByEmail?: boolean;
  }) {
    return http.put(`${URL}/${id}/RejectRequest`, {
      reason,
      notifyByEmail: notifyByEmail,
    });
  },

  applyForProject(data: {
    type: TeamRequestType;
    teamId?: string;
    receiverId?: string;
    comment: string;
  }) {
    return http.post(`${URL}`, data);
  },
};

export default teamRequestApis;
