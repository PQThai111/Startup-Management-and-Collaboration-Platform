<<<<<<< HEAD
import { QueryRequest, Request } from "../types/request.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'StartupRequests'
const startupRequestsApi = {
  createStartupRequests(body: FormData){
    return http.post<SuccessResponse<any>>(URL, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getRequests(params: QueryRequest){
    return http.get<SuccessResponse<{
      data: Request[],
      pagination: {
        page: number
        limit: number
        page_size: number
      }
    }>>(URL, {
      params
    })
  },
  approveStartupRequests( id: string, body: { mentorId: string, lecturerId: string}){
    return http.post<SuccessResponse<any>>(`${URL}/${id}/ApproveRequest`, body)
  },
  rejectStartupRequests( id: string, body: { reason: string, notifyByEmail: boolean}){
    return http.put<SuccessResponse<any>>(`${URL}/${id}/RejectRequest`, body)
  },
}

export default startupRequestsApi
=======
import { QueryRequest, Request } from '../types/request.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'StartupRequests';
const startupRequestsApi = {
  createStartupRequests(body: FormData) {
    return http.post<SuccessResponse<any>>(URL, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateStartupRequests({ id, body }: { id: string; body: FormData }) {
    return http.put<SuccessResponse<any>>(`${URL}/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getRequests(params: QueryRequest) {
    return http.get<
      SuccessResponse<{
        data: Request[];
        pagination: {
          page: number;
          limit: number;
          page_size: number;
        };
      }>
    >(URL, {
      params,
    });
  },
  getRequestsStu() {
    return http.get<
      SuccessResponse<{
        data: Request[];
        pagination: {
          page: number;
          limit: number;
          page_size: number;
        };
      }>
    >(URL);
  },
  approveStartupRequests(
    id: string,
    body: { mentorId: string; lecturerId: string },
  ) {
    return http.post<SuccessResponse<any>>(`${URL}/${id}/ApproveRequest`, body);
  },
  rejectStartupRequests(
    id: string,
    body: { reason: string; notifyByEmail: boolean },
  ) {
    return http.put<SuccessResponse<any>>(`${URL}/${id}/RejectRequest`, body);
  },
};

export default startupRequestsApi;
>>>>>>> 76c812b (fix merge)
