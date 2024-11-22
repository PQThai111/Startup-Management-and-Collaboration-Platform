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
  }
}

export default startupRequestsApi