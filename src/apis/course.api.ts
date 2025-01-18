import { Course, CourseStatus } from '../types/course.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Course';
const courseApi = {
  getCourses() {
    return http.get<SuccessResponse<Course[]>>(URL);
  },

  addCourse(data: { name: string; description: string }) {
    return http.post<SuccessResponse<Course>>(URL, data);
  },

  editCourse(data: {
    name: string;
    description: string;
    id: string;
    status: CourseStatus;
    isDeleted: boolean;
  }) {
    return http.put<SuccessResponse<Course>>(`${URL}/${data.id}`, data);
  },
};

export default courseApi;
