import { GetSlots, Slot, TimeSLot } from '../../../types/mentor.type';
import { formatDATE } from '../../../util/util';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
  // useQueryClient,
} from '@tanstack/react-query';
import appointmentSlotsApi from '../../../apis/appointmentSlots.api';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from '../../../types/utils.type';

import { Member } from '../../../types/team.type';

export default function CalendarLecturerDetail({
  slot,
  handleClose,
  refetchSchedule,
  getSlots,
  teamId,
}: {
  refetchSchedule: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<TimeSLot[]>, any>, Error>
  >;
  getSlots: GetSlots;
  slot: Slot;
  handleClose: () => void;
  teamId: string;
}) {
  const queryClient = useQueryClient();
  var status;
  if (slot.status === 0) {
    status = 'Available';
  } else if (slot.status === 1) {
    status = 'Booked';
  } else if (slot.status === 2) {
    status = 'Progressing';
  } else if (slot.status === 3) {
    status = 'Completed';
  } else if (slot.status === 4) {
    status = 'Cancelled';
  } else {
    status = 'Absent';
  }

  const scheduleAppointment = useMutation({
    mutationFn: (scheduleAppointment: boolean) =>
      appointmentSlotsApi.ScheduleAppointment({
        appointmentId: slot.id,
        teamId,
        scheduleAppointment,
      }),
  });

  const handleBookAppointment = (schedule: boolean) =>
    scheduleAppointment.mutate(schedule, {
      onSuccess: () => {
        toast.success('Book slot successfully', {
          autoClose: 500,
        });
        handleClose();
        queryClient.invalidateQueries({
          queryKey: ['mentorSlots', getSlots],
          exact: true,
        });
        refetchSchedule();
      },
    });

  return (
    <div className="h-[80%] w-[60%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">
          Slot Information
        </div>
        <button
          onClick={(_) => handleClose()}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-500 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-y-auto py-4">
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 flex items-center font-bold">Slot Time: </p>
          <div className="col-span-10 border border-gray-400/80 bg-white py-2 pl-2">
            {formatDATE(`${slot.startTime} ${slot.endTime}`)}
          </div>
          <div className="h-3 pl-2"></div>
        </div>
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 truncate pt-3 font-bold">Link meeting: </p>
          <div className="col-span-10">
            <input
              type="text"
              className="mb-1 w-full border border-gray-400/80 bg-white py-2 pl-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder=" Mentor note"
              value={slot.meetingAddress}
              disabled
            />
          </div>
        </div>
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 flex items-center font-bold">Slot Note: </p>
          <div className="col-span-10">
            <input
              type="text"
              className="mb-1 w-full border border-gray-400/80 bg-white py-2 pl-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder=" Mentor note"
              disabled
              value={slot.note}
            />
          </div>
        </div>
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 flex items-center font-bold">
            Slot Status:{' '}
          </p>
          <div className="col-span-10 border border-gray-400/80 bg-white py-2 pl-2">
            {status}
          </div>
        </div>
        <div className="m-3 h-[50%] w-[90%]">
          <p className="mb-3 flex items-center font-bold">Team: </p>
          <div className="h-[90%]">
            {slot.team && (
              <div className="h-full w-[100%] border border-gray-400/80 p-2">
                <div className="my-2">
                  <span className="font-medium">Team Name: </span>
                  {slot.team.teamName}
                </div>
                <div className="my-2">
                  <span className="font-medium">Idea Name: </span>
                  {slot.team.startupIdea.title}
                </div>
                <div className="my-2">
                  <span className="font-medium">Leader Name: </span>
                  {
                    (slot.team.members.find((x) => x.isLeader) as Member)
                      .studentName
                  }
                </div>
                <div>
                  <span className="font-medium">Member: </span>
                  <div className="pl-2 pt-1">
                    {slot.team.members
                      .filter((x) => !x.isLeader)
                      .map((x) => (
                        <div className="mb-1 flex justify-start">
                          <div className="w-[17%] truncate font-medium">
                            {x.studentName}
                          </div>
                          <div className="mr-4">{'-'}</div>
                          <div className="w-[10%]">{x.studentCode}</div>
                          <div className="mr-4">{'-'}</div>
                          <div>{x.memberRole}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {!slot.team && (
              <div className="flex h-full w-[100%] items-center justify-center border border-gray-400/80 p-2">
                <div className="">Empty !</div>
              </div>
            )}
          </div>
        </div>
        <div className="m-2 mt-3 flex items-center justify-start">
          {(slot.status === 0 || slot.status === 1) && (
            <button
              onClick={() => {
                if (slot.status === 0) {
                  handleBookAppointment(true);
                } else {
                  handleBookAppointment(false);
                }
              }}
              className="mr-2 mt-4 flex-shrink-0 rounded-sm bg-slate-500 p-2 px-4 text-white hover:bg-slate-400"
            >
              {slot.status === 1 ? 'Cancel' : 'Book'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
