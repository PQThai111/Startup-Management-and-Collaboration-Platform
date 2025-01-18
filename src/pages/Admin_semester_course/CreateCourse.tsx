import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import courseApi from '../../apis/course.api';
import { toast } from 'react-toastify';

const CreateCourse = () => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<{
    name: string;
    description: string;
  }>();

  const addNewCourse = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      courseApi.addCourse(data),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    description: string;
  }> = (data) => {
    addNewCourse.mutate(data, {
      onSuccess: () => {
        toast.success('Course added successfully');
        queryClient.invalidateQueries({
          queryKey: ['courses'],
        });
        setOpen(false);
      },
      onError: () => {
        toast.error('Failed to add course');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add new course</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register('name')} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                {...register('description')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourse;
