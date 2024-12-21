import { QueryConfig } from '../pages/EventPage/components/EventList';
import { Student, StudentList } from '../types/student.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Student';

const studentApi = {
  findStudentForTeam: ({
    SemesterId,
    CourseId,
    PageSize,
    PageNumber,
    HadTeam = false,
    SearchTerm = '',
  }: {
    PageSize: number;
    PageNumber: number;
    CourseId: string;
    SemesterId: string;
    HadTeam?: boolean;
    SearchTerm: string;
  }) => {
    return http.get<
      SuccessResponse<{
        data: Student[];
        pagination: {
          page: number;
          limit: number;
          page_size: number;
        };
      }>
    >(
      `${URL}?HadTeam=${HadTeam}&SearchTerm=${SearchTerm}&PageSize=${PageSize}&PageNumber=${PageNumber}&CourseId=${CourseId}&SemesterId=${SemesterId}`,
    );
  },
  getStudentNoTeam(params: QueryConfig) {
    return http.get<SuccessResponse<StudentList>>(URL, {
      params,
    });
  },
  getStudentByAccountId(accountId: string) {
    return http.get<SuccessResponse<Student>>(
      `${URL}/GetStudentByAccId/${accountId}`,
    );
  },
};

export default studentApi;
