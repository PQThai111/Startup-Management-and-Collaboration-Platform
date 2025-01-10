import ContentContainer from '../ProjectDetail/components/ContentContainer';
import Overview from './components/Overview';
import Milestone from './components/Milestone';
import Members from './components/Members';
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema, ProjectSchema } from '../../util/rules';
import projectApi from '../../apis/project.api';
import { AccountRole } from '../../constant/account';
import ApplyButton from '../ProjectPage/components/ApplyButton';

interface AcceptProjectForm {
  note: string;
  memberRole: string;
}

export enum ProjectStatusEnum {
  NotStarted,
  InProgress,
  Completed,
  Canceled,
  UnderReview,
  Passed,
  Fail,
}

const ProjectStatusList = [
  { content: 'Not Started', value: 0 },
  { content: 'In Progress', value: 1 },
  { content: 'Completed', value: 2 },
  { content: 'Canceled', value: 3 },
  { content: 'Under Review', value: 4 },
  { content: 'Passed', value: 5 },
  { content: 'Fail', value: 6 },
];

type FormData = Pick<ProjectSchema, 'ProjectStatus'>;

const schema = projectSchema.pick(['ProjectStatus']);

const ProjectOverview = () => {
  const { isMember, project } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);
  const [requestId, setRequestId] = useState<string>('');
  const [rejectReason, setRejectReason] = useState<string>('');
  const [notifyByEmail, setNotifyByEmail] = useState<boolean>();
  const [dialogStatus, setDialogStatus] = useState<'Reject' | 'Accept'>();

  const {
    handleSubmit: handleSubmitStatus,
    control,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    // resolver: yupResolver(schema),
    // defaultValues: {
    //   ProjectStatus: project!.projectStatus,
    // },
  });

  useEffect(() => {
    if (project) {
      setValue('ProjectStatus', project.projectStatus);
    }
  }, [project]);

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
            ?.teamRequestId || '',
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

  const updateStatusProjectMutation = useMutation({
    mutationFn: projectApi.updateProjectV2,
    onError: (_) => {
      toast.error('Fail update status !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Update status successfully !', {
        autoClose: 500,
      });
      // refetchProject();
    },
  });

  const onSubmitStatus = handleSubmitStatus((data) => {
    const formData = new FormData();
    formData.append('projectStatus', data.ProjectStatus.toString());
    updateStatusProjectMutation.mutate({ id: project!.id, data: formData });
    // createRequestMutation.mutate(formData);
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
        {!isMember &&
          requestId === '' &&
          profile?.role === AccountRole.Student && (
            <ApplyButton teamId={project?.team.teamId as string} />
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
          <div className="col-span-2 h-full justify-between">
            <Overview
              project={project}
              className="rounded-xl"
              isMember={isMember}
            />
            {/* <StartupIdea project={project} className="h-full rounded-xl" /> */}
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
            <form
              onSubmit={onSubmitStatus}
              className="h-[20%] rounded-xl bg-[#EEF2F5] px-3 py-3"
            >
              <Controller
                control={control}
                name="ProjectStatus"
                defaultValue={project.projectStatus}
                render={({ field }) => (
                  <select
                    disabled={
                      profile?.id !=
                      project.mentorsAndLecturers.find(
                        (x) => x.roleType === 'Lecturer',
                      )?.accountId
                    }
                    id="lecturer"
                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                  >
                    {/* {lecturerPending ? (
                  <option>Loading...</option>
                ) : (
                  accounts.map((account) => (
                    <option
                      key={account.lecturer?.id}
                      value={account.lecturer?.id}
                    >
                      {account.lecturer?.lecturerName}
                    </option>
                  ))
                )} */}
                    {ProjectStatusList.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.content}
                      </option>
                    ))}
                  </select>
                )}
              />
              <button
                type="submit"
                disabled={
                  profile?.id !=
                  project.mentorsAndLecturers.find(
                    (x) => x.roleType === 'Lecturer',
                  )?.accountId
                }
                className="h-[40%] w-full rounded-md bg-slate-400 text-white"
              >
                Change Status
              </button>
            </form>
          </div>
        </div>
      )}
    </ContentContainer>
  );
};

export default ProjectOverview;
