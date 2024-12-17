export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires: string;
  expire: string;
  refresh_token_expires: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  role: number;
  avatarUrl?: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: string;
  studentId: string;
  currentCourseId: string;
}
