import { useContext, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import ContentContainer from '../ProjectDetail/components/ContentContainer';
import {
  formatDate,
  formatDateSuper,
  getHourAndMinute,
  getWeekDates,
  getWeekOfMonth,
} from '../../util/util';
import { AppContext } from '../../context/app.context';
import Popover from '../../components/popover';
import { useQuery } from '@tanstack/react-query';
import { GetSlots, Slot } from '../../types/mentor.type';
import appointmentSlotsApi from '../../apis/appointmentSlots.api';
import classNames from 'classnames';
import { ProjectContext } from '../../context/project.context';
import CalendarLecturerDetail from './component/CalendarLecturerDetail';

const times = [
  '07:00 - 07:30',
  '07:30 - 08:00',
  '08:00 - 08:30',
  '08:30 - 09:00',
  '09:00 - 09:30',
  '09:30 - 10:00',
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
  const { project } = useContext(ProjectContext);
  const [cursorTime, setCursorTime] = useState<Date>(new Date());
  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [chooseSLot, setChooseSlot] = useState<Slot | null>(null);

  const weekDates = getWeekDates(cursorTime); // Pass in the desired date

  const monday = weekDates[0]; // First index: Monday
  const sunday = weekDates[6]; // Last index: Sunday

  const requestBody: GetSlots = {
    startTime: formatDate(monday),
    endTime: formatDate(sunday),
    creatorId: project?.mentorsAndLecturers.find(
      (item) => item.roleType === 'Lecturer',
    )?.accountId,
  };

  const { data: lecturerSlotsData, refetch } = useQuery({
    queryKey: ['lecturerSlots', requestBody],
    queryFn: () => {
      return appointmentSlotsApi.GetSlots(requestBody);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  console.log(lecturerSlotsData?.data.data);

  const handleSlotClose = () => {
    setIsSlotOpen(!isSlotOpen);
  };

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

  return (
    <ContentContainer>
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold">Calendar Lecturer</p>
      </div>
      <div className="mt-5 flex items-center justify-between pl-20">
        <div className="flex gap-5">
          <p>
            <span className="font-bold">Lecturer: </span>
            {profile?.email}
          </p>
          <p>
            <span className="font-bold">On: </span>
            {cursorTime.getDate()}-{cursorTime.getMonth() + 1}-
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
        <Popover
          initialOpen={isSlotOpen}
          renderPopover={
            <CalendarLecturerDetail
              teamId={project?.team.teamId as string}
              refetchSchedule={refetch}
              getSlots={requestBody}
              handleClose={handleSlotClose}
              slot={chooseSLot!}
            />
          }
        >
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
                    day.setHours(0, 0, 0, 0);
                    const isoDateCompare = formatDate(day);
                    const finderTimeSlot = lecturerSlotsData?.data?.data.find(
                      (x) => formatDateSuper(x.date) == isoDateCompare,
                    );
                    const timeSlot = `${day} - ${time}`;
                    if (finderTimeSlot != null) {
                      const findSlot = finderTimeSlot.slot.find((x) => {
                        const formattedTimeRange = `${getHourAndMinute(x.startTime)} - ${getHourAndMinute(x.endTime)}`;
                        return formattedTimeRange == time;
                      });
                      if (
                        findSlot != null &&
                        findSlot.isDeleted != true &&
                        (findSlot.teamId === project?.team.teamId ||
                          findSlot.teamId === null)
                      ) {
                        return (
                          <td
                            key={timeSlot}
                            className="h-full items-center justify-center py-2"
                          >
                            <div
                              className={classNames(
                                `mx-auto h-10 w-[80%] cursor-pointer rounded px-9 py-2`,
                                {
                                  'bg-blue-400 hover:bg-blue-300':
                                    findSlot.status == 0,
                                  'bg-[#F4A258] hover:bg-[#F4A258]/70':
                                    findSlot.status == 1,
                                  'bg-blue-600 hover:bg-blue-600/75':
                                    findSlot.status == 2,
                                  'bg-green-500 hover:bg-green-500/75':
                                    findSlot.status == 3,
                                  'bg-red-500 hover:bg-red-500/75':
                                    findSlot.status == 5,
                                },
                              )}
                              id={timeSlot}
                              onClick={(_) => {
                                setChooseSlot(findSlot);
                                setIsSlotOpen(true);
                              }}
                            ></div>
                          </td>
                        );
                      }
                    }
                    return (
                      <td
                        key={timeSlot}
                        className="h-full items-center justify-center py-2"
                      >
                        <div
                          className={`mx-auto h-10 w-[80%] rounded bg-slate-200 px-9 py-2`}
                          id={timeSlot}
                        ></div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Popover>
      </div>
    </ContentContainer>
  );
};

export default CalendarLecturer;
