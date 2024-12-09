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
};

export default teamApis;
