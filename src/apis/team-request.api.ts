import { TeamRequestType } from '../constant/team-request';
import http from '../util/http';

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
};

export default teamRequestApis;
