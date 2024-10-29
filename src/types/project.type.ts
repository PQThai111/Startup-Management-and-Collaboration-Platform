export interface Project {
// phần hiển thị trên items
  id: string;
//  status: boolean;//còn tuyển người / không còn
  projectName: string;
  projectDetails: string;//mô tả về project
  // description: string;//caption của chủ post
  type: PROJECT_TYPE; //exe1, exe2,
  coverImage?: string;
  startDate: Date;//sẽ đổi thành học kỳ
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
export interface ProjectList {
  data: Project[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export enum PROJECT_TYPE {
  exe1 = 0,
  exe2 = 1
}