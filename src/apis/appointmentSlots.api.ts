import { FreetimeRequest, GetSlots, TimeSLot } from '../types/mentor.type';
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
};

export default appointmentSlotsApi;
