import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Account } from '../../../types/account.type';
import semesterApi from '../../../apis/semester.api';
import { AccountRole } from '../../../constant/account';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import courseApi from '../../../apis/course.api';
import { useState } from 'react';
import courseInstanceApi from '../../../apis/courseInstance.api';
import { toast } from 'react-toastify';

interface EditProps {
  account: Account;
}

const Edit = ({ account }: EditProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const { data: semesters } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterApi.getAllSemester(),
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseApi.getCourses(),
  });

  const addAccountToCourseInstance = useMutation({
    mutationFn: (data: {
      accountId: string;
      courseId: string;
      semesterId: string;
    }) => courseInstanceApi.addAccountToCourseInstance(data),
  });

  const handleAddAccountToCourseInstance = () => {
    if (!selectedCourse || !selectedSemester) {
      toast.error('Please select course and semester ');
      return;
    }
    addAccountToCourseInstance.mutate(
      {
        accountId: account.id,
        semesterId: selectedSemester,
        courseId: selectedCourse,
      },
      {
        onSuccess: () => {
          toast.success('Account added to course instance');
          queryClient.invalidateQueries({
            queryKey: ['account'],
          });
          setSelectedCourse('');
          setSelectedSemester('');
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription>
            Make changes to account here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {account.role === AccountRole.Student && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="semester" className="text-right">
                  Semester
                </Label>
                <Select
                  value={selectedSemester}
                  onValueChange={(value) => setSelectedSemester(value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters?.data.data.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select
                  value={selectedCourse}
                  onValueChange={(value) => setSelectedCourse(value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.data.data.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleAddAccountToCourseInstance}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
