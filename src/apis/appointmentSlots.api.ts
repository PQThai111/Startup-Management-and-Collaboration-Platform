import { FreetimeRequest, GetSlots, TimeSLot } from "../types/mentor.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'AppointmentSlots'
const appointmentSlotsApi = {
  AddSlots( body: FreetimeRequest){
    return http.post<SuccessResponse<any>>(`${URL}/AddSlots`, body)
  },
  GetSlots( body: GetSlots){
    return http.post<SuccessResponse<TimeSLot[]>>(`${URL}/FESearch`, body)
  },
}

export default appointmentSlotsApi