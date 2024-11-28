import { MilestoneStatus } from '../constant/milestone';
import { Milestone } from '../types/milestone.type';
import http from '../util/http';

const URL = 'Milestones';

export interface MilestoneApiProps {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectId: string;
}

export interface MilestoneUpdateApiProps
  extends Partial<
    Omit<MilestoneApiProps, 'projectId'> & {
      status: MilestoneStatus;
      isDeleted: boolean;
    }
  > {
  id: string;
}

const milestoneApi = {
  addNewMilestone(data: MilestoneApiProps) {
    return http.post(URL, {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    });
  },

  getAllMilestones({
    projectId,
    orderByStartDate = false,
  }: {
    projectId: string;
    orderByStartDate?: boolean;
  }) {
    return http.get<{ data: (Milestone & { isDeleted: boolean })[] }>(
      `${URL}?projectId=${projectId}&orderByStartDate=${orderByStartDate}`,
    );
  },

  editMilestone(data: MilestoneUpdateApiProps) {
    return http.put(`${URL}/${data.id}`, data);
  },

  deleteMilestone(id: string) {
    return http.delete(`${URL}/${id}`);
  },
};

export default milestoneApi;
