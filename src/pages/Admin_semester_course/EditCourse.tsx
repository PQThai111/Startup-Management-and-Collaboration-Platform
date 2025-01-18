import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Course, CourseStatus } from '../../types/course.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import courseApi from '../../apis/course.api';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const EditCourse = ({
  course,
}: {
  course: Omit<
    Course,
    'courseInstances' | 'courseMilestones' | 'lastUpdateDate'
  >;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(course.status.toString());
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<{
    name: string;
    description: string;
    id: string;
    isDeleted: boolean;
  }>({
    defaultValues: {
      name: course.name,
      description: course.description,
      id: course.id,
      isDeleted: course.isDeleted,
    },
  });

  const editCourse = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      id: string;
      status: CourseStatus;
      isDeleted: boolean;
    }) => courseApi.editCourse(data),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    description: string;
    id: string;
    isDeleted: boolean;
  }> = (data) => {
    editCourse.mutate(
      {
        ...data,
        status: parseInt(status),
      },
      {
        onSuccess: () => {
          toast.success('Course updated successfully');
          queryClient.invalidateQueries({
            queryKey: ['courses'],
          });
          setOpen(false);
        },
        onError: () => {
          toast.error('Failed to update course');
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
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Make changes to your course here. Click save when you're done.
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
                  <SelectItem value="1">Active</SelectItem>
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

export default EditCourse;
