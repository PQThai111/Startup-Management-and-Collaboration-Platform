import http from '../util/http';

const URL = 'Milestones';

export interface MilestoneApiProps {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectId: string;
}

const milestoneApi = {
  addNewMilestone(data: MilestoneApiProps) {
    return http.post(URL,
      {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      },
    );
  },
};

export default milestoneApi;
