export interface Account {
 lecturer: Lecturers
}

type Lecturers ={
  accountId: string
  lecturerName: string
  department: string
  phoneNumber: string
  expertise: string
  yearsOfExperience: number
  bio: string
  status: number
  isDeleted: boolean
  lastUpdateDate: Date
}

export interface QueryAccount {
  roles: string
}