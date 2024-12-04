import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SideBar from '../ProjectDetail/components/Sidebar';
import { ProjectContext } from '../../context/project.context';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import projectApi from '../../apis/project.api';
import { Project } from '../../types/project.type';
import { AppContext } from '../../context/app.context';

const ProjectDetail = () => {
  const projectId = useParams<{ projectId: string }>().projectId;
  const { profile } = useContext(AppContext);
  const [project, setProject] = useState<Project>();
  const [isMember, setIsMember] = useState<boolean>(false);
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

    // if (project?.team.members.includes(profile?.id)) {
    // setIsMember(true);
    // }
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <div className={`${isMember && 'ml-12'}`}>
        <Header />
        {isMember && <SideBar />}
        <div>
          <div className="mt-10 px-3">
            <ProjectContext.Provider value={{ project, isMember }}>
              <Outlet />
            </ProjectContext.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
