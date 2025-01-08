import { Project, ProjectConfig, ProjectList } from '../types/project.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';
import { convertToFormData } from '../util/util';

const URL = 'Projects';
const projectApi = {
  getProjectss() {
    return http.get<SuccessResponse<ProjectList>>(URL);
  },
  getProjects(params: ProjectConfig) {
    return http.get<SuccessResponse<ProjectList>>(URL, {
      params,
    });
  },
<<<<<<< HEAD
=======
  getProjects2(queryString: string) {
    return http.get<SuccessResponse<ProjectList>>(`${URL}?${queryString}`);
  },
>>>>>>> e31efde (Staff manage main)
  getProjectDetail({
    id,
    orderMilestoneByStartDate = false,
  }: {
    id: string;
    orderMilestoneByStartDate?: boolean;
  }) {
    return http.get<SuccessResponse<Project>>(
      `${URL}/${id}?orderMilestoneByStartDate=${orderMilestoneByStartDate}`,
    );
  },
  getProjectByTeamId(teamId: string) {
    return http.get<SuccessResponse<Project>>(`${URL}/Team/${teamId}`);
  },
  getCurrentProject({
    courseId,
    semesterId,
  }: {
    courseId?: string;
    semesterId?: string;
  }) {
    return http.get<SuccessResponse<{ data: Project[] }>>(
      `${URL}/CurrentUserProject?${courseId && `courseId=${courseId}`}&${semesterId && `semesterId=${semesterId}`}`,
    );
  },
  updateProjectV2({ id, data }: { id: string; data: FormData }) {
    return http.put<SuccessResponse<Project>>(`${URL}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateProject({
    id,
    ...rest
  }: Partial<
    Omit<
      Project,
      | 'semesterAndCourse'
      | 'mentorsAndLecturers'
      | 'team'
      | 'milestones'
      | 'lastUpdateDate'
      | 'createdDate'
      | 'id'
    >
  > & { id: string }) {
    return http.put<SuccessResponse<Project>>(
      `${URL}/${id}`,
      convertToFormData(rest),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
  searchProject({
    PageSize = 10,
    PageNumber = 1,
    SearchTerm,
  }: {
    PageSize?: number;
    PageNumber?: number;
    SearchTerm: string;
  }) {
    return http.get<SuccessResponse<ProjectList>>(
      `${URL}?${new URLSearchParams({
        PageSize: PageSize.toString(),
        PageNumber: PageNumber.toString(),
        SearchTerm,
      }).toString()}`,
    );
  },
};

export default projectApi;
