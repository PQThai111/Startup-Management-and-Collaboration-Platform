import EventDetailItem from './EventDetailItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import eventApi from '../../../apis/event.api';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';
import { toast } from 'react-toastify';

export default function EventDetail() {
  const { newId } = useParams();
  const { profile } = useContext(AppContext);

  const { data: eventData, refetch: refetcEventDetail } = useQuery({
    queryKey: ['eventDetail', newId],
    queryFn: () => {
      return eventApi.getEventDetail(newId as string);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const { data: attendenceData, refetch } = useQuery({
    queryKey: ['eventAtten', newId],
    queryFn: () => {
      return eventApi.getStudentAttendance(newId as string);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
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

  const joinEventMutation = useMutation({
    mutationFn: eventApi.joinStudentAttendance,
    onError: (_) => {
      toast.error('Fail join event !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Join event successfully !', {
        autoClose: 500,
      });
      refetcEventDetail();
    },
  });

  const handleJoinEvent = () => {
    joinEventMutation.mutate({
      attendanceType: 2,
      eventId: eventData?.data.data.id as string,
      studentId: profile?.studentId as string,
      note: 'Student Booking',
    });
  };

  const handleChangeStatus = (id: string, note: string, status: number) => {
    updateStatusStudentMutation.mutate({ id, body: { note, status } });
  };

  return (
    <div className="mx-auto my-20 w-full px-20">
      <div>
        {eventData?.data.data && (
          <EventDetailItem
            eventProp={eventData?.data.data}
            handleJoinEvent={handleJoinEvent}
          />
        )}
        {profile?.role == 5 && (
          <div className="mb-3 h-auto w-full rounded-md border border-black bg-[#F7F7F7] p-5">
            <div className="mb-5 grid grid-cols-9 rounded-md border border-black bg-slate-400 px-5 py-3 text-white">
              <div className="col-span-2 border-r border-r-black">No</div>
              <div className="col-span-2 border-r border-r-black pl-3">
                Student Name
              </div>
              <div className="col-span-3 border-r border-r-black pl-3">
                Email
              </div>
              <div className="col-span-1 border-r border-r-black pl-3 text-center">
                Status
              </div>
              <div className="col-span-1 pl-3 text-center">Action</div>
            </div>
            {attendenceData?.data.data &&
              attendenceData?.data.data.data.map((x, idx) => (
                <div
                  key={x.id}
                  className="mb-5 grid grid-cols-9 items-center rounded-md border border-black px-5 py-3"
                >
                  <div className="col-span-2 border-r border-r-black">
                    {idx}
                  </div>
                  <div className="col-span-2 border-r border-r-black pl-3">
                    {x.student.studentName}
                  </div>
                  <div className="col-span-3 border-r border-r-black pl-3">
                    {x.student.email}
                  </div>
                  <div className="col-span-1 border-r border-r-black pl-3 text-center">
                    {x.status == 0 ? 'Absent' : 'Attended'}
                  </div>
                  <div className="col-span-1 pl-3 text-center">
                    <div className="flex justify-between px-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleChangeStatus(x.id, 'Staff Change', 1);
                        }}
                        className="bg-blue-600 px-6 py-2 text-[15px] text-white"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleChangeStatus(x.id, 'Staff Change', 0);
                        }}
                        className="bg-red-600 px-6 py-2 text-[15px] text-white"
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
