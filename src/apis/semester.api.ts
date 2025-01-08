import { Semester } from '../types/semester.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Semester';

const semesterApi = {
  getSemester(semesterId: string) {
    return http.get<SuccessResponse<Semester>>(`${URL}/${semesterId}`);
  },

  getAllSemester() {
    return http.get<SuccessResponse<Semester[]>>(`${URL}`);
  },

  createSemester(semester: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) {
    return http.post(`${URL}`, semester);
  },
};

export default semesterApi;
