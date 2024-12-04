import { TeamMember } from '../types/team-member.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'TeamMembers';
const teamMemberApis = {
  getTeamMembers({ teamId }: { teamId: string }) {
    return http.get<SuccessResponse<TeamMember[]>>(`${URL}?teamId=${teamId}`);
  },

  acceptTeamMemberRequest(data: {
    memberRole: string;
    note: string;
    teamRequestId: string;
  }) {
    return http.post<SuccessResponse<any>>(`${URL}/CreateByRequest`, data);
  },
};

export default teamMemberApis;
