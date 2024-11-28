import { useEffect, useState } from 'react';
import { Project } from '../../types/project.type';
import { useMutation } from '@tanstack/react-query';
import projectApi from '../../apis/project.api';
import { useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ProjectDetaill/components/ContentContainer';
import Overview from './components/Overview';
import Milestone from './components/Milestone';
import Members from './components/Members';
import StartupIdea from './components/StartupIdea';
import MentorLecturer from './components/MentorLecturer';

const ProjectOverview = () => {
  const projectId = useParams<{ projectId: string }>().projectId;
  const [project, setProject] = useState<Project>();
  const getProjectDetail = useMutation({
    mutationFn: (projectId: string) =>
      projectApi.getProjectDetail({
        id: projectId,
        orderMilestoneByStartDate: true,
      }),
  });
  const nav = useNavigate();

  useEffect(() => {
    if (!projectId) {
      nav('/404');
      return;
    }
    getProjectDetail.mutate(projectId, {
      onSuccess: (data) => {
        setProject(data.data.data);
        console.log(data.data.data);
      },
      onError: (error) => {
        console.log(error);
        nav('/404');
      },
    });
  }, []);

  return (
    <ContentContainer className="h-svh px-10">
      <div className="flex items-center justify-between gap-5">
        <p className="text-4xl font-bold">Overview</p>
      </div>
      {project && (
        <div className="mt-2 grid h-[85vh] grid-cols-4 gap-4 pb-5">
          <div className="h-full gap-3">
            <Milestone className="h-full rounded-xl" project={project} />
          </div>
          <div className="col-span-2 flex h-full flex-col justify-between">
            <Overview project={project} className="rounded-xl" />
            <StartupIdea project={project} className="h-full rounded-xl" />
          </div>
          <div className="flex h-full flex-col justify-between">
            <MentorLecturer project={project} className="h-fit rounded-xl" />
            <Members
              courseId={project.semesterAndCourse.courseId}
              semesterId={project.semesterAndCourse.semesterId}
              team={project?.team}
              className="h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export default ProjectOverview;
