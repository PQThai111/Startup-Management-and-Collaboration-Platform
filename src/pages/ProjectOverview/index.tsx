import ContentContainer from '../ProjectDetaill/components/ContentContainer';
import Overview from './components/Overview';
import Milestone from './components/Milestone';
import Members from './components/Members';
import StartupIdea from './components/StartupIdea';
import MentorLecturer from './components/MentorLecturer';
import { useContext } from 'react';
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

interface AcceptProjectForm {
  note: string;
  memberRole: string;
}

const ProjectOverview = () => {
  const { isMember, project } = useContext(ProjectContext);

  const { register, handleSubmit } = useForm<AcceptProjectForm>();

  const onSubmit: SubmitHandler<AcceptProjectForm> = (data) => {
    acceptTeamRequest.mutate(data, {
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
    });
  };

  const acceptTeamRequest = useMutation({
    mutationFn: ({ memberRole, note }: { memberRole: string; note: string }) =>
      teamMemberApis.acceptTeamMemberRequest({
        teamRequestId: project?.team.teamId as string,
        memberRole,
        note,
      }),
  });

  return (
    <ContentContainer className="h-svh px-10">
      <div className="flex items-center justify-between gap-5">
        <p className="text-4xl font-bold">Overview</p>
        {!isMember && (
          <div className="flex gap-3">
            <Button variant="destructive">Reject</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Accept</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
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
