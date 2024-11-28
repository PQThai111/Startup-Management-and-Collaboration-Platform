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

  getCurrentProject({
    courseId,
    semesterId,
  }: {
    courseId?: string;
    semesterId?: string;
  }) {
    return http.get<SuccessResponse<Project[]>>(
      `${URL}/CurrentUserProject?${courseId && `courseId=${courseId}`}&${semesterId && `semesterId=${semesterId}`}`,
    );
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
};

export default projectApi;
