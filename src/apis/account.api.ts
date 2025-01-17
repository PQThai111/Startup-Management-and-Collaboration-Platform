import { Account, QueryAccount } from '../types/account.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Account';
const accountApi = {
  getAccounts(params: QueryAccount) {
    return http.get<SuccessResponse<Account[]>>(URL, {
      params,
    });
  },
<<<<<<< HEAD

=======
  getAllAccounts() {
    return http.get<SuccessResponse<Account[]>>(URL);
  },
>>>>>>> 5175638 (New Inbox, Fix small bug)
  getAllAccountsWithPagination({
    roles,
    page,
    limit,
  }: {
    roles?: string;
    page: number;
    limit: number;
  }) {
    const params = roles
      ? { roles, PageNumber: page, PageSize: limit }
      : { PageNumber: page, PageSize: limit };
    return http.get<
      SuccessResponse<{
        data: Account[];
        pagination: {
          number: number;
          limit: number;
          pageSize: number;
        };
      }>
    >(`${URL}/Paging`, {
      params,
    });
  },

  getAccount(id: string) {
    return http.get<SuccessResponse<Account>>(`${URL}/${id}`);
  },

  getAccountDashboard(data: { courseId?: string; semesterId?: string }) {
    return http.get<
      SuccessResponse<{
        total_account: number;
        student: number;
        lecturer: number;
        mentor: number;
      }>
    >(`${URL}/Dashboard`, {
      params: data,
    });
  },

  createStudentAccount({
    email,
    password,
    studentCode,
    studentDepartment,
    studentName,
    phoneNumber,
  }: {
    email: string;
    password: string;
    studentName: string;
    studentCode: string;
    studentDepartment: string;
    phoneNumber: string;
  }) {
    return http.post(`${URL}/add-student`, {
      email,
      password,
      student: {
        studentName,
        studentCode,
        studentDepartment,
        phoneNumber,
        campus: 'HCM',
      },
    });
  },

  createManagerAccount(data: { email: string; password: string }) {
    return http.post(`${URL}/add-manager`, data);
  },
<<<<<<< HEAD

  // updateAccountStudent(data: {
  //   id: string;
  //   student: {
  //     studentName: string;
  //     studentCode: string;
  //     studentDepartment: string;
  //     campus: string;
  //     phoneNumber: string;
  //   };
  // }) {
  //   return http.put(`${URL}/${data.id}`, { ...data, role: 3 });
  // },
=======
>>>>>>> 5175638 (New Inbox, Fix small bug)
};

export default accountApi;
