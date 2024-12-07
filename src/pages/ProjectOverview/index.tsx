import ContentContainer from '../ProjectDetail/components/ContentContainer';
import Overview from './components/Overview';
import Milestone from './components/Milestone';
import Members from './components/Members';
import StartupIdea from './components/StartupIdea';
import MentorLecturer from './components/MentorLecturer';
import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../context/project.context';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import teamMemberApis from '../../apis/team-member.api';
import { toast } from 'react-toastify';
import teamRequestApis from '../../apis/team-request.api';
import { AppContext } from '../../context/app.context';
import { TeamRequestStatus } from '../../constant/team-request';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface AcceptProjectForm {
  note: string;
  memberRole: string;
}

const ProjectOverview = () => {
  const { isMember, project } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);
  const [requestId, setRequestId] = useState<string>('');
  const [rejectReason, setRejectReason] = useState<string>('');
  const [notifyByEmail, setNotifyByEmail] = useState<boolean>();
  const [dialogStatus, setDialogStatus] = useState<'Reject' | 'Accept'>();

  const { register, handleSubmit } = useForm<AcceptProjectForm>();

  const onSubmit: SubmitHandler<AcceptProjectForm> = (data) => {
    acceptTeamRequest.mutate(
      { ...data, teamRequestId: requestId },
      {
        onSuccess: () => {
          toast.success('Accept successfully', {
            autoClose: 2000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  useEffect(() => {
    getAllRequest.mutate(undefined, {
      onSuccess: (data) => {
        setRequestId(
          data.data.data.data.find((item) => item.receiverId === profile?.id)
            ?.id || '',
        );
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, []);

  const getAllRequest = useMutation({
    mutationFn: () =>
      teamRequestApis.findTeamRequest({
        PageSize: 10,
        PageNumber: 1,
        ReceiverId: profile?.id,
        Status: TeamRequestStatus.Pending,
      }),
  });

  const rejectTeamRequest = useMutation({
    mutationFn: ({
      id,
      reason,
      notifyByEmail,
    }: {
      id: string;
      reason: string;
      notifyByEmail?: boolean;
    }) =>
      teamRequestApis.rejectTeamRequest({
        id,
        notifyByEmail,
        reason,
      }),
  });

  const handleRejectJoiningProject = () => {
    rejectTeamRequest.mutate(
      { id: requestId, notifyByEmail, reason: rejectReason },
      {
        onSuccess: () => {
          toast.success('Reject successfully', {
            autoClose: 2000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      },
    );
  };

  const acceptTeamRequest = useMutation({
    mutationFn: ({
      memberRole,
      note,
      teamRequestId,
    }: {
      teamRequestId: string;
      memberRole: string;
      note: string;
    }) =>
      teamMemberApis.acceptTeamMemberRequest({
        teamRequestId,
        memberRole,
        note,
      }),
  });

  return (
    <ContentContainer className="h-svh px-10">
      <div className="flex items-center justify-between gap-5">
        <p className="text-4xl font-bold">Overview</p>
        {!isMember && requestId !== '' && (
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setDialogStatus('Reject')}
                  variant="destructive"
                >
                  Reject
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button onClick={() => setDialogStatus('Accept')}>
                  Accept
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                {dialogStatus === 'Accept' ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Accept Joining Project</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <Input
                          {...register('memberRole')}
                          id="role"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="note" className="text-right">
                          Note
                        </Label>
                        <Input
                          {...register('note')}
                          id="note"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Apply</Button>
                    </DialogFooter>
                  </form>
                ) : (
                  <div>
                    <DialogHeader>
                      <DialogTitle>Reject Joining Project</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reason" className="text-right">
                          Reason
                        </Label>
                        <Input
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          id="reason"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notifyByEmail" className="text-right">
                          NotifyByEmail
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setNotifyByEmail(value === 'true')
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Notify By Email" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleRejectJoiningProject}
                        type="submit"
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      {project && (
        <div className="mt-2 grid h-[85vh] grid-cols-4 gap-4 pb-5">
          <div className="h-full gap-3">
            <Milestone
              className="h-full rounded-xl"
              project={project}
              isMember={isMember}
            />
          </div>
          <div className="col-span-2 flex h-full flex-col justify-between">
            <Overview
              project={project}
              className="rounded-xl"
              isMember={isMember}
            />
            <StartupIdea project={project} className="h-full rounded-xl" />
          </div>
          <div className="flex h-full flex-col justify-between">
            <MentorLecturer project={project} className="h-fit rounded-xl" />
            <Members
              courseId={project.semesterAndCourse.courseId}
              semesterId={project.semesterAndCourse.semesterId}
              team={project?.team}
              className="h-full rounded-xl"
              isMember={isMember}
            />
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export default ProjectOverview;
