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
  }
}

export default startupRequestsApi