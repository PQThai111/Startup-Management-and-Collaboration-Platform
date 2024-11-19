import { Course } from "../types/course.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'Course'
const courseApi = {
  getCourses(){
    return http.get<SuccessResponse<Course[]>>(URL)
  }
}

export default courseApi