import { useMutation } from '@tanstack/react-query';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import projectApi from '../../apis/project.api';
import { useEffect, useState } from 'react';
import { Project } from '../../types/project.type';
import config from '../../constant/config';
import { useNavigate } from 'react-router-dom';
import { ProjectStatus } from '../../constant/project';
import { Progress } from '../../components/ui/progress';
import { Card, CardContent } from '../../components/ui/card';

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const nav = useNavigate();

  const getMyProjects = useMutation({
    mutationFn: () => projectApi.getCurrentProject({}),
  });

  useEffect(() => {
    getMyProjects.mutate(void 0, {
      onSuccess: (data) => {
        console.log(data);
        setProjects(data.data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto mt-10 min-h-svh w-[70%]">
        {projects.length > 0 ? (
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
                  <p className="">Last update date: {project.lastUpdateDate}</p>
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
                  <img
                    src={`${config.baseURLWithoutApi}${project.coverImage}`}
                    className="h-full w-full"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
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
    </>
  );
};

export default ProjectManagementPage;
