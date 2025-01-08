import { HTMLAttributes, useState } from 'react';
import { Project } from '../../../types/project.type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { BsThreeDots } from 'react-icons/bs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { useMutation } from '@tanstack/react-query';
import projectApi from '../../../apis/project.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import { StartupCategory } from '../../../constant/startup_category';

interface EditOverviewProps {
  projectCode: string;
  projectName: string;
  projectDetail: string;
  category: string;
  memberWanted: string;
  memberWantedStatus: string;
}

const Overview = ({
  project,
  className,
  isMember,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  project: Project;
  isMember: boolean;
}) => {
  const [projectDetail, setProjectDetail] = useState<Project>(project);
  const nav = useNavigate();

  const { register, handleSubmit, setValue, watch } =
    useForm<EditOverviewProps>();

  const updateOverView = useMutation({
    mutationFn: (data: Partial<EditOverviewProps>) =>
      projectApi.updateProject({
        id: projectDetail.id,
        ...data,
        memberWantedStatus: data.memberWantedStatus as unknown as boolean,
      }),
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCancelEditOverview = () => {
    setIsEditing(false);
    setValue('projectCode', projectDetail.projectCode);
    setValue('projectName', projectDetail.projectName);
    setValue('projectDetail', projectDetail.projectDetail);
    setValue('memberWanted', projectDetail.memberWanted);
    setValue('memberWantedStatus', projectDetail.memberWantedStatus.toString());
  };

  const updateProject = useMutation({
    mutationFn: ({
      id,
      ...rest
    }: Partial<
      Omit<
        Project,
        | 'semesterAndCourse'
        | 'mentorsAndLecturers'
        | 'team'
        | 'milestones'
        | 'lastUpdateDate'
        | 'createdDate'
        | 'id'
      >
    > & { id: string }) => projectApi.updateProject({ id, ...rest }),
  });

  const handleDeleteProject = () => {
    updateProject.mutate(
      { id: project.id as string, isDeleted: true },
      {
        onSuccess: () => {
          toast.success('Delete project successfully');
          nav('/projectManagement');
        },
        onError: (error) => {
          console.log(error);
          toast.error('Delete project failed');
        },
      },
    );
  };

  const onSubmit: SubmitHandler<EditOverviewProps> = (data) => {
    console.log(data);
    updateOverView.mutate(
      { ...data },
      {
        onSuccess: (data) => {
          console.log(data.data.data);
          setProjectDetail(data.data.data);
          setIsEditing(false);
          toast.success('Update project successfully');
        },
        onError: (error) => {
          console.log(error);
          toast.error('Update project failed');
        },
      },
    );
  };

  return (
    <div
      className={`mb-3 h-full w-full justify-between rounded-xl bg-[#EEF2F5] px-3 py-3 ${className}`}
      {...props}
    >
      <AlertDialog>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Overview</p>
          {isMember && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Overview</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <AlertDialogTrigger>
                    <button>Delete Project</button>
                  </AlertDialogTrigger>
                </DropdownMenuItem>{' '}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isEditing ? (
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-2 flex items-center gap-2">
                <p className="font-semibold">Name:</p>
                <Input
                  placeholder="Name"
                  className="bg-white"
                  {...register('projectName')}
                  defaultValue={projectDetail.projectName}
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">Code:</p>
                <Input
                  placeholder="Code"
                  className="bg-white"
                  {...register('projectCode')}
                  defaultValue={projectDetail.projectCode}
                />
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <p className="font-semibold">Detail:</p>
              <Textarea
                placeholder="Detail"
                className="bg-white"
                {...register('projectDetail')}
                defaultValue={projectDetail.projectDetail}
              />
            </div>
            <div className="mt-2 grid grid-cols-5 gap-3">
              <div className="col-span-2 flex items-center justify-between">
                <p className="font-semibold">Member Wanted:</p>
                <Select
                  {...register('memberWantedStatus')}
                  onValueChange={(value) =>
                    setValue('memberWantedStatus', value)
                  }
                  defaultValue={projectDetail.memberWantedStatus.toString()}
                >
                  <SelectTrigger className="w-24 bg-white">
                    <SelectValue
                      className="bg-white"
                      placeholder="Select Status"
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Opened</SelectItem>
                      <SelectItem value="false">Close</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                {(watch('memberWantedStatus') as unknown as boolean) && (
                  <div className="flex items-center justify-between gap-5">
                    <p className="font-semibold">Description:</p>
                    <Input
                      placeholder="Name"
                      className="bg-white"
                      {...register('memberWanted')}
                      defaultValue={projectDetail.memberWanted}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Button
                onClick={handleCancelEditOverview}
                className="mt-2 w-full border border-slate-600 bg-transparent text-black"
                type="button"
              >
                Cancel
              </Button>
              <Button className="mt-2 w-full bg-slate-600" type="submit">
                Save
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-3">
            <div className="my-2 grid grid-cols-5 gap-3">
              <div className="col-span-2 flex gap-2">
                <p className="font-semibold">Name: </p>
                {projectDetail.projectName}
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Code: </p>
                {projectDetail.projectCode}
              </div>
            </div>
            <div className="my-2 flex gap-2">
              <p className="font-semibold">Detail:</p>
              {projectDetail.projectDetail}
            </div>
            <div className="my-2 grid grid-cols-5 gap-3">
              <div className="col-span-2 flex">
                <p className="font-semibold">Member Wanted Status: </p>
                {projectDetail.memberWantedStatus.toString()}
              </div>
              <div className="col-span-3 flex gap-2">
                <p className="font-semibold">Member Wanted:</p>
                {projectDetail.memberWanted}
              </div>
            </div>
          </div>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-10">
        <p className="text-xl font-bold">Startup Idea</p>
        <div className="">
          <div className="flex gap-2">
            <p className="font-semibold">Title:</p>{' '}
            {project.team.startupIdea.title}
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Description:</p>{' '}
            {project.team.startupIdea.description}
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Category:</p>{' '}
            {StartupCategory[project.team.startupIdea.category]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
