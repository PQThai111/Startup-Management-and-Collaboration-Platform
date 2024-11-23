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
import { TooltipProvider } from '../../../components/ui/tooltip';
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
import { AlertDialogHeader } from '../../../components/ui/alert-dialog';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { DateTimePicker } from '../../../common/components/DateTimePicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import milestoneApi, { MilestoneApiProps } from '../../../apis/milestone.api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Progress } from '../../../components/ui/progress';
import { convertToDateFormat } from '../../../util/time';

const Milestone = ({
  project,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { project: Project }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [milestoneAction, setMilestoneAction] = useState<'Add' | 'Edit'>('Add');

  const { register, handleSubmit, control } = useForm<MilestoneApiProps>();

  const handleAddMilestone = useMutation({
    mutationFn: (data: MilestoneApiProps) => {
      const body = { ...data, projectId: project.id };
      return milestoneApi.addNewMilestone(body);
    },
  });

  // const handleEditMilestone = () => {};

  const onSubmit: SubmitHandler<MilestoneApiProps> = (data) => {
    console.log(data);
    if (milestoneAction === 'Add') {
      handleAddMilestone.mutate(data, {
        onSuccess: (data) => {
          console.log(data);
          toast.success('Milestone added successfully');
          setOpen(false);
        },
        onError: () => {
          // console.log(error.response?.data.errors);
          toast.error('Failed to add milestone');
        },
      });
    } else {
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-col justify-between rounded-xl bg-[#EEF2F5] px-3 py-3 ${className}`}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Milestone </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Milestones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <button onClick={() => setMilestoneAction('Add')}>
                      Add
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <button onClick={() => setMilestoneAction('Edit')}>
                      Edit
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <TooltipProvider skipDelayDuration={0}>
          <div className="mt-2">
            <ol className="overflow-auto border-l border-neutral-300 dark:border-neutral-500">
              {project.milestones.map(
                ({ description, endDate, id, name, startDate }) => (
                  <li key={id}>
                    <div className="flex-start flex items-center pt-3">
                      <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        {convertToDateFormat(startDate)} -{' '}
                        {convertToDateFormat(endDate)}
                      </p>
                    </div>
                    <div className="mb-6 ml-4 mt-2">
                      <h4 className="mb-1.5 text-xl font-semibold">{name}</h4>
                      <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                        {description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>
        </TooltipProvider>
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
