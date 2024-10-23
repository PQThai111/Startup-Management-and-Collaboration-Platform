import { AuthResponse } from "../types/auth.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'Auth'
const eventApi = {
  login( body: { email: string, password: string}){
    return http.post<SuccessResponse<AuthResponse>>(`${URL}/login`, body)
  },
}

export default eventApi