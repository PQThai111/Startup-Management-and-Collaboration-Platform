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
};

export default teamRequestApis;
