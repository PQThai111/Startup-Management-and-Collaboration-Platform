import { useMutation } from '@tanstack/react-query';
import { FiUserPlus } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import teamMemberApis from '../../../apis/team-member.api';
import { TeamMember } from '../../../types/team-member.type';
import { toast } from 'react-toastify';
import projectTaskApi from '../../../apis/project-task.api';
import { Member } from '../../../types/project-task.type';
import { AppContext } from '../../../context/app.context';

const Members = ({
  members,
  teamId,
  projectTaskId,
  handleAssignMemberSuccess,
  handleRemoveMemberSuccess,
  isLecturerOrMentor,
}: {
  members: Member[];
  teamId: string;
  projectTaskId: string;
  handleAssignMemberSuccess: (members: TeamMember[]) => void;
  handleRemoveMemberSuccess: (removedMemberId: string) => void;
  isLecturerOrMentor: boolean;
}) => {
  const { profile } = useContext(AppContext);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const getAllMembers = useMutation({
    mutationFn: (teamId: string) => teamMemberApis.getTeamMembers({ teamId }),
  });
  const [isInTask, setIsInTask] = useState<boolean>(
    members.findIndex((item) => item.userId === profile?.id) !== -1,
  );

  useEffect(() => {
    getAllMembers.mutate(teamId, {
      onSuccess: (data) => {
        setAllMembers(data.data.data);
      },
    });
  }, []);

  const assignMemberToTask = useMutation({
    mutationFn: ({
      memberId,
      projectTaskId,
    }: {
      memberId: string[];
      projectTaskId: string;
    }) => projectTaskApi.assignTeamMember({ memberId, projectTaskId }),
  });

  const unassignMemberFromTask = useMutation({
    mutationFn: () =>
      projectTaskApi.unassignTeamMember({
        id: projectTaskId,
        teamMemberId: profile?.id as string,
      }),
  });

  const handleAssignTask = () => {
    const myMember = allMembers.find(
      (item) => item.student.id === profile?.studentId,
    );

    if (isInTask) {
      // Unassign member from task
      unassignMemberFromTask.mutate(undefined, {
        onSuccess: () => {
          toast.success('Unassign member successfully');
          handleRemoveMemberSuccess(myMember?.id as string);
          setIsInTask(false);
        },
      });
    } else {
      // Assign member to task
      assignMemberToTask.mutate(
        {
          memberId: [myMember?.id as string],
          projectTaskId,
        },
        {
          onSuccess: () => {
            toast.success('Assign member successfully');
            handleAssignMemberSuccess([myMember as TeamMember]);
            setIsInTask(true);
          },
        },
      );
    }
  };

  return (
    <>
      <p className="mb-3 font-bold">Project Members</p>
      <div className="rounded-lg bg-white px-3 py-3 text-sm">
        {members.map((member) => (
          <div key={member.userId} className="grid grid-cols-10 items-center">
            <p className="col-span-8 text-lg font-semibold">{member.name}</p>
            <p
              className={`text-lg font-semibold italic ${isLecturerOrMentor ? 'col-span-3 text-end' : 'col-span-2'}`}
            >
              {member.role}
            </p>
          </div>
        ))}

        <button
          onClick={handleAssignTask}
          className="my-2 flex items-center gap-2 hover:text-blue-500"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-black text-lg">
            <FiUserPlus />
          </div>
          <p>{isInTask ? 'Unassign from this task' : 'Assign to this task'}</p>
        </button>
      </div>
    </>
  );
};

export default Members;
