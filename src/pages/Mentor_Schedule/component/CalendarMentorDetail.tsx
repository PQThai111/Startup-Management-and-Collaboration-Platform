import classNames from 'classnames';
import { GetSlots, Slot, TimeSLot } from '../../../types/mentor.type';
import { formatDATE } from '../../../util/util';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import appointmentSlotsApi from '../../../apis/appointmentSlots.api';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from '../../../types/utils.type';

export default function CalendarMentorDetail({
  slot,
  handleClose,
  getSlots,
  refetchSchedule,
}: {
  refetchSchedule: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<TimeSLot[]>, any>, Error>
  >;
  getSlots: GetSlots;
  slot: Slot;
  handleClose: () => void;
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

  const deleteCalendarMentorMutation = useMutation({
    mutationFn: appointmentSlotsApi.DeleteSlot,
    onSuccess: () => {
      toast.success('Delete slot successfully', {
        autoClose: 500,
      });
      handleClose();
      // queryClient.invalidateQueries({
      //   queryKey: ['mentorSlots', getSlots],
      //   exact: true,
      // });
      refetchSchedule();
    },
  });

  return (
    <div className="h-[90%] w-[60%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
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
      <form className="h-full overflow-y-auto py-4">
        {/* <div
          className={classNames(
            'float-end w-20 rounded-sm px-3 py-1 text-black',
            {
              'bg-green-400': status === 'Available',
              'bg-orange-500': status === 'Booked',
              'bg-yellow-500': status === 'Progressing',
              'bg-green-600': status === 'Completed',
              'bg-red-500': status === 'Cancelled',
              'bg-red-700': status === 'Absent',
            },
          )}
        >
          {status}
        </div> */}
        <div>
          <span className="font-bold">Time: </span>
          {formatDATE(`${slot.startTime} ${slot.endTime}`)}
        </div>
        <div>
          <span className="font-bold">Link meeting: </span>
          <a href={slot.meetingAddress} className="text-blue-700">
            {slot.meetingAddress}
          </a>
        </div>
        <div>
          <span className="font-bold">Status: </span>
          {status}
        </div>
        {slot.team && <div>Team</div>}
        <div className="flex items-center">
          <button
            type="submit"
            className="mr-2 rounded-sm bg-slate-500 p-2 px-4 text-white hover:bg-slate-400"
          >
            Update
          </button>
          <button
            type="button"
            onClick={(_) => deleteCalendarMentorMutation.mutate(slot.id)}
            className="rounded-sm bg-red-400 p-2 px-4 text-white hover:bg-red-300"
          >
            Remove
          </button>
        </div>
        {/* <div className="font-bold">Team :{slot.team}</div> */}
      </form>
    </div>
  );
}
