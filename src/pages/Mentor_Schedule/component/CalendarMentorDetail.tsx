import { GetSlots, Slot, TimeSLot } from '../../../types/mentor.type';
import { formatDATE } from '../../../util/util';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
  // useQueryClient,
} from '@tanstack/react-query';
import appointmentSlotsApi from '../../../apis/appointmentSlots.api';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from '../../../types/utils.type';
import {
  mentorTimeBookingSchema,
  MentorTimeBookingSchema,
} from '../../../util/rules';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Member } from '../../../types/team.type';
import eventApi from '../../../apis/event.api';

type FormData = Pick<MentorTimeBookingSchema, 'Note' | 'MeetingAddress'>;

const schema = mentorTimeBookingSchema.pick(['Note', 'MeetingAddress']);

export default function CalendarMentorDetail({
  slot: slotId,
  handleClose,
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
  const { data: slotData, refetch } = useQuery({
    queryKey: ['slotById', slotId.id],
    queryFn: () => appointmentSlotsApi.GetSlotId(slotId.id),
  });

  const slot = slotData?.data?.data;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      Note: slotId.note,
      MeetingAddress: slotId.meetingAddress,
    },
  });

  const updateSlotMutation = useMutation({
    mutationFn: (body: Slot) =>
      appointmentSlotsApi.UpdateSlot({
        id: body.id,
        note: body.note,
        meetingAddress: body.meetingAddress,
        startTime: body.startTime,
        endTime: body.endTime,
        isDeleted: body.isDeleted,
      }),
  });

  const onSubmit = handleSubmit((data) => {
    const updateSlot: Slot = {
      ...slotId,
      note: data.Note!,
      meetingAddress: data.MeetingAddress!,
    };
    updateSlotMutation.mutate(updateSlot, {
      onSuccess(_) {
        toast.success('Update slot successfully !', {
          autoClose: 500,
        });
        refetchSchedule();
      },
      onError(_) {
        toast.error('Update slot slots fail !', {
          autoClose: 500,
        });
      },
    });
  });

  // const queryClient = useQueryClient();
  var status;
  if (slotId.status === 0) {
    status = 'Available';
  } else if (slotId.status === 1) {
    status = 'Booked';
  } else if (slotId.status === 2) {
    status = 'Progressing';
  } else if (slotId.status === 3) {
    status = 'Completed';
  } else if (slotId.status === 4) {
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
    onError(_) {
      toast.error('Delete slot fail !', {
        autoClose: 500,
      });
    },
  });

  const updateStatusStudentMutation = useMutation({
    mutationFn: eventApi.updateStudentAttendance,
    onError: (_) => {
      toast.error('Fail update status !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Update status successfully !', {
        autoClose: 500,
      });
      refetch();
    },
  });

  const handleChangeStatus = (id: string, note: string, status: number) => {
    updateStatusStudentMutation.mutate({ id, body: { note, status } });
  };

  const generateAttenMutation = useMutation({
    mutationFn: appointmentSlotsApi.GeneAttendence,
    onSuccess: () => {
      toast.success('Generate Attendence successfully', {
        autoClose: 500,
      });
      // handleClose();
      // queryClient.invalidateQueries({
      //   queryKey: ['mentorSlots', getSlots],
      //   exact: true,
      // });
      refetchSchedule();
      refetch();
    },
    onError(_) {
      toast.error('Generate Attendence fail !', {
        autoClose: 500,
      });
    },
  });

  const handleGenerate = () => {
    generateAttenMutation.mutate(slotId.id);
  };

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
      <form
        onSubmit={onSubmit}
        className="h-[calc(100%-2.5rem)] overflow-y-auto py-4"
      >
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 flex items-center font-bold">Slot Time: </p>
          <div className="col-span-10 border border-gray-400/80 bg-white py-2 pl-2">
            {formatDATE(`${slotId.startTime} ${slotId.endTime}`)}
          </div>
          <div className="h-3 pl-2"></div>
        </div>
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 truncate pt-3 font-bold">Link meeting: </p>
          <div className="col-span-10">
            <Controller
              control={control}
              name="MeetingAddress"
              render={({ field }) => (
                <input
                  type="text"
                  className="mb-1 w-full border border-gray-400/80 bg-white py-2 pl-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder=" Mentor note"
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <div className="h-3 pl-2 text-sm text-red-500">
              {errors.MeetingAddress != undefined
                ? errors.MeetingAddress.message
                : ' '}
            </div>
          </div>
        </div>
        <div className="m-3 grid w-[90%] grid-cols-12">
          <p className="col-span-2 flex items-center font-bold">Slot Note: </p>
          <div className="col-span-10">
            <Controller
              control={control}
              name="Note"
              render={({ field }) => (
                <input
                  type="text"
                  className="mb-1 w-full border border-gray-400/80 bg-white py-2 pl-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder=" Mentor note"
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <div className="h-3 pl-2 text-sm text-red-500">
              {errors.Note != undefined ? errors.Note.message : ' '}
            </div>
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
            {slot != undefined && slot.team && (
              <div className="h-full w-[100%] border border-gray-400/80 p-2">
                <div className="my-2">
                  <span className="font-medium">Team Name: </span>
                  {slot.team.teamName}
                </div>
                <div className="my-2">
                  <span className="font-medium">Idea Name: </span>
                  {slot.team.startupIdea?.title}
                </div>
                <div className="my-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium">Leader Name: </span>
                    {
                      (slot.team.members.find((x) => x.isLeader) as Member)
                        .studentName
                    }
                    {slot.studentAttendances.length > 0 && (
                      <span className="ml-8 underline">
                        {slot.studentAttendances.find(
                          (x) =>
                            x.studentId ==
                            (
                              slot?.team?.members?.find(
                                (x) => x.isLeader,
                              ) as Member
                            ).studentId,
                        )?.status == 0
                          ? 'Absent'
                          : 'Present'}
                      </span>
                    )}
                  </div>
                  {slot.studentAttendances.length > 0 &&
                    slot.studentAttendances.find(
                      (x) =>
                        x.studentId ==
                        (slot?.team?.members?.find((x) => x.isLeader) as Member)
                          .studentId,
                    ) && (
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            handleChangeStatus(
                              slot.studentAttendances.find(
                                (x) =>
                                  x.studentId ==
                                  (
                                    slot?.team?.members?.find(
                                      (x) => x.isLeader,
                                    ) as Member
                                  ).studentId,
                              )?.id as string,
                              'Mentor or Lecture Change',
                              1,
                            );
                          }}
                          className="mr-3 rounded-md bg-blue-400 p-2 text-white"
                        >
                          Attend
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleChangeStatus(
                              slot.studentAttendances.find(
                                (x) =>
                                  x.studentId ==
                                  (
                                    slot?.team?.members?.find(
                                      (x) => x.isLeader,
                                    ) as Member
                                  ).studentId,
                              )?.id as string,
                              'Mentor or Lecture Change',
                              0,
                            );
                          }}
                          className="mr-3 rounded-md bg-red-400 p-2 text-white"
                        >
                          Absent
                        </button>
                      </div>
                    )}
                </div>
                <div>
                  <span className="font-medium">Member: </span>
                  <div className="pl-2 pt-1">
                    {slot.team.members
                      .filter((x) => !x.isLeader)
                      .map((stu) => (
                        <div
                          key={stu.id}
                          className="mb-1 flex items-center justify-between"
                        >
                          <div className="flex w-[50%] justify-start">
                            <div className="w-[45%] truncate font-medium">
                              {stu.studentName}
                            </div>
                            <div className="mx-1 w-[1%]">{'-'}</div>
                            <div className="w-[25%]">{stu.studentCode}</div>
                            <div className="mx-1 w-[1%]">{'-'}</div>
                            <div>{stu.memberRole}</div>
                            <span className="ml-8 underline"></span>
                            {slot.studentAttendances.length > 0 && (
                              <span className="ml-8 underline">
                                {slot.studentAttendances.find(
                                  (aX) => aX.studentId == stu.studentId,
                                )?.status == 0
                                  ? 'Absent'
                                  : 'Present'}
                              </span>
                            )}
                          </div>
                          {slot.studentAttendances.length > 0 &&
                            slot.studentAttendances.find(
                              (aX) => aX.studentId == stu.studentId,
                            ) && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleChangeStatus(
                                      slot.studentAttendances.find(
                                        (aX) => aX.studentId == stu.studentId,
                                      )?.id as string,
                                      'Staff Change',
                                      1,
                                    );
                                  }}
                                  className="mr-3 rounded-md bg-blue-400 p-2 text-white"
                                >
                                  Attend
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleChangeStatus(
                                      slot.studentAttendances.find(
                                        (aX) => aX.studentId == stu.studentId,
                                      )?.id as string,
                                      'Staff Change',
                                      0,
                                    );
                                  }}
                                  className="mr-3 rounded-md bg-red-400 p-2 text-white"
                                >
                                  Absent
                                </button>
                              </div>
                            )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {slot != undefined && !slot.team && (
              <div className="flex h-full w-[100%] items-center justify-center border border-gray-400/80 p-2">
                <div className="">Empty !</div>
              </div>
            )}
          </div>
        </div>
        <div className="m-2 mt-3 flex items-center justify-start">
          <button
            type="submit"
            className="mr-2 flex-shrink-0 rounded-sm bg-slate-500 p-2 px-4 text-white hover:bg-slate-400"
          >
            Update
          </button>
          <button
            type="button"
            onClick={(_) => deleteCalendarMentorMutation.mutate(slotId.id)}
            className="mr-2 flex-shrink-0 rounded-sm bg-red-400 p-2 px-4 text-white hover:bg-red-300"
          >
            Remove
          </button>
          <button
            type="button"
            onClick={(_) => handleGenerate()}
            className="flex-shrink-0 rounded-sm bg-blue-400 p-2 px-4 text-white hover:bg-red-300"
          >
            Attendences
          </button>
        </div>
      </form>
    </div>
  );
}
