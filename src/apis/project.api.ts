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
  getProjects2(queryString: string) {
    return http.get<SuccessResponse<ProjectList>>(`${URL}?${queryString}`);
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
    return http.get<SuccessResponse<Project[]>>(
      `${URL}/CurrentUserProject?isPaging=false&${courseId && `courseId=${courseId}`}&${semesterId && `semesterId=${semesterId}`}`,
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

  getProjectDashboard(data: { courseId?: string; semesterId?: string }) {
    return http.get<
      SuccessResponse<{
        TotalProjects: number;
        Healthcare: number;
        Fintech: number;
        SharingEconomy: number;
        Edtech: number;
        ECommerce: number;
        SaaS: number;
        GreenTech: number;
        AIAndMachineLearning: number;
        Proptech: number;
        Agtech: number;
        LogisticsAndSupplyChain: number;
        EntertainmentAndMedia: number;
        Mobility: number;
        Cybersecurity: number;
        Others: number;
      }>
    >(`${URL}/dashboard`, {
      params: data,
    });
  },
};

export default projectApi;
