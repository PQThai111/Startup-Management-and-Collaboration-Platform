import { Semester, SemesterStatus } from '../types/semester.type';
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
    return http.post(`${URL}/add-with-course-instance`, semester);
  },

  editSemester(data: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    id: string;
    status: SemesterStatus;
    isDeleted: boolean;
  }) {
    return http.put(`${URL}/${data.id}`, data);
  },
};

export default semesterApi;
