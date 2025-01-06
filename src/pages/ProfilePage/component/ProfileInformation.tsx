import { useContext } from 'react';
import { ProfileContext } from '../../../context/profile.context';

export default function ProfileInformation() {
  const student = useContext(ProfileContext).profile;

  return (
    <div className="p-5">
      <div className="mb-3 border-b-2 pb-2 text-2xl font-semibold">
        Profile information
      </div>
      <div className="grid h-[400px] grid-cols-12 bg-slate-100 p-5">
        <div className="col-span-2 grid h-full grid-rows-12 px-3">
          <div className="row-span-2 flex justify-end">Gmail:</div>
          <div className="row-span-2 flex justify-end">Full name:</div>
          <div className="row-span-2 flex justify-end">Student code:</div>
          <div className="row-span-2 flex justify-end">Department:</div>
          <div className="row-span-2 flex justify-end">Phone number:</div>
        </div>
        <div className="col-span-10 grid h-full grid-rows-12 px-3">
          <div className="row-span-2 mb-3 w-[80%] border bg-white p-1">
            {student?.email}
          </div>
          <div className="row-span-2 mb-3 w-[80%] border bg-white p-1">
            {student?.studentName}
          </div>
          <div className="row-span-2 mb-3 w-[80%] border bg-white p-1">
            {student?.studentCode}
          </div>
          <div className="row-span-2 mb-3 w-[80%] border bg-white p-1">
            {student?.studentDepartment}
          </div>
          <div className="row-span-2 mb-3 w-[80%] border bg-white p-1">
            {student?.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
