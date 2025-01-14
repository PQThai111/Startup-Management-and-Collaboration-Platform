import { useContext, useState } from 'react';
import { ProfileContext } from '../../../context/profile.context';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useMutation } from '@tanstack/react-query';
import authApi from '../../../apis/auth.api';
import { toast } from 'react-toastify';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa6';

const ChangePassword = () => {
  const student = useContext(ProfileContext).profile;
  const [oldPassword, setOldPassword] = useState<string>('');
  const [viewOldPassword, setViewOldPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [viewNewPassword, setViewNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);

  const changePassword = useMutation({
    mutationFn: () => {
      return authApi.changePassword({
        accountId: student?.accountId as string,
        oldPassword,
        newPassword,
      });
    },
  });

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password are not the same');
      return;
    }

    changePassword.mutate(undefined, {
      onSuccess: () => {
        toast.success('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      },
      onError: () => {
        toast.error('Failed to change password');
      },
    });
  };

  return (
    <div className="p-5">
      <div className="mb-3 border-b-2 pb-2 text-2xl font-semibold">
        Change Password
      </div>
      <div className="h-[400px] bg-slate-100 p-5">
        <div className="mx-auto grid w-2/3 gap-4 py-4">
          <div className="relative grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPassword" className="">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              type={viewOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="col-span-3 bg-white"
            />
            <button
              onClick={() => setViewOldPassword(!viewOldPassword)}
              className="absolute right-2"
            >
              {viewOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className="relative grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="">
              New Password
            </Label>
            <Input
              id="newPassword"
              type={viewNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="col-span-3 bg-white"
            />
            <button
              onClick={() => setViewNewPassword(!viewNewPassword)}
              className="absolute right-2"
            >
              {viewNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className="relative grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type={viewConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="col-span-3 bg-white"
            />
            <button
              onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
              className="absolute right-2"
            >
              {viewConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <Button onClick={handleChangePassword}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
