import { HTMLAttributes, useState } from 'react';
import { Project } from '../../../types/project.type';
import { MdOutlineEdit } from 'react-icons/md';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
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
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { DateTimePicker } from '../../../common/components/DateTimePicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import milestoneApi, {
  MilestoneApiProps,
  MilestoneUpdateApiProps,
} from '../../../apis/milestone.api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Progress } from '../../../components/ui/progress';
import { convertToDateFormat } from '../../../util/time';
import { FaPlus, FaRegTrashCan } from 'react-icons/fa6';
import { Milestone as MilestoneType } from '../../../types/milestone.type';
import { ScrollArea } from '../../../components/ui/scroll-area';

const Milestone = ({
  project,
  className,
  isMember,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  project: Project;
  isMember: boolean;
}) => {
  const [milestoneList, setMilestoneList] = useState<MilestoneType[]>(
    project.milestones,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [milestoneAction, setMilestoneAction] = useState<'Add' | 'Edit'>('Add');
  const [selectedId, setSelectedId] = useState<string>();
  const { register, handleSubmit, control, setValue, resetField } =
    useForm<MilestoneApiProps>();

  const handleClickEditMilestone = ({
    description,
    endDate,
    name,
    startDate,
    id,
  }: Omit<MilestoneApiProps, 'projectId'> & { id: string }) => {
    setMilestoneAction('Edit');
    setValue('description', description);
    setValue('name', name);
    setValue('endDate', endDate);
    setValue('startDate', startDate);
    setSelectedId(id);
  };

  const handleClickAddMilestone = () => {
    setMilestoneAction('Add');
    resetField('description');
    resetField('name');
    resetField('endDate');
    resetField('startDate');
  };

  const handleAddMilestone = useMutation({
    mutationFn: (data: MilestoneApiProps) => {
      const body = { ...data, projectId: project.id };
      return milestoneApi.addNewMilestone(body);
    },
  });

  const handleUpdateMilestone = useMutation({
    mutationFn: ({ id, ...props }: MilestoneUpdateApiProps) => {
      return milestoneApi.editMilestone({
        id,
        ...props,
      });
    },
  });

  const getAllMilestones = useMutation({
    mutationFn: (id: string) =>
      milestoneApi.getAllMilestones({ projectId: id }),
  });

  const deleteMilestone = useMutation({
    mutationFn: (id: string) => milestoneApi.deleteMilestone(id),
  });

  const handleDeleteMilestone = () => {
    deleteMilestone.mutate(selectedId as string, {
      onSuccess: () => {
        toast.success('Milestone deleted successfully');
        setMilestoneList((prev) =>
          prev.filter((milestone) => milestone.id !== selectedId),
        );
        setOpen(false);
      },
    });
  };

  const onSubmit: SubmitHandler<MilestoneApiProps | MilestoneUpdateApiProps> = (
    data,
  ) => {
    console.log(data);
    if (milestoneAction === 'Add') {
      handleAddMilestone.mutate(data as MilestoneApiProps, {
        onSuccess: (data) => {
          console.log(data);
          toast.success('Milestone added successfully');
          getAllMilestones.mutate(project.id, {
            onSuccess: (data) => {
              setMilestoneList(
                data.data.data.filter(
                  (milestone) => milestone.isDeleted === false,
                ),
              );
            },
          });
          setOpen(false);
        },
        onError: () => {
          // console.log(error.response?.data.errors);
          toast.error('Failed to add milestone');
        },
      });
    } else {
      handleUpdateMilestone.mutate(
        { ...data, id: selectedId } as MilestoneUpdateApiProps,
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success('Milestone updated successfully');
            getAllMilestones.mutate(project.id, {
              onSuccess: (data) => {
                setMilestoneList(
                  data.data.data.filter(
                    (milestone) => milestone.isDeleted === false,
                  ),
                );
              },
            });
            setOpen(false);
          },
          onError: () => {
            // console.log(error.response?.data.errors);
            toast.error('Failed to update milestone');
          },
        },
      );
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-col justify-between rounded-xl bg-[#EEF2F5] px-3 py-3 ${className}`}
      {...props}
    >
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Milestone </p>
            {isMember && (
              <DialogTrigger asChild>
                <button onClick={handleClickAddMilestone}>
                  <FaPlus />
                </button>
              </DialogTrigger>
            )}
          </div>
          <div className="mt-2">
            <AlertDialog>
              <ScrollArea className="h-[500px] rounded-md border">
                <ol className="px-3">
                  {milestoneList.map((milestone) => (
                    <li key={milestone.id}>
                      <div className="flex-start flex items-center pt-3">
                        <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm text-neutral-500 dark:text-neutral-300">
                            {convertToDateFormat(milestone.startDate)} -{' '}
                            {convertToDateFormat(milestone.endDate)}
                          </p>
                          {isMember && (
                            <div className="flex gap-2">
                              <DialogTrigger asChild>
                                <button
                                  onClick={() =>
                                    handleClickEditMilestone({
                                      description: milestone.description,
                                      endDate: new Date(milestone.endDate),
                                      id: milestone.id,
                                      name: milestone.name,
                                      startDate: new Date(milestone.startDate),
                                    })
                                  }
                                >
                                  <MdOutlineEdit />
                                </button>
                              </DialogTrigger>
                              <AlertDialogTrigger
                                onClick={() => setSelectedId(milestone.id)}
                              >
                                <FaRegTrashCan />
                              </AlertDialogTrigger>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-6 ml-4 mt-2">
                        <h4 className="mb-1.5 text-xl font-semibold">
                          {milestone.name}
                        </h4>
                        <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                          {milestone.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteMilestone}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogHeader>
                <DialogTitle>{milestoneAction} milestone</DialogTitle>
                <DialogDescription>
                  Make changes to your milestone here. Click save when you're
                  done.
                </DialogDescription>
              </AlertDialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    {...register('name')}
                    id="name"
                    defaultValue=""
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    defaultValue=""
                    className="col-span-3"
                    {...register('description')}
                  />
                </div>
                <div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start date
                    </Label>
                    <div className="col-span-3">
                      <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                          <DateTimePicker
                            showTime={false}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            className=""
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      End date
                    </Label>
                    <div className="col-span-3">
                      <Controller
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                          <DateTimePicker
                            showTime={false}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            className=""
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <p>Progress:</p>
        <Progress
          value={0}
          className="h-4 border border-slate-500"
          color="red"
        />
      </div>
    </div>
  );
};

export default Milestone;
