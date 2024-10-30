import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
// import { Label } from '../../components/ui/label';
// import { Input } from '../../components/ui/input';
import ContentContainer from '../ProjectManagementPage/components/ContentContainer';

const times = [
  '7:00 - 7:30',
  '7:30 - 8:00',
  '8:00 - 8:30',
  '8:30 - 9:00',
  '9:00 - 9:30',
  '9:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarMentor = () => {
  const [selectedTime, setSelectedTime] = useState<string>();

  return (
    <ContentContainer>
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold">Calendar Mentor</p>
        <button className="rounded-lg border bg-[#EBEBEB] px-8 py-2 text-2xl font-semibold">
          Save
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between pl-20">
        <div className="flex gap-5">
          <p>
            <span className="font-bold">Mentor: </span>Nguyễn Văn Lâm
          </p>
          <p>
            <span className="font-bold">Time: </span>8:00 - 8:30
          </p>
          <p>
            <span className="font-bold">On: </span>4 Wed
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-0.5">
            <button className="flex h-9 w-8 items-center justify-center rounded-l-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowBack />
            </button>
            <div className="flex h-9 w-32 items-center justify-center bg-[#F4F4F5] text-lg font-semibold leading-none">
              <p>November</p>
            </div>
            <button className="flex h-9 w-8 items-center justify-center rounded-r-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowForward />
            </button>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="flex h-9 w-8 items-center justify-center rounded-l-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowBack />
            </button>
            <div className="flex h-9 w-32 items-center justify-center bg-[#F4F4F5] text-lg font-semibold leading-none">
              <p>Week 1</p>
            </div>
            <button className="flex h-9 w-8 items-center justify-center rounded-r-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <table className="mx-auto">
          <thead>
            <tr className="">
              <th className="w-40"></th>
              {days.map((day) => (
                <th className="w-40" key={day}>
                  <div className="mx-auto w-[80%] rounded-md bg-[#DBE7FF] px-2 py-1 text-left text-xl text-[#114864]">
                    <p>1</p>
                    <p>{day}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="items-center py-2 text-lg">{time}</td>
                {days.map((day) => (
                  <td
                    key={`${day}-${time}`}
                    className="h-full items-center justify-center py-2"
                  >
                    <div
                      className={`mx-auto h-10 w-[80%] cursor-pointer rounded ${selectedTime === `${day}-${time}` ? 'bg-[#F4A258] text-[#F4A258]' : 'bg-slate-200 text-slate-200'} px-9 py-2 text-slate-200 hover:bg-blue-400 hover:text-blue-400`}
                      id={`${day}-${time}`}
                      onClick={() => setSelectedTime(`${day}-${time}`)}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentContainer>

    // <div className="mt-4">
    //   <div className="flex items-center justify-between">
    //     <p className="text-4xl font-bold">Report Meeting</p>
    //   </div>
    //   <div className="ml-10 mt-5 flex gap-5">
    //     <p>
    //       <span className="font-semibold">Mentor:</span> Nguyễn Văn Lâm
    //     </p>
    //     <p>
    //       <span className="font-semibold">Time:</span> 8:00 - 8:30
    //     </p>
    //     <p>
    //       <span className="font-semibold">On:</span> 4 Wed
    //     </p>
    //   </div>
    //   <div className="ml-10 mt-8 flex gap-12">
    //     <button className="h-16 w-40 rounded-lg bg-[#EBEBEB] text-xl font-semibold hover:bg-[#B3D1FF]">
    //       Haven't met
    //     </button>
    //     <button className="h-16 w-40 rounded-lg bg-[#EBEBEB] text-xl font-semibold hover:bg-[#B3D1FF]">
    //       Confirm
    //     </button>
    //   </div>
    //   <div className="ml-32 mt-4 grid w-full max-w-sm items-center gap-1.5">
    //     <Input id="picture" type="file" />
    //   </div>
    // </div>
  );
};

export default CalendarMentor;
