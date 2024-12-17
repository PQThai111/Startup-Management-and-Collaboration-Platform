import { useLocation, useNavigate } from 'react-router-dom';
import Reminder from './components/Reminder';
import Status from './components/Status';
import Description from './components/Description';
import FilesAttachment from './components/FilesAttachment';
import ContentContainer from '../ProjectDetail/components/ContentContainer';
import { useMutation } from '@tanstack/react-query';
import projectTaskApi from '../../apis/project-task.api';
import { useContext, useEffect, useState } from 'react';
import { Member, ProjectTask } from '../../types/project-task.type';
import Members from './components/Members';
import { TeamMember } from '../../types/team-member.type';
import { Button } from '../../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { toast } from 'react-toastify';
import { ProjectContext } from '../../context/project.context';

const ProjectTaskDetail = () => {
  const pathname = useLocation().pathname;
  const { isLecturerOrMentor } = useContext(ProjectContext);
  const projectTaskId = pathname.split('/').pop();
  const backPath = pathname.split('/').slice(0, -1).join('/');
  const [projectDetail, setProjectDetail] = useState<ProjectTask>();
  const nav = useNavigate();

  const getProjectDetail = useMutation({
    mutationFn: (projectId: string) =>
      projectTaskApi.getProjectTaskDetail(projectId),
  });

  const deleteProjectTask = useMutation({
    mutationFn: (projectId: string) =>
      projectTaskApi.editProjectTask({
        id: projectId,
        body: {
          isDeleted: true,
          id: projectId,
        },
      }),
  });

  const handleDeleteProjectTask = () => {
    deleteProjectTask.mutate(projectTaskId as string, {
      onSuccess: () => {
        toast.success('Delete project task successfully');
        nav(backPath);
      },
    });
  };

  const handleRemoveMemberSuccess = (removedMemberId: string) => {
    const newMembers =
      projectDetail?.members.filter(
        (member) => member.teamMemberId !== removedMemberId,
      ) || [];

    setProjectDetail((prev) => {
      if (prev) {
        return {
          ...prev,
          members: newMembers,
        };
      }
      return prev;
    });
  };

  const handleAssignMemberSuccess = (newMembers: TeamMember[]) => {
    setProjectDetail((prev) => {
      if (prev) {
        return {
          ...prev,
          members: newMembers.reduce(
            (acc: Member[], cur: TeamMember) => {
              return [
                ...acc,
                {
                  userId: cur.student.id,
                  name: cur.student.studentName,
                  avatarUrl: cur.student.accountId,
                  role: cur.memberRole,
                  teamMemberId: cur.id,
                },
              ];
            },
            [...prev.members],
          ),
        };
      }
      return prev;
    });
  };

  useEffect(() => {
    !projectTaskId && nav('404');
    getProjectDetail.mutate(projectTaskId as string, {
      onSuccess: (data) => {
        console.log(data.data.data);
        setProjectDetail(data.data.data);
      },
      onError: (error) => {
        console.log(error);
        nav('404');
      },
    });
  }, []);

  return (
    <ContentContainer className="">
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold">{projectDetail?.name}</p>
        {!isLecturerOrMentor && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProjectTask}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      {projectDetail && (
        <div className="mb-4 mt-2 grid h-[80vh] grid-cols-4 gap-6">
          <div className="flex h-full flex-col">
            <div className="h-full rounded-xl bg-[#EEF2F5] px-3 py-3">
              <Description
                id={projectDetail.id}
                description={projectDetail.description}
                isLecturerOrMentor={isLecturerOrMentor}
              />
            </div>
            <div className="mt-4 h-fit rounded-xl bg-[#EEF2F5] px-3 py-3">
              <Status
                status={projectDetail.status}
                projectTaskId={projectDetail.id}
                isLecturerOrMentor={isLecturerOrMentor}
              />
            </div>
          </div>
          <div>
            <div className="h-full rounded-xl bg-[#EEF2F5] px-3 py-3">
              <Reminder
                projectTaskId={projectTaskId as string}
                reminder={projectDetail.reminder}
                start={new Date(projectDetail.startTime)}
                end={new Date(projectDetail.endTime)}
                isLecturerOrMentor={isLecturerOrMentor}
              />
            </div>
          </div>

          <div className="h-full rounded-xl bg-[#EEF2F5] px-3 py-3">
            <FilesAttachment
              taskId={projectDetail.id}
              files={projectDetail?.documents}
              isLecturerOrMentor={isLecturerOrMentor}
            />
          </div>

          <div className="h-full rounded-xl bg-[#EEF2F5] px-3 py-3">
            <Members
              handleAssignMemberSuccess={handleAssignMemberSuccess}
              handleRemoveMemberSuccess={handleRemoveMemberSuccess}
              projectTaskId={projectDetail.id}
              members={projectDetail?.members}
              teamId={projectDetail.teamId}
              isLecturerOrMentor={isLecturerOrMentor}
            />
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export default ProjectTaskDetail;
