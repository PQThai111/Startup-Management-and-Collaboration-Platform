import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import accountApi from '../../../apis/account.api';
import { AccountRole } from '../../../constant/account';

interface AddAccountProps {
  email: string;
  password: string;
  studentName?: string;
  studentCode?: string;
  studentDepartment?: string;
  phoneNumber?: string;
  lecturerName?: string;
  name?: string;
  businessName?: string;
  businessEmail?: string;
  contactPhone?: string;
  expertise?: string;
  department?: string;
  yearsOfExperience?: number;
  bio?: string;
}

const AddAccount = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<
    'student' | 'manager' | 'lecturer' | 'mentor'
  >('student');
  const queryClient = useQueryClient();

  const { register, handleSubmit, resetField } = useForm<AddAccountProps>();

  const addStudent = useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      studentName: string;
      studentCode: string;
      studentDepartment: string;
      phoneNumber: string;
    }) => accountApi.createStudentAccount(data),
  });

  const addManager = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      accountApi.createManagerAccount(data),
  });

  const addMentorLecturer = useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      role: AccountRole;
      mentor?: {
        name: string;
        businessName: string;
        businessEmail: string;
        contactPhone: string;
        expertise: string;
      };
      lecturer?: {
        lecturerName: string;
        phoneNumber: string;
        expertise: string;
        department: string;
        yearsOfExperience: number;
        bio: string;
      };
    }) => accountApi.createLecturerMentorAccount(data),
  });

  const onSubmit: SubmitHandler<AddAccountProps> = (data) => {
    if (selectedRole === 'manager') {
      if (!data.email || !data.password) {
        toast.error('Please fill in all fields');
        return;
      }
      addManager.mutate(data, {
        onSuccess: () => {
          toast.success('Add manager account successfully');
          setOpen(false);
        },
        onError: () => {
          toast.error('Add manager account failed');
        },
      });
    } else if (selectedRole === 'student') {
      if (
        !data.email ||
        !data.password ||
        !data.studentName ||
        !data.studentCode ||
        !data.studentDepartment ||
        !data.phoneNumber
      ) {
        toast.error('Please fill in all fields');
        return;
      }
      addStudent.mutate(
        data as {
          email: string;
          password: string;
          studentName: string;
          studentCode: string;
          studentDepartment: string;
          phoneNumber: string;
        },
        {
          onSuccess: () => {
            toast.success('Add student account successfully');
            setOpen(false);
          },
          onError: () => {
            toast.error('Add student account failed');
          },
        },
      );
    } else if (selectedRole === 'lecturer') {
      if (
        !data.email ||
        !data.password ||
        !data.lecturerName ||
        !data.phoneNumber ||
        !data.expertise ||
        !data.department ||
        !data.yearsOfExperience ||
        !data.bio
      ) {
        toast.error('Please fill in all fields');
        return;
      }
      addMentorLecturer.mutate(
        {
          email: data.email,
          password: data.password,
          role: AccountRole.Lecturer,
          lecturer: {
            lecturerName: data.lecturerName,
            phoneNumber: data.phoneNumber,
            expertise: data.expertise,
            department: data.department,
            yearsOfExperience: data.yearsOfExperience,
            bio: data.bio,
          },
        },
        {
          onSuccess: () => {
            toast.success('Add lecturer account successfully');
            setOpen(false);
          },
          onError: () => {
            toast.error('Add lecturer account failed');
          },
        },
      );
    } else {
      if (
        !data.email ||
        !data.password ||
        !data.name ||
        !data.businessName ||
        !data.businessEmail ||
        !data.contactPhone
      ) {
        toast.error('Please fill in all fields');
        return;
      }
      addMentorLecturer.mutate(
        {
          email: data.email,
          password: data.password,
          role: AccountRole.Mentor,
          mentor: {
            name: data.name,
            businessName: data.businessName,
            businessEmail: data.businessEmail,
            contactPhone: data.contactPhone,
            expertise: data.expertise || '',
          },
        },
        {
          onSuccess: () => {
            toast.success('Add mentor account successfully');
            setOpen(false);
          },
          onError: () => {
            toast.error('Add mentor account failed');
          },
        },
      );
    }
    resetField('email');
    resetField('password');
    resetField('phoneNumber');
    resetField('studentCode');
    resetField('studentDepartment');
    resetField('studentName');
    resetField('lecturerName');
    resetField('name');
    resetField('businessName');
    resetField('businessEmail');
    resetField('contactPhone');
    resetField('expertise');
    resetField('department');
    resetField('yearsOfExperience');
    resetField('bio');
    queryClient.invalidateQueries({
      queryKey: ['accountList'],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new account</DialogTitle>
          <DialogDescription>
            Make changes to account here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right tracking-tight">
                Account Type
              </Label>
              <Select
                value={selectedRole}
                onValueChange={(value) =>
                  setSelectedRole(value as 'student' | 'manager')
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="lecturer">Lecturer</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" {...register('email')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="col-span-3"
              />
            </div>
            {selectedRole === 'student' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="studentName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="studentName"
                    {...register('studentName')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="studentCode" className="text-right">
                    Code
                  </Label>
                  <Input
                    id="studentCode"
                    {...register('studentCode')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="studentDepartment" className="text-right">
                    Department
                  </Label>
                  <Input
                    id="studentDepartment"
                    {...register('studentDepartment')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone Num
                  </Label>
                  <Input
                    id="phoneNumber"
                    {...register('phoneNumber')}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            {selectedRole === 'lecturer' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lecturerName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="lecturerName"
                    {...register('lecturerName')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    PhoneNumber
                  </Label>
                  <Input
                    id="phoneNumber"
                    {...register('phoneNumber')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expertise" className="text-right">
                    Expertise
                  </Label>
                  <Input
                    id="expertise"
                    {...register('expertise')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Input
                    id="department"
                    {...register('department')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="yearsOfExperience" className="text-right">
                    Years Of Experience
                  </Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    {...register('yearsOfExperience')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    type="string"
                    {...register('bio')}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            {selectedRole === 'mentor' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="businessName" className="text-right">
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    {...register('businessName')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="businessEmail" className="text-right">
                    Business Email
                  </Label>
                  <Input
                    id="businessEmail"
                    {...register('businessEmail')}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactPhone" className="text-right">
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    {...register('contactPhone')}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccount;
