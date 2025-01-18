import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../../context/profile.context';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import accountApi from '../../../apis/account.api';
import { toast } from 'react-toastify';

export default function ProfileInformation() {
  const student = useContext(ProfileContext).profile;
  const [isEdit, setIsEdit] = useState(false);

  console.log(student);

  const { register, handleSubmit, setValue } = useForm<{
    studentName: string;
    studentCode: string;
    studentDepartment: string;
    campus: string;
    phoneNumber: string;
  }>({
    defaultValues: {
      studentName: student?.studentName,
      studentCode: student?.studentCode,
      studentDepartment: student?.studentDepartment,
      campus: student?.campus,
      phoneNumber: student?.phoneNumber,
    },
  });

  useEffect(() => {
    setValue('studentName', student?.studentName as string);
    setValue('studentCode', student?.studentCode as string);
    setValue('studentDepartment', student?.studentDepartment as string);
    setValue('campus', student?.campus as string);
    setValue('phoneNumber', student?.phoneNumber as string);
  }, [student]);

  const updateProfile = useMutation({
    mutationFn: (data: {
      studentName: string;
      studentCode: string;
      studentDepartment: string;
      campus: string;
      phoneNumber: string;
    }) =>
      accountApi.updateAccountStudent({
        id: student?.accountId as string,
        student: data,
      }),
  });

  const onSubmit: SubmitHandler<{
    studentName: string;
    studentCode: string;
    studentDepartment: string;
    campus: string;
    phoneNumber: string;
  }> = (data) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        setIsEdit(false);
        toast.success('Update profile successfully');
      },
      onError: () => {
        toast.error('Update profile failed');
      },
    });
  };

  return (
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between border-b-2 pb-2 text-2xl font-semibold">
        <div>Profile Information</div>
        <Button onClick={() => setIsEdit(true)}>Edit</Button>
      </div>
      <form
        className="h-[400px] bg-slate-100 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-auto grid w-3/4 grid-cols-6 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            disabled={true}
            {...register('studentName')}
            className="col-span-5 bg-white"
          />
        </div>
        <div className="mx-auto mt-5 grid w-3/4 grid-cols-6 items-center gap-4">
          <Label htmlFor="gmail" className="text-right">
            Gmail
          </Label>
          <Input
            id="gmail"
            disabled={true}
            value={student?.email}
            className="col-span-5 bg-white"
          />
        </div>
        <div className="mx-auto mt-5 grid w-3/4 grid-cols-6 items-center gap-4">
          <Label htmlFor="studentCode" className="text-right">
            Student Code
          </Label>
          <Input
            id="studentCode"
            disabled={true}
            {...register('studentCode')}
            className="col-span-5 bg-white"
          />
        </div>
        <div className="mx-auto mt-5 grid w-3/4 grid-cols-6 items-center gap-4">
          <Label htmlFor="studentDepartment" className="text-right">
            Department
          </Label>
          <Input
            id="studentDepartment"
            disabled={true}
            {...register('studentDepartment')}
            className="col-span-5 bg-white"
          />
        </div>
        <div className="mx-auto mt-5 grid w-3/4 grid-cols-6 items-center gap-4">
          <Label htmlFor="phoneNumber" className="text-right">
            Phone number
          </Label>
          <Input
            id="phoneNumber"
            disabled={!isEdit}
            {...register('phoneNumber')}
            className="col-span-5 bg-white"
          />
        </div>
        {isEdit && (
          <div className="mx-auto mt-5 flex w-3/4 items-center justify-end gap-4">
            <Button
              variant="secondary"
              className="border border-slate-500"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button className="w-20" type="submit">
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
