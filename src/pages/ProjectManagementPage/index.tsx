import { useMutation, useQuery } from '@tanstack/react-query';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import projectApi from '../../apis/project.api';
import { useContext, useEffect, useState } from 'react';
import { Project } from '../../types/project.type';
import { useNavigate } from 'react-router-dom';
import { ProjectStatus } from '../../constant/project';
import { Progress } from '../../components/ui/progress';
import { Card, CardContent } from '../../components/ui/card';
import startupRequestsApi from '../../apis/startupRequest.api';
import classNames from 'classnames';
import Popover from '../../components/popover';
import RequestStartup from './component/RequestStartup';
import { Request } from '../../types/request.type';
import { AppContext } from '../../context/app.context';

export enum RequestStatus {
  'Pending',
  'Approved',
  'Rejected',
  'Canceled',
}

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChoose, setIsChoose] = useState<Request | null>(null);
  const { profile } = useContext(AppContext);
  const nav = useNavigate();

  const getMyProjects = useMutation({
    mutationFn: () => projectApi.getCurrentProject({}),
  });

  const { data: requestsData } = useQuery({
    queryKey: ['requestsStu', profile?.id],
    queryFn: () => {
      return startupRequestsApi.getRequestsStu();
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getMyProjects.mutate(void 0, {
      onSuccess: (data) => {
        console.log(data.data.data);
        setProjects(data.data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, []);

  return (
    <>
      <Popover
        initialOpen={isOpen && isChoose != null}
        renderPopover={
          <RequestStartup
            handleClose={handleClose}
            requestStartup={isChoose as Request}
          />
        }
      >
        <Header />
        <div className="mx-auto mt-10 h-full min-h-svh w-[70%]">
          {requestsData &&
            requestsData?.data.data.data.map((x) => (
              <Card
                className="h-full cursor-pointer"
                key={x.id}
                onClick={() => {
                  setIsOpen(true);
                  setIsChoose(x);
                }}
              >
                <CardContent className="flex h-full items-center gap-5 pt-5">
                  <div className="w-2/5 text-lg">
                    <p className="text-3xl font-bold">{x.startupIdea.title}</p>
                    <p className="">Semester: {x.semesterAndCourse.semester}</p>
                    <p className="">Course: {x.semesterAndCourse.course}</p>
                    <p className="">Desire Lecturer: {x.desiredLecturerName}</p>
                    {/* <p className="">Milestones: {x.milestones.length}</p>
                  <p className="">Last update date: {project.lastUpdateDate}</p> */}
                    <div className="flex items-center justify-start">
                      <p className="mr-2">Status:</p>
                      <div
                        className={classNames('h-2 w-2 rounded-full', {
                          'bg-yellow-500': x.status == 0,
                          'bg-green-500': x.status == 1,
                          'bg-red-500': x.status == 2 || x.status == 3,
                        })}
                      ></div>
                      <p className="ml-1"> {RequestStatus[x.status]}</p>
                    </div>
                  </div>
                  <div className="h-full w-3/5">
                    <img src={x.startupIdea.coverImage} className="h-[30%]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          {projects.length > 0 &&
            projects.map((project) => (
              <Card
                key={project.id}
                onClick={() => nav(project.id)}
                className="my-4 h-96 cursor-pointer"
              >
                <CardContent className="flex h-full items-center gap-5 pt-5">
                  <div className="w-2/5 text-lg">
                    <p className="text-3xl font-bold">{project.projectName}</p>
                    <p className="text-xl italic">{project.category}</p>
                    <div className="flex gap-10 text-lg">
                      <p className="">
                        Semester: {project.semesterAndCourse.semester}
                      </p>
                      <p className="">
                        Course: {project.semesterAndCourse.course}
                      </p>
                    </div>
                    <p className="">
                      Total Members: {project.team.members.length}
                    </p>
                    <p className="">Milestones: {project.milestones.length}</p>
                    <p className="">
                      Last update date: {project.lastUpdateDate}
                    </p>
                    <p className="">
                      Status: {ProjectStatus[project.projectStatus]}
                    </p>
                    <div className="flex items-center gap-3">
                      <p>Progress:</p>
                      <Progress
                        value={0}
                        className="h-4 border border-slate-500"
                        color="red"
                      />
                    </div>
                  </div>
                  <div className="h-full w-3/5">
                    <img src={project.coverImage} className="h-full w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          {!(
            (requestsData && requestsData?.data?.data?.data.length > 0) ||
            projects.length > 0
          ) && (
            <div className="pt-10 text-center text-3xl">
              You dont have any projects,{' '}
              <a
                className="cursor-pointer text-blue-500 underline"
                href="/createProject"
              >
                create new?
              </a>
            </div>
          )}
        </div>
        <Footer />
      </Popover>
    </>
  );
};

export default ProjectManagementPage;
