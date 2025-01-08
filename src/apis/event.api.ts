import {
  QueryConfig,
  EventList,
  Event,
  AttendEventList,
} from '../types/event.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Events';
const URL1 = 'StudentAttendance';
const eventApi = {
  createEvent(body: FormData) {
    return http.post<SuccessResponse<any>>(`${URL}/create`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateEvent({ body, id }: { body: FormData; id: string }) {
    return http.put<SuccessResponse<any>>(`${URL}/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteEvent(id: string) {
    return http.delete<SuccessResponse<any>>(`${URL}/${id}`);
  },
  getEventss() {
    return http.get<SuccessResponse<EventList>>(URL);
  },
  getEvents(params: QueryConfig) {
    return http.get<SuccessResponse<EventList>>(URL, {
      params,
    });
  },
  getEvents2(queryString: string) {
    return http.get<SuccessResponse<EventList>>(`${URL}?${queryString}`);
  },
  getStudentAttendance(eventId: string) {
    return http.get<SuccessResponse<AttendEventList>>(
      `${URL1}?EventId=${eventId}`,
    );
  },
  joinStudentAttendance(body: {
    eventId: string;
    studentId: string;
    attendanceType: number;
    note: string;
  }) {
    return http.post<SuccessResponse<any>>(`${URL1}`, body);
  },
  updateStudentAttendance({
    id,
    body,
  }: {
    id: string;
    body: { note: string; status: number };
  }) {
    return http.put<SuccessResponse<any>>(`${URL1}/${id}`, body);
  },
  getEventDetail(id: string) {
    return http.get<SuccessResponse<Event>>(`${URL}/${id}`);
  },
  searchEvents({
    PageSize = 10,
    PageNumber = 1,
    SearchTerm,
    IsMandatory = false,
  }: {
    PageSize?: number;
    PageNumber?: number;
    SearchTerm: string;
    IsMandatory?: boolean;
  }) {
    return http.get<SuccessResponse<EventList>>(
      `${URL}?${new URLSearchParams({
        PageSize: PageSize.toString(),
        PageNumber: PageNumber.toString(),
        SearchTerm,
        IsMandatory: IsMandatory.toString(),
      }).toString()}`,
    );
  },
};

export default eventApi;
