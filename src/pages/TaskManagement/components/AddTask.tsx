import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { DateTimePicker } from '../../../common/components/DateTimePicker';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectTask } from '../../../types/project-task.type';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import projectTaskApi from '../../../apis/project-task.api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { REMINDER_OPTIONS } from '../../../constant/reminder';
import { Button } from '../../../components/ui/button';

const AddTask = ({
  projectId,
  handleUpdateTask,
}: {
  projectId: string;
  handleUpdateTask: () => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date | undefined>();

  const { register, handleSubmit, getValues, setValue } = useForm<
    Omit<
      ProjectTask,
      'id' | 'isDeleted' | 'status' | 'members' | 'comments'
    > & {
      milestonesId: string;
    }
  >();

  const addNewProjectTask = useMutation({
    mutationFn: (
      body: Partial<
        Omit<
          ProjectTask,
          'id' | 'isDeleted' | 'status' | 'members' | 'comments'
        >
      > & {
        name: string;
        description: string;
        projectId: string;
      },
    ) => projectTaskApi.addProjectTask(body),
  });

  const onSubmit: SubmitHandler<
    Partial<
      Omit<ProjectTask, 'id' | 'isDeleted' | 'status' | 'members' | 'comments'>
    > & {
      name: string;
      description: string;
    }
  > = (data) => {
    if (!getValues('name')) {
      toast.error('Task Name is required');
      return;
    }

    if (!getValues('description')) {
      toast.error('Task Description is required');
      return;
    }

    if (endTime && endTime < startTime) {
      toast.error('End Date must be greater than Start Date');
      return;
    }

    console.log({ ...data, startTime, endTime });

    addNewProjectTask.mutate(
      {
        ...data,
        projectId,
        priority: 1,
        reminder: parseInt(data.reminder as unknown as string),
        startTime: startTime.toISOString(),
        endTime: endTime?.toISOString(),
      },
      {
        onSuccess: () => {
          toast.success('Add new task successfully');
          handleUpdateTask();
        },
      },
    );

    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <div>Add New Task</div>
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative mx-auto my-6 w-auto max-w-3xl"
            >
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-3xl font-semibold">Add New Task</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div className="flex items-center gap-5">
                    <Label htmlFor="taskName">
                      Task Name: <strong className="text-red-500">*</strong>
                    </Label>
                    <Input
                      id="taskName"
                      className="w-96"
                      placeholder="Input Task Name"
                      {...register('name')}
                    />
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="message">
                      Description: <strong className="text-red-500">*</strong>
                    </Label>
                    <Textarea
                      placeholder="Type your message here."
                      id="message"
                      className="min-h-32"
                      {...register('description')}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-3 flex w-1/2 items-center gap-5">
                      <Label htmlFor="date" className="w-28">
                        Start Date:
                      </Label>
                      <DateTimePicker
                        className=""
                        showTime={false}
                        value={startTime}
                        onChange={setStartTime}
                      />
                    </div>
                    <div className="mt-3 flex w-1/2 items-center gap-5">
                      <Label htmlFor="date" className="w-24">
                        End Date:
                      </Label>
                      <DateTimePicker
                        className=""
                        showTime={false}
                        value={endTime}
                        onChange={setEndTime}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-4 flex w-1/2 items-center">
                      <Label htmlFor="reminder" className="">
                        Set due date reminder:
                      </Label>
                      <Select
                        {...register('reminder')}
                        onValueChange={(value) =>
                          setValue('reminder', value as unknown as number)
                        }
                      >
                        <SelectTrigger className="w-full" id="reminder">
                          <SelectValue placeholder="Select reminder option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {REMINDER_OPTIONS.map(({ label, value }) => (
                              <SelectItem value={value.toString()} key={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default AddTask;
