import { Team } from '../types/team.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Teams';
const teamApis = {
  getCurrentTeam({
    courseId,
    semesterId,
  }: {
    courseId: string;
    semesterId: string;
  }) {
    return http.get<SuccessResponse<Team>>(
      `${URL}/CurrentUserTeam?courseId=${courseId}&semesterId=${semesterId}`,
    );
  },
  addUserTeam({
    teamId,
    body,
  }: {
    teamId: string;
    body: {
      accountId: string;
      roleType: number;
      description?: string;
    };
  }) {
    return http.post<SuccessResponse<any>>(
      `${URL}/${teamId}/RoleAssignment`,
      body,
    );
  },
  deleteUserTeam({
    teamId,
    accountId,
    roleType,
  }: {
    teamId: string;
    accountId: string;
    roleType: number;
  }) {
    return http.delete<SuccessResponse<any>>(
      `${URL}/${teamId}/RoleAssignment?accountId=${accountId}&roleType=${roleType}`,
    );
  },
};

export default teamApis;
