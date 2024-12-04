import { useContext, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
// import { Label } from '../../components/ui/label';
// import { Input } from '../../components/ui/input';
import ContentContainer from '../ProjectDetaill/components/ContentContainer';
import { getWeekDates, getWeekOfMonth } from '../../util/util';
import { AppContext } from '../../context/app.context';

const times = [
  '7:00 - 7:30',
  '7:30 - 8:00',
  '8:00 - 8:30',
  '8:30 - 9:00',
  '9:00 - 9:30',
  '9:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '11:00 - 11:30',
  '11:30 - 12:00',
  '12:00 - 12:30',
  '12:30 - 13:00',
  '13:00 - 13:30',
  '13:30 - 14:00',
  '14:00 - 14:30',
  '14:30 - 15:00',
  '15:00 - 15:30',
  '15:30 - 16:00',
  '16:00 - 16:30',
  '16:30 - 17:00',
  '17:00 - 17:30',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CalendarLecturer = () => {
  const { profile } = useContext(AppContext);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [cursorTime, setCursorTime] = useState<Date>(new Date());

  const handleMoveTime = (isMonth: boolean) => (isPlus: boolean) => {
    if (isMonth) {
      if (isPlus) {
        // Move to next month
        setCursorTime((prevTime) => {
          const nextMonth = new Date(prevTime);
          nextMonth.setMonth(prevTime.getMonth() + 1);
          return nextMonth;
        });
      } else {
        // Move to previous month
        setCursorTime((prevTime) => {
          const prevMonth = new Date(prevTime);
          prevMonth.setMonth(prevTime.getMonth() - 1);
          return prevMonth;
        });
      }
    } else {
      if (isPlus) {
        // Move to next week
        setCursorTime((prevTime) => {
          const nextWeek = new Date(prevTime);
          nextWeek.setDate(prevTime.getDate() + 7);
          return nextWeek;
        });
      } else {
        // Move to previous week
        setCursorTime((prevTime) => {
          const prevWeek = new Date(prevTime);
          prevWeek.setDate(prevTime.getDate() - 7);
          return prevWeek;
        });
      }
    }
  };

  const handleTimeSelection = (timeSlot: string) => {
    setSelectedTimes((prevSelectedTimes) => {
      // If the time slot is already selected, remove it
      if (prevSelectedTimes.includes(timeSlot)) {
        return prevSelectedTimes.filter((slot) => slot !== timeSlot);
      }
      // Otherwise, add it to the selected times
      return [...prevSelectedTimes, timeSlot];
    });
  };

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
            <span className="font-bold">Mentor: </span>
            {profile?.email}
          </p>
          <p>
            <span className="font-bold">On: </span>
            {cursorTime.getDate()}-{cursorTime.getMonth()}-
            {cursorTime.getFullYear()}
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-0.5">
            <button className="flex h-9 w-8 items-center justify-center rounded-l-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowBack onClick={(_) => handleMoveTime(true)(false)} />
            </button>
            <div className="flex h-9 w-32 items-center justify-center bg-[#F4F4F5] text-lg font-semibold leading-none">
              <p>{months[cursorTime.getMonth()]}</p>
            </div>
            <button className="flex h-9 w-8 items-center justify-center rounded-r-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowForward onClick={(_) => handleMoveTime(true)(true)} />
            </button>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="flex h-9 w-8 items-center justify-center rounded-l-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowBack onClick={(_) => handleMoveTime(false)(false)} />
            </button>
            <div className="flex h-9 w-32 items-center justify-center bg-[#F4F4F5] text-lg font-semibold leading-none">
              <p>Week {getWeekOfMonth(cursorTime)}</p>
            </div>
            <button className="flex h-9 w-8 items-center justify-center rounded-r-md bg-[#F4F4F5] py-2 text-center text-lg font-semibold">
              <IoIosArrowForward onClick={(_) => handleMoveTime(false)(true)} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <table className="mx-auto">
          <thead>
            <tr className="">
              <th className="w-40"></th>
              {getWeekDates(cursorTime).map((day, index) => (
                <th className="w-40" key={index}>
                  <div className="mx-auto w-[80%] rounded-md bg-[#DBE7FF] px-2 py-1 text-left text-xl text-[#114864]">
                    <p>{day.getDate()}</p>
                    <p>{days[index]}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="items-center py-2 text-lg">{time}</td>
                {getWeekDates(cursorTime).map((day) => {
                  const timeSlot = `${day}-${time}`;
                  return (
                    <td
                      key={timeSlot}
                      className="h-full items-center justify-center py-2"
                    >
                      <div
                        className={`mx-auto h-10 w-[80%] cursor-pointer rounded ${
                          selectedTimes.includes(timeSlot)
                            ? 'bg-[#F4A258] text-white'
                            : 'bg-slate-200 text-slate-200'
                        } px-9 py-2 hover:bg-blue-400 hover:text-blue-400`}
                        id={timeSlot}
                        onClick={() => handleTimeSelection(timeSlot)}
                      ></div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {selectedTimes.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Selected Times:</p>
          <ul>
            {selectedTimes.map((slot) => (
              <li key={slot}>{slot}</li>
            ))}
          </ul>
        </div>
      )} */}
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

export default CalendarLecturer;
