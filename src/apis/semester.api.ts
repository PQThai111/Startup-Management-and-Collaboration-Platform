import { Semester } from '../types/semester.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Semester';

const semesterApi = {
  getSemester(semesterId: string) {
    return http.get<SuccessResponse<Semester>>(`${URL}/${semesterId}`);
  },
};

export default semesterApi;
