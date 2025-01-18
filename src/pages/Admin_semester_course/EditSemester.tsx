import { SubmitHandler, useForm } from 'react-hook-form';
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
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Semester, SemesterStatus } from '../../types/semester.type';
import dayjs from 'dayjs';
import { DateTimePicker } from '../../common/components/DateTimePicker';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import semesterApi from '../../apis/semester.api';
import { toast } from 'react-toastify';

const EditSemester = ({
  semester,
}: {
  semester: Omit<Semester, 'courseInstances' | 'courseMilestoneInstances'>;
}) => {
  const [startDate, setStartDate] = useState<Date>(
    dayjs(semester.startDate).toDate(),
  );
  const [open, setOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>(
    dayjs(semester.endDate).toDate(),
  );
  const [status, setStatus] = useState<string>(semester.status.toString());
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<{
    name: string;
    description: string;
    id: string;
    isDeleted: boolean;
  }>({
    defaultValues: {
      name: semester.name,
      description: semester.description,
      id: semester.id,
      isDeleted: semester.isDeleted,
    },
  });

  const editSemester = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      id: string;
      status: SemesterStatus;
      isDeleted: boolean;
    }) => semesterApi.editSemester(data),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    description: string;
    id: string;
    isDeleted: boolean;
  }> = (data) => {
    editSemester.mutate(
      {
        ...data,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: parseInt(status),
      },
      {
        onSuccess: () => {
          toast.success('Semester updated successfully');
          queryClient.invalidateQueries({
            queryKey: ['semesters'],
          });
          setOpen(false);
        },
        onError: () => {
          toast.error('Failed to update semester');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Semester</DialogTitle>
            <DialogDescription>
              Make changes to your semester here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" {...register('name')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              {...register('description')}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <div className="col-span-3">
              <DateTimePicker
                showTime={false}
                value={startDate}
                onChange={setStartDate}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <div className="col-span-3">
              <DateTimePicker
                showTime={false}
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Unactive</SelectItem>
                  <SelectItem value="1">OnGoing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSemester;
