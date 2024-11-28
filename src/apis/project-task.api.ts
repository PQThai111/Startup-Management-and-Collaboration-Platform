import { ProjectTask, ProjectTaskByWeek } from '../types/project-task.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'ProjectTasks';
const projectTaskApi = {
  getProjectTasks({
    projectId,
    teamId,
    milestoneId,
    isGroupByWeek = true,
  }: {
    projectId: string;
    teamId: string;
    milestoneId?: string;
    isGroupByWeek?: boolean;
  }) {
    return http.get<SuccessResponse<ProjectTaskByWeek[]>>(
      `${URL}?projectId=${projectId}&teamId=${teamId}&isGroupByWeek=${isGroupByWeek}${milestoneId ? `&milestoneId=${milestoneId}` : ''}`,
    );
  },

  addProjectTask(
    body: Partial<
      Omit<ProjectTask, 'id' | 'isDeleted' | 'status' | 'members' | 'comments'>
    > & {
      name: string;
      description: string;
      projectId: string;
    },
  ) {
    return http.post<SuccessResponse<ProjectTask>>(URL, body);
  },

  getProjectTaskDetail(id: string) {
    return http.get<SuccessResponse<ProjectTask>>(`${URL}/${id}`);
  },

  editProjectTask({ id, body }: { id: string; body: Partial<ProjectTask> }) {
    return http.put(`${URL}/${id}`, body);
  },

  assignTeamMember({
    memberId,
    projectTaskId,
  }: {
    memberId: string[];
    projectTaskId: string;
  }) {
    return http.post(`${URL}/${projectTaskId}/AssignTeamMember`, memberId);
  },

  unassignTeamMember({
    id,
    teamMemberId,
  }: {
    id: string;
    teamMemberId: string;
  }) {
    return http.delete(
      `${URL}/${id}/UnAssignTeamMember?teamMemberId=${teamMemberId}`,
    );
  },
};

export default projectTaskApi;
