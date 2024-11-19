import { QueryConfig, EventList } from "../types/event.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'Events'
const eventApi = {
  getEventss(){
    return http.get<SuccessResponse<EventList>>(URL)
  },
  getEvents(params: QueryConfig){
    return http.get<SuccessResponse<EventList>>(URL, {
      params
    })
  },
  getEventDetail(id: string){
    return http.get<SuccessResponse<Event>>(`${URL}/${id}`)
  }
}

export default eventApi