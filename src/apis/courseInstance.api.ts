import {
  CourseInstance,
  CourseInstanceStatus,
} from '../types/course-instance.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'CourseInstance';
const courseInstanceApi = {
  addCourseInstance(data: { courseId: string; semesterId: string }) {
    return http.post<SuccessResponse<CourseInstance>>(`${URL}`, data);
  },

  addAccountToCourseInstance({
    accountId,
    semesterId,
    courseId,
  }: {
    accountId: string;
    courseId: string;
    semesterId: string;
  }) {
    return http.post(`${URL}/AccountInCourseInstance`, [accountId], {
      params: { semesterId, courseId },
    });
  },

  getAllCourseInstances() {
    return http.get<SuccessResponse<CourseInstance[]>>(`${URL}`);
  },

  editCourseInstance(data: {
    courseId: string;
    semesterId: string;
    id: string;
    status: CourseInstanceStatus;
    isDeleted: boolean;
  }) {
    return http.put(`${URL}/${data.id}`, data);
  },
};

export default courseInstanceApi;
