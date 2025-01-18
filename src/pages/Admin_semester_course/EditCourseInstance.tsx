import { useState } from 'react';
import {
  CourseInstance,
  CourseInstanceStatus,
} from '../../types/course-instance.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import courseInstanceApi from '../../apis/courseInstance.api';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'react-toastify';

const EditCourseInstance = ({
  courseInstance,
}: {
  courseInstance: CourseInstance;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(
    courseInstance.status.toString(),
  );
  const queryClient = useQueryClient();

  const editCourse = useMutation({
    mutationFn: (data: {
      courseId: string;
      semesterId: string;
      id: string;
      status: CourseInstanceStatus;
      isDeleted: boolean;
    }) => courseInstanceApi.editCourseInstance(data),
  });

  const handleUpdateCourseInstance = () => {
    editCourse.mutate(
      {
        courseId: courseInstance.courseId,
        semesterId: courseInstance.semesterId,
        id: courseInstance.id,
        status: parseInt(status),
        isDeleted: false,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['courseInstances'],
          });
          toast.success('Course instance updated successfully');
          setOpen(false);
        },
        onError: () => {
          toast.error('Failed to update course instance');
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
        <DialogHeader>
          <DialogTitle>Edit Course By Semester</DialogTitle>
          <DialogDescription>
            Make changes to your course by semester here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
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
                <SelectItem value="0">Scheduled</SelectItem>
                <SelectItem value="1">OnGoing</SelectItem>
                <SelectItem value="2">Completed</SelectItem>
                <SelectItem value="3">Cancelled</SelectItem>
                <SelectItem value="4">Postponed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateCourseInstance}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseInstance;
