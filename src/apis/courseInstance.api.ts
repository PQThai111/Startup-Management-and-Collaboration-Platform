import { CourseInstance } from '../types/course-instance.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'CourseInstance';
const courseInstanceApi = {
  addCourseInstance(data: { courseId: string; semesterId: string }) {
    return http.post<SuccessResponse<CourseInstance>>(`${URL}`, data);
  },

  addAccountToCourseInstance(data: {
    accountId: string;
    courseInstanceId: string;
  }) {
    return http.post(
      `${URL}/${data.courseInstanceId}/AccountInCourseInstance`,
      { id: data.accountId },
    );
  },
};

export default courseInstanceApi;
