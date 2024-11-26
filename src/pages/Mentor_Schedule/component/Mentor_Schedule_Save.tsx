import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  mentorTimeBookingSchema,
  MentorTimeBookingSchema,
} from '../../../util/rules';
import { parseTimeSlot } from '../../../util/util';
import { FreetimeRequest } from '../../../types/mentor.type';
import { useMutation } from '@tanstack/react-query';
import appointmentSlotsApi from '../../../apis/appointmentSlots.api';
import { toast } from 'react-toastify';

type FormData = Pick<MentorTimeBookingSchema, 'Note' | 'MeetingAddress'>;

const schema = mentorTimeBookingSchema.pick(['Note', 'MeetingAddress']);

export default function Mentor_Schedule_Save({
  schedules,
  handleOpen,
}: {
  schedules: string[];
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      Note: '',
      MeetingAddress: '',
    },
  });

  const timeObject = schedules.reduce<{ startTime: string; endTime: string }[]>(
    (acc, schedule) => {
      const parsed = parseTimeSlot(schedule);
      if (parsed) {
        acc.push(parsed);
      }
      return acc;
    },
    [],
  );

  console.log(timeObject);

  const addSlotsMutation = useMutation({
    mutationFn: (body: FreetimeRequest) => appointmentSlotsApi.AddSlots(body),
  });

  const onSubmit = handleSubmit((data) => {
    const request: FreetimeRequest = {
      note: data.Note as string,
      meetingAddress: data.MeetingAddress,
      times: timeObject,
    };
    addSlotsMutation.mutate(request, {
      onSuccess(_) {
        toast.success('Add free slots successfully !', {
          autoClose: 500,
        });
      },
      onError(_) {
        toast.error('Add free slots fail !', {
          autoClose: 500,
        });
      },
    });
  });

  return (
    <div className="h-[95%] w-[50%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">
          Booking Information
        </div>
        <button
          onClick={handleOpen}
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
      <div className="h-full overflow-y-auto py-4">
        <form onSubmit={onSubmit} className="mb-3 px-3">
          {schedules.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Selected Times:</p>
              <ul>
                {timeObject.map((slot, index) => (
                  <div
                    key={index}
                    className="my-3 rounded-md bg-slate-300 p-2 text-slate-700"
                  >
                    <span className="mr-5 pl-3">
                      {new Date(slot.startTime).getUTCDate()}/
                      {new Date(slot.startTime).getUTCMonth() + 1}/
                      {new Date(slot.startTime).getUTCFullYear()}
                    </span>
                    <span>
                      {String(new Date(slot.startTime).getUTCHours()).padStart(
                        2,
                        '0',
                      )}
                      :
                      {String(
                        new Date(slot.startTime).getUTCMinutes(),
                      ).padStart(2, '0')}
                    </span>
                    <span className="mx-2">-</span>
                    <span>
                      {String(new Date(slot.endTime).getUTCHours()).padStart(
                        2,
                        '0',
                      )}
                      :
                      {String(new Date(slot.endTime).getUTCMinutes()).padStart(
                        2,
                        '0',
                      )}
                    </span>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="my-4 border-b-2 pb-2">
            <p>
              <span className="font-semibold">Mentor note:</span>
            </p>
            <div>
              <Controller
                control={control}
                name="Note"
                render={({ field }) => (
                  <input
                    type="text"
                    className="mb-2 h-[30px] w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder=" Mentor note"
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            {errors.Note && (
              <p className="text-sm text-red-500">{errors.Note.message}</p>
            )}
          </div>
          <div className="my-4 border-b-2 pb-2">
            <p>
              <span className="font-semibold">Mentor meeting address:</span>
            </p>
            <div>
              <Controller
                control={control}
                name="MeetingAddress"
                render={({ field }) => (
                  <input
                    type="text"
                    className="mb-2 h-[30px] w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder=" MeetingAddress note"
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            {errors.MeetingAddress && (
              <p className="text-sm text-red-500">
                {errors.MeetingAddress.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="mr-5 w-20 rounded-sm border-2 border-main bg-main font-semibold text-white"
            >
              Create
            </button>
            <button
              onClick={(_) =>
                reset({
                  Note: '',
                  MeetingAddress: '',
                })
              }
              className="w-20 rounded-sm border-2 border-main font-semibold text-main"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
