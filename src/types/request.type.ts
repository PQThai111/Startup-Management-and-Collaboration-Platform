export interface Request {
  id: string
  status: number
  isDeleted: boolean
  startupIdea: StartupIdea
  desiredLecturerId: string
  semesterAndCourse: SemesterAndCourse
  senderInfo: SenderInfo
}

export interface StartupIdea {
  id: string
  title: string
  description: string
  category: number
  coverImage: any
}

export interface SemesterAndCourse {
  semesterId: string
  semester: string
  courseId: string
  course: string
}

export interface SenderInfo {
  accountId: string
  studentId: string
  email: string
  avatarUrl: any
  studentName: string
  studentCode: string
  studentDepartment: string
  campus: string
  phoneNumber: string
}
export interface QueryRequest {
  RequestStatus: number
}