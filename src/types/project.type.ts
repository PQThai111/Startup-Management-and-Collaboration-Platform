export interface ProjectPost {
// phần hiển thị trên items
  id: string;
//  status: boolean;//còn tuyển người / không còn
  projectName: string;
  projectDetails: string;//mô tả về project
  description: string;//caption của chủ post
  type: PROJECT_POST_TYPE; //exe1, exe2,
  coverImage?: string;
  startDate: Date;
  endDate: Date;
  mentor: string;
  lecturer: string;
  leader: string;
  memberWanted: string;//mô tả yêu cầu tuyển thành viên
// phần detail mới có
  members?: string; //BE trả ra mã thì members: string[] / BE trả ra object thì phải tạo một interface Member riêng
  memberRoles?: string;
  timeLine: number;
}
export interface ProjectPostList {
  data: ProjectPost[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export enum PROJECT_POST_TYPE {
  exe1 = 0,
  exe2 = 1
}