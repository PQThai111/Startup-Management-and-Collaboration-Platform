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
import accountApi from '../../apis/account.api';
import { Account } from '../../types/account.type';

const ProjectDetail = () => {
  const projectId = useParams<{ projectId: string }>().projectId;
  const { profile } = useContext(AppContext);
  const [project, setProject] = useState<Project>();
  const [isLecturerOrMentor, setIsLecturerOrMentor] = useState<boolean>(false);
  const [student, setStudent] = useState<Account>();
  const [isMember, setIsMember] = useState<boolean>(false);
  const getProjectDetail = useMutation({
    mutationFn: (projectId: string) =>
      projectApi.getProjectDetail({
        id: projectId,
        orderMilestoneByStartDate: true,
      }),
  });
  const nav = useNavigate();

  const getStudentProfile = useMutation({
    mutationFn: () => accountApi.getAccount(profile?.id as string),
  });

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

    getStudentProfile.mutate(undefined, {
      onSuccess: (data) => {
        setStudent(data.data.data);
      },
    });
  }, []);

  useEffect(() => {
    if (
      project &&
      project.mentorsAndLecturers.find((item) => item.accountId === profile?.id)
    ) {
      setIsLecturerOrMentor(true);
    }
  }, [project]);

  useEffect(() => {
    const studentCode = student?.student?.studentCode;
    const studentIndex = project?.team.members.findIndex(
      (item) => item.studentCode === studentCode,
    );
    if (studentIndex !== -1) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [student, project]);

  return (
    <>
      {/* <NavBar /> */}
      <div className={`${(isMember || isLecturerOrMentor) && 'ml-12'}`}>
        <Header />
        {(isMember || isLecturerOrMentor) && <SideBar />}
        <div>
          <div className="mt-10 px-3">
            <ProjectContext.Provider
              value={{ project, isMember, isLecturerOrMentor }}
            >
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
