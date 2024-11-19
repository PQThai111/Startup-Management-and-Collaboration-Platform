import { Project, ProjectConfig, ProjectList } from "../types/project.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'Projects'
const projectApi = {
  getProjectss(){
    return http.get<SuccessResponse<ProjectList>>(URL)
  },
  getProjects(params: ProjectConfig){
    return http.get<SuccessResponse<ProjectList>>(URL, {
      params
    })
  },
  getProjectDetail(id: string){
    return http.get<SuccessResponse<Project>>(`${URL}/${id}`)
  }
}

export default projectApi