import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Skills';
const skillApi = {
  editSkill(data: {
    skillName?: string;
    skillDescription?: string;
    skillType?: string;
    skillLevel?: string;
    studentId?: string;
    id: string;
    status?: number;
    isDeleted?: boolean;
  }) {
    return http.put<SuccessResponse<any>>(`${URL}/${data.id}`, data);
  },

  addSkill(data: {
    skillName: string;
    skillDescription: string;
    skillType: string;
    skillLevel: string;
    studentId: string;
  }) {
    return http.post<SuccessResponse<any>>(URL, [data]);
  },
};

export default skillApi;
