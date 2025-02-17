import { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { Project } from '../../../types/project.type';
import { FiUserPlus } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';
import { HiUserRemove } from 'react-icons/hi';
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
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { useMutation } from '@tanstack/react-query';
import studentApi from '../../../apis/student.api';
import { Student } from '../../../types/student.type';
import teamRequestApis from '../../../apis/team-request.api';
import { TeamRequestType } from '../../../constant/team-request';
import { toast } from 'react-toastify';
import { Member } from '../../../types/team.type';
import { AxiosError } from '../../../types/utils.type';
import { MAX_TEAM_SIZE } from '../../../constant/team';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { AppContext } from '../../../context/app.context';
import teamMemberApis from '../../../apis/team-member.api';
import EditMember from './EditMember';

const Members = ({
  team,
  courseId,
  semesterId,
  className,
  isMember,
  id,
  ...props
}: HTMLAttributes<HTMLDivElement> &
  Pick<Project, 'team'> & {
    courseId: string;
    semesterId: string;
    isMember: boolean;
    id: string;
  }) => {
  const { profile } = useContext(AppContext);
  const [members, setMembers] = useState<Member[]>(team.members);
  const [query, setQuery] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [leader, setLeader] = useState<Member>();
  const [, setIsOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const debounce = useDebouncedCallback((value) => {
    setQuery(value);
  }, 1000);

  0;

  const findStudent = useMutation({
    mutationFn: ({
      SemesterId,
      CourseId,
      PageSize,
      PageNumber,
      HadTeam = false,
      SearchTerm = '',
    }: {
      PageSize: number;
      PageNumber: number;
      CourseId: string;
      SemesterId: string;
      HadTeam?: boolean;
      SearchTerm: string;
    }) =>
      studentApi.findStudentForTeam({
        CourseId,
        PageNumber,
        PageSize,
        SearchTerm,
        SemesterId,
        HadTeam,
      }),
  });

  const inviteStudent = useMutation({
    mutationFn: ({
      teamId,
      receiverId,
      type,
    }: {
      teamId: string;
      receiverId: string;
      type: TeamRequestType;
    }) =>
      teamRequestApis.inviteMemberToTeam({
        receiverId,
        teamId,
        type,
      }),
  });

  const removeTeamMember = useMutation({
    mutationFn: ({
      memberRole,
      note,
      teamMemberId,
    }: {
      teamMemberId: string;
      note: string;
      memberRole: string;
    }) =>
      teamMemberApis.updateTeamMember({
        id: teamMemberId,
        isDeleted: true,
        note,
        memberRole,
      }),
  });

  const handleInviteStudent = () => {
    if (!selectedStudent) {
      toast.error('Please select a student to invite');
      return;
    }
    inviteStudent.mutate(
      {
        receiverId: selectedStudent.accountId,
        teamId: team.teamId,
        type: TeamRequestType.Invite,
      },
      {
        onSuccess: () => {
          toast.success('Invitation sent successfully');
          setSelectedStudent(null);
        },
        onError: (err) => {
          toast.error(
            (err as unknown as AxiosError).response.data.errors[0] as string,
          );
        },
      },
    );
  };

  const handleRemoveMember = (member: Member) => {
    removeTeamMember.mutate(
      {
        memberRole: member.memberRole,
        note: member.note,
        teamMemberId: member.id,
      },
      {
        onSuccess: () => {
          const newMembers = members.filter((item) => item.id !== member.id);
          setMembers(newMembers);
          toast.success('Remove member successfully');
          setIsOpen(false);
        },
      },
    );
  };

  useEffect(() => {
    const lead = members.find((member) => member.isLeader === true);
    if (lead) {
      setLeader(lead);
    }
  }, [members]);

  useEffect(() => {
    findStudent.mutate(
      {
        SemesterId: semesterId,
        CourseId: courseId,
        PageSize: 10,
        PageNumber: 1,
        SearchTerm: query,
      },
      {
        onSuccess: (data) => {
          setStudents(data.data.data.data);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }, [query]);

  return (
    <div
      className={`w-full items-center rounded-xl bg-[#EEF2F5] px-3 py-3 ${className} mb-3`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Members</p>
        <p className="italic">{`${members.length} / ${MAX_TEAM_SIZE}`}</p>
      </div>
      <div className="mt-3 gap-2">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{leader?.studentName}</p>
            <p className="text-lg font-semibold italic">{leader?.memberRole}</p>
          </div>
          <div className="flex justify-between">
            <p className="italic opacity-70">{leader?.note}</p>
            <p className="italic">Leader</p>
          </div>
        </div>
        {members
          .filter((item) => item.isLeader !== true)
          .map((member) => (
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <p className="text-lg font-semibold">{member.studentName}</p>
                  {profile?.studentId === leader?.studentId && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="my-2 flex items-center gap-2 hover:text-blue-500">
                            <HiUserRemove />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Remove Member</DialogTitle>
                            <DialogDescription>
                              Remove member from your team
                            </DialogDescription>
                          </DialogHeader>
                          <p className="text-lg font-bold italic">
                            Are you sure to remove this member from your team?
                          </p>
                          <DialogFooter>
                            <Button
                              type="button"
                              onClick={() => {
                                handleRemoveMember(member);
                              }}
                            >
                              Remove
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <EditMember
                        member={member}
                        projectId={id}
                        setMembers={setMembers}
                        memberList={members}
                      />
                    </>
                  )}
                </div>
                <p className="text-lg font-semibold italic">
                  {member.memberRole}
                </p>
              </div>
              <p className="italic opacity-70">{member.note}</p>
            </div>
          ))}
      </div>
      {isMember && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="my-2 flex items-center gap-2 hover:text-blue-500">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-black text-lg">
                <FiUserPlus />
              </div>
              <p>Add member</p>
            </button>
          </DialogTrigger>
          <DialogContent className="w-[600px]">
            <DialogHeader>
              <DialogTitle>Add member</DialogTitle>
              <DialogDescription>Add new member to your team</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="query" className="text-right">
                  Code/Email
                </Label>
                <Input
                  id="query"
                  defaultValue={query}
                  onChange={(e) => debounce(e.target.value)}
                  placeholder="Enter Student Code or Email to find"
                  className="col-span-3"
                />
              </div>
              <ScrollArea className="h-96">
                {students &&
                  students.map((student) => (
                    <button
                      className={`mb-1 w-full rounded-md border px-2 py-2 ${selectedStudent?.id === student.id ? 'bg-blue-100' : ''}`}
                      onClick={() => {
                        if (selectedStudent?.id === student.id) {
                          setSelectedStudent(null);
                        } else {
                          setSelectedStudent(student);
                        }
                      }}
                      key={`student-${student.id}`}
                    >
                      <p className="text-left text-lg font-semibold">
                        {student.studentName}
                      </p>
                      <div className="flex gap-3 text-sm">
                        {student.skills.map((skill) => (
                          <p>{skill.skillName}</p>
                        ))}
                      </div>
                    </button>
                  ))}
              </ScrollArea>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleInviteStudent}>
                Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Members;
