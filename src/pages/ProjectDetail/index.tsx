import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SideBar from '../ProjectDetail/components/Sidebar';
import { ProjectContext } from '../../context/project.context';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import projectApi from '../../apis/project.api';
import { AppContext } from '../../context/app.context';
import accountApi from '../../apis/account.api';
import { Account } from '../../types/account.type';

const ProjectDetail = () => {
  const projectId = useParams<{ projectId: string }>().projectId;
  const { profile } = useContext(AppContext);
  const [isLecturerOrMentor, setIsLecturerOrMentor] = useState<boolean>(false);
  const [student, setStudent] = useState<Account>();
  const [isMember, setIsMember] = useState<boolean>(false);

  const { data: projectDetail } = useQuery({
    queryKey: ['projectDetail', projectId],
    queryFn: () =>
      projectApi.getProjectDetail({
        id: projectId as string,
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
    getStudentProfile.mutate(undefined, {
      onSuccess: (data) => {
        setStudent(data.data.data);
      },
    });
  }, []);

  useEffect(() => {
    if (
      projectDetail?.data.data &&
      projectDetail?.data.data.mentorsAndLecturers.find(
        (item) => item.accountId === profile?.id,
      )
    ) {
      setIsLecturerOrMentor(true);
    }
  }, [projectDetail]);

  useEffect(() => {
    const studentCode = student?.student?.studentCode;
    const studentIndex = projectDetail?.data.data?.team.members.findIndex(
      (item) => item.studentCode === studentCode,
    );
    if (studentIndex !== -1) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [student, projectDetail]);

  return (
    <>
      {/* <NavBar /> */}
      <div className={`${(isMember || isLecturerOrMentor) && 'ml-12'}`}>
        <Header />
        {(isMember || isLecturerOrMentor) && <SideBar />}
        <div>
          <div className="mt-10 px-3">
            <ProjectContext.Provider
              value={{
                project: projectDetail?.data.data,
                isMember,
                isLecturerOrMentor,
              }}
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
