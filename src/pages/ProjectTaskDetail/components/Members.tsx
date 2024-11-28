import { useMutation } from '@tanstack/react-query';
import { FiUserPlus } from 'react-icons/fi';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import teamMemberApis from '../../../apis/team-member.api';
import { TeamMember } from '../../../types/team-member.type';
import { Checkbox } from '../../../components/ui/checkbox';
import { toast } from 'react-toastify';
import projectTaskApi from '../../../apis/project-task.api';
import { Member } from '../../../types/project-task.type';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';

const Members = ({
  members,
  teamId,
  projectTaskId,
  handleAssignMemberSuccess,
}: {
  members: Member[];
  teamId: string;
  projectTaskId: string;
  handleAssignMemberSuccess: (members: TeamMember[]) => void;
}) => {
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedRemoveMember, setSelectedRemoveMember] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const getAllMembers = useMutation({
    mutationFn: (teamId: string) => teamMemberApis.getTeamMembers({ teamId }),
  });

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
        teamMemberId: selectedRemoveMember,
      }),
  });

  const handleClickAddMember = () => {
    getAllMembers.mutate(teamId, {
      onSuccess: (data) => {
        const assignedMember = members.reduce((acc: string[], cur: Member) => {
          return [...acc, cur.userId];
        }, []);
        console.log(assignedMember);
        setAllMembers(
          data.data.data.filter(
            (member) => assignedMember.includes(member.student.id) === false,
          ),
        );
        console.log(allMembers);
      },
    });
  };

  const handleClickCheckbox = (memberId: string) => {
    console.log(memberId);
    setSelectedMembers((prevSelectedIds) =>
      prevSelectedIds.includes(memberId)
        ? prevSelectedIds.filter((selectedId) => selectedId !== memberId)
        : [...prevSelectedIds, memberId],
    );
  };

  const handleAssignMember = () => {
    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member');
      return;
    }
    assignMemberToTask.mutate(
      {
        memberId: selectedMembers,
        projectTaskId,
      },
      {
        onSuccess: () => {
          toast.success('Assign member successfully');
          setOpen(false);
          const selectedMembersData = allMembers.filter((member) =>
            selectedMembers.includes(member.id),
          );
          setSelectedMembers([]);
          handleAssignMemberSuccess(selectedMembersData);
        },
      },
    );
  };

  const handleRemoveMember = () => {
    if (!selectedRemoveMember) {
      toast.error('Please select at least one member');
      return;
    }
    unassignMemberFromTask.mutate(undefined, {
      onSuccess: () => {
        toast.success('Remove member successfully');
        handleAssignMemberSuccess(
          allMembers.filter((member) => member.id !== selectedRemoveMember),
        );
      },
    });
  };

  return (
    <>
      <p className="mb-3 font-bold">Project Members</p>
      <div className="rounded-lg bg-white px-3 py-3 text-sm">
        <AlertDialog>
          {members.map((member) => (
            <div key={member.userId} className="grid grid-cols-10 items-center">
              <p className="col-span-7 text-lg font-semibold">{member.name}</p>
              <p className="col-span-2 text-lg font-semibold italic">
                {member.role}
              </p>
              <AlertDialogTrigger asChild>
                <button
                  onClick={() => setSelectedRemoveMember(member.userId)}
                  className="h-full text-lg"
                >
                  <FaRegTrashAlt />
                </button>
              </AlertDialogTrigger>
            </div>
          ))}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveMember}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={handleClickAddMember}
              className="my-2 flex items-center gap-2 hover:text-blue-500"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-black text-lg">
                <FiUserPlus />
              </div>
              <p>Add member</p>
            </button>
          </DialogTrigger>
          <DialogContent className="w-[600px]">
            <DialogHeader>
              <DialogTitle>Add member</DialogTitle>
              <DialogDescription>Add new member this task</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                {allMembers.length > 0 ? (
                  allMembers.map((member) => (
                    <div
                      key={member.id}
                      className="mt-2 flex items-center justify-between gap-3"
                    >
                      <Checkbox
                        id={member.id}
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={() => handleClickCheckbox(member.id)}
                      />
                      <label
                        htmlFor={member.id}
                        className="w-full cursor-pointer rounded-md border px-2 py-1"
                      >
                        <div className="grid w-full grid-cols-5 gap-5 text-base">
                          <p className="col-span-4">
                            {member.student.studentName}
                          </p>
                          <p>{member.memberRole}</p>
                        </div>
                        <p className="italic opacity-70">{member.note}</p>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No member to add</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAssignMember}>
                Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Members;
