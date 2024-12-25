import { QueryConfig, EventList } from '../types/event.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Events';
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
