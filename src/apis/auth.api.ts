import { AuthResponse } from '../types/auth.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Auth';
const authApi = {
  loginAccount(body: { email: string; password: string }) {
    return http.post<SuccessResponse<AuthResponse>>(`${URL}/login`, body);
  },

  changePassword(body: {
    accountId: string;
    oldPassword: string;
    newPassword: string;
  }) {
    return http.put(`${URL}/change-password`, body);
  },

  googleLogin(token: string) {
    return http.post<SuccessResponse<AuthResponse>>(
      `${URL}/google-login?googleIdToken=${token}`,
    );
  },
};

export default authApi;
