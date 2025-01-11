import {
  FreetimeRequest,
  GetSlots,
  Slot,
  TimeSLot,
} from '../types/mentor.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'AppointmentSlots';
const appointmentSlotsApi = {
  AddSlots(body: FreetimeRequest) {
    return http.post<SuccessResponse<any>>(`${URL}/AddSlots`, body);
  },
  GetSlots(body: GetSlots) {
    return http.post<SuccessResponse<TimeSLot[]>>(`${URL}/FESearch`, body);
  },
  GetSlotId(id: string) {
    return http.get<SuccessResponse<Slot>>(`${URL}/${id}`);
  },
  UpdateSlot(body: {
    startTime: string;
    endTime: string;
    note: string;
    meetingAddress: string;
    id: string;
    isDeleted: boolean;
  }) {
    return http.put<SuccessResponse<any>>(`${URL}/${body.id}`, body);
  },
  DeleteSlot(id: string) {
    return http.delete<SuccessResponse<any>>(`${URL}/${id}`);
  },
  GeneAttendence(id: string) {
    return http.post<SuccessResponse<any>>(`${URL}/${id}/JoinMeeting`);
  },
  ScheduleAppointment({
    appointmentId,
    teamId,
    scheduleAppointment,
  }: {
    appointmentId: string;
    teamId: string;
    scheduleAppointment: boolean;
  }) {
    return http.patch<SuccessResponse<any>>(
      `${URL}/${appointmentId}/ScheduleAppointment?${new URLSearchParams({ teamId, scheduleAppointment: scheduleAppointment.toString() })}`,
    );
  },
};

export default appointmentSlotsApi;
